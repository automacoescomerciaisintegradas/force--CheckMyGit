import { Hono } from "hono";
import type { Env } from './core-utils';
import { ChatSessionEntity, UserEntity } from "./entities";
import { ok, bad, notFound } from './core-utils';
import { ChatMessage } from "@shared/types";
export function userRoutes(app: Hono<{ Bindings: Env }>) {
  // SESSIONS
  app.get('/api/sessions', async (c) => {
    const page = await ChatSessionEntity.list(c.env, c.req.query('cursor') ?? null, 20);
    // Sort by updated time descending
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
  // CHAT
  app.post('/api/chat/:sessionId', async (c) => {
    const sessionId = c.req.param('sessionId');
    const { content } = await c.req.json();
    if (!content) return bad(c, 'Message content required');
    const session = new ChatSessionEntity(c.env, sessionId);
    if (!await session.exists()) return notFound(c, 'Session not found');
    // 1. Save User Message
    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content,
      timestamp: Date.now()
    };
    await session.addMessage(userMsg);
    // 2. Simulate AI Delay & Response
    // In a real app, you'd call OpenAI/Workers AI here
    const aiResponseContent = `I received your message: "${content}". This is a placeholder response from Forge AI. In the next phase, I'll be connected to a real LLM.`;
    const aiMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: aiResponseContent,
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