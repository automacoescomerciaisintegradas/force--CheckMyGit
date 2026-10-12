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
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button
            onClick={() => setFilter('open')}
            className={cn(
              "flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-colors",
              filter === 'open' ? "text-zinc-900" : "text-zinc-400 hover:text-zinc-600"
            )}
          >
            <CircleDot className={cn("h-4 w-4", filter === 'open' ? "text-green-500" : "text-zinc-200")} />
            Abertos
          </button>
          <button
            onClick={() => setFilter('closed')}
            className={cn(
              "flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-colors",
              filter === 'closed' ? "text-zinc-900" : "text-zinc-400 hover:text-zinc-600"
            )}
          >
            <CheckCircle2 className={cn("h-4 w-4", filter === 'closed' ? "text-purple-500" : "text-zinc-200")} />
            Fechados
          </button>
        </div>
        <Button size="sm" className="bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl h-9 px-4 text-xs font-bold transition-all">
          <Plus className="h-3.5 w-3.5 mr-2" /> Novo Problema
        </Button>
      </div>
      <div className="border border-zinc-100 rounded-2xl bg-white overflow-hidden">
        {issues.length === 0 ? (
          <div className="p-20 text-center space-y-4">
            <CircleDot className="h-10 w-10 text-zinc-100 mx-auto" />
            <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Nenhum problema</h3>
          </div>
        ) : (
          <div className="divide-y divide-zinc-50">
            {issues.map((issue) => (
              <div key={issue.id} className="p-5 px-6 hover:bg-zinc-50/50 transition-colors flex gap-5 group">
                <CircleDot className={cn("h-4 w-4 mt-1 flex-shrink-0", issue.status === 'open' ? "text-green-500/60" : "text-purple-500/60")} />
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-start gap-3 flex-wrap">
                    <Link
                      to={getIssueLink(issue)}
                      className="font-bold text-[15px] text-zinc-800 hover:text-zinc-900 leading-tight"
                    >
                      {issue.title}
                    </Link>
                    {issue.labels.map(label => (
                      <Badge key={label} variant="outline" className="text-[9px] font-bold uppercase tracking-widest border-zinc-100 bg-zinc-50/50 text-zinc-400">
                        {label}
                      </Badge>
                    ))}
                  </div>
                  <div className="text-[11px] font-bold text-zinc-300 uppercase tracking-tighter">
                    #{issue.number} • há {formatDistanceToNow(new Date(issue.createdAt), { locale: ptBR })}
                  </div>
                </div>
                {issue.commentsCount > 0 && (
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-zinc-300 group-hover:text-zinc-900 transition-colors">
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