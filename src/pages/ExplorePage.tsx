import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, GitFork, Search, TrendingUp, Filter, RefreshCw, Plus } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { api } from '@/lib/api-client';
import type { Repo } from '@shared/types';
export function ExplorePage() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ['repos'],
    queryFn: () => api<{ items: Repo[] }>('/api/repos'),
  });
  const repos = data?.items ?? [];
  const filteredRepos = repos.filter(repo =>
    repo.name.toLowerCase().includes(search.toLowerCase()) ||
    repo.description.toLowerCase().includes(search.toLowerCase()) ||
    repo.topics.some(t => t.toLowerCase().includes(search.toLowerCase()))
  );
  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 lg:py-12">
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Explore</h1>
              <p className="text-muted-foreground mt-1">Discover trending repositories and open source projects.</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search repositories..."
                  className="pl-9"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon" onClick={() => refetch()} disabled={isFetching}>
                <RefreshCw className={cn("w-4 h-4", isFetching && "animate-spin")} />
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" /> New
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="flex flex-col h-48">
                  <CardHeader><Skeleton className="h-6 w-3/4" /><Skeleton className="h-4 w-1/2 mt-2" /></CardHeader>
                  <CardContent className="mt-auto"><Skeleton className="h-4 w-full" /></CardContent>
                </Card>
              ))
            ) : filteredRepos.length > 0 ? filteredRepos.map((repo) => (
              <Card key={repo.id} className="flex flex-col hover:border-primary/40 transition-all group">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <Link to={`/${repo.owner}/${repo.name}`} className="group-hover:text-blue-600 transition-colors">
                      <CardTitle className="text-lg font-bold">{repo.owner} / {repo.name}</CardTitle>
                    </Link>
                    <Badge variant="outline" className="text-[10px] font-mono">{repo.language}</Badge>
                  </div>
                  <CardDescription className="line-clamp-2 mt-2 h-10">{repo.description}</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5" />
                        {repo.stars.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork className="w-3.5 h-3.5" />
                        {repo.forks.toLocaleString()}
                      </span>
                    </div>
                    <span>Updated {new Date(repo.updatedAt).toLocaleDateString()}</span>
                  </div>
                </CardContent>
              </Card>
            )) : (
              <div className="col-span-full py-20 text-center text-muted-foreground">
                <TrendingUp className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p>No repositories found matching your search.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}