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
  ChevronRight,
  FileText,
  Folder
} from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { MOCK_REPOSITORIES } from '@shared/mock-data';
import { FileBrowser } from '@/components/git/FileBrowser';
import { CodeViewer } from '@/components/git/CodeViewer';
import { IssueList } from '@/components/git/IssueList';
import { PullRequestList } from '@/components/git/PullRequestList';
export function RepositoryPage() {
  const { username, reponame } = useParams();
  const location = useLocation();
  const repo = MOCK_REPOSITORIES.find(r => r.name === reponame && r.ownerUsername === username) || MOCK_REPOSITORIES[0];
  const pathParts = location.pathname.split('/');
  const currentView = pathParts[3] || 'code';
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
            <Tabs value={currentView} className="w-full">
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
          <Route index element={<FileBrowser repoId={repo.id} />} />
          <Route path="tree/:branch/*" element={<FileBrowser repoId={repo.id} />} />
          <Route path="blob/:branch/*" element={<CodeViewer repoId={repo.id} />} />
          <Route path="issues" element={<IssueList repoId={repo.id} />} />
          <Route path="pulls" element={<PullRequestList repoId={repo.id} />} />
        </Routes>
      </div>
    </AppLayout>
  );
}