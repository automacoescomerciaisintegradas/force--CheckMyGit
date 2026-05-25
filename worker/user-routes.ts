import { Hono } from "hono";
import type { Env } from './core-utils';
import { RepositoryEntity, IssueEntity } from "./entities";
import { ok, notFound } from './core-utils';
import { MOCK_REPOSITORIES, MOCK_ISSUES } from "@shared/mock-data";
export function userRoutes(app: Hono<{ Bindings: Env }>) {
  // Repository Discovery
  app.get('/api/repos', async (c) => {
    // Return all mock repositories for explore
    return ok(c, MOCK_REPOSITORIES);
  });
  app.get('/api/repos/:owner/:name', async (c) => {
    const { owner, name } = c.req.param();
    const repo = MOCK_REPOSITORIES.find(r => r.ownerUsername === owner && r.name === name);
    if (!repo) return notFound(c, 'Repository not found');
    return ok(c, repo);
  });
  app.get('/api/repos/:owner/:name/issues', async (c) => {
    const { owner, name } = c.req.param();
    const repo = MOCK_REPOSITORIES.find(r => r.ownerUsername === owner && r.name === name);
    if (!repo) return notFound(c, 'Repository not found');
    const issues = MOCK_ISSUES.filter(i => i.repoId === repo.id);
    return ok(c, issues);
  });
  // Future persistence endpoints for actual user creation of repos/issues
  app.post('/api/repos', async (c) => {
    const body = await c.req.json();
    const repo = await RepositoryEntity.create(c.env, { ...body, id: crypto.randomUUID() });
    return ok(c, repo);
  });
}