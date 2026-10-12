import { User, Repository, Issue, PullRequest, ActivityEvent, ContributionDay, FileNode, IssueComment } from './types';
import { subDays, format, eachDayOfInterval, subHours, subMinutes } from 'date-fns';
export const MOCK_USERS: User[] = [
  {
    id: 'u1',
    username: 'shadcn',
    name: 'Shadcn',
    avatar: 'https://github.com/shadcn.png',
    bio: 'Sistemas de design e componentes de interface.',
    location: 'Nova York, EUA',
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
    bio: 'Desenvolvendo o Cleudocode: A IA que realmente faz as coisas. Especialistas em automação comercial integrada.',
    location: 'Remoto',
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
    description: 'Componentes lindamente projetados para interfaces Cleudocode. Acessível. Customizável. Código Aberto.',
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
    description: 'O motor principal por trás da IA de automação e criação de conteúdo mais poderosa do mercado.',
    stars: 2540,
    forks: 180,
    language: 'TypeScript',
    visibility: 'public',
    updatedAt: subHours(new Date(), 2).toISOString(),
    topics: ['ai', 'automacao', 'automacao-comercial', 'typescript'],
  },
  {
    id: 'r3',
    ownerId: 'u2',
    ownerUsername: 'automacoescomerciais',
    name: 'smart-marketing',
    description: 'Automação de funil de marketing baseada em IA para sistemas comerciais integrados.',
    stars: 840,
    forks: 56,
    language: 'Python',
    visibility: 'public',
    updatedAt: subDays(new Date(), 2).toISOString(),
    topics: ['marketing', 'automacao', 'python'],
  }
];
export const MOCK_FILE_NODES: Record<string, FileNode[]> = {
  'r2': [
    { id: 'f1', name: 'src', type: 'folder', path: 'src', lastCommitMsg: 'Implementação do motor de raciocínio principal do Cleudocode', lastCommitDate: subDays(new Date(), 1).toISOString() },
    { id: 'f2', name: 'automation', type: 'folder', path: 'automation', lastCommitMsg: 'Adição de ganchos de integração com WhatsApp', lastCommitDate: subDays(new Date(), 2).toISOString() },
    { id: 'f4', name: 'package.json', type: 'file', path: 'package.json', lastCommitMsg: 'Atualização de dependências principais do Cleudocode', lastCommitDate: subDays(new Date(), 5).toISOString(), content: '{\n  "name": "cleudocode-ai",\n  "version": "2.1.0"\n}' },
    { id: 'f5', name: 'README.md', type: 'file', path: 'README.md', lastCommitMsg: 'Atualização da identidade visual para Cleudocode', lastCommitDate: subDays(new Date(), 1).toISOString(), content: '# Cleudocode AI\n\nRaciocínio avançado para tarefas complexas.\n\n## Começando\n\n```bash\nbun install cleudocode\n```\n\n## Funcionalidades\n\n- Orquestração de Tarefas\n- Contexto Multi-modal' }
  ],
  'r3': [
    { id: 'r3f1', name: 'funnels', type: 'folder', path: 'funnels', lastCommitMsg: 'Adição de algoritmo de pontuação de leads', lastCommitDate: subDays(new Date(), 3).toISOString() },
    { id: 'r3f2', name: 'scripts', type: 'folder', path: 'scripts', lastCommitMsg: 'Utilitários de migração de dados', lastCommitDate: subDays(new Date(), 1).toISOString() },
    { id: 'r3f3', name: 'main.py', type: 'file', path: 'main.py', lastCommitMsg: 'Ponto de entrada do motor de marketing', lastCommitDate: subDays(new Date(), 1).toISOString(), content: 'print("Smart Marketing v1.0")' },
    { id: 'r3f4', name: 'README.md', type: 'file', path: 'README.md', lastCommitMsg: 'Documentação para funis', lastCommitDate: subDays(new Date(), 1).toISOString(), content: '# Smart Marketing\n\nFunis movidos a IA para empresas modernas.' }
  ],
  'r2-src': [
    { id: 'f6', name: 'engine', type: 'folder', path: 'src/engine', lastCommitMsg: 'Melhoria no manuseio de contexto', lastCommitDate: subDays(new Date(), 1).toISOString() },
    { id: 'f7', name: 'main.ts', type: 'file', path: 'src/main.ts', lastCommitMsg: 'Inicialização do Cleudocode', lastCommitDate: subDays(new Date(), 4).toISOString(), content: 'console.log("Cleudocode Inicializado");' }
  ]
};
export const MOCK_ISSUES: Issue[] = [
  {
    id: 'i1',
    repoId: 'r2',
    number: 1,
    title: 'Cleudocode: Adicionar suporte multi-idioma para síntese de voz',
    authorId: 'u2',
    status: 'open',
    labels: ['funcionalidade', 'alta-prioridade'],
    createdAt: subDays(new Date(), 2).toISOString(),
    commentsCount: 3,
    description: 'Habilitar síntese de voz em Português, Espanhol e Inglês para agentes de conteúdo automatizados.'
  },
  {
    id: 'i2',
    repoId: 'r2',
    number: 2,
    title: 'Correção: Estouro do limite de tokens em cadeias de automação profundas',
    authorId: 'u1',
    status: 'closed',
    labels: ['erro'],
    createdAt: subDays(new Date(), 5).toISOString(),
    commentsCount: 1,
    description: 'Cadeias de automação aninhadas estavam atingindo o limite da janela de contexto.'
  },
  {
    id: 'i3',
    repoId: 'r3',
    number: 1,
    title: 'Otimizar latência da pontuação de leads',
    authorId: 'u2',
    status: 'open',
    labels: ['performance'],
    createdAt: subDays(new Date(), 1).toISOString(),
    commentsCount: 0,
    description: 'A pontuação de leads está demorando muito em dias de alto volume.'
  }
];
export const MOCK_PRS: PullRequest[] = [
  {
    id: 'p1',
    repoId: 'r2',
    number: 3,
    title: 'Func: Rebranding da Identidade Visual Cleudocode',
    authorId: 'u2',
    status: 'open',
    createdAt: subDays(new Date(), 1).toISOString(),
    description: 'Alterando todas as referências da plataforma para a nova marca Cleudocode.',
    baseBranch: 'main',
    headBranch: 'feat/rebrand-cleudo'
  },
  {
    id: 'p2',
    repoId: 'r3',
    number: 2,
    title: 'Rascunho: Nova Pipeline de ML para Atribuição',
    authorId: 'u2',
    status: 'open',
    createdAt: subHours(new Date(), 5).toISOString(),
    description: 'Modelagem de atribuição experimental.',
    baseBranch: 'main',
    headBranch: 'ml/atribuicao'
  }
];
export const MOCK_COMMENTS: Record<string, IssueComment[]> = {
  'i1': [
    { id: 'c1', authorId: 'u1', body: 'O modelo de Português Brasileiro está pronto para testes.', createdAt: subDays(new Date(), 1).toISOString() },
    { id: 'c2', authorId: 'u2', body: 'Excelente. Por favor, mescle o PR no ramo experimental.', createdAt: subHours(new Date(), 12).toISOString() }
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