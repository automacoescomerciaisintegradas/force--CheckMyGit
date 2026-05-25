import { Hono } from "hono";
import type { Env } from './core-utils';
import { ChatSessionEntity } from "./entities";
import { ok, bad, notFound } from './core-utils';
import { ChatMessage } from "@shared/types";
const DEVELOPER_RESPONSES = [
  {
    content: "Absolutely. To implement a **Durable Object** in Cloudflare, you need to define the class and then bind it in your `wrangler.toml`. \n\n```typescript\nexport class Counter extends DurableObject {\n  async fetch(request: Request) {\n    let value = await this.ctx.storage.get<number>(\"count\") || 0;\n    await this.ctx.storage.put(\"count\", ++value);\n    return new Response(value.toString());\n  }\n}\n```\nWould you like to see how to call this from a Worker?",
    title: "Cloudflare DO Pattern"
  },
  {
    content: "Minimalist design is about removing everything that doesn't add value. \n\n| Principle | Action |\n| :--- | :--- |\n| **Whitespace** | Use `space-y-x` utilities liberally |\n| **Typography** | Stick to one font with varying weights |\n| **Color** | Use monochromatic scales with 1 primary accent |\n\nHere is a clean Tailwind configuration for a minimalist theme:\n\n```javascript\nmodule.exports = {\n  theme: {\n    extend: {\n      colors: {\n        'forge-black': '#0a0a0a',\n        'forge-white': '#fafafa'\n      }\n    }\n  }\n}\n```",
    title: "Minimalist UI Principles"
  },
  {
    content: "That's a great question about React performance. The most common bottleneck is unnecessary re-renders. \n\n1. **memo()**: Wrap pure components\n2. **useCallback**: Stabilize function refs\n3. **useMemo**: Cache expensive calculations\n\n```tsx\nconst HeavyComponent = React.memo(({ data }) => {\n  return <div>{/* complex UI */}</div>;\n});\n```\nRemember to avoid object literals in your dependency arrays!",
    title: "React Optimization"
  }
];
export function userRoutes(app: Hono<{ Bindings: Env }>) {
  app.get('/api/sessions', async (c) => {
    const page = await ChatSessionEntity.list(c.env, c.req.query('cursor') ?? null, 100);
    const sorted = page.items.sort((a, b) => b.updatedAt - a.updatedAt);
    return ok(c, { items: sorted, next: page.next });
  });
  app.get('/api/sessions/:id', async (c) => {
    const session = new ChatSessionEntity(c.env, c.req.param('id'));
    if (!await session.exists()) return notFound(c, 'Session not found');
    return ok(c, await session.getState());
  });
  app.post('/api/sessions', async (c) => {
    const id = crypto.randomUUID();
    const session = await ChatSessionEntity.create(c.env, {
      ...ChatSessionEntity.initialState,
      id,
      createdAt: Date.now(),
      updatedAt: Date.now()
    });
    return ok(c, session);
  });
  app.post('/api/chat/:sessionId', async (c) => {
    const sessionId = c.req.param('sessionId');
    const { content } = await c.req.json();
    if (!content) return bad(c, 'Message content required');
    const session = new ChatSessionEntity(c.env, sessionId);
    if (!await session.exists()) return notFound(c, 'Session not found');
    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content,
      timestamp: Date.now()
    };
    await session.addMessage(userMsg);
    const randomResponse = DEVELOPER_RESPONSES[Math.floor(Math.random() * DEVELOPER_RESPONSES.length)];
    const aiMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: randomResponse.content,
      timestamp: Date.now()
    };
    const updatedSession = await session.addMessage(aiMsg);
    return ok(c, updatedSession);
  });
  app.delete('/api/sessions/:id', async (c) => {
    const success = await ChatSessionEntity.delete(c.env, c.req.param('id'));
    return ok(c, { success });
  });
}