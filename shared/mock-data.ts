import { User, Repository, Issue, PullRequest, ActivityEvent, ContributionDay, FileNode, IssueComment } from './types';
import { subDays, format, startOfYear, eachDayOfInterval, subHours } from 'date-fns';
export const MOCK_USERS: User[] = [
  {
    id: 'u1',
    username: 'shadcn',
    name: 'Shadcn',
    avatar: 'https://github.com/shadcn.png',
    bio: 'Design systems and UI components.',
    location: 'New York, USA',
    website: 'https://shadcn.com',
    followers: 45200,
    following: 120,
    joinedAt: '2020-01-15',
  },
  {
    id: 'u2',
    username: 'madeinlowcode',
    name: 'Forge Creator',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=forge',
    bio: 'Building the future of minimalist dev tools.',
    location: 'Remote',
    followers: 1200,
    following: 300,
    joinedAt: '2021-05-20',
  }
];
export const MOCK_REPOSITORIES: Repository[] = [
  {
    id: 'r1',
    ownerId: 'u1',
    ownerUsername: 'shadcn',
    name: 'ui',
    description: 'Beautifully designed components that you can copy and paste into your apps. Accessible. Customizable. Open Source.',
    stars: 62300,
    forks: 4100,
    language: 'TypeScript',
    visibility: 'public',
    updatedAt: new Date().toISOString(),
    topics: ['react', 'tailwind', 'components', 'ui'],
  },
  {
    id: 'r2',
    ownerId: 'u2',
    ownerUsername: 'madeinlowcode',
    name: 'forge-git',
    description: 'A minimalist Git collaboration platform built for speed and beauty.',
    stars: 890,
    forks: 45,
    language: 'TypeScript',
    visibility: 'public',
    updatedAt: subDays(new Date(), 2).toISOString(),
    topics: ['git', 'minimalist', 'react', 'cloudflare'],
  },
  {
    id: 'r3',
    ownerId: 'u2',
    ownerUsername: 'madeinlowcode',
    name: 'neon-styles',
    description: 'A dark-mode first CSS utility library for cyberpunk aesthetics.',
    stars: 120,
    forks: 12,
    language: 'CSS',
    visibility: 'public',
    updatedAt: subDays(new Date(), 10).toISOString(),
    topics: ['css', 'cyberpunk', 'ui'],
  }
];
export const MOCK_FILE_NODES: Record<string, FileNode[]> = {
  'r2': [
    { id: 'f1', name: 'src', type: 'folder', path: 'src', lastCommitMsg: 'Refactor component structure', lastCommitDate: subDays(new Date(), 1).toISOString() },
    { id: 'f2', name: 'shared', type: 'folder', path: 'shared', lastCommitMsg: 'Add more mock types', lastCommitDate: subDays(new Date(), 2).toISOString() },
    { id: 'f3', name: 'worker', type: 'folder', path: 'worker', lastCommitMsg: 'Fix DO persistence', lastCommitDate: subDays(new Date(), 3).toISOString() },
    { id: 'f4', name: 'package.json', type: 'file', path: 'package.json', lastCommitMsg: 'Bump dependencies', lastCommitDate: subDays(new Date(), 5).toISOString(), content: '{\n  "name": "forge-git",\n  "version": "1.0.0"\n}' },
    { id: 'f5', name: 'README.md', type: 'file', path: 'README.md', lastCommitMsg: 'Initial documentation', lastCommitDate: subDays(new Date(), 10).toISOString(), content: '# Forge\n\nMinimalist Git platform.' }
  ],
  'r2-src': [
    { id: 'f6', name: 'components', type: 'folder', path: 'src/components', lastCommitMsg: 'Add FileBrowser', lastCommitDate: subDays(new Date(), 1).toISOString() },
    { id: 'f7', name: 'main.tsx', type: 'file', path: 'src/main.tsx', lastCommitMsg: 'Setup router', lastCommitDate: subDays(new Date(), 4).toISOString(), content: 'console.log("Hello Forge");' }
  ]
};
export const MOCK_ISSUES: Issue[] = [
  {
    id: 'i1',
    repoId: 'r2',
    number: 1,
    title: 'Implement dynamic file browser',
    authorId: 'u2',
    status: 'open',
    labels: ['feature', 'high-priority'],
    createdAt: subDays(new Date(), 2).toISOString(),
    commentsCount: 3,
    description: 'We need a file browser that can navigate nested directories using React Router splat routes.'
  },
  {
    id: 'i2',
    repoId: 'r2',
    number: 2,
    title: 'Fix mobile responsiveness on contribution grid',
    authorId: 'u1',
    status: 'closed',
    labels: ['bug'],
    createdAt: subDays(new Date(), 5).toISOString(),
    commentsCount: 1,
    description: 'The grid overflows on small screens. Needs a horizontal scroll area.'
  }
];
export const MOCK_PRS: PullRequest[] = [
  {
    id: 'p1',
    repoId: 'r2',
    number: 3,
    title: 'Feat: Add syntax highlighting',
    authorId: 'u2',
    status: 'open',
    createdAt: subDays(new Date(), 1).toISOString(),
    description: 'Integrated `react-syntax-highlighter` for better code reading experience.',
    baseBranch: 'main',
    headBranch: 'feat/syntax-high'
  },
  {
    id: 'p2',
    repoId: 'r2',
    number: 4,
    title: 'Build: Setup Cloudflare Worker',
    authorId: 'u2',
    status: 'merged',
    createdAt: subDays(new Date(), 7).toISOString(),
    mergedAt: subDays(new Date(), 6).toISOString(),
    description: 'Initial backend setup using Hono and Durable Objects.',
    baseBranch: 'main',
    headBranch: 'infra/worker-setup'
  }
];
export const MOCK_COMMENTS: Record<string, IssueComment[]> = {
  'i1': [
    { id: 'c1', authorId: 'u1', body: 'I can help with the routing logic. Should we use `*` or a custom regex?', createdAt: subDays(new Date(), 1).toISOString() },
    { id: 'c2', authorId: 'u2', body: 'Let’s go with `*` for simplicity. React Router 6 handles it well.', createdAt: subHours(new Date(), 12).toISOString() },
    { id: 'c3', authorId: 'u1', body: 'Sounds good. I’ll open a draft PR shortly.', createdAt: subHours(new Date(), 2).toISOString() }
  ],
  'i2': [
    { id: 'c4', authorId: 'u2', body: 'Fixed this by wrapping the grid in a `ScrollArea` component.', createdAt: subDays(new Date(), 4).toISOString() }
  ],
  'p1': [
    { id: 'c5', authorId: 'u1', body: 'The bundle size might increase. Have we checked the impact?', createdAt: subHours(new Date(), 5).toISOString() }
  ]
};
export const MOCK_ACTIVITY: ActivityEvent[] = [
  {
    id: 'e1',
    type: 'push',
    userUsername: 'madeinlowcode',
    repoName: 'forge-git',
    timestamp: new Date().toISOString(),
    payload: { branch: 'main', commits: 3 }
  },
  {
    id: 'e2',
    type: 'star',
    userUsername: 'shadcn',
    repoName: 'forge-git',
    timestamp: subDays(new Date(), 1).toISOString(),
  }
];
export const generateContributionData = (): ContributionDay[] => {
  const end = new Date();
  const start = subDays(end, 365);
  return eachDayOfInterval({ start, end }).map(date => {
    const count = Math.floor(Math.random() * 12);
    let level: 0 | 1 | 2 | 3 | 4 = 0;
    if (count > 8) level = 4;
    else if (count > 5) level = 3;
    else if (count > 2) level = 2;
    else if (count > 0) level = 1;
    return {
      date: format(date, 'yyyy-MM-dd'),
      count,
      level
    };
  });
};