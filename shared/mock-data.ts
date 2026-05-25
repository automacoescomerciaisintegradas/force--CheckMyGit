import type { User } from './types';
export interface FileNode {
  name: string;
  type: 'file' | 'folder';
  path: string;
  content?: string;
  children?: FileNode[];
  lastCommitMessage?: string;
  lastCommitDate?: string;
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
}
export interface IssueComment {
  id: string;
  issueId: string;
  authorId: string;
  content: string;
  createdAt: string;
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
export const MOCK_USERS: User[] = [
  { id: 'octocat', name: 'The Octocat' },
  { id: 'forge-dev', name: 'Forge Developer' },
  { id: 'jdoe', name: 'John Doe' },
  { id: 'alice', name: 'Alice Smith' }
];
export const MOCK_REPOS: Repo[] = [
  {
    id: 'r1',
    name: 'forge-git',
    owner: 'forge-dev',
    description: 'A beautiful, minimalist Git collaboration platform built with React and Cloudflare Workers.',
    stars: 1240,
    forks: 89,
    visibility: 'public',
    updatedAt: '2023-10-24T10:00:00Z',
    language: 'TypeScript',
    topics: ['react', 'git', 'cloudflare-workers', 'minimalist']
  },
  {
    id: 'r2',
    name: 'react-shadcn-starter',
    owner: 'forge-dev',
    description: 'Boringly fast starter kit for Shadcn UI projects.',
    stars: 450,
    forks: 12,
    visibility: 'public',
    updatedAt: '2023-10-22T08:30:00Z',
    language: 'JavaScript',
    topics: ['shadcn', 'starter-kit']
  },
  {
    id: 'r3',
    name: 'durable-storage-lib',
    owner: 'forge-dev',
    description: 'Advanced patterns for Cloudflare Durable Objects and SQLite.',
    stars: 892,
    forks: 45,
    visibility: 'public',
    updatedAt: '2023-10-25T12:00:00Z',
    language: 'TypeScript',
    topics: ['cloudflare', 'durable-objects', 'database']
  },
  {
    id: 'r4',
    name: 'minimal-css',
    owner: 'alice',
    description: 'The smallest CSS framework you will ever need.',
    stars: 3200,
    forks: 156,
    visibility: 'public',
    updatedAt: '2023-10-25T15:45:00Z',
    language: 'CSS',
    topics: ['design', 'css', 'minimalism']
  }
];
export const MOCK_ISSUES: Issue[] = [
  {
    id: '1',
    repoId: 'r1',
    title: 'Implement file tree navigation',
    authorId: 'octocat',
    status: 'open',
    createdAt: '2023-10-20T14:20:00Z',
    commentsCount: 3,
    labels: [{ name: 'enhancement', color: 'bg-blue-100 text-blue-700 border-blue-200' }, { name: 'ui', color: 'bg-purple-100 text-purple-700 border-purple-200' }]
  },
  {
    id: '2',
    repoId: 'r1',
    title: 'Fix responsive layout on mobile contribution graph',
    authorId: 'jdoe',
    status: 'closed',
    createdAt: '2023-10-18T09:15:00Z',
    commentsCount: 1,
    labels: [{ name: 'bug', color: 'bg-red-100 text-red-700 border-red-200' }]
  }
];
export const MOCK_COMMENTS: IssueComment[] = [
  {
    id: 'c1',
    issueId: '1',
    authorId: 'octocat',
    content: "I've started working on the breadcrumb component. It should reflect the current URL splat.",
    createdAt: '2023-10-21T10:00:00Z'
  },
  {
    id: 'c2',
    issueId: '1',
    authorId: 'forge-dev',
    content: "Great! Make sure to handle deep nesting. We need to be able to navigate into `src/components/ui` easily.",
    createdAt: '2023-10-21T11:30:00Z'
  },
  {
    id: 'c3',
    issueId: '1',
    authorId: 'alice',
    content: "Don't forget to add a file search shortcut like GitHub's 't' key.",
    createdAt: '2023-10-22T09:15:00Z'
  }
];
export const MOCK_FILE_TREE: FileNode[] = [
  {
    name: 'src',
    type: 'folder',
    path: 'src',
    lastCommitMessage: 'refactor: split layout components',
    lastCommitDate: '2 hours ago',
    children: [
      { 
        name: 'components', 
        type: 'folder', 
        path: 'src/components', 
        lastCommitMessage: 'feat: add issue detail view', 
        lastCommitDate: '3 hours ago',
        children: [
          { name: 'AppSidebar.tsx', type: 'file', path: 'src/components/AppSidebar.tsx', lastCommitMessage: 'initial sidebar', lastCommitDate: '5 days ago', content: 'export default function Sidebar() {}' },
          { name: 'MarkdownViewer.tsx', type: 'file', path: 'src/components/MarkdownViewer.tsx', lastCommitMessage: 'feat: markdown rendering', lastCommitDate: '1 day ago', content: 'export function MarkdownViewer() {}' }
        ]
      },
      { name: 'App.tsx', type: 'file', path: 'src/App.tsx', lastCommitMessage: 'feat: add routing', lastCommitDate: '1 day ago', content: 'export default function App() { return <div>Forge</div> }' },
      { name: 'main.tsx', type: 'file', path: 'src/main.tsx', lastCommitMessage: 'initial commit', lastCommitDate: '5 days ago', content: 'import React from "react";' }
    ]
  },
  {
    name: 'README.md',
    type: 'file',
    path: 'README.md',
    lastCommitMessage: 'docs: update readme instructions',
    lastCommitDate: '10 mins ago',
    content: '# Forge\n\nA beautiful Git UI clone.\n\n## Features\n- Explore repositories\n- Syntax highlighting\n- Profile contribution graph'
  },
  {
    name: 'package.json',
    type: 'file',
    path: 'package.json',
    lastCommitMessage: 'chore: add react-markdown',
    lastCommitDate: '1 hour ago',
    content: '{ "name": "forge" }'
  }
];
export function generateContributionData() {
  const data = [];
  const today = new Date();
  for (let i = 0; i < 364; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    data.push({
      date: date.toISOString().split('T')[0],
      count: Math.floor(Math.random() * 5)
    });
  }
  return data.reverse();
}
export const MOCK_CHATS = [];
export const MOCK_CHAT_MESSAGES = [];