import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { GitPullRequest, GitMerge, ChevronLeft, GitBranch, Terminal } from 'lucide-react';
import { MOCK_PRS, MOCK_COMMENTS, MOCK_USERS } from '@shared/mock-data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CommentThread } from '@/components/git/CommentThread';
import { formatDistanceToNow } from 'date-fns';
export function PullRequestDetailPage({ repoId }: { repoId: string }) {
  const { number, username, reponame } = useParams();
  const pr = MOCK_PRS.find(p => p.repoId === repoId && p.number === parseInt(number || '0'));
  const comments = MOCK_COMMENTS[pr?.id || ''] || [];
  const author = MOCK_USERS.find(u => u.id === pr?.authorId);
  if (!pr) return <div className="py-12 text-center">Pull Request not found</div>;
  return (
    <div className="space-y-6">
      <div className="space-y-4 pb-6 border-b">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Button variant="ghost" size="sm" asChild className="-ml-2 h-8">
            <Link to={`/${username}/${reponame}/pulls`}>
              <ChevronLeft className="h-4 w-4 mr-1" /> Back to Pull Requests
            </Link>
          </Button>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-3xl font-semibold tracking-tight">
            {pr.title} <span className="text-muted-foreground font-light">#{pr.number}</span>
          </h1>
          <Button size="sm" variant="outline" className="hidden sm:flex">Edit</Button>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <Badge className={pr.status === 'open' ? "bg-green-600 hover:bg-green-600" : "bg-purple-600 hover:bg-purple-600"}>
            {pr.status === 'merged' ? <GitMerge className="w-3 h-3 mr-1" /> : <GitPullRequest className="w-3 h-3 mr-1" />}
            {pr.status.charAt(0).toUpperCase() + pr.status.slice(1)}
          </Badge>
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{author?.username}</span> wants to merge changes into <Badge variant="secondary" className="px-1 py-0 font-mono text-xs">{pr.baseBranch || 'main'}</Badge> from <Badge variant="secondary" className="px-1 py-0 font-mono text-xs">{pr.headBranch || 'feat-branch'}</Badge>
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-8">
          <CommentThread originalPost={pr.description} authorId={pr.authorId} createdAt={pr.createdAt} comments={comments} />
          <div className="border rounded-xl overflow-hidden bg-card">
            <div className="p-4 bg-muted/30 border-b flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                  <GitMerge className="w-3.5 h-3.5 text-green-600" />
                </div>
                <span className="text-sm font-semibold">This branch has no conflicts with the base branch</span>
              </div>
              <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">Merge Pull Request</Button>
            </div>
            <div className="p-4 bg-muted/10 text-xs text-muted-foreground flex items-center gap-4">
              <span className="flex items-center gap-1"><GitBranch className="w-3 h-3" /> 12 commits</span>
              <span className="flex items-center gap-1"><Terminal className="w-3 h-3" /> 4 files changed</span>
            </div>
          </div>
        </div>
        <aside className="space-y-6">
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Reviewers</h4>
            <p className="text-sm text-muted-foreground italic">No reviewers assigned</p>
          </div>
          <div className="space-y-2 pt-4 border-t">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Assignees</h4>
            <p className="text-sm text-muted-foreground italic">No one assigned</p>
          </div>
        </aside>
      </div>
    </div>
  );
}