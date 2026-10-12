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
        <div className="max-w-7xl mx-auto px-4 py-32 text-center space-y-6">
          <AlertTriangle className="h-14 w-14 text-muted-foreground/20 mx-auto" />
          <h1 className="text-3xl font-bold tracking-tight">Repositório não encontrado</h1>
          <p className="text-muted-foreground font-medium">O projeto {username}/{reponame} não está disponível em nossa rede.</p>
          <Button asChild variant="outline" className="mt-6 rounded-2xl h-12 px-8 border-border font-bold">
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
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12 pb-0">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8 mb-8 md:mb-12">
            <div className="flex items-center gap-4 md:gap-5 flex-wrap">
              <div className="p-2.5 bg-secondary rounded-2xl border border-border shadow-ultra-sm">
                <BookOpen className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex items-center text-xl md:text-2xl tracking-[-0.02em]">
                <Link to={`/${repo.ownerUsername}`} className="text-muted-foreground hover:text-foreground transition-colors font-medium">
                  {repo.ownerUsername}
                </Link>
                <span className="mx-2 text-border">/</span>
                <Link to={`/${repo.ownerUsername}/${repo.name}`} className="font-bold">
                  {repo.name}
                </Link>
              </div>
              <Badge variant="outline" className="rounded-full text-[10px] font-bold uppercase tracking-widest border-border bg-secondary/50 text-muted-foreground px-3 py-0.5">
                {repo.visibility === 'public' ? 'Público' : 'Privado'}
              </Badge>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
              <Button variant="outline" size="sm" className="h-10 px-4 md:px-5 rounded-xl border-border text-[11px] md:text-[12px] font-bold bg-background hover:bg-secondary text-muted-foreground shadow-ultra-sm transition-all whitespace-nowrap">
                <Eye className="h-3.5 w-3.5 mr-2 text-muted-foreground/50" /> Seguir
                <span className="ml-2.5 pl-2.5 border-l border-border text-muted-foreground/30">1.2k</span>
              </Button>
              <Button variant="outline" size="sm" className="h-10 px-4 md:px-5 rounded-xl border-border text-[11px] md:text-[12px] font-bold bg-background hover:bg-secondary text-muted-foreground shadow-ultra-sm transition-all whitespace-nowrap">
                <GitFork className="h-3.5 w-3.5 mr-2 text-muted-foreground/50" /> Bifurcar
                <span className="ml-2.5 pl-2.5 border-l border-border text-muted-foreground/30">{repo.forks}</span>
              </Button>
              <Button variant="outline" size="sm" className="h-10 px-4 md:px-5 rounded-xl border-border text-[11px] md:text-[12px] font-bold bg-background hover:bg-secondary text-foreground shadow-ultra-sm transition-all whitespace-nowrap">
                <Star className="h-3.5 w-3.5 mr-2 text-muted-foreground/50" /> Favoritar
                <span className="ml-2.5 pl-2.5 border-l border-border text-muted-foreground/30">{repo.stars}</span>
              </Button>
            </div>
          </div>
          <nav className="flex items-center gap-6 md:gap-10 text-[11px] md:text-[13px] font-bold uppercase tracking-[0.15em] overflow-x-auto scrollbar-hide">
            <Link
              to={`/${username}/${reponame}`}
              className={`pb-4 border-b-2 transition-all flex items-center gap-2.5 whitespace-nowrap ${currentTab === 'code' ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground/40 hover:text-muted-foreground'}`}
            >
              <Code className="h-4 w-4" /> Código
            </Link>
            <Link
              to={`/${username}/${reponame}/issues`}
              className={`pb-4 border-b-2 transition-all flex items-center gap-2.5 whitespace-nowrap ${currentTab === 'issues' ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground/40 hover:text-muted-foreground'}`}
            >
              <CircleDot className="h-4 w-4" /> Problemas
              <span className="text-[10px] font-bold opacity-60">12</span>
            </Link>
            <Link
              to={`/${username}/${reponame}/pulls`}
              className={`pb-4 border-b-2 transition-all flex items-center gap-2.5 whitespace-nowrap ${currentTab === 'pulls' ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground/40 hover:text-muted-foreground'}`}
            >
              <GitPullRequest className="h-4 w-4" /> Solicitações
              <span className="text-[10px] font-bold opacity-60">3</span>
            </Link>
          </nav>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <Outlet context={{ repoId: repo.id }} />
      </div>
    </AppLayout>
  );
}