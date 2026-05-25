import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, GitFork, BookOpen, Clock, ArrowRight, Zap, Sparkles, Terminal } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MOCK_REPOSITORIES, MOCK_ACTIVITY } from '@shared/mock-data';
import { formatDistanceToNow } from 'date-fns';
export function HomePage() {
  const scrollToFeatured = () => {
    document.getElementById('featured-projects')?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <AppLayout>
      {/* High-Impact Hero Section */}
      <section className="relative overflow-hidden border-b bg-muted/10">
        <div className="absolute inset-0 bg-gradient-mesh opacity-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-8 max-w-4xl mx-auto"
          >
            <Badge variant="secondary" className="px-4 py-1.5 rounded-full text-sm bg-primary/10 text-primary border-primary/20 animate-pulse">
              <Sparkles className="h-3.5 w-3.5 mr-2" />
              Automate everything with Cleudocode
            </Badge>
            <h1 className="text-display font-black tracking-tight leading-[1.1]">
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                The AI that actually does things.
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-medium leading-relaxed">
              Bem-vindo(a) ao Futuro da Criação de Conteúdo! 🤖✨
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button 
                size="lg" 
                asChild
                className="h-14 px-8 text-lg font-bold rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 hover:shadow-glow-lg hover:scale-105 transition-all w-full sm:w-auto cursor-pointer"
              >
                <Link to="/automacoescomerciais">Get Started Now <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={scrollToFeatured}
                className="h-14 px-8 text-lg font-bold rounded-2xl border-2 w-full sm:w-auto hover:bg-muted transition-colors cursor-pointer"
              >
                Explore Repositories
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-10">
            <section id="featured-projects">
              <div className="flex items-center justify-between mb-8">
                <div className="space-y-1">
                  <h2 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                    <Zap className="h-7 w-7 text-primary" />
                    Featured Projects
                  </h2>
                  <p className="text-muted-foreground">Discover what the Cleudocode community is building.</p>
                </div>
              </div>
              <div className="grid gap-6">
                {MOCK_REPOSITORIES.map((repo, idx) => (
                  <motion.div
                    key={repo.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Card className="hover:border-primary/50 transition-all hover:shadow-soft bg-card group rounded-2xl overflow-hidden border-border/50">
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1.5">
                            <CardTitle className="text-2xl font-bold">
                              <Link to={`/${repo.ownerUsername}/${repo.name}`} className="text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-2">
                                <Terminal className="h-5 w-5 opacity-50" />
                                {repo.ownerUsername} / {repo.name}
                              </Link>
                            </CardTitle>
                            <CardDescription className="text-base line-clamp-2 max-w-xl text-muted-foreground/90 leading-relaxed">
                              {repo.description}
                            </CardDescription>
                          </div>
                          <Badge variant="outline" className="font-mono text-[10px] uppercase tracking-widest px-2.5 py-0.5 rounded-md">
                            {repo.visibility}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                            <span className="font-medium">{repo.language}</span>
                          </div>
                          <div className="flex items-center gap-1.5 hover:text-foreground cursor-pointer transition-colors">
                            <Star className="h-4 w-4" />
                            <span>{repo.stars.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-1.5 hover:text-foreground cursor-pointer transition-colors">
                            <GitFork className="h-4 w-4" />
                            <span>{repo.forks.toLocaleString()}</span>
                          </div>
                          <div className="ml-auto hidden sm:block text-xs font-medium bg-muted px-3 py-1 rounded-full">
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
          <aside className="space-y-10">
            <section className="bg-muted/30 p-8 rounded-3xl border border-border/50">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-primary/10 rounded-xl">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl font-bold tracking-tight">System Pulse</h2>
              </div>
              <div className="space-y-8">
                {MOCK_ACTIVITY.map((event) => (
                  <div key={event.id} className="flex gap-4 group">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-xl bg-background flex items-center justify-center border shadow-sm group-hover:scale-110 transition-transform">
                        <Zap className="h-5 w-5 text-primary" />
                      </div>
                      <div className="w-px h-full bg-border mt-3" />
                    </div>
                    <div className="space-y-1.5 pt-1 flex-1">
                      <p className="text-sm leading-relaxed">
                        <Link to={`/${event.userUsername}`} className="font-bold hover:text-primary transition-colors">
                          {event.userUsername}
                        </Link>
                        {" "}
                        <span className="text-muted-foreground">
                          {event.type === 'push' ? 'deployed updates to' : event.type === 'star' ? 'voted for' : 'updated'}
                        </span>
                        {" "}
                        <Link to={`/${event.userUsername}/${event.repoName}`} className="font-bold hover:text-primary transition-colors">
                          {event.repoName}
                        </Link>
                      </p>
                      <p className="text-xs text-muted-foreground/70 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatDistanceToNow(new Date(event.timestamp))} ago
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            <section className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-3xl text-white space-y-4 shadow-glow">
               <h3 className="font-bold text-xl">Need Custom AI?</h3>
               <p className="text-blue-100 text-sm leading-relaxed">
                 Automações Comerciais Integradas can build custom Cleudocode instances for your business.
               </p>
               <Button className="w-full bg-white text-blue-700 hover:bg-blue-50 font-bold rounded-xl" asChild>
                 <a href="https://wa.me/558894227586">Talk to an Expert</a>
               </Button>
            </section>
          </aside>
        </div>
      </div>
    </AppLayout>
  );
}