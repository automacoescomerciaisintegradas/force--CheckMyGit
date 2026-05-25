import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, GitFork, BookOpen, TrendingUp, Clock } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MOCK_REPOSITORIES, MOCK_ACTIVITY } from '@shared/mock-data';
import { formatDistanceToNow } from 'date-fns';
export function HomePage() {
  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-8">
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Trending Repositories
                </h2>
                <Link to="/trending" className="text-sm text-primary hover:underline font-medium">View all</Link>
              </div>
              <div className="grid gap-4">
                {MOCK_REPOSITORIES.map((repo, idx) => (
                  <motion.div
                    key={repo.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Card className="hover:border-primary/40 transition-colors bg-card/50">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <CardTitle className="text-xl">
                              <Link to={`/${repo.ownerUsername}/${repo.name}`} className="text-primary hover:underline">
                                {repo.ownerUsername} / {repo.name}
                              </Link>
                            </CardTitle>
                            <CardDescription className="text-sm line-clamp-2 max-w-xl">
                              {repo.description}
                            </CardDescription>
                          </div>
                          <Badge variant="outline" className="font-mono text-xs uppercase tracking-wider">
                            {repo.visibility}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1.5">
                            <span className="w-3 h-3 rounded-full bg-blue-500" />
                            <span>{repo.language}</span>
                          </div>
                          <div className="flex items-center gap-1 hover:text-foreground cursor-pointer transition-colors">
                            <Star className="h-4 w-4" />
                            <span>{repo.stars.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-1 hover:text-foreground cursor-pointer transition-colors">
                            <GitFork className="h-4 w-4" />
                            <span>{repo.forks.toLocaleString()}</span>
                          </div>
                          <div className="ml-auto hidden sm:block">
                            Updated {formatDistanceToNow(new Date(repo.updatedAt))} ago
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>
          {/* Sidebar Activity */}
          <aside className="space-y-8">
            <section>
              <div className="flex items-center gap-2 mb-6">
                <Clock className="h-5 w-5 text-primary" />
                <h2 className="font-bold tracking-tight">Recent Activity</h2>
              </div>
              <div className="space-y-6">
                {MOCK_ACTIVITY.map((event) => (
                  <div key={event.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center border">
                        <BookOpen className="h-4 w-4" />
                      </div>
                      <div className="w-px h-full bg-border mt-2" />
                    </div>
                    <div className="space-y-1 pt-1">
                      <p className="text-sm">
                        <Link to={`/${event.userUsername}`} className="font-semibold hover:text-primary">
                          {event.userUsername}
                        </Link>
                        {" "}
                        {event.type === 'push' ? 'pushed to' : event.type === 'star' ? 'starred' : 'updated'}
                        {" "}
                        <Link to={`/repos/${event.repoName}`} className="font-semibold hover:text-primary">
                          {event.repoName}
                        </Link>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(event.timestamp))} ago
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </div>
    </AppLayout>
  );
}