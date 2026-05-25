import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { GitPullRequest, GitMerge, CheckCircle2, Plus } from 'lucide-react';
import { MOCK_PRS, MOCK_REPOSITORIES } from '@shared/mock-data';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';
interface PRListProps {
  repoId?: string;
}
export function PullRequestList({ repoId }: PRListProps) {
  const { username, reponame } = useParams();
  const [filter, setFilter] = useState<'open' | 'merged'>('open');
  const prs = repoId
    ? MOCK_PRS.filter(p => p.repoId === repoId && (filter === 'open' ? p.status === 'open' : p.status === 'merged'))
    : MOCK_PRS.filter(p => (filter === 'open' ? p.status === 'open' : p.status === 'merged'));
  const getRepoContext = (prRepoId: string) => {
    const repo = MOCK_REPOSITORIES.find(r => r.id === prRepoId);
    return repo ? `${repo.ownerUsername}/${repo.name}` : 'unknown/repo';
  };
  const getPRLink = (pr: any) => {
    if (repoId && username && reponame) {
      return `/${username}/${reponame}/pulls/${pr.number}`;
    }
    const repo = MOCK_REPOSITORIES.find(r => r.id === pr.repoId);
    return repo ? `/${repo.ownerUsername}/${repo.name}/pulls/${pr.number}` : '#';
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setFilter('open')}
            className={cn(
              "flex items-center gap-1.5 text-sm font-medium transition-colors",
              filter === 'open' ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <GitPullRequest className={cn("h-4 w-4", filter === 'open' && "text-green-500")} />
            {repoId 
              ? MOCK_PRS.filter(p => p.repoId === repoId && p.status === 'open').length 
              : MOCK_PRS.filter(p => p.status === 'open').length} Open
          </button>
          <button
            onClick={() => setFilter('merged')}
            className={cn(
              "flex items-center gap-1.5 text-sm font-medium transition-colors",
              filter === 'merged' ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <GitMerge className={cn("h-4 w-4", filter === 'merged' && "text-purple-500")} />
            {repoId 
              ? MOCK_PRS.filter(p => p.repoId === repoId && p.status === 'merged').length 
              : MOCK_PRS.filter(p => p.status === 'merged').length} Merged
          </button>
        </div>
        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg gap-1.5">
          <Plus className="h-4 w-4" /> New Pull Request
        </Button>
      </div>
      <div className="border rounded-xl bg-card overflow-hidden shadow-sm">
        {prs.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <GitPullRequest className="h-12 w-12 text-muted-foreground/30 mx-auto" />
            <h3 className="text-lg font-semibold">No pull requests found</h3>
            <p className="text-muted-foreground">There are no {filter} pull requests to display.</p>
          </div>
        ) : (
          <div className="divide-y">
            {prs.map((pr) => (
              <div key={pr.id} className="p-4 hover:bg-muted/30 transition-colors flex gap-4">
                {pr.status === 'merged' ? (
                  <GitMerge className="h-5 w-5 mt-0.5 flex-shrink-0 text-purple-500" />
                ) : (
                  <GitPullRequest className="h-5 w-5 mt-0.5 flex-shrink-0 text-green-500" />
                )}
                <div className="space-y-1 flex-1 min-w-0">
                  <div className="flex items-start gap-2">
                    <Link
                      to={getPRLink(pr)}
                      className="font-bold text-base hover:text-primary transition-colors leading-tight"
                    >
                      {!repoId && <span className="text-muted-foreground font-normal mr-1">{getRepoContext(pr.repoId)}</span>}
                      {pr.title}
                    </Link>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    #{pr.number} {pr.status === 'merged' ? 'merged' : 'opened'} {formatDistanceToNow(new Date(pr.mergedAt || pr.createdAt))} ago
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}