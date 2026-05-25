import { Hono } from "hono";
import type { Env } from './core-utils';
import { UserEntity, RepositoryEntity, IssueEntity } from "./entities";
import { ok, bad, notFound, isStr } from './core-utils';
export function userRoutes(app: Hono<{ Bindings: Env }>) {
  // REPOS
  app.get('/api/repos', async (c) => {
    await RepositoryEntity.ensureSeed(c.env);
    const page = await RepositoryEntity.list(c.env, c.req.query('cursor') ?? null, 50);
    return ok(c, page);
  });
  app.get('/api/repos/:owner/:name', async (c) => {
    const { owner, name } = c.req.param();
    const { items } = await RepositoryEntity.list(c.env);
    const repo = items.find(r => r.owner === owner && r.name === name);
    if (!repo) return notFound(c, 'Repository not found');
    return ok(c, repo);
  });
  app.post('/api/repos', async (c) => {
    const data = await c.req.json();
    if (!data.name || !data.owner) return bad(c, 'name and owner required');
    const repo = await RepositoryEntity.create(c.env, {
      ...RepositoryEntity.initialState,
      ...data,
      id: crypto.randomUUID(),
      updatedAt: new Date().toISOString()
    });
    return ok(c, repo);
  });
  app.post('/api/repos/:id/star', async (c) => {
    const id = c.req.param('id');
    const repo = new RepositoryEntity(c.env, id);
    if (!await repo.exists()) return notFound(c, 'Repo not found');
    const state = await repo.mutate(s => ({ ...s, stars: s.stars + 1, isStarred: true }));
    return ok(c, state);
  });
  // ISSUES
  app.get('/api/issues', async (c) => {
    await IssueEntity.ensureSeed(c.env);
    const repoId = c.req.query('repoId');
    const { items } = await IssueEntity.list(c.env);
    const filtered = repoId ? items.filter(i => i.repoId === repoId) : items;
    return ok(c, { items: filtered, next: null });
  });
  app.post('/api/issues', async (c) => {
    const data = await c.req.json();
    if (!data.title || !data.repoId) return bad(c, 'title and repoId required');
    const issue = await IssueEntity.create(c.env, {
      ...IssueEntity.initialState,
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString()
    });
    return ok(c, issue);
  });
  // USERS
  app.get('/api/users/:id', async (c) => {
    const user = new UserEntity(c.env, c.req.param('id'));
    if (!await user.exists()) return notFound(c);
    return ok(c, await user.getState());
  });
}