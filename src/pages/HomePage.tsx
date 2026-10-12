import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ArrowRight, Zap, Terminal, Clock } from 'lucide-react';
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
      <section className="bg-background border-b border-border overflow-hidden relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_top,_hsl(var(--muted)/0.5)_0%,_transparent_100%)] -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl space-y-8 md:space-y-10 text-center md:text-left"
          >
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-secondary border border-border text-muted-foreground text-[10px] font-bold uppercase tracking-[0.2em] mx-auto md:mx-0">
              <Zap className="h-3 w-3 text-primary fill-primary" />
              Sistemas Autônomos de Elite
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-[84px] font-bold tracking-[-0.03em] leading-[1] md:leading-[0.95]">
              A IA que realmente <br /> <span className="text-muted-foreground/40">faz as coisas.</span>
            </h1>
            <p className="text-lg md:text-2xl text-muted-foreground leading-relaxed font-medium max-w-2xl mx-auto md:mx-0">
              Automação inteligente e orquestração de fluxos comerciais complexos com o motor Cleudocode Core.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-5 pt-4">
              <Button
                asChild
                className="h-14 px-8 md:px-10 rounded-2xl bg-primary text-primary-foreground font-bold transition-all shadow-xl shadow-primary/10 hover:scale-[1.02] cursor-pointer"
              >
                <Link to="/automacoescomerciais">Começar Agora <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button
                variant="outline"
                className="h-14 px-8 md:px-10 rounded-2xl border-border bg-background font-bold hover:bg-secondary text-foreground transition-all cursor-pointer"
                onClick={() => document.getElementById('repos')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Explorar Repositórios
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div id="repos" className="lg:col-span-8 space-y-10 md:space-y-14">
            <div className="flex items-center justify-between">
              <h2 className="text-xl md:text-2xl font-bold tracking-tight">Projetos em Destaque</h2>
              <Link to="/explore" className="text-[11px] font-bold text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest">Ver todos</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {MOCK_REPOSITORIES.map((repo, idx) => (
                <motion.div
                  key={repo.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="h-full border-border shadow-none hover:border-primary/30 transition-all duration-300 bg-card rounded-3xl group flex flex-col overflow-hidden">
                    <CardHeader className="p-6 md:p-8 pb-4">
                      <div className="flex items-start justify-between mb-4">
                        <Badge variant="secondary" className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5">
                          {repo.language}
                        </Badge>
                        <div className="flex items-center gap-4 text-[11px] text-muted-foreground/60 font-bold uppercase tracking-tighter">
                          <span className="flex items-center gap-1.5"><Star className="h-3.5 w-3.5" /> {repo.stars}</span>
                        </div>
                      </div>
                      <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
                        <Link to={`/${repo.ownerUsername}/${repo.name}`}>
                          {repo.name}
                        </Link>
                      </CardTitle>
                      <CardDescription className="text-[15px] text-muted-foreground leading-relaxed pt-3 font-medium line-clamp-2">
                        {repo.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="mt-auto p-6 md:p-8 pt-0 flex items-center justify-between">
                       <span className="text-[10px] text-muted-foreground/50 font-bold uppercase tracking-widest">Atualizado há {formatDistanceToNow(new Date(repo.updatedAt), { locale: ptBR })}</span>
                       <div className="w-8 h-8 rounded-xl bg-secondary border border-border flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                          <ArrowRight className="h-4 w-4" />
                       </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
          <aside className="lg:col-span-4 space-y-12 md:space-y-16">
            <div className="space-y-8 md:space-y-10">
              <h2 className="text-[11px] font-bold uppercase tracking-[0.3em] text-muted-foreground/60 border-b border-border pb-5">Atividade Recente</h2>
              <div className="space-y-8 md:space-y-10">
                {MOCK_ACTIVITY.map((event) => (
                  <div key={event.id} className="flex gap-5 items-start">
                    <div className="w-9 h-9 rounded-2xl bg-card border border-border shadow-ultra-sm flex items-center justify-center flex-shrink-0">
                      <Terminal className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="space-y-1.5 min-w-0">
                      <p className="text-[13px] leading-relaxed text-muted-foreground font-medium truncate">
                        <Link to={`/${event.userUsername}`} className="font-bold text-foreground hover:underline">@{event.userUsername}</Link>
                        {" enviou para "}
                        <Link to={`/${event.userUsername}/${event.repoName}`} className="font-bold text-foreground hover:underline">{event.repoName}</Link>
                      </p>
                      <p className="text-[11px] text-muted-foreground/40 font-bold uppercase tracking-tighter flex items-center gap-1.5">
                        <Clock className="h-3 w-3" /> {formatDistanceToNow(new Date(event.timestamp), { locale: ptBR })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-8 md:p-10 rounded-[32px] bg-primary text-primary-foreground space-y-6 shadow-2xl shadow-primary/20">
              <h3 className="font-bold text-xl tracking-tight">Arquitetura sob medida</h3>
              <p className="text-primary-foreground/60 text-[13px] leading-relaxed font-medium">
                Precisa de um ecossistema Cleudocode configurado para sua operação? Fale com nosso time técnico.
              </p>
              <Button className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-bold rounded-2xl h-12 text-[13px]">
                Falar com Especialista
              </Button>
            </div>
          </aside>
        </div>
      </div>
    </AppLayout>
  );
}