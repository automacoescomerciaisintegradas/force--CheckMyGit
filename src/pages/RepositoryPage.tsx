import React from 'react';
import { useParams, Link, Outlet, useLocation } from 'react-router-dom';
import {
  Star,
  GitFork,
  Code,
  CircleDot,
  GitPullRequest,
  BookOpen,
  Eye,
  AlertTriangle
} from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MOCK_REPOSITORIES } from '@shared/mock-data';
export function RepositoryPage() {
  const { username, reponame } = useParams();
  const location = useLocation();
  const repo = MOCK_REPOSITORIES.find(
    r => r.name === reponame && r.ownerUsername === username
  );
  if (!repo) {
    return (
      <AppLayout>
        <div className="container max-w-7xl mx-auto px-4 py-32 text-center space-y-6">
          <AlertTriangle className="h-14 w-14 text-zinc-200 mx-auto" />
          <h1 className="text-3xl font-bold tracking-tight text-zinc-950">Repositório não encontrado</h1>
          <p className="text-zinc-400 font-medium">O projeto {username}/{reponame} não está disponível em nossa rede.</p>
          <Button asChild variant="outline" className="mt-6 rounded-2xl h-12 px-8 border-zinc-100 font-bold">
            <Link to="/">Voltar ao Início</Link>
          </Button>
        </div>
      </AppLayout>
    );
  }
  const pathParts = location.pathname.split('/');
  const isIssues = pathParts.includes('issues');
  const isPulls = pathParts.includes('pulls') || pathParts.includes('pull');
  const currentTab = isIssues ? 'issues' : isPulls ? 'pulls' : 'code';
  return (
    <AppLayout>
      <div className="bg-white border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-0">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
            <div className="flex items-center gap-5 flex-wrap">
              <div className="p-2.5 bg-zinc-50 rounded-2xl border border-zinc-100 shadow-ultra-sm">
                <BookOpen className="h-5 w-5 text-zinc-400" />
              </div>
              <div className="flex items-center text-2xl tracking-[-0.02em]">
                <Link to={`/${repo.ownerUsername}`} className="text-zinc-400 hover:text-zinc-950 transition-colors font-medium">
                  {repo.ownerUsername}
                </Link>
                <span className="mx-2 text-zinc-200">/</span>
                <Link to={`/${repo.ownerUsername}/${repo.name}`} className="text-zinc-950 font-bold">
                  {repo.name}
                </Link>
              </div>
              <Badge variant="outline" className="rounded-full text-[10px] font-bold uppercase tracking-widest border-zinc-100 bg-zinc-50/50 text-zinc-400 px-3 py-0.5">
                {repo.visibility === 'public' ? 'Público' : 'Privado'}
              </Badge>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="h-10 px-5 rounded-2xl border-zinc-100 text-[12px] font-bold bg-white hover:bg-zinc-50 text-zinc-500 shadow-ultra-sm transition-all">
                <Eye className="h-3.5 w-3.5 mr-2 text-zinc-300" /> Seguir
                <span className="ml-2.5 pl-2.5 border-l border-zinc-100 text-zinc-300">1.2k</span>
              </Button>
              <Button variant="outline" size="sm" className="h-10 px-5 rounded-2xl border-zinc-100 text-[12px] font-bold bg-white hover:bg-zinc-50 text-zinc-500 shadow-ultra-sm transition-all">
                <GitFork className="h-3.5 w-3.5 mr-2 text-zinc-300" /> Bifurcar
                <span className="ml-2.5 pl-2.5 border-l border-zinc-100 text-zinc-300">{repo.forks}</span>
              </Button>
              <Button variant="outline" size="sm" className="h-10 px-5 rounded-2xl border-zinc-200 text-[12px] font-bold bg-white hover:bg-zinc-50 text-zinc-900 shadow-ultra-sm transition-all">
                <Star className="h-3.5 w-3.5 mr-2 text-zinc-400" /> Favoritar
                <span className="ml-2.5 pl-2.5 border-l border-zinc-100 text-zinc-300">{repo.stars}</span>
              </Button>
            </div>
          </div>
          <nav className="flex items-center gap-10 text-[13px] font-bold uppercase tracking-[0.15em]">
            <Link
              to={`/${username}/${reponame}`}
              className={`pb-4 border-b transition-all flex items-center gap-2.5 ${currentTab === 'code' ? 'border-zinc-950 text-zinc-950' : 'border-transparent text-zinc-300 hover:text-zinc-500'}`}
            >
              <Code className="h-4 w-4" /> Código
            </Link>
            <Link
              to={`/${username}/${reponame}/issues`}
              className={`pb-4 border-b transition-all flex items-center gap-2.5 ${currentTab === 'issues' ? 'border-zinc-950 text-zinc-950' : 'border-transparent text-zinc-300 hover:text-zinc-500'}`}
            >
              <CircleDot className="h-4 w-4" /> Problemas
              <span className="text-[10px] font-bold opacity-60">12</span>
            </Link>
            <Link
              to={`/${username}/${reponame}/pulls`}
              className={`pb-4 border-b transition-all flex items-center gap-2.5 ${currentTab === 'pulls' ? 'border-zinc-950 text-zinc-950' : 'border-transparent text-zinc-300 hover:text-zinc-500'}`}
            >
              <GitPullRequest className="h-4 w-4" /> Solicitações
              <span className="text-[10px] font-bold opacity-60">3</span>
            </Link>
          </nav>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Outlet context={{ repoId: repo.id }} />
      </div>
    </AppLayout>
  );
}