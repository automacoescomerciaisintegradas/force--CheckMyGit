import React from 'react';
import { useParams, Outlet, Link, useLocation } from 'react-router-dom';
import { Code, CircleDot, GitPullRequest, Activity, Star, GitFork, Eye, Lock, Globe, Loader2 } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { api } from '@/lib/api-client';
import { cn } from '@/lib/utils';
import type { Repo } from '@shared/types';
export function RepoLayout() {
  const { username, repo: repoName } = useParams();
  const location = useLocation();
  const queryClient = useQueryClient();
  const { data: repo, isLoading } = useQuery({
    queryKey: ['repo', username, repoName],
    queryFn: () => api<Repo>(`/api/repos/${username}/${repoName}`),
  });
  const starMutation = useMutation({
    mutationFn: () => api<Repo>(`/api/repos/${repo?.id}/star`, { method: 'POST' }),
    onSuccess: (updatedRepo) => {
      queryClient.setQueryData(['repo', username, repoName], updatedRepo);
    }
  });
  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </div>
      </AppLayout>
    );
  }
  if (!repo) return <AppLayout>Repository not found</AppLayout>;
  const tabs = [
    { label: 'Code', icon: Code, path: `/${username}/${repoName}` },
    { label: 'Issues', icon: CircleDot, path: `/${username}/${repoName}/issues` },
    { label: 'Pull requests', icon: GitPullRequest, path: `/${username}/${repoName}/pulls` },
    { label: 'Actions', icon: Activity, path: `/${username}/${repoName}/actions` },
  ];
  const isTabActive = (path: string) => {
    if (path === `/${username}/${repoName}`) {
       return location.pathname === path || location.pathname.includes('/tree/') || location.pathname.includes('/blob/');
    }
    return location.pathname.startsWith(path);
  };
  return (
    <AppLayout>
      <div className="bg-muted/30 pt-8 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2 flex-wrap">
              {repo.visibility === 'public' ? <Globe className="w-4 h-4 text-muted-foreground" /> : <Lock className="w-4 h-4 text-muted-foreground" />}
              <div className="flex items-center text-lg md:text-xl font-medium">
                <Link to={`/${repo.owner}`} className="text-blue-600 hover:underline">{repo.owner}</Link>
                <span className="mx-1 text-muted-foreground">/</span>
                <Link to={`/${repo.owner}/${repo.name}`} className="font-bold text-blue-600 hover:underline">{repo.name}</Link>
              </div>
              <Badge variant="outline" className="text-xs rounded-full px-2 py-0 h-5 lowercase">{repo.visibility}</Badge>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-7 text-xs bg-muted/50">
                <Eye className="w-3.5 h-3.5 mr-1.5" /> Watch <Badge variant="secondary" className="ml-1.5 px-1 py-0 h-4 text-[10px]">42</Badge>
              </Button>
              <Button variant="outline" size="sm" className="h-7 text-xs bg-muted/50">
                <GitFork className="w-3.5 h-3.5 mr-1.5" /> Fork <Badge variant="secondary" className="ml-1.5 px-1 py-0 h-4 text-[10px]">{repo.forks}</Badge>
              </Button>
              <Button 
                variant={repo.isStarred ? "secondary" : "outline"} 
                size="sm" 
                className={cn("h-7 text-xs", repo.isStarred ? "bg-accent" : "bg-muted/50")}
                onClick={() => starMutation.mutate()}
                disabled={starMutation.isPending}
              >
                <Star className={cn("w-3.5 h-3.5 mr-1.5", repo.isStarred && "fill-yellow-400 text-yellow-400")} /> 
                {repo.isStarred ? "Starred" : "Star"} 
                <Badge variant="secondary" className="ml-1.5 px-1 py-0 h-4 text-[10px]">{repo.stars}</Badge>
              </Button>
            </div>
          </div>
          <nav className="flex gap-1 overflow-x-auto no-scrollbar">
            {tabs.map(tab => (
              <Link
                key={tab.label}
                to={tab.path}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 border-b-2 text-sm transition-colors whitespace-nowrap",
                  isTabActive(tab.path)
                    ? "border-orange-500 font-semibold text-foreground"
                    : "border-transparent text-muted-foreground hover:bg-muted/50 hover:border-muted"
                )}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Outlet context={{ repo }} />
      </div>
    </AppLayout>
  );
}