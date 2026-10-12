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
        <div className="container max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
          <AlertTriangle className="h-12 w-12 text-destructive/50 mx-auto" />
          <h1 className="text-2xl font-bold tracking-tight">Repositório Não Encontrado</h1>
          <p className="text-muted-foreground">O repositório {username}/{reponame} não está disponível.</p>
          <Button asChild variant="outline" className="mt-4 rounded-xl">
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-0">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="p-2 bg-zinc-50 rounded-xl border border-zinc-100">
                <BookOpen className="h-5 w-5 text-zinc-400" />
              </div>
              <div className="flex items-center text-xl tracking-tight">
                <Link to={`/${repo.ownerUsername}`} className="text-zinc-500 hover:text-zinc-900 transition-colors">
                  {repo.ownerUsername}
                </Link>
                <span className="mx-1 text-zinc-300">/</span>
                <Link to={`/${repo.ownerUsername}/${repo.name}`} className="text-zinc-900 font-bold hover:underline">
                  {repo.name}
                </Link>
              </div>
              <Badge variant="outline" className="rounded-full text-[10px] font-medium border-zinc-200 text-zinc-500 px-2.5">
                {repo.visibility === 'public' ? 'Público' : 'Privado'}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-9 px-4 rounded-xl border-zinc-200 text-xs font-medium bg-white hover:bg-zinc-50">
                <Eye className="h-3.5 w-3.5 mr-2 text-zinc-400" /> Seguir
                <span className="ml-2 pl-2 border-l border-zinc-200 text-zinc-400">1.2k</span>
              </Button>
              <Button variant="outline" size="sm" className="h-9 px-4 rounded-xl border-zinc-200 text-xs font-medium bg-white hover:bg-zinc-50">
                <GitFork className="h-3.5 w-3.5 mr-2 text-zinc-400" /> Bifurcar
                <span className="ml-2 pl-2 border-l border-zinc-200 text-zinc-400">{repo.forks}</span>
              </Button>
              <Button variant="outline" size="sm" className="h-9 px-4 rounded-xl border-zinc-200 text-xs font-medium bg-white hover:bg-zinc-50 shadow-sm">
                <Star className="h-3.5 w-3.5 mr-2 text-zinc-400" /> Favoritar
                <span className="ml-2 pl-2 border-l border-zinc-200 text-zinc-400">{repo.stars}</span>
              </Button>
            </div>
          </div>
          <nav className="flex items-center gap-8 text-sm font-medium">
            <Link 
              to={`/${username}/${reponame}`} 
              className={`pb-4 border-b-2 transition-all ${currentTab === 'code' ? 'border-zinc-900 text-zinc-900' : 'border-transparent text-zinc-400 hover:text-zinc-600'}`}
            >
              <span className="flex items-center gap-2">
                <Code className="h-4 w-4" /> Código
              </span>
            </Link>
            <Link 
              to={`/${username}/${reponame}/issues`} 
              className={`pb-4 border-b-2 transition-all ${currentTab === 'issues' ? 'border-zinc-900 text-zinc-900' : 'border-transparent text-zinc-400 hover:text-zinc-600'}`}
            >
              <span className="flex items-center gap-2">
                <CircleDot className="h-4 w-4" /> Problemas
                <Badge variant="secondary" className="px-1.5 py-0 text-[10px] bg-zinc-100 text-zinc-500 font-normal">12</Badge>
              </span>
            </Link>
            <Link 
              to={`/${username}/${reponame}/pulls`} 
              className={`pb-4 border-b-2 transition-all ${currentTab === 'pulls' ? 'border-zinc-900 text-zinc-900' : 'border-transparent text-zinc-400 hover:text-zinc-600'}`}
            >
              <span className="flex items-center gap-2">
                <GitPullRequest className="h-4 w-4" /> Solicitações
                <Badge variant="secondary" className="px-1.5 py-0 text-[10px] bg-zinc-100 text-zinc-500 font-normal">3</Badge>
              </span>
            </Link>
          </nav>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Outlet context={{ repoId: repo.id }} />
      </div>
    </AppLayout>
  );
}