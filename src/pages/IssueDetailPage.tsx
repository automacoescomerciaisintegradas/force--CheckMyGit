import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CircleDot, CheckCircle2, ChevronLeft, MoreHorizontal, Smile } from 'lucide-react';
import { MOCK_ISSUES, MOCK_COMMENTS, MOCK_USERS } from '@shared/mock-data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { CommentThread } from '@/components/git/CommentThread';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
export function IssueDetailPage({ repoId }: { repoId: string }) {
  const { number, username, reponame } = useParams();
  const issue = MOCK_ISSUES.find(i => i.repoId === repoId && i.number === parseInt(number || '0'));
  const comments = MOCK_COMMENTS[issue?.id || ''] || [];
  const author = MOCK_USERS.find(u => u.id === issue?.authorId);
  if (!issue) return <div className="py-12 text-center">Problema não encontrado</div>;
  return (
    <div className="space-y-6">
      <div className="space-y-4 pb-6 border-b">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Button variant="ghost" size="sm" asChild className="-ml-2 h-8">
            <Link to={`/${username}/${reponame}/issues`}>
              <ChevronLeft className="h-4 w-4 mr-1" /> Voltar para Problemas
            </Link>
          </Button>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-3xl font-semibold tracking-tight">
            {issue.title} <span className="text-muted-foreground font-light">#{issue.number}</span>
          </h1>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" className="hidden sm:flex">Editar</Button>
            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">Novo Problema</Button>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge className={issue.status === 'open' ? "bg-green-600 hover:bg-green-600" : "bg-purple-600 hover:bg-purple-600"}>
            {issue.status === 'open' ? <CircleDot className="w-3 h-3 mr-1" /> : <CheckCircle2 className="w-3 h-3 mr-1" />}
            {issue.status === 'open' ? 'Aberto' : 'Fechado'}
          </Badge>
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{author?.username}</span> abriu este problema há {formatDistanceToNow(new Date(issue.createdAt), { locale: ptBR })} · {issue.commentsCount} comentários
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <CommentThread originalPost={issue.description} authorId={issue.authorId} createdAt={issue.createdAt} comments={comments} />
        </div>
        <aside className="space-y-6">
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Responsáveis</h4>
            <p className="text-sm text-muted-foreground italic">Ninguém atribuído</p>
          </div>
          <Separator />
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Rótulos</h4>
            <div className="flex flex-wrap gap-1">
              {issue.labels.length > 0 ? issue.labels.map(l => (
                <Badge key={l} variant="outline" className="bg-primary/5 text-primary border-primary/20">{l}</Badge>
              )) : (
                <p className="text-sm text-muted-foreground italic">Nenhum ainda</p>
              )}
            </div>
          </div>
          <Separator />
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Projetos</h4>
            <p className="text-sm text-muted-foreground italic">Nenhum ainda</p>
          </div>
          <Separator />
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Marco</h4>
            <p className="text-sm text-muted-foreground italic">Sem marcos</p>
          </div>
        </aside>
      </div>
    </div>
  );
}