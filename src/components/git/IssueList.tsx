import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CircleDot, CheckCircle2, MessageSquare, Plus } from 'lucide-react';
import { MOCK_ISSUES, MOCK_REPOSITORIES } from '@shared/mock-data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';
interface IssueListProps {
  repoId?: string;
}
export function IssueList({ repoId }: IssueListProps) {
  const { username, reponame } = useParams();
  const [filter, setFilter] = useState<'open' | 'closed'>('open');
  const issues = repoId 
    ? MOCK_ISSUES.filter(i => i.repoId === repoId && i.status === filter)
    : MOCK_ISSUES.filter(i => i.status === filter);
  const getRepoContext = (issueRepoId: string) => {
    const repo = MOCK_REPOSITORIES.find(r => r.id === issueRepoId);
    return repo ? `${repo.ownerUsername}/${repo.name}` : 'unknown/repo';
  };
  const getIssueLink = (issue: any) => {
    if (repoId && username && reponame) {
      return `/${username}/${reponame}/issues/${issue.number}`;
    }
    const repo = MOCK_REPOSITORIES.find(r => r.id === issue.repoId);
    return repo ? `/${repo.ownerUsername}/${repo.name}/issues/${issue.number}` : '#';
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
            <CircleDot className={cn("h-4 w-4", filter === 'open' && "text-green-500")} />
            {repoId 
              ? MOCK_ISSUES.filter(i => i.repoId === repoId && i.status === 'open').length 
              : MOCK_ISSUES.filter(i => i.status === 'open').length} Open
          </button>
          <button
            onClick={() => setFilter('closed')}
            className={cn(
              "flex items-center gap-1.5 text-sm font-medium transition-colors",
              filter === 'closed' ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <CheckCircle2 className={cn("h-4 w-4", filter === 'closed' && "text-purple-500")} />
            {repoId 
              ? MOCK_ISSUES.filter(i => i.repoId === repoId && i.status === 'closed').length 
              : MOCK_ISSUES.filter(i => i.status === 'closed').length} Closed
          </button>
        </div>
        <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white rounded-lg gap-1.5">
          <Plus className="h-4 w-4" /> New Issue
        </Button>
      </div>
      <div className="border rounded-xl bg-card overflow-hidden shadow-sm">
        {issues.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <CircleDot className="h-12 w-12 text-muted-foreground/30 mx-auto" />
            <h3 className="text-lg font-semibold">No issues found</h3>
            <p className="text-muted-foreground">There are no {filter} issues to display.</p>
          </div>
        ) : (
          <div className="divide-y">
            {issues.map((issue) => (
              <div key={issue.id} className="p-4 hover:bg-muted/30 transition-colors flex gap-4 group">
                <CircleDot className={cn("h-5 w-5 mt-0.5 flex-shrink-0", issue.status === 'open' ? "text-green-500" : "text-purple-500")} />
                <div className="space-y-1 flex-1 min-w-0">
                  <div className="flex items-start gap-2 flex-wrap">
                    <Link
                      to={getIssueLink(issue)}
                      className="font-bold text-base hover:text-primary transition-colors leading-tight"
                    >
                      {!repoId && <span className="text-muted-foreground font-normal mr-1">{getRepoContext(issue.repoId)}</span>}
                      {issue.title}
                    </Link>
                    <div className="flex gap-1">
                      {issue.labels.map(label => (
                        <Badge key={label} variant="outline" className="text-[10px] py-0 border-primary/20 bg-primary/5 text-primary">
                          {label}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    #{issue.number} opened {formatDistanceToNow(new Date(issue.createdAt))} ago
                  </div>
                </div>
                {issue.commentsCount > 0 && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground group-hover:text-primary transition-colors">
                    <MessageSquare className="h-3.5 w-3.5" />
                    <span>{issue.commentsCount}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}