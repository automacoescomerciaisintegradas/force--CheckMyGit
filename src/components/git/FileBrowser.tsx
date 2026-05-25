import React from 'react';
import { Link, useParams, useOutletContext } from 'react-router-dom';
import { Folder, FileCode, ChevronRight, Clock, Book } from 'lucide-react';
import { MOCK_FILE_NODES } from '@shared/mock-data';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MarkdownViewer } from '@/components/MarkdownViewer';
export function FileBrowser() {
  const { username, reponame, '*': splat } = useParams();
  const context = useOutletContext<{ repoId: string }>();
  const repoId = context?.repoId || 'r1';
  const currentPath = splat || '';
  const pathSegments = currentPath.split('/').filter(Boolean);
  // Create lookup key for folders: repoId-path-segments
  const key = currentPath === '' ? repoId : `${repoId}-${pathSegments.join('-')}`;
  const nodes = MOCK_FILE_NODES[key] || [];
  const readmeFile = nodes.find(n => n.name.toLowerCase() === 'readme.md' && n.type === 'file');
  return (
    <div className="space-y-10">
      <nav className="flex items-center space-x-2 text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground/50 overflow-x-auto scrollbar-hide pb-2 md:pb-0">
        <Link to={`/${username}/${reponame}`} className="hover:text-foreground transition-colors shrink-0">
          {reponame}
        </Link>
        {pathSegments.map((segment, idx) => {
          const path = pathSegments.slice(0, idx + 1).join('/');
          return (
            <React.Fragment key={path}>
              <ChevronRight className="h-3 w-3 text-muted-foreground/30 shrink-0" />
              <Link
                to={`/${username}/${reponame}/tree/main/${path}`}
                className={idx === pathSegments.length - 1 ? "text-foreground shrink-0" : "hover:text-foreground transition-colors shrink-0"}
              >
                {segment}
              </Link>
            </React.Fragment>
          );
        })}
      </nav>
      <div className="border border-border rounded-[24px] md:rounded-3xl bg-card overflow-hidden shadow-ultra-sm">
        <div className="bg-muted/30 p-4 px-6 md:px-8 flex items-center justify-between border-b border-border">
          <div className="flex items-center gap-3">
            <Avatar className="h-6 w-6 border border-border shadow-ultra-sm">
              <AvatarImage src={`https://github.com/${username}.png`} />
              <AvatarFallback>{username?.[0]?.toUpperCase()}</AvatarFallback>
            </Avatar>
            <span className="text-[12px] font-medium text-muted-foreground truncate">
              <strong className="text-foreground font-bold">@{username}</strong> atualizou o motor principal
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest">
            <Clock className="h-3 w-3" /> há 1 dia
          </div>
        </div>
        <div className="divide-y divide-border/50">
          {nodes.length > 0 ? nodes.map((node) => (
            <div key={node.id} className="flex items-center justify-between py-3 md:py-4 px-6 md:px-8 hover:bg-muted/50 transition-colors group">
              <div className="flex items-center gap-4 md:gap-5 flex-1 min-w-0">
                {node.type === 'folder' ? (
                  <Folder className="h-4 w-4 text-muted-foreground/30 fill-muted/10 group-hover:fill-muted/30 transition-all" />
                ) : (
                  <FileCode className="h-4 w-4 text-muted-foreground/20" />
                )}
                <Link
                  to={`/${username}/${reponame}/${node.type === 'folder' ? 'tree' : 'blob'}/main/${node.path}`}
                  className="text-[14px] font-medium text-foreground/80 group-hover:text-foreground truncate transition-colors"
                >
                  {node.name}
                </Link>
              </div>
              <div className="flex items-center gap-4 md:gap-14 text-[11px] font-medium">
                <span className="hidden lg:inline max-w-[300px] truncate text-muted-foreground/40 font-normal">{node.lastCommitMsg}</span>
                <span className="w-24 text-right uppercase tracking-tighter text-muted-foreground/40 font-bold whitespace-nowrap">há {formatDistanceToNow(new Date(node.lastCommitDate), { locale: ptBR })}</span>
              </div>
            </div>
          )) : (
            <div className="p-20 text-center text-[13px] text-muted-foreground/30 font-medium italic">
              Diretório vazio.
            </div>
          )}
        </div>
      </div>
      {readmeFile && (
        <div className="border border-border rounded-[32px] bg-card shadow-ultra-sm overflow-hidden">
          <div className="bg-muted/30 px-6 md:px-8 py-5 border-b border-border flex items-center gap-3">
            <Book className="h-4 w-4 text-muted-foreground/40" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground/60">{readmeFile.name}</span>
          </div>
          <div className="p-8 md:p-16 lg:p-24 overflow-x-auto">
            <MarkdownViewer content={readmeFile.content || "# README\nConteúdo indisponível."} />
          </div>
        </div>
      )}
    </div>
  );
}