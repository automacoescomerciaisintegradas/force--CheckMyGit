import React from 'react';
import { useParams, Link, Routes, Route, useLocation } from 'react-router-dom';
import { 
  Star, 
  GitFork, 
  Code, 
  CircleDot, 
  GitPullRequest, 
  Play, 
  ShieldAlert, 
  BarChart2, 
  Settings,
  BookOpen,
  Eye,
  ChevronRight
} from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MOCK_REPOSITORIES } from '@shared/mock-data';
export function RepositoryPage() {
  const { username, reponame } = useParams();
  const location = useLocation();
  const repo = MOCK_REPOSITORIES.find(r => r.name === reponame && r.ownerUsername === username) || MOCK_REPOSITORIES[0];
  const currentTab = location.pathname.split('/').pop() || 'code';
  return (
    <AppLayout>
      <div className="bg-muted/30 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-wrap">
              <BookOpen className="h-5 w-5 text-muted-foreground" />
              <div className="flex items-center text-xl font-semibold tracking-tight">
                <Link to={`/${repo.ownerUsername}`} className="text-primary hover:underline">
                  {repo.ownerUsername}
                </Link>
                <span className="mx-1 text-muted-foreground/50">/</span>
                <Link to={`/${repo.ownerUsername}/${repo.name}`} className="text-primary hover:underline font-bold">
                  {repo.name}
                </Link>
              </div>
              <Badge variant="outline" className="rounded-full text-[10px] px-2 py-0 border-muted-foreground/20">
                {repo.visibility}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-8 gap-1.5 rounded-lg border-muted-foreground/20">
                <Eye className="h-3.5 w-3.5" />
                <span>Watch</span>
                <Badge variant="secondary" className="px-1.5 py-0 text-[10px] ml-1 bg-muted">1.2k</Badge>
              </Button>
              <Button variant="outline" size="sm" className="h-8 gap-1.5 rounded-lg border-muted-foreground/20">
                <GitFork className="h-3.5 w-3.5" />
                <span>Fork</span>
                <Badge variant="secondary" className="px-1.5 py-0 text-[10px] ml-1 bg-muted">{repo.forks}</Badge>
              </Button>
              <Button variant="outline" size="sm" className="h-8 gap-1.5 rounded-lg border-muted-foreground/20 shadow-sm">
                <Star className="h-3.5 w-3.5" />
                <span>Star</span>
                <Badge variant="secondary" className="px-1.5 py-0 text-[10px] ml-1 bg-muted">{repo.stars}</Badge>
              </Button>
            </div>
          </div>
          <div className="mt-6">
            <Tabs defaultValue={currentTab} className="w-full">
              <TabsList className="bg-transparent h-auto p-0 gap-6 overflow-x-auto scrollbar-hide border-none">
                <TabsTrigger value="code" asChild>
                  <Link to={`/${username}/${reponame}`} className="data-[state=active]:border-primary data-[state=active]:bg-transparent border-b-2 border-transparent px-0 py-2 rounded-none gap-2 text-sm font-medium transition-all">
                    <Code className="h-4 w-4" /> Code
                  </Link>
                </TabsTrigger>
                <TabsTrigger value="issues" asChild>
                  <Link to={`/${username}/${reponame}/issues`} className="data-[state=active]:border-primary data-[state=active]:bg-transparent border-b-2 border-transparent px-0 py-2 rounded-none gap-2 text-sm font-medium transition-all">
                    <CircleDot className="h-4 w-4" /> Issues <Badge variant="secondary" className="px-1.5 py-0 ml-1 bg-muted/60">12</Badge>
                  </Link>
                </TabsTrigger>
                <TabsTrigger value="pulls" asChild>
                  <Link to={`/${username}/${reponame}/pulls`} className="data-[state=active]:border-primary data-[state=active]:bg-transparent border-b-2 border-transparent px-0 py-2 rounded-none gap-2 text-sm font-medium transition-all">
                    <GitPullRequest className="h-4 w-4" /> Pull Requests <Badge variant="secondary" className="px-1.5 py-0 ml-1 bg-muted/60">3</Badge>
                  </Link>
                </TabsTrigger>
                <TabsTrigger value="actions" className="data-[state=active]:border-primary data-[state=active]:bg-transparent border-b-2 border-transparent px-0 py-2 rounded-none gap-2 text-sm font-medium transition-all">
                  <Play className="h-4 w-4" /> Actions
                </TabsTrigger>
                <TabsTrigger value="security" className="data-[state=active]:border-primary data-[state=active]:bg-transparent border-b-2 border-transparent px-0 py-2 rounded-none gap-2 text-sm font-medium transition-all">
                  <ShieldAlert className="h-4 w-4" /> Security
                </TabsTrigger>
                <TabsTrigger value="insights" className="data-[state=active]:border-primary data-[state=active]:bg-transparent border-b-2 border-transparent px-0 py-2 rounded-none gap-2 text-sm font-medium transition-all">
                  <BarChart2 className="h-4 w-4" /> Insights
                </TabsTrigger>
                <TabsTrigger value="settings" className="data-[state=active]:border-primary data-[state=active]:bg-transparent border-b-2 border-transparent px-0 py-2 rounded-none gap-2 text-sm font-medium transition-all">
                  <Settings className="h-4 w-4" /> Settings
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route index element={
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1 space-y-6">
                  <div className="border rounded-xl bg-card overflow-hidden shadow-sm">
                    <div className="bg-muted/50 p-4 flex items-center justify-between border-b">
                      <div className="flex items-center gap-2 text-sm font-medium">
                        <Avatar className="h-6 w-6 border shadow-sm">
                          <AvatarImage src={repo.ownerUsername === 'shadcn' ? 'https://github.com/shadcn.png' : ''} />
                          <AvatarFallback>SC</AvatarFallback>
                        </Avatar>
                        <span>Latest commit by madeinlowcode</span>
                      </div>
                      <span className="text-xs text-muted-foreground">3 days ago</span>
                    </div>
                    <div className="divide-y">
                      {['src', 'shared', 'worker', 'package.json', 'README.md'].map(file => (
                        <div key={file} className="flex items-center justify-between p-3 px-4 hover:bg-muted/30 transition-colors cursor-pointer group">
                          <div className="flex items-center gap-3">
                            {file.includes('.') ? <Code className="h-4 w-4 text-muted-foreground/70" /> : <BookOpen className="h-4 w-4 text-blue-500/80" />}
                            <span className="text-sm font-medium group-hover:text-primary">{file}</span>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="hidden sm:inline">Initial commit</span>
                            <span className="w-20 text-right">3 days ago</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="border rounded-xl p-6 bg-card prose prose-sm dark:prose-invert max-w-none shadow-sm">
                    <h1 className="text-2xl font-bold border-b pb-4 mb-4">README.md</h1>
                    <p className="text-muted-foreground leading-relaxed">
                      {repo.description}
                    </p>
                    <h2 className="text-lg font-semibold mt-6 mb-2">Getting Started</h2>
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-xs font-mono">
                      npm install && npm start
                    </pre>
                  </div>
                </div>
                <div className="w-full md:w-72 space-y-6">
                  <section>
                    <h3 className="text-sm font-semibold mb-3">About</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {repo.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {repo.topics.map(t => (
                        <Badge key={t} variant="secondary" className="text-[10px] px-2 py-0 bg-blue-500/10 text-blue-600 border-none">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </section>
                  <section className="pt-4 border-t">
                    <h3 className="text-sm font-semibold mb-3">Releases</h3>
                    <p className="text-xs text-muted-foreground">No releases published</p>
                  </section>
                  <section className="pt-4 border-t">
                    <h3 className="text-sm font-semibold mb-3">Languages</h3>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden flex">
                      <div className="bg-blue-500 w-[85%]" />
                      <div className="bg-yellow-400 w-[15%]" />
                    </div>
                    <div className="mt-3 space-y-1.5">
                      <div className="flex items-center justify-between text-[11px]">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-blue-500" />
                          <span className="font-medium">{repo.language}</span>
                        </div>
                        <span className="text-muted-foreground">85.2%</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px]">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-yellow-400" />
                          <span className="font-medium">JavaScript</span>
                        </div>
                        <span className="text-muted-foreground">14.8%</span>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          } />
          <Route path="issues" element={<div className="p-8 border rounded-xl text-center text-muted-foreground">Issue list implementation in Phase 10</div>} />
          <Route path="pulls" element={<div className="p-8 border rounded-xl text-center text-muted-foreground">PR list implementation in Phase 11</div>} />
        </Routes>
      </div>
    </AppLayout>
  );
}