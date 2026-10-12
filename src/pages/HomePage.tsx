import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, GitFork, ArrowRight, Zap, Terminal, Clock } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MOCK_REPOSITORIES, MOCK_ACTIVITY } from '@shared/mock-data';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
export function HomePage() {
  return (
    <AppLayout>
      <section className="bg-white border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl space-y-8"
          >
            <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-zinc-50 border border-zinc-200 text-zinc-600 text-[11px] font-bold uppercase tracking-wider">
              <Zap className="h-3 w-3 text-zinc-400" />
              Sistemas Autônomos de Elite
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-zinc-900 leading-[1.05]">
              A IA que realmente <br /> <span className="text-zinc-400">faz as coisas.</span>
            </h1>
            <p className="text-xl text-zinc-500 leading-relaxed font-medium">
              Automação inteligente e orquestração de fluxos comerciais com o poder do Cleudocode Core.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button
                asChild
                className="h-12 px-8 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-semibold transition-all hover:scale-[1.02] cursor-pointer"
              >
                <Link to="/automacoescomerciais">Começar Agora <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button
                variant="outline"
                className="h-12 px-8 rounded-xl border-zinc-200 font-semibold hover:bg-zinc-50 transition-colors cursor-pointer"
                onClick={() => document.getElementById('repos')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Explorar Repositórios
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div id="repos" className="lg:col-span-2 space-y-12">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight">Destaques</h2>
              <Link to="/explore" className="text-sm font-medium text-zinc-400 hover:text-zinc-900 transition-colors">Ver todos</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {MOCK_REPOSITORIES.map((repo, idx) => (
                <motion.div
                  key={repo.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Card className="h-full border border-zinc-200/60 shadow-none hover:border-zinc-300 transition-all bg-white rounded-2xl group flex flex-col">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg font-bold group-hover:text-zinc-900">
                          <Link to={`/${repo.ownerUsername}/${repo.name}`} className="hover:underline">
                            {repo.name}
                          </Link>
                        </CardTitle>
                        <Badge variant="outline" className="text-[9px] font-bold uppercase tracking-widest border-zinc-100 text-zinc-400">
                          {repo.language}
                        </Badge>
                      </div>
                      <CardDescription className="text-sm text-zinc-500 line-clamp-2 leading-relaxed pt-2">
                        {repo.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="mt-auto pt-4 flex items-center gap-5 text-xs text-zinc-400 font-medium">
                      <div className="flex items-center gap-1.5 hover:text-zinc-900 cursor-pointer transition-colors">
                        <Star className="h-3.5 w-3.5" /> {repo.stars}
                      </div>
                      <div className="flex items-center gap-1.5 hover:text-zinc-900 cursor-pointer transition-colors">
                        <GitFork className="h-3.5 w-3.5" /> {repo.forks}
                      </div>
                      <span className="ml-auto text-[10px] text-zinc-300 uppercase">há {formatDistanceToNow(new Date(repo.updatedAt), { locale: ptBR })}</span>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
          <aside className="space-y-12">
            <div className="space-y-8">
              <h2 className="text-lg font-bold tracking-tight border-b border-zinc-100 pb-4">Atividade</h2>
              <div className="space-y-8">
                {MOCK_ACTIVITY.map((event) => (
                  <div key={event.id} className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-xl bg-zinc-50 border border-zinc-200 flex items-center justify-center flex-shrink-0">
                      <Terminal className="h-3.5 w-3.5 text-zinc-400" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs leading-relaxed text-zinc-600">
                        <Link to={`/${event.userUsername}`} className="font-bold text-zinc-900 hover:underline">{event.userUsername}</Link>
                        {" atualizou "}
                        <Link to={`/${event.userUsername}/${event.repoName}`} className="font-bold text-zinc-900 hover:underline">{event.repoName}</Link>
                      </p>
                      <p className="text-[10px] text-zinc-400 flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {formatDistanceToNow(new Date(event.timestamp), { locale: ptBR })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-8 rounded-2xl border border-zinc-900 bg-zinc-900 text-white space-y-4">
              <h3 className="font-bold text-lg">Soluções Sob Medida</h3>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Precisa de um motor Cleudocode configurado para sua empresa? Fale agora com um arquiteto de soluções.
              </p>
              <Button className="w-full bg-white text-zinc-900 hover:bg-zinc-100 font-bold rounded-xl h-10 text-xs">
                Falar com Especialista
              </Button>
            </div>
          </aside>
        </div>
      </div>
    </AppLayout>
  );
}