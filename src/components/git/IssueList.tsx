import React, { useState } from 'react';
import { Link, useParams, useOutletContext } from 'react-router-dom';
import { CircleDot, CheckCircle2, MessageSquare, Plus } from 'lucide-react';
import { MOCK_ISSUES, MOCK_REPOSITORIES } from '@shared/mock-data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/lib/utils';
export function IssueList() {
  const { username, reponame } = useParams();
  const context = useOutletContext<{ repoId?: string }>();
  const repoId = context?.repoId;
  const [filter, setFilter] = useState<'open' | 'closed'>('open');
  const issues = repoId
    ? MOCK_ISSUES.filter(i => i.repoId === repoId && i.status === filter)
    : MOCK_ISSUES.filter(i => i.status === filter);
  const getIssueLink = (issue: any) => {
    if (repoId && username && reponame) {
      return `/${username}/${reponame}/issues/${issue.number}`;
    }
    const repo = MOCK_REPOSITORIES.find(r => r.id === issue.repoId);
    return repo ? `/${repo.ownerUsername}/${repo.name}/issues/${issue.number}` : '#';
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
            <CircleDot className={cn("h-4 w-4", filter === 'open' ? "text-green-500/80" : "text-zinc-200")} />
            Abertos
          </button>
          <button
            onClick={() => setFilter('closed')}
            className={cn(
              "flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.2em] transition-all",
              filter === 'closed' ? "text-zinc-950" : "text-zinc-300 hover:text-zinc-400"
            )}
          >
            <CheckCircle2 className={cn("h-4 w-4", filter === 'closed' ? "text-purple-500/80" : "text-zinc-200")} />
            Fechados
          </button>
        </div>
        <Button size="sm" className="bg-zinc-950 hover:bg-zinc-800 text-white rounded-2xl h-11 px-8 text-[12px] font-bold transition-all shadow-xl shadow-zinc-200/50">
          <Plus className="h-4 w-4 mr-2" /> Novo Problema
        </Button>
      </div>
      <div className="border border-zinc-100 rounded-[32px] bg-white overflow-hidden shadow-ultra-sm">
        {issues.length === 0 ? (
          <div className="py-32 text-center space-y-4">
            <CircleDot className="h-12 w-12 text-zinc-50 mx-auto" />
            <h3 className="text-[12px] font-bold text-zinc-300 uppercase tracking-[0.3em]">Nenhum problema encontrado</h3>
          </div>
        ) : (
          <div className="divide-y divide-zinc-50">
            {issues.map((issue) => (
              <div key={issue.id} className="p-8 px-10 hover:bg-zinc-50/30 transition-all flex gap-8 group">
                <CircleDot className={cn("h-4.5 w-4.5 mt-1.5 flex-shrink-0", issue.status === 'open' ? "text-green-500/30" : "text-purple-500/30")} />
                <div className="space-y-2.5 flex-1 min-w-0">
                  <div className="flex items-center gap-4 flex-wrap">
                    <Link
                      to={getIssueLink(issue)}
                      className="font-bold text-[17px] text-zinc-900 hover:text-zinc-600 transition-colors tracking-tight"
                    >
                      {issue.title}
                    </Link>
                    {issue.labels.map(label => (
                      <Badge key={label} variant="outline" className="text-[9px] font-bold uppercase tracking-widest border-zinc-100 bg-zinc-50/50 text-zinc-400 py-0.5 px-2">
                        {label}
                      </Badge>
                    ))}
                  </div>
                  <div className="text-[11px] font-bold text-zinc-300 uppercase tracking-widest flex items-center gap-3">
                    <span className="text-zinc-950 opacity-80">#{issue.number}</span>
                    <span className="w-1 h-1 rounded-full bg-zinc-100" />
                    <span>há {formatDistanceToNow(new Date(issue.createdAt), { locale: ptBR })}</span>
                  </div>
                </div>
                {issue.commentsCount > 0 && (
                  <div className="flex items-center gap-2 text-[11px] font-bold text-zinc-300 group-hover:text-zinc-950 transition-colors">
                    <MessageSquare className="h-4 w-4" />
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