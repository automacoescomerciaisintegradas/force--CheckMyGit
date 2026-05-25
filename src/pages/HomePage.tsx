import React from 'react';
import { Link } from 'react-router-dom';
import { Star, GitFork, BookOpen, TrendingUp, History } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MOCK_REPOS } from '@shared/mock-data';
export function HomePage() {
  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Feed */}
          <div className="lg:col-span-8 space-y-8">
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <History className="w-5 h-5 text-muted-foreground" />
                  Recent Activity
                </h2>
              </div>
              <div className="space-y-4">
                {MOCK_REPOS.map((repo) => (
                  <Card key={repo.id} className="hover:border-primary/50 transition-colors">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <Link to={`/${repo.owner}/${repo.name}`} className="text-lg font-bold text-blue-600 dark:text-blue-400 hover:underline">
                            {repo.owner} / {repo.name}
                          </Link>
                          <CardDescription className="mt-1">{repo.description}</CardDescription>
                        </div>
                        <Badge variant="outline" className="capitalize">{repo.visibility}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 rounded-full bg-blue-500" />
                          {repo.language}
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          {repo.stars.toLocaleString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <GitFork className="w-3 h-3" />
                          {repo.forks.toLocaleString()}
                        </div>
                        <div>Updated {new Date(repo.updatedAt).toLocaleDateString()}</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>
          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <section>
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-muted-foreground" />
                Trending Topics
              </h3>
              <div className="flex flex-wrap gap-2">
                {['React', 'TypeScript', 'Cloudflare', 'Durable Objects', 'Vite', 'TailwindCSS'].map(tag => (
                  <Badge key={tag} variant="secondary" className="hover:bg-accent cursor-pointer">
                    {tag}
                  </Badge>
                ))}
              </div>
            </section>
            <section className="bg-muted/30 p-4 rounded-lg border">
              <h3 className="font-semibold mb-2 flex items-center gap-2 text-sm">
                <BookOpen className="w-4 h-4 text-muted-foreground" />
                Forge Guides
              </h3>
              <p className="text-xs text-muted-foreground mb-4">
                Learn how to master Git collaboration with our curated guides.
              </p>
              <ul className="space-y-2 text-xs">
                <li><a href="#" className="text-blue-600 hover:underline">Getting started with Forge</a></li>
                <li><a href="#" className="text-blue-600 hover:underline">Managing Large Repositories</a></li>
                <li><a href="#" className="text-blue-600 hover:underline">Advanced Pull Request workflows</a></li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}