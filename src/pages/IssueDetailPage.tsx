import React from 'react';
import { useParams, Link, useOutletContext } from 'react-router-dom';
import { CircleDot, CheckCircle2, ChevronLeft } from 'lucide-react';
import { MOCK_ISSUES, MOCK_COMMENTS, MOCK_USERS } from '@shared/mock-data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CommentThread } from '@/components/git/CommentThread';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
export function IssueDetailPage() {
  const { number, username, reponame } = useParams();
  const context = useOutletContext<{ repoId: string }>();
  const repoId = context?.repoId || 'r1';
  const issue = MOCK_ISSUES.find(i => i.repoId === repoId && i.number === parseInt(number || '0'));
  const comments = MOCK_COMMENTS[issue?.id || ''] || [];
  const author = MOCK_USERS.find(u => u.id === issue?.authorId);
  if (!issue) return (
    <div className="py-32 text-center space-y-6">
      <div className="text-zinc-100 font-bold text-7xl">404</div>
      <div className="text-zinc-400 font-bold uppercase tracking-[0.2em] text-sm">Problema não encontrado</div>
      <Button asChild variant="outline" className="rounded-xl">
        <Link to={`/${username}/${reponame}/issues`}>Voltar para a Lista</Link>
      </Button>
    </div>
  );
  return (
    <div className="max-w-5xl mx-auto space-y-12">
      <div className="space-y-6 pb-10 border-b border-zinc-100">
        <Link to={`/${username}/${reponame}/issues`} className="inline-flex items-center gap-2 text-xs font-bold text-zinc-400 uppercase tracking-widest hover:text-zinc-900 transition-colors">
          <ChevronLeft className="h-4 w-4" /> Voltar
        </Link>
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 leading-tight">
            {issue.title} <span className="text-zinc-300 font-light">#{issue.number}</span>
          </h1>
          <Button size="sm" className="bg-zinc-900 text-white rounded-xl h-10 px-6 font-bold hover:bg-zinc-800 transition-all">Novo Problema</Button>
        </div>
        <div className="flex items-center gap-4 flex-wrap">
          <Badge className={`rounded-xl px-4 py-1 font-bold uppercase tracking-widest text-[10px] border-0 shadow-none ${issue.status === 'open' ? "bg-green-500/10 text-green-600" : "bg-purple-500/10 text-purple-600"}`}>
            {issue.status === 'open' ? <CircleDot className="w-3 h-3 mr-2" /> : <CheckCircle2 className="w-3 h-3 mr-2" />}
            {issue.status === 'open' ? 'Aberto' : 'Fechado'}
          </Badge>
          <p className="text-[13px] font-medium text-zinc-400">
            <span className="text-zinc-900 font-bold">{author?.username}</span> abriu há {formatDistanceToNow(new Date(issue.createdAt), { locale: ptBR })} • {issue.commentsCount} comentários
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-16">
        <div className="lg:col-span-3">
          <CommentThread originalPost={issue.description} authorId={issue.authorId} createdAt={issue.createdAt} comments={comments} />
        </div>
        <aside className="space-y-8">
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold text-zinc-300 uppercase tracking-[0.2em]">Responsáveis</h4>
            <p className="text-xs text-zinc-400 font-medium">Ninguém atribuído</p>
          </div>
          <Separator className="bg-zinc-50" />
          <div className="space-y-4">
            <h4 className="text-[10px] font-bold text-zinc-300 uppercase tracking-[0.2em]">Rótulos</h4>
            <div className="flex flex-wrap gap-1.5">
              {issue.labels.length > 0 ? issue.labels.map(l => (
                <Badge key={l} variant="outline" className="text-[10px] font-bold uppercase border-zinc-100 bg-zinc-50/50 text-zinc-400">{l}</Badge>
              )) : (
                <p className="text-xs text-zinc-400 font-medium">Nenhum</p>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}