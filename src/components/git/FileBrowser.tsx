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
  const key = currentPath === '' ? repoId : `${repoId}-${currentPath.replace(/\//g, '-')}`;
  const nodes = MOCK_FILE_NODES[key] || [];
  const readmeFile = nodes.find(n => n.name.toLowerCase() === 'readme.md' && n.type === 'file');
  return (
    <div className="space-y-12">
      <nav className="flex items-center space-x-2 text-[12px] font-bold uppercase tracking-[0.1em] text-zinc-300">
        <Link to={`/${username}/${reponame}`} className="hover:text-zinc-950 transition-colors">
          {reponame}
        </Link>
        {pathSegments.map((segment, idx) => {
          const path = pathSegments.slice(0, idx + 1).join('/');
          return (
            <React.Fragment key={path}>
              <ChevronRight className="h-3.5 w-3.5 text-zinc-200" />
              <Link
                to={`/${username}/${reponame}/tree/main/${path}`}
                className={idx === pathSegments.length - 1 ? "text-zinc-950" : "hover:text-zinc-950 transition-colors"}
              >
                {segment}
              </Link>
            </React.Fragment>
          );
        })}
      </nav>
      <div className="border border-zinc-100 rounded-3xl bg-white overflow-hidden shadow-ultra-sm">
        <div className="bg-zinc-50/40 p-4 px-8 flex items-center justify-between border-b border-zinc-50">
          <div className="flex items-center gap-3">
            <Avatar className="h-6 w-6 border border-zinc-200 shadow-ultra-sm">
              <AvatarImage src={`https://github.com/${username}.png`} />
              <AvatarFallback>{username?.[0]?.toUpperCase()}</AvatarFallback>
            </Avatar>
            <span className="text-[12px] font-medium text-zinc-400">
              <strong className="text-zinc-900 font-bold">@{username}</strong> atualizou o motor principal
            </span>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-300 uppercase tracking-widest">
            <Clock className="h-3 w-3" /> há 1 dia
          </div>
        </div>
        <div className="divide-y divide-zinc-50/50">
          {nodes.length > 0 ? nodes.map((node) => (
            <div key={node.id} className="flex items-center justify-between py-3.5 px-8 hover:bg-zinc-50/30 transition-colors group">
              <div className="flex items-center gap-5 flex-1 min-w-0">
                {node.type === 'folder' ? (
                  <Folder className="h-4 w-4 text-zinc-300 fill-zinc-50" />
                ) : (
                  <FileCode className="h-4 w-4 text-zinc-200" />
                )}
                <Link
                  to={`/${username}/${reponame}/${node.type === 'folder' ? 'tree' : 'blob'}/main/${node.path}`}
                  className="text-[14px] font-medium text-zinc-700 group-hover:text-zinc-950 truncate transition-colors"
                >
                  {node.name}
                </Link>
              </div>
              <div className="flex items-center gap-14 text-[11px] font-medium">
                <span className="hidden md:inline max-w-[300px] truncate text-zinc-300 font-normal">{node.lastCommitMsg}</span>
                <span className="w-24 text-right uppercase tracking-tighter text-zinc-300 font-bold">há {formatDistanceToNow(new Date(node.lastCommitDate), { locale: ptBR })}</span>
              </div>
            </div>
          )) : (
            <div className="p-20 text-center text-[13px] text-zinc-300 font-medium italic">
              Diretório vazio.
            </div>
          )}
        </div>
      </div>
      {readmeFile && (
        <div className="border border-zinc-100 rounded-[32px] bg-white shadow-ultra-sm overflow-hidden">
          <div className="bg-zinc-50/40 px-8 py-5 border-b border-zinc-50 flex items-center gap-3">
            <Book className="h-4 w-4 text-zinc-300" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400">{readmeFile.name}</span>
          </div>
          <div className="p-12 lg:p-24">
            <MarkdownViewer content={readmeFile.content || "# README\nConteúdo indisponível."} />
          </div>
        </div>
      )}
    </div>
  );
}