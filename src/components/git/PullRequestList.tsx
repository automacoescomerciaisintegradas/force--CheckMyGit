import React, { useState } from 'react';
import { Link, useParams, useOutletContext } from 'react-router-dom';
import { GitPullRequest, GitMerge, CheckCircle2, Plus } from 'lucide-react';
import { MOCK_PRS, MOCK_REPOSITORIES } from '@shared/mock-data';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/lib/utils';
export function PullRequestList() {
  const { username, reponame } = useParams();
  const context = useOutletContext<{ repoId?: string }>();
  const repoId = context?.repoId;
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
              : MOCK_PRS.filter(p => p.status === 'open').length} Abertas
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
              : MOCK_PRS.filter(p => p.status === 'merged').length} Mescladas
          </button>
        </div>
        <Button size="sm" className="bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl gap-1.5 px-4">
          <Plus className="h-4 w-4" /> Nova Solicitação
        </Button>
      </div>
      <div className="border border-zinc-100 rounded-2xl bg-white overflow-hidden shadow-none">
        {prs.length === 0 ? (
          <div className="p-20 text-center space-y-4">
            <GitPullRequest className="h-10 w-10 text-zinc-100 mx-auto" />
            <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Nenhuma solicitação</h3>
          </div>
        ) : (
          <div className="divide-y divide-zinc-50">
            {prs.map((pr) => (
              <div key={pr.id} className="p-5 px-6 hover:bg-zinc-50/50 transition-colors flex gap-5 group">
                {pr.status === 'merged' ? (
                  <GitMerge className="h-4 w-4 mt-1 flex-shrink-0 text-purple-500/60" />
                ) : (
                  <GitPullRequest className="h-4 w-4 mt-1 flex-shrink-0 text-green-500/60" />
                )}
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-start gap-2 flex-wrap">
                    <Link
                      to={getPRLink(pr)}
                      className="font-bold text-[15px] text-zinc-800 hover:text-zinc-900 transition-colors leading-tight"
                    >
                      {!repoId && <span className="text-zinc-400 font-medium mr-2">{getRepoContext(pr.repoId)}</span>}
                      {pr.title}
                    </Link>
                  </div>
                  <div className="text-[11px] font-bold text-zinc-300 uppercase tracking-tighter">
                    #{pr.number} • {pr.status === 'merged' ? 'mesclada' : 'aberta'} há {formatDistanceToNow(new Date(pr.mergedAt || pr.createdAt), { locale: ptBR })}
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