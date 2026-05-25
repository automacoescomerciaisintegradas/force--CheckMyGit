import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { IssueList } from '@/components/git/IssueList';
import { ListFilter, Tag, Milestone } from 'lucide-react';
import { Button } from '@/components/ui/button';
export function GlobalIssuesPage() {
  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h1 className="text-2xl font-bold tracking-tight">Issues</h1>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Tag className="h-4 w-4" /> Labels
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Milestone className="h-4 w-4" /> Milestones
              </Button>
            </div>
          </div>
          <div className="bg-muted/30 border rounded-lg p-2 flex items-center gap-2 overflow-x-auto">
             <Button variant="ghost" size="sm" className="text-xs font-semibold">Created</Button>
             <Button variant="ghost" size="sm" className="text-xs">Assigned</Button>
             <Button variant="ghost" size="sm" className="text-xs">Mentioned</Button>
             <div className="ml-auto flex items-center gap-2">
               <Button variant="outline" size="sm" className="h-8 text-xs gap-1">
                 <ListFilter className="h-3 w-3" /> Filters
               </Button>
             </div>
          </div>
          <IssueList />
        </div>
      </div>
    </AppLayout>
  );
}