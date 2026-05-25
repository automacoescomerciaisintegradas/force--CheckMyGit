import React from 'react';
import { GitPullRequest, Search, Filter, MessageSquare, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
export function RepoPullRequestsPage() {
  const pulls = [
    { id: '34', title: 'feat: add dark mode support', author: 'forge-dev', status: 'open', date: 'Yesterday', comments: 5, checks: 'pass' },
    { id: '33', title: 'fix: broken breadcrumbs on mobile', author: 'alice', status: 'merged', date: '2 days ago', comments: 2, checks: 'pass' },
  ];
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="is:pr is:open" className="pl-9 h-9" />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-9">Filters</Button>
          <Button className="h-9 bg-green-600 hover:bg-green-700 text-white font-medium">New pull request</Button>
        </div>
      </div>
      <div className="border rounded-lg overflow-hidden bg-card">
        <div className="bg-muted/30 p-4 flex items-center justify-between border-b font-medium text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 font-bold">
              <GitPullRequest className="w-4 h-4 text-green-600" />
              {pulls.filter(p => p.status === 'open').length} Open
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <CheckCircle2 className="w-4 h-4" />
              {pulls.filter(p => p.status === 'merged').length} Merged
            </div>
          </div>
          <div className="hidden md:flex gap-4 text-muted-foreground font-normal">
            <span>Author</span>
            <span>Labels</span>
            <span>Projects</span>
            <span>Sort</span>
          </div>
        </div>
        <div className="divide-y">
          {pulls.map(pr => (
            <div key={pr.id} className="p-4 hover:bg-muted/20 transition-colors flex gap-3 group">
              <GitPullRequest className={cn("w-4 h-4 mt-1 flex-shrink-0", pr.status === 'open' ? "text-green-600" : "text-purple-600")} />
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <a href="#" className="font-bold text-lg hover:text-blue-600 transition-colors">{pr.title}</a>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  #{pr.id} opened {pr.date} by <span className="hover:text-blue-600 cursor-pointer">{pr.author}</span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-muted-foreground">
                {pr.checks === 'pass' && <CheckCircle2 className="w-4 h-4 text-green-600" />}
                {pr.comments > 0 && (
                  <div className="flex items-center gap-1 text-xs">
                    <MessageSquare className="w-3.5 h-3.5" /> {pr.comments}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}