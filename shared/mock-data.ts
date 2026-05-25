import { User, Repository, Issue, PullRequest, ActivityEvent, ContributionDay, FileNode, IssueComment } from './types';
import { subDays, format, eachDayOfInterval, subHours, subMinutes } from 'date-fns';
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
    username: 'automacoescomerciais',
    name: 'Cleudocode Core',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=cleudo',
    bio: 'Developing Cleudocode: The AI that actually does things. Integrated commercial automation experts.',
    location: 'Remote',
    followers: 5800,
    following: 45,
    joinedAt: '2021-05-20',
  }
];
export const MOCK_REPOSITORIES: Repository[] = [
  {
    id: 'r1',
    ownerId: 'u1',
    ownerUsername: 'shadcn',
    name: 'ui',
    description: 'Beautifully designed components for Cleudocode interfaces. Accessible. Customizable. Open Source.',
    stars: 62300,
    forks: 4100,
    language: 'TypeScript',
    visibility: 'public',
    updatedAt: subMinutes(new Date(), 45).toISOString(),
    topics: ['react', 'tailwind', 'cleudocode', 'ui'],
  },
  {
    id: 'r2',
    ownerId: 'u2',
    ownerUsername: 'automacoescomerciais',
    name: 'cleudocode-ai',
    description: 'The core engine behind the most powerful automation and content creation AI on the market.',
    stars: 2540,
    forks: 180,
    language: 'TypeScript',
    visibility: 'public',
    updatedAt: subHours(new Date(), 2).toISOString(),
    topics: ['ai', 'automation', 'automation-comercial', 'typescript'],
  },
  {
    id: 'r3',
    ownerId: 'u2',
    ownerUsername: 'automacoescomerciais',
    name: 'smart-marketing',
    description: 'AI-driven marketing funnel automation for integrated commercial systems.',
    stars: 840,
    forks: 56,
    language: 'Python',
    visibility: 'public',
    updatedAt: subDays(new Date(), 2).toISOString(),
    topics: ['marketing', 'automation', 'python'],
  }
];
export const MOCK_FILE_NODES: Record<string, FileNode[]> = {
  'r2': [
    { id: 'f1', name: 'src', type: 'folder', path: 'src', lastCommitMsg: 'Implement core Cleudocode reasoning engine', lastCommitDate: subDays(new Date(), 1).toISOString() },
    { id: 'f2', name: 'automation', type: 'folder', path: 'automation', lastCommitMsg: 'Add WhatsApp integration hooks', lastCommitDate: subDays(new Date(), 2).toISOString() },
    { id: 'f4', name: 'package.json', type: 'file', path: 'package.json', lastCommitMsg: 'Bump Cleudocode core dependencies', lastCommitDate: subDays(new Date(), 5).toISOString(), content: '{\n  "name": "cleudocode-ai",\n  "version": "2.1.0"\n}' },
    { id: 'f5', name: 'README.md', type: 'file', path: 'README.md', lastCommitMsg: 'Update brand identity to Cleudocode', lastCommitDate: subDays(new Date(), 1).toISOString(), content: '# Cleudocode AI\n\nAdvanced reasoning for complex tasks.\n\n## Getting Started\n\n```bash\nbun install cleudocode\n```\n\n## Features\n\n- Task Orchestration\n- Multi-modal Context' }
  ],
  'r3': [
    { id: 'r3f1', name: 'funnels', type: 'folder', path: 'funnels', lastCommitMsg: 'Add lead scoring algorithm', lastCommitDate: subDays(new Date(), 3).toISOString() },
    { id: 'r3f2', name: 'scripts', type: 'folder', path: 'scripts', lastCommitMsg: 'Data migration utilities', lastCommitDate: subDays(new Date(), 1).toISOString() },
    { id: 'r3f3', name: 'main.py', type: 'file', path: 'main.py', lastCommitMsg: 'Marketing engine entrypoint', lastCommitDate: subDays(new Date(), 1).toISOString(), content: 'print("Smart Marketing v1.0")' },
    { id: 'r3f4', name: 'README.md', type: 'file', path: 'README.md', lastCommitMsg: 'Documentation for funnels', lastCommitDate: subDays(new Date(), 1).toISOString(), content: '# Smart Marketing\n\nAI-powered funnels for modern businesses.' }
  ],
  'r2-src': [
    { id: 'f6', name: 'engine', type: 'folder', path: 'src/engine', lastCommitMsg: 'Improve context handling', lastCommitDate: subDays(new Date(), 1).toISOString() },
    { id: 'f7', name: 'main.ts', type: 'file', path: 'src/main.ts', lastCommitMsg: 'Bootstrapping Cleudocode', lastCommitDate: subDays(new Date(), 4).toISOString(), content: 'console.log("Cleudocode Initialized");' }
  ]
};
export const MOCK_ISSUES: Issue[] = [
  {
    id: 'i1',
    repoId: 'r2',
    number: 1,
    title: 'Cleudocode: Add multi-language support for voice synthesis',
    authorId: 'u2',
    status: 'open',
    labels: ['feature', 'high-priority'],
    createdAt: subDays(new Date(), 2).toISOString(),
    commentsCount: 3,
    description: 'Enable voice synthesis in Portuguese, Spanish and English for automated content agents.'
  },
  {
    id: 'i2',
    repoId: 'r2',
    number: 2,
    title: 'Fix: Token limit overflow on deep automation chains',
    authorId: 'u1',
    status: 'closed',
    labels: ['bug'],
    createdAt: subDays(new Date(), 5).toISOString(),
    commentsCount: 1,
    description: 'Deep nested automation chains were hitting the context window limit.'
  },
  {
    id: 'i3',
    repoId: 'r3',
    number: 1,
    title: 'Optimize lead scoring latency',
    authorId: 'u2',
    status: 'open',
    labels: ['performance'],
    createdAt: subDays(new Date(), 1).toISOString(),
    commentsCount: 0,
    description: 'Lead scoring takes too long on high-volume days.'
  }
];
export const MOCK_PRS: PullRequest[] = [
  {
    id: 'p1',
    repoId: 'r2',
    number: 3,
    title: 'Feat: Cleudocode Visual Identity Rebranding',
    authorId: 'u2',
    status: 'open',
    createdAt: subDays(new Date(), 1).toISOString(),
    description: 'Switching all platform references to the new Cleudocode brand.',
    baseBranch: 'main',
    headBranch: 'feat/rebrand-cleudo'
  },
  {
    id: 'p2',
    repoId: 'r3',
    number: 2,
    title: 'Draft: New ML Pipeline for Attribution',
    authorId: 'u2',
    status: 'open',
    createdAt: subHours(new Date(), 5).toISOString(),
    description: 'Experimental attribution modeling.',
    baseBranch: 'main',
    headBranch: 'ml/attribution'
  }
];
export const MOCK_COMMENTS: Record<string, IssueComment[]> = {
  'i1': [
    { id: 'c1', authorId: 'u1', body: 'The Brazilian Portuguese model is ready for testing.', createdAt: subDays(new Date(), 1).toISOString() },
    { id: 'c2', authorId: 'u2', body: 'Excellent. Please merge the PR into the experimental branch.', createdAt: subHours(new Date(), 12).toISOString() }
  ]
};
export const MOCK_ACTIVITY: ActivityEvent[] = [
  {
    id: 'e1',
    type: 'push',
    userUsername: 'automacoescomerciais',
    repoName: 'cleudocode-ai',
    timestamp: subMinutes(new Date(), 15).toISOString(),
    payload: { branch: 'main', commits: 5 }
  },
  {
    id: 'e2',
    type: 'star',
    userUsername: 'shadcn',
    repoName: 'cleudocode-ai',
    timestamp: subHours(new Date(), 3).toISOString(),
  },
  {
    id: 'e3',
    type: 'push',
    userUsername: 'automacoescomerciais',
    repoName: 'smart-marketing',
    timestamp: subHours(new Date(), 8).toISOString(),
    payload: { branch: 'main', commits: 2 }
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