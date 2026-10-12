import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Link as LinkIcon, Calendar, Users, Star, GitFork, BookOpen, Package, Check } from 'lucide-react';
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1 space-y-8">
            <div className="space-y-6">
              <Avatar className="w-full h-auto aspect-square border-0 rounded-3xl shadow-none">
                <AvatarImage src={user.avatar} className="rounded-3xl" />
                <AvatarFallback className="text-4xl rounded-3xl">{user.name[0]}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h1 className="text-2xl font-bold tracking-tight text-zinc-900">{user.name}</h1>
                <p className="text-lg text-zinc-400 font-medium">@{user.username}</p>
              </div>
            </div>
            <Button
              className={`w-full h-11 rounded-xl font-bold transition-all border-zinc-200 ${isFollowing ? 'bg-zinc-100 text-zinc-900' : 'bg-zinc-900 text-white'}`}
              onClick={() => setIsFollowing(!isFollowing)}
              variant={isFollowing ? "secondary" : "default"}
            >
              {isFollowing ? <><Check className="mr-2 h-4 w-4" /> Seguindo</> : 'Seguir'}
            </Button>
            <p className="text-sm leading-relaxed text-zinc-600 font-medium">{user.bio}</p>
            <div className="flex items-center gap-4 text-xs font-bold text-zinc-400 pt-2 uppercase tracking-wider">
              <span className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5" /> <span className="text-zinc-900">{user.followers.toLocaleString()}</span></span>
              <span className="flex items-center gap-1.5">Seguindo <span className="text-zinc-900">{user.following.toLocaleString()}</span></span>
            </div>
            <div className="space-y-4 text-xs font-medium text-zinc-500 pt-6 border-t border-zinc-100">
              {user.location && (
                <div className="flex items-center gap-2.5">
                  <MapPin className="h-3.5 w-3.5 text-zinc-300" /> <span>{user.location}</span>
                </div>
              )}
              {user.website && (
                <div className="flex items-center gap-2.5">
                  <LinkIcon className="h-3.5 w-3.5 text-zinc-300" />
                  <a href={user.website} target="_blank" rel="noreferrer" className="text-zinc-900 hover:underline truncate">
                    {user.website.replace(/^https?:\/\//, '')}
                  </a>
                </div>
              )}
              <div className="flex items-center gap-2.5">
                <Calendar className="h-3.5 w-3.5 text-zinc-300" /> <span>Entrou em {new Date(user.joinedAt).toLocaleDateString('pt-BR')}</span>
              </div>
            </div>
          </div>
          <div className="md:col-span-3">
            <Tabs defaultValue="overview" className="space-y-10">
              <TabsList className="bg-transparent border-b border-zinc-100 w-full justify-start rounded-none h-auto p-0 gap-8 overflow-x-auto scrollbar-hide">
                <TabsTrigger value="overview" className="rounded-none border-b-2 border-transparent data-[state=active]:border-zinc-900 data-[state=active]:text-zinc-900 data-[state=active]:bg-transparent px-0 py-4 text-sm font-bold text-zinc-400 transition-all">
                  Visão Geral
                </TabsTrigger>
                <TabsTrigger value="repositories" className="rounded-none border-b-2 border-transparent data-[state=active]:border-zinc-900 data-[state=active]:text-zinc-900 data-[state=active]:bg-transparent px-0 py-4 text-sm font-bold text-zinc-400 transition-all">
                  Repositórios <span className="ml-2 px-1.5 py-0.5 rounded-full bg-zinc-50 text-[10px] font-bold border border-zinc-100">{userRepos.length}</span>
                </TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-12 animate-in fade-in slide-in-from-bottom-2">
                <section className="space-y-6">
                  <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400">Fixados</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {userRepos.slice(0, 4).map(repo => (
                      <Card key={repo.id} className="border border-zinc-100 shadow-none hover:border-zinc-200 bg-white transition-all rounded-2xl group">
                        <CardHeader className="pb-4">
                          <CardTitle className="text-sm font-bold flex items-center gap-2">
                            <BookOpen className="h-3.5 w-3.5 text-zinc-400" />
                            <Link to={`/${user.username}/${repo.name}`} className="text-zinc-900 hover:underline">
                              {repo.name}
                            </Link>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-5">
                          <p className="text-xs text-zinc-500 leading-relaxed font-medium line-clamp-2">
                            {repo.description}
                          </p>
                          <div className="flex items-center gap-5 text-[10px] font-bold uppercase text-zinc-400 tracking-wider">
                            <div className="flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-zinc-900" /> {repo.language}
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Star className="h-3 w-3" /> {repo.stars}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>
                <section className="space-y-6">
                  <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400">Atividade Anual</h3>
                  <div className="bg-white p-6 border border-zinc-100 rounded-3xl">
                    <ContributionGrid />
                  </div>
                </section>
              </TabsContent>
              <TabsContent value="repositories" className="animate-in fade-in slide-in-from-bottom-2">
                <div className="divide-y divide-zinc-100">
                  {userRepos.map(repo => (
                    <div key={repo.id} className="py-8 space-y-3 group">
                      <div className="flex items-center gap-3">
                        <Link to={`/${user.username}/${repo.name}`} className="text-xl font-bold text-zinc-900 hover:underline">
                          {repo.name}
                        </Link>
                        <Badge variant="outline" className="text-[9px] font-bold uppercase border-zinc-100 text-zinc-400">{repo.visibility}</Badge>
                      </div>
                      <p className="text-sm text-zinc-500 font-medium max-w-2xl leading-relaxed">{repo.description}</p>
                      <div className="flex items-center gap-6 text-[10px] font-bold text-zinc-400 uppercase tracking-widest pt-3">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-zinc-900" /> {repo.language}
                        </div>
                        <div className="flex items-center gap-1.5"><Star className="h-3.5 w-3.5" /> {repo.stars}</div>
                        <div className="flex items-center gap-1.5"><GitFork className="h-3.5 w-3.5" /> {repo.forks}</div>
                        <div className="ml-auto">Há {formatDistanceToNow(new Date(repo.updatedAt), { locale: ptBR })}</div>
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