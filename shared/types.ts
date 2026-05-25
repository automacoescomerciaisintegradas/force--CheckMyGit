export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
export interface User {
  id: string;
  name: string;
}
export interface Repo {
  id: string;
  name: string;
  owner: string;
  description: string;
  stars: number;
  forks: number;
  visibility: 'public' | 'private';
  updatedAt: string;
  language: string;
  topics: string[];
  isStarred?: boolean;
}
export interface Issue {
  id: string;
  repoId: string;
  title: string;
  authorId: string;
  status: 'open' | 'closed';
  createdAt: string;
  commentsCount: number;
  labels: { name: string; color: string }[];
}
export interface WorkflowRun {
  id: string;
  repoId: string;
  name: string;
  status: 'success' | 'failure' | 'in_progress' | 'queued';
  conclusion?: string;
  event: string;
  branch: string;
  author: string;
  commitSha: string;
  duration: string;
  createdAt: string;
}
export interface Chat {
  id: string;
  title: string;
}
export interface ChatMessage {
  id: string;
  chatId: string;
  userId: string;
  text: string;
  ts: number;
}