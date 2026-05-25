import React from 'react';
import { useParams, Link, useOutletContext } from 'react-router-dom';
import { GitPullRequest, GitMerge, ChevronLeft, GitBranch, Terminal, CheckCircle2 } from 'lucide-react';
import { MOCK_PRS, MOCK_COMMENTS, MOCK_USERS } from '@shared/mock-data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CommentThread } from '@/components/git/CommentThread';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
export function PullRequestDetailPage() {
  const { number, username, reponame } = useParams();
  const context = useOutletContext<{ repoId: string }>();
  const repoId = context?.repoId || 'r1';
  const pr = MOCK_PRS.find(p => p.repoId === repoId && p.number === parseInt(number || '0'));
  const comments = MOCK_COMMENTS[pr?.id || ''] || [];
  const author = MOCK_USERS.find(u => u.id === pr?.authorId);
  if (!pr) return (
    <div className="py-32 text-center space-y-6">
      <div className="text-zinc-100 font-bold text-7xl">404</div>
      <div className="text-zinc-400 font-bold uppercase tracking-[0.2em] text-sm">Solicitação não encontrada</div>
      <Button asChild variant="outline" className="rounded-xl">
        <Link to={`/${username}/${reponame}/pulls`}>Voltar para a Lista</Link>
      </Button>
    </div>
  );
  return (
    <div className="max-w-5xl mx-auto space-y-12">
      <div className="space-y-6 pb-10 border-b border-zinc-100">
        <Link to={`/${username}/${reponame}/pulls`} className="inline-flex items-center gap-2 text-xs font-bold text-zinc-400 uppercase tracking-widest hover:text-zinc-900 transition-colors">
          <ChevronLeft className="h-4 w-4" /> Voltar
        </Link>
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 leading-tight">
            {pr.title} <span className="text-zinc-300 font-light">#{pr.number}</span>
          </h1>
        </div>
        <div className="flex items-center gap-4 flex-wrap">
          <Badge className={`rounded-xl px-4 py-1 font-bold uppercase tracking-widest text-[10px] border-0 shadow-none ${pr.status === 'open' ? "bg-green-500/10 text-green-600" : "bg-purple-500/10 text-purple-600"}`}>
            {pr.status === 'merged' ? <GitMerge className="w-3 h-3 mr-2" /> : <GitPullRequest className="w-3 h-3 mr-2" />}
            {pr.status === 'open' ? 'Aberta' : 'Mesclada'}
          </Badge>
          <p className="text-[13px] font-medium text-zinc-400">
            <span className="text-zinc-900 font-bold">{author?.username}</span> quer mesclar em <Badge variant="secondary" className="px-2 py-0.5 font-bold text-[10px] bg-zinc-50 border border-zinc-100">{pr.baseBranch || 'main'}</Badge> a partir de <Badge variant="secondary" className="px-2 py-0.5 font-bold text-[10px] bg-zinc-50 border border-zinc-100">{pr.headBranch || 'feat'}</Badge>
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-16">
        <div className="lg:col-span-3 space-y-12">
          <CommentThread originalPost={pr.description} authorId={pr.authorId} createdAt={pr.createdAt} comments={comments} />
          <div className="border border-zinc-100 rounded-3xl overflow-hidden bg-white">
            <div className="p-8 bg-zinc-50/50 flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-zinc-100">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-green-500/10 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-sm font-bold text-zinc-900">Pronto para mesclagem</h4>
                  <p className="text-xs text-zinc-400 font-medium">Sem conflitos detectados com o ramo base.</p>
                </div>
              </div>
              <Button 
                disabled={pr.status === 'merged'}
                className="bg-zinc-900 text-white hover:bg-zinc-800 rounded-xl px-8 h-12 font-bold transition-all shadow-lg shadow-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {pr.status === 'merged' ? 'Solicitação Mesclada' : 'Mesclar Solicitação'}
              </Button>
            </div>
            <div className="p-5 px-8 bg-white text-[10px] font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-8">
              <span className="flex items-center gap-2"><GitBranch className="w-3.5 h-3.5" /> 12 commits</span>
              <span className="flex items-center gap-2"><Terminal className="w-3.5 h-3.5" /> 4 arquivos alterados</span>
            </div>
          </div>
        </div>
        <aside className="space-y-8">
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold text-zinc-300 uppercase tracking-[0.2em]">Revisores</h4>
            <p className="text-xs text-zinc-400 font-medium italic">Pendente</p>
          </div>
        </aside>
      </div>
    </div>
  );
}