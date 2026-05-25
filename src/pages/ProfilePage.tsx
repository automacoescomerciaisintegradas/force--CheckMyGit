import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Link as LinkIcon, Calendar, Users, Star, GitFork, BookOpen, Check } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MOCK_USERS, MOCK_REPOSITORIES } from '@shared/mock-data';
import { ContributionGrid } from '@/components/git/ContributionGrid';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
export function ProfilePage() {
  const { username } = useParams();
  const [isFollowing, setIsFollowing] = useState(false);
  const user = MOCK_USERS.find(u => u.username === username) || MOCK_USERS[0];
  const userRepos = MOCK_REPOSITORIES.filter(r => r.ownerUsername === user.username);
  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-24">
          <div className="md:col-span-4 lg:col-span-3 space-y-10">
            <div className="space-y-8">
              <Avatar className="w-full h-auto aspect-square border-0 rounded-[40px] shadow-2xl shadow-zinc-200/50">
                <AvatarImage src={user.avatar} className="rounded-[40px] object-cover" />
                <AvatarFallback className="text-5xl rounded-[40px] bg-zinc-50 text-zinc-200">{user.name[0]}</AvatarFallback>
              </Avatar>
              <div className="space-y-1.5">
                <h1 className="text-3xl font-bold tracking-tight text-zinc-950">{user.name}</h1>
                <p className="text-xl text-zinc-400 font-medium tracking-tight">@{user.username}</p>
              </div>
            </div>
            <Button
              className={`w-full h-14 rounded-2xl font-bold transition-all border-none text-[13px] ${isFollowing ? 'bg-zinc-100 text-zinc-950' : 'bg-zinc-950 text-white shadow-xl shadow-zinc-200/50 hover:scale-[1.02]'}`}
              onClick={() => setIsFollowing(!isFollowing)}
              variant={isFollowing ? "secondary" : "default"}
            >
              {isFollowing ? <><Check className="mr-2 h-4 w-4" /> Seguindo</> : 'Seguir'}
            </Button>
            <p className="text-[15px] leading-relaxed text-zinc-500 font-medium">{user.bio}</p>
            <div className="flex items-center gap-6 text-[11px] font-bold text-zinc-300 pt-2 uppercase tracking-[0.2em]">
              <span className="flex items-center gap-2"><Users className="h-4 w-4" /> <span className="text-zinc-950">{user.followers.toLocaleString()}</span></span>
              <span className="flex items-center gap-2">Seguindo <span className="text-zinc-950">{user.following.toLocaleString()}</span></span>
            </div>
            <div className="space-y-5 text-[13px] font-medium text-zinc-400 pt-10 border-t border-zinc-100">
              {user.location && (
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-zinc-200" /> <span>{user.location}</span>
                </div>
              )}
              {user.website && (
                <div className="flex items-center gap-3">
                  <LinkIcon className="h-4 w-4 text-zinc-200" />
                  <a href={user.website} target="_blank" rel="noreferrer" className="text-zinc-950 hover:underline truncate transition-all">
                    {user.website.replace(/^https?:\/\//, '')}
                  </a>
                </div>
              )}
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-zinc-200" /> <span>Entrou em {new Date(user.joinedAt).toLocaleDateString('pt-BR')}</span>
              </div>
            </div>
          </div>
          <div className="md:col-span-8 lg:col-span-9">
            <Tabs defaultValue="overview" className="space-y-16">
              <TabsList className="bg-transparent border-b border-zinc-100 w-full justify-start rounded-none h-auto p-0 gap-10 overflow-x-auto scrollbar-hide">
                <TabsTrigger value="overview" className="rounded-none border-b border-transparent data-[state=active]:border-zinc-950 data-[state=active]:text-zinc-950 data-[state=active]:bg-transparent px-0 py-5 text-[11px] font-bold uppercase tracking-[0.25em] text-zinc-300 transition-all">
                  Visão Geral
                </TabsTrigger>
                <TabsTrigger value="repositories" className="rounded-none border-b border-transparent data-[state=active]:border-zinc-950 data-[state=active]:text-zinc-950 data-[state=active]:bg-transparent px-0 py-5 text-[11px] font-bold uppercase tracking-[0.25em] text-zinc-300 transition-all">
                  Repositórios <span className="ml-3 px-2 py-0.5 rounded-full bg-zinc-50 text-[9px] font-bold border border-zinc-100">{userRepos.length}</span>
                </TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-20 animate-in fade-in slide-in-from-bottom-4">
                <section className="space-y-8">
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-300">Projetos Fixados</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {userRepos.slice(0, 4).map(repo => (
                      <Card key={repo.id} className="border-zinc-100 shadow-none hover:border-zinc-300 bg-white transition-all duration-300 rounded-[32px] group overflow-hidden">
                        <CardHeader className="p-8 pb-4">
                          <CardTitle className="text-lg font-bold flex items-center gap-3 group-hover:text-zinc-950 transition-colors">
                            <BookOpen className="h-4 w-4 text-zinc-200" />
                            <Link to={`/${user.username}/${repo.name}`}>
                              {repo.name}
                            </Link>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-8 pt-0 space-y-6">
                          <p className="text-[14px] text-zinc-400 leading-relaxed font-medium line-clamp-2">
                            {repo.description}
                          </p>
                          <div className="flex items-center gap-6 text-[10px] font-bold uppercase text-zinc-300 tracking-widest">
                            <div className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-zinc-950" /> {repo.language}
                            </div>
                            <div className="flex items-center gap-2">
                              <Star className="h-3.5 w-3.5" /> {repo.stars}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>
                <section className="space-y-8">
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-300">Fluxo de Contribuições</h3>
                  <div className="bg-white p-10 border border-zinc-100 rounded-[40px] shadow-ultra-sm">
                    <ContributionGrid />
                  </div>
                </section>
              </TabsContent>
              <TabsContent value="repositories" className="animate-in fade-in slide-in-from-bottom-4">
                <div className="divide-y divide-zinc-100">
                  {userRepos.map(repo => (
                    <div key={repo.id} className="py-12 space-y-4 group">
                      <div className="flex items-center gap-4">
                        <Link to={`/${user.username}/${repo.name}`} className="text-2xl font-bold text-zinc-950 hover:text-zinc-500 transition-colors tracking-tight">
                          {repo.name}
                        </Link>
                        <Badge variant="outline" className="text-[9px] font-bold uppercase tracking-widest border-zinc-100 bg-zinc-50/50 text-zinc-400 px-3 py-0.5 rounded-full">{repo.visibility}</Badge>
                      </div>
                      <p className="text-[15px] text-zinc-400 font-medium max-w-3xl leading-relaxed">{repo.description}</p>
                      <div className="flex items-center gap-8 text-[11px] font-bold text-zinc-300 uppercase tracking-[0.15em] pt-4">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-zinc-950" /> {repo.language}
                        </div>
                        <div className="flex items-center gap-2"><Star className="h-4 w-4" /> {repo.stars}</div>
                        <div className="flex items-center gap-2"><GitFork className="h-4 w-4" /> {repo.forks}</div>
                        <div className="ml-auto text-[10px] text-zinc-200">Há {formatDistanceToNow(new Date(repo.updatedAt), { locale: ptBR })}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}