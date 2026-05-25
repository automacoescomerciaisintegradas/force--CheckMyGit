export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
export type Visibility = 'public' | 'private';
export type IssueStatus = 'open' | 'closed';
export type PRStatus = 'open' | 'closed' | 'merged';
export interface User {
  id: string;
  username: string;
  name: string;
  avatar: string;
  bio?: string;
  location?: string;
  website?: string;
  followers: number;
  following: number;
  joinedAt: string;
}
export interface Repository {
  id: string;
  ownerId: string;
  ownerUsername: string;
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  visibility: Visibility;
  updatedAt: string;
  topics: string[];
}
export interface Issue {
  id: string;
  repoId: string;
  number: number;
  title: string;
  authorId: string;
  status: IssueStatus;
  labels: string[];
  createdAt: string;
  commentsCount: number;
}
export interface PullRequest {
  id: string;
  repoId: string;
  number: number;
  title: string;
  authorId: string;
  status: PRStatus;
  createdAt: string;
  mergedAt?: string;
}
export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}
export interface ActivityEvent {
  id: string;
  type: 'push' | 'issue' | 'pr' | 'star';
  userUsername: string;
  repoName: string;
  timestamp: string;
  payload?: any;
}