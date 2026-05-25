import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, GitFork, Search, TrendingUp, Filter } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MOCK_REPOS } from '@shared/mock-data';
export function ExplorePage() {
  const [search, setSearch] = useState('');
  const filteredRepos = MOCK_REPOS.filter(repo => 
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
              <Button variant="outline" size="icon">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {['TypeScript', 'React', 'Cloudflare', 'Rust', 'WebAssembly', 'Python', 'AI'].map(tag => (
              <Badge 
                key={tag} 
                variant="secondary" 
                className="px-3 py-1 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                onClick={() => setSearch(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRepos.length > 0 ? filteredRepos.map((repo) => (
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
                  <div className="flex flex-wrap gap-1 mb-4">
                    {repo.topics.slice(0, 3).map(topic => (
                      <Badge key={topic} variant="secondary" className="text-[10px] bg-muted/50 border-none">
                        {topic}
                      </Badge>
                    ))}
                  </div>
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