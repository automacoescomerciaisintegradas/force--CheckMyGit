import React from 'react';
import { Link } from 'react-router-dom';
import { CircleDot, MessageSquare, Search, Filter, Inbox, Send, Hash } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MOCK_ISSUES, MOCK_REPOS } from '@shared/mock-data';
import { cn } from '@/lib/utils';
export function GlobalIssuesPage() {
  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight">Issues</h1>
          </div>
          <Tabs defaultValue="created" className="w-full">
            <TabsList className="bg-transparent border-b rounded-none h-auto p-0 gap-6 w-full justify-start">
              <TabsTrigger
                value="created"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-orange-500 data-[state=active]:bg-transparent px-0 pb-2 flex items-center gap-2 transition-all"
              >
                <Inbox className="w-4 h-4" /> Created
              </TabsTrigger>
              <TabsTrigger
                value="assigned"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-orange-500 data-[state=active]:bg-transparent px-0 pb-2 flex items-center gap-2 transition-all"
              >
                <Hash className="w-4 h-4" /> Assigned
              </TabsTrigger>
              <TabsTrigger
                value="mentioned"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-orange-500 data-[state=active]:bg-transparent px-0 pb-2 flex items-center gap-2 transition-all"
              >
                <Send className="w-4 h-4" /> Mentioned
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="is:issue is:open author:forge-dev" className="pl-9 h-9" />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-9 font-medium">Labels</Button>
              <Button variant="outline" size="sm" className="h-9 font-medium">Milestones</Button>
              <Button className="h-9 bg-green-600 hover:bg-green-700 text-white font-medium border-none shadow-sm">New issue</Button>
            </div>
          </div>
          <div className="border rounded-lg overflow-hidden bg-card shadow-sm">
            <div className="bg-muted/30 p-4 flex items-center justify-between border-b font-medium text-sm">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 font-bold">
                  <CircleDot className="w-4 h-4 text-green-600" />
                  {MOCK_ISSUES.length} Open
                </div>
                <div className="flex items-center gap-1 text-muted-foreground font-normal">
                  <CircleDot className="w-4 h-4" />
                  0 Closed
                </div>
              </div>
              <div className="hidden lg:flex gap-6 text-muted-foreground font-normal text-xs uppercase tracking-tight">
                <span className="flex items-center gap-1 cursor-pointer hover:text-foreground">Author <Filter className="w-3 h-3" /></span>
                <span className="flex items-center gap-1 cursor-pointer hover:text-foreground">Label <Filter className="w-3 h-3" /></span>
                <span className="flex items-center gap-1 cursor-pointer hover:text-foreground">Project <Filter className="w-3 h-3" /></span>
                <span className="flex items-center gap-1 cursor-pointer hover:text-foreground">Sort <Filter className="w-3 h-3" /></span>
              </div>
            </div>
            <div className="divide-y">
              {MOCK_ISSUES.map(issue => {
                const repo = MOCK_REPOS.find(r => r.id === issue.repoId);
                return (
                  <div key={issue.id} className="p-4 hover:bg-muted/20 transition-all flex gap-3 group cursor-pointer">
                    <CircleDot className="w-4 h-4 mt-1 flex-shrink-0 text-green-600" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        {repo && (
                          <Link to={`/${repo.owner}/${repo.name}`} className="text-muted-foreground text-sm font-medium hover:text-blue-600 transition-colors">
                            {repo.owner}/{repo.name}
                          </Link>
                        )}
                        <Link to={`/${repo?.owner}/${repo?.name}/issues/${issue.id}`} className="font-bold text-base hover:text-blue-600 transition-colors">
                          {issue.title}
                        </Link>
                        {issue.labels.map(label => (
                          <Badge key={label.name} variant="outline" className={cn("text-[10px] h-4 font-normal", label.color)}>
                            {label.name}
                          </Badge>
                        ))}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                        #{issue.id} opened {new Date(issue.createdAt).toLocaleDateString()} by <span className="hover:text-blue-600 cursor-pointer transition-colors font-medium">{issue.authorId}</span>
                      </div>
                    </div>
                    {issue.commentsCount > 0 && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <MessageSquare className="w-3.5 h-3.5" />
                        {issue.commentsCount}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}