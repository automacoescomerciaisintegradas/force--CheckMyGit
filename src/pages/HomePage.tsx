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
      <section className="bg-white border-b border-zinc-100 overflow-hidden relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-zinc-50/50 via-transparent to-transparent -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-36">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl space-y-10"
          >
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-zinc-50 border border-zinc-100 text-zinc-500 text-[10px] font-bold uppercase tracking-[0.2em]">
              <Zap className="h-3 w-3 text-zinc-400 fill-zinc-400" />
              Sistemas Autônomos de Elite
            </div>
            <h1 className="text-6xl md:text-[84px] font-bold tracking-[-0.03em] text-zinc-950 leading-[0.95]">
              A IA que realmente <br /> <span className="text-zinc-300">faz as coisas.</span>
            </h1>
            <p className="text-xl md:text-2xl text-zinc-400 leading-relaxed font-medium max-w-2xl">
              Automação inteligente e orquestração de fluxos comerciais complexos com o motor Cleudocode Core.
            </p>
            <div className="flex flex-wrap gap-5 pt-4">
              <Button
                asChild
                className="h-14 px-10 rounded-2xl bg-zinc-950 hover:bg-zinc-800 text-white font-bold transition-all shadow-xl shadow-zinc-200/50 hover:scale-[1.02] cursor-pointer"
              >
                <Link to="/automacoescomerciais">Começar Agora <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button
                variant="outline"
                className="h-14 px-10 rounded-2xl border-zinc-100 bg-white font-bold hover:bg-zinc-50 text-zinc-600 transition-all cursor-pointer"
                onClick={() => document.getElementById('repos')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Explorar Repositórios
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div id="repos" className="lg:col-span-8 space-y-14">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight text-zinc-950">Projetos em Destaque</h2>
              <Link to="/explore" className="text-[13px] font-bold text-zinc-400 hover:text-zinc-950 transition-colors uppercase tracking-widest">Ver todos</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {MOCK_REPOSITORIES.map((repo, idx) => (
                <motion.div
                  key={repo.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="h-full border-zinc-100 shadow-none hover:border-zinc-300 transition-all duration-300 bg-white rounded-3xl group flex flex-col">
                    <CardHeader className="p-8 pb-4">
                      <div className="flex items-start justify-between mb-4">
                        <Badge variant="secondary" className="text-[10px] font-bold uppercase tracking-widest bg-zinc-50 text-zinc-400 border-none px-2.5 py-0.5">
                          {repo.language}
                        </Badge>
                        <div className="flex items-center gap-4 text-[11px] text-zinc-300 font-bold uppercase tracking-tighter">
                          <span className="flex items-center gap-1.5"><Star className="h-3.5 w-3.5" /> {repo.stars}</span>
                        </div>
                      </div>
                      <CardTitle className="text-xl font-bold group-hover:text-zinc-950 transition-colors">
                        <Link to={`/${repo.ownerUsername}/${repo.name}`}>
                          {repo.name}
                        </Link>
                      </CardTitle>
                      <CardDescription className="text-[15px] text-zinc-400 leading-relaxed pt-3 font-medium line-clamp-2">
                        {repo.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="mt-auto p-8 pt-0 flex items-center justify-between">
                       <span className="text-[10px] text-zinc-300 font-bold uppercase tracking-widest">Atualizado há {formatDistanceToNow(new Date(repo.updatedAt), { locale: ptBR })}</span>
                       <div className="w-8 h-8 rounded-xl bg-zinc-50 border border-zinc-100 flex items-center justify-center group-hover:bg-zinc-950 group-hover:text-white transition-all">
                          <ArrowRight className="h-4 w-4" />
                       </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
          <aside className="lg:col-span-4 space-y-16">
            <div className="space-y-10">
              <h2 className="text-[11px] font-bold uppercase tracking-[0.3em] text-zinc-300 border-b border-zinc-100 pb-5">Atividade Recente</h2>
              <div className="space-y-10">
                {MOCK_ACTIVITY.map((event) => (
                  <div key={event.id} className="flex gap-5 items-start">
                    <div className="w-9 h-9 rounded-2xl bg-white border border-zinc-100 shadow-ultra-sm flex items-center justify-center flex-shrink-0">
                      <Terminal className="h-4 w-4 text-zinc-400" />
                    </div>
                    <div className="space-y-1.5">
                      <p className="text-[13px] leading-relaxed text-zinc-500 font-medium">
                        <Link to={`/${event.userUsername}`} className="font-bold text-zinc-900 hover:underline">@{event.userUsername}</Link>
                        {" enviou para "}
                        <Link to={`/${event.userUsername}/${event.repoName}`} className="font-bold text-zinc-900 hover:underline">{event.repoName}</Link>
                      </p>
                      <p className="text-[11px] text-zinc-300 font-bold uppercase tracking-tighter flex items-center gap-1.5">
                        <Clock className="h-3 w-3" /> {formatDistanceToNow(new Date(event.timestamp), { locale: ptBR })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-10 rounded-[32px] bg-zinc-950 text-white space-y-6 shadow-2xl shadow-zinc-200">
              <h3 className="font-bold text-xl tracking-tight">Arquitetura sob medida</h3>
              <p className="text-zinc-500 text-[13px] leading-relaxed font-medium">
                Precisa de um ecossistema Cleudocode configurado para sua operação? Fale com nosso time técnico.
              </p>
              <Button className="w-full bg-white text-zinc-900 hover:bg-zinc-100 font-bold rounded-2xl h-12 text-[13px]">
                Falar com Especialista
              </Button>
            </div>
          </aside>
        </div>
      </div>
    </AppLayout>
  );
}