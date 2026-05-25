import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { PullRequestList } from '@/components/git/PullRequestList';
import { ListFilter, GitPullRequest } from 'lucide-react';
import { Button } from '@/components/ui/button';
export function GlobalPullRequestsPage() {
  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight">Pull Requests</h1>
          </div>
          <div className="bg-muted/30 border rounded-lg p-2 flex items-center gap-2 overflow-x-auto">
             <Button variant="ghost" size="sm" className="text-xs font-semibold">Created</Button>
             <Button variant="ghost" size="sm" className="text-xs">Assigned</Button>
             <Button variant="ghost" size="sm" className="text-xs">Mentioned</Button>
             <Button variant="ghost" size="sm" className="text-xs">Review requests</Button>
             <div className="ml-auto">
               <Button variant="outline" size="sm" className="h-8 text-xs gap-1">
                 <ListFilter className="h-3 w-3" /> Filters
               </Button>
             </div>
          </div>
          <PullRequestList />
        </div>
      </div>
    </AppLayout>
  );
}