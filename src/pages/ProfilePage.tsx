import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Link as LinkIcon, Calendar, Users, Star, GitFork, BookOpen, Search, Package, Check } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { MOCK_USERS, MOCK_REPOSITORIES } from '@shared/mock-data';
import { ContributionGrid } from '@/components/git/ContributionGrid';
import { formatDistanceToNow } from 'date-fns';
export function ProfilePage() {
  const { username } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [isFollowing, setIsFollowing] = useState(false);
  const user = MOCK_USERS.find(u => u.username === username) || MOCK_USERS[0];
  const userRepos = MOCK_REPOSITORIES.filter(r => r.ownerUsername === user.username);
  const filteredRepos = userRepos.filter(r =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <AppLayout>
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1 space-y-6">
            <div className="space-y-4">
              <Avatar className="w-full h-auto aspect-square border-4 border-background shadow-sm rounded-3xl">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="text-4xl">{user.name[0]}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <p className="text-xl text-muted-foreground font-light">{user.username}</p>
              </div>
            </div>
            <Button 
              className={`w-full rounded-xl font-bold transition-all ${isFollowing ? 'bg-secondary text-secondary-foreground' : ''}`}
              onClick={() => setIsFollowing(!isFollowing)}
              variant={isFollowing ? "secondary" : "default"}
            >
              {isFollowing ? <><Check className="mr-2 h-4 w-4" /> Following</> : 'Follow'}
            </Button>
            <p className="text-sm leading-relaxed text-foreground/80">{user.bio}</p>
            <div className="flex items-center gap-3 text-sm text-muted-foreground pt-2">
              <Users className="h-4 w-4" />
              <span>
                <span className="font-semibold text-foreground">{user.followers.toLocaleString()}</span> followers
                {" · "}
                <span className="font-semibold text-foreground">{user.following.toLocaleString()}</span> following
              </span>
            </div>
            <div className="space-y-3 text-sm text-muted-foreground pt-4 border-t">
              {user.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{user.location}</span>
                </div>
              )}
              {user.website && (
                <div className="flex items-center gap-2">
                  <LinkIcon className="h-4 w-4" />
                  <a href={user.website} target="_blank" rel="noreferrer" className="hover:text-primary hover:underline truncate">
                    {user.website.replace(/^https?:\/\//, '')}
                  </a>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Joined {new Date(user.joinedAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          <div className="md:col-span-3">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="bg-transparent border-b w-full justify-start rounded-none h-auto p-0 gap-8 overflow-x-auto scrollbar-hide">
                <TabsTrigger value="overview" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 py-3 text-sm font-medium">
                  <BookOpen className="h-4 w-4 mr-2" /> Overview
                </TabsTrigger>
                <TabsTrigger value="repositories" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 py-3 text-sm font-medium">
                  <Package className="h-4 w-4 mr-2" /> Repositories <Badge variant="secondary" className="ml-2 px-1.5 py-0">{userRepos.length}</Badge>
                </TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <section>
                  <h3 className="text-base font-semibold mb-4">Pinned Repositories</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {userRepos.slice(0, 4).map(repo => (
                      <Card key={repo.id} className="hover:border-primary/30 transition-all bg-card/40 hover:shadow-sm">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-bold flex items-center gap-2">
                            <BookOpen className="h-4 w-4 text-muted-foreground" />
                            <Link to={`/${user.username}/${repo.name}`} className="text-primary hover:underline">
                              {repo.name}
                            </Link>
                            <Badge variant="outline" className="text-[10px] py-0 ml-auto font-mono">Public</Badge>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed h-8">
                            {repo.description}
                          </p>
                          <div className="flex items-center gap-4 text-[10px] text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                              <span>{repo.language}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3" />
                              <span>{repo.stars}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <GitFork className="h-3 w-3" />
                              <span>{repo.forks}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>
                <section className="space-y-4">
                  <h3 className="text-base font-semibold">Activity Heatmap</h3>
                  <div className="flex justify-center md:justify-start">
                    <ContributionGrid />
                  </div>
                </section>
              </TabsContent>
              <TabsContent value="repositories" className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex items-center gap-2 pb-2 border-b">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Find a repository..."
                      className="pl-9 bg-muted/20 border-transparent focus:bg-background transition-all"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" size="sm" className="hidden sm:flex">Type</Button>
                  <Button variant="outline" size="sm" className="hidden sm:flex">Language</Button>
                </div>
                <div className="divide-y">
                  {filteredRepos.map(repo => (
                    <div key={repo.id} className="py-6 space-y-2 group">
                      <div className="flex items-center gap-2">
                        <Link to={`/${user.username}/${repo.name}`} className="text-xl font-bold text-primary hover:underline">
                          {repo.name}
                        </Link>
                        <Badge variant="outline" className="text-[10px] py-0 capitalize border-muted-foreground/30">{repo.visibility}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">{repo.description}</p>
                      <div className="flex items-center gap-6 text-xs text-muted-foreground pt-2">
                        <div className="flex items-center gap-1.5">
                          <span className="w-3 h-3 rounded-full bg-blue-500" />
                          <span>{repo.language}</span>
                        </div>
                        <div className="flex items-center gap-1 hover:text-foreground cursor-pointer">
                          <Star className="h-3.5 w-3.5" />
                          <span>{repo.stars}</span>
                        </div>
                        <div className="flex items-center gap-1 hover:text-foreground cursor-pointer">
                          <GitFork className="h-3.5 w-3.5" />
                          <span>{repo.forks}</span>
                        </div>
                        <div className="ml-auto hidden sm:block">Updated {formatDistanceToNow(new Date(repo.updatedAt))} ago</div>
                      </div>
                    </div>
                  ))}
                  {filteredRepos.length === 0 && (
                    <div className="py-20 text-center space-y-3">
                      <Package className="h-12 w-12 text-muted-foreground/30 mx-auto" />
                      <h3 className="text-lg font-semibold">No repositories found</h3>
                      <p className="text-sm text-muted-foreground">Try adjusting your filters or search query.</p>
                      <Button variant="link" onClick={() => setSearchQuery('')}>Clear filters</Button>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}