import React from 'react';
import { CircleDot, MessageSquare, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MOCK_ISSUES } from '@shared/mock-data';
import { cn } from '@/lib/utils';
export function RepoIssuesPage() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="is:issue is:open" className="pl-9 h-9" />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-9"><Filter className="w-4 h-4 mr-2" /> Filters</Button>
          <Button className="h-9 bg-green-600 hover:bg-green-700 text-white">New issue</Button>
        </div>
      </div>
      <div className="border rounded-lg overflow-hidden">
        <div className="bg-muted/50 p-4 flex items-center justify-between border-b font-medium text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 font-bold">
              <CircleDot className="w-4 h-4 text-green-600" />
              12 Open
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <CircleDot className="w-4 h-4" />
              45 Closed
            </div>
          </div>
          <div className="hidden md:flex gap-4 text-muted-foreground">
            <span>Author</span>
            <span>Label</span>
            <span>Assignee</span>
            <span>Sort</span>
          </div>
        </div>
        <div className="divide-y">
          {MOCK_ISSUES.map(issue => (
            <div key={issue.id} className="p-4 hover:bg-muted/30 transition-colors flex gap-3">
              <CircleDot className={cn("w-4 h-4 mt-1 flex-shrink-0", issue.status === 'open' ? "text-green-600" : "text-red-600")} />
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <a href="#" className="font-bold text-lg hover:text-blue-600">{issue.title}</a>
                  {issue.labels.map(label => (
                    <Badge key={label.name} variant="outline" className={cn("text-[10px] h-4 font-normal", label.color)}>
                      {label.name}
                    </Badge>
                  ))}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  #{issue.id} opened {new Date(issue.createdAt).toLocaleDateString()} by {issue.authorId}
                </div>
              </div>
              {issue.commentsCount > 0 && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1 h-fit">
                  <MessageSquare className="w-3 h-3" />
                  {issue.commentsCount}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}