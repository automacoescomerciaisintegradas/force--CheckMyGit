import React from 'react';
import { useParams, Outlet, Link, useLocation } from 'react-router-dom';
import { Code, CircleDot, GitPullRequest, Activity, Star, GitFork, Eye, Lock, Globe } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MOCK_REPOS } from '@shared/mock-data';
import { cn } from '@/lib/utils';
export function RepoLayout() {
  const { username, repo: repoName } = useParams();
  const location = useLocation();
  const repo = MOCK_REPOS.find(r => r.name === repoName && r.owner === username) || MOCK_REPOS[0];
  const tabs = [
    { label: 'Code', icon: Code, path: `/${username}/${repoName}` },
    { label: 'Issues', icon: CircleDot, path: `/${username}/${repoName}/issues`, count: 12 },
    { label: 'Pull requests', icon: GitPullRequest, path: `/${username}/${repoName}/pulls`, count: 4 },
    { label: 'Actions', icon: Activity, path: `/${username}/${repoName}/actions` },
  ];
  const isTabActive = (path: string) => {
    if (path.endsWith('/issues')) return location.pathname.includes('/issues');
    if (path.endsWith('/pulls')) return location.pathname.includes('/pulls');
    if (path.endsWith('/actions')) return location.pathname.includes('/actions');
    // Default to Code tab for nested tree/blob paths
    return location.pathname === path || location.pathname.includes('/tree/') || location.pathname.includes('/blob/');
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
              <Button variant="outline" size="sm" className="h-7 text-xs bg-muted/50">
                <Star className="w-3.5 h-3.5 mr-1.5" /> Star <Badge variant="secondary" className="ml-1.5 px-1 py-0 h-4 text-[10px]">{repo.stars}</Badge>
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
                {tab.count !== undefined && (
                  <Badge variant="secondary" className="rounded-full px-1.5 py-0 h-4 text-[10px]">
                    {tab.count}
                  </Badge>
                )}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
      </div>
    </AppLayout>
  );
}