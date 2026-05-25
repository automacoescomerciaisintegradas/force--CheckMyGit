import React from 'react';
import { CheckCircle2, XCircle, PlayCircle, Clock, GitBranch, History } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { WorkflowRun } from '@shared/types';
export function RepoActionsPage() {
  const runs: WorkflowRun[] = [
    { id: '1', repoId: 'r1', name: 'CI/CD Pipeline', status: 'success', event: 'push', branch: 'main', author: 'forge-dev', commitSha: 'a1b2c3d', duration: '2m 34s', createdAt: '10 mins ago' },
    { id: '2', repoId: 'r1', name: 'Release Workflow', status: 'failure', event: 'tag', branch: 'v1.0.2', author: 'forge-dev', commitSha: 'e5f6g7h', duration: '5m 12s', createdAt: '2 hours ago' },
    { id: '3', repoId: 'r1', name: 'CI/CD Pipeline', status: 'in_progress', event: 'push', branch: 'feat/actions-ui', author: 'alice', commitSha: 'i9j0k1l', duration: 'Running...', createdAt: 'Just now' },
  ];
  const getStatusIcon = (status: WorkflowRun['status']) => {
    switch (status) {
      case 'success': return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'failure': return <XCircle className="w-5 h-5 text-red-600" />;
      case 'in_progress': return <PlayCircle className="w-5 h-5 text-blue-500 animate-pulse" />;
      default: return <Clock className="w-5 h-5 text-muted-foreground" />;
    }
  };
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <History className="w-5 h-5 text-muted-foreground" /> All Workflows
        </h2>
        <Badge variant="outline" className="font-mono">Total Runs: {runs.length}</Badge>
      </div>
      <div className="border rounded-lg bg-card overflow-hidden shadow-sm">
        <div className="divide-y">
          {runs.map((run) => (
            <div key={run.id} className="p-4 flex items-center gap-4 hover:bg-muted/30 transition-colors">
              <div className="flex-shrink-0">{getStatusIcon(run.status)}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-blue-600 hover:underline cursor-pointer truncate">{run.name}</span>
                  <Badge variant="secondary" className="text-[10px] uppercase">{run.event}</Badge>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1 flex-wrap">
                  <span className="flex items-center gap-1"><GitBranch className="w-3 h-3" /> {run.branch}</span>
                  <span>·</span>
                  <span className="font-mono">{run.commitSha}</span>
                  <span>·</span>
                  <span>by <span className="text-foreground font-medium">{run.author}</span></span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1 text-xs text-muted-foreground whitespace-nowrap">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {run.duration}</span>
                <span>{run.createdAt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}