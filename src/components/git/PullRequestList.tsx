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
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-10">
          <button
            onClick={() => setFilter('open')}
            className={cn(
              "flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.2em] transition-all",
              filter === 'open' ? "text-zinc-950" : "text-zinc-300 hover:text-zinc-400"
            )}
          >
            <GitPullRequest className={cn("h-4 w-4", filter === 'open' ? "text-green-500/80" : "text-zinc-200")} />
            Abertas
          </button>
          <button
            onClick={() => setFilter('merged')}
            className={cn(
              "flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.2em] transition-all",
              filter === 'merged' ? "text-zinc-950" : "text-zinc-300 hover:text-zinc-400"
            )}
          >
            <GitMerge className={cn("h-4 w-4", filter === 'merged' ? "text-purple-500/80" : "text-zinc-200")} />
            Mescladas
          </button>
        </div>
        <Button size="sm" className="bg-zinc-950 hover:bg-zinc-800 text-white rounded-2xl h-11 px-8 text-[12px] font-bold transition-all shadow-xl shadow-zinc-200/50">
          <Plus className="h-4 w-4 mr-2" /> Nova Solicitação
        </Button>
      </div>
      <div className="border border-zinc-100 rounded-[32px] bg-white overflow-hidden shadow-ultra-sm">
        {prs.length === 0 ? (
          <div className="py-32 text-center space-y-4">
            <GitPullRequest className="h-12 w-12 text-zinc-50 mx-auto" />
            <h3 className="text-[12px] font-bold text-zinc-300 uppercase tracking-[0.3em]">Nenhuma solicitação encontrada</h3>
          </div>
        ) : (
          <div className="divide-y divide-zinc-50">
            {prs.map((pr) => (
              <div key={pr.id} className="p-8 px-10 hover:bg-zinc-50/30 transition-all flex gap-8 group">
                {pr.status === 'merged' ? (
                  <GitMerge className="h-4.5 w-4.5 mt-1.5 flex-shrink-0 text-purple-500/30" />
                ) : (
                  <GitPullRequest className="h-4.5 w-4.5 mt-1.5 flex-shrink-0 text-green-500/30" />
                )}
                <div className="space-y-2.5 flex-1 min-w-0">
                  <div className="flex items-center gap-4 flex-wrap">
                    <Link
                      to={getPRLink(pr)}
                      className="font-bold text-[17px] text-zinc-900 hover:text-zinc-600 transition-colors tracking-tight"
                    >
                      {!repoId && <span className="text-zinc-300 font-medium mr-2 tracking-normal">@{getRepoContext(pr.repoId)}</span>}
                      {pr.title}
                    </Link>
                  </div>
                  <div className="text-[11px] font-bold text-zinc-300 uppercase tracking-widest flex items-center gap-3">
                    <span className="text-zinc-950 opacity-80">#{pr.number}</span>
                    <span className="w-1 h-1 rounded-full bg-zinc-100" />
                    <span>{pr.status === 'merged' ? 'mesclada' : 'aberta'} há {formatDistanceToNow(new Date(pr.mergedAt || pr.createdAt), { locale: ptBR })}</span>
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