import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Folder, FileCode, ChevronRight, Clock, Book } from 'lucide-react';
import { MOCK_FILE_NODES } from '@shared/mock-data';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MarkdownViewer } from '@/components/MarkdownViewer';
interface FileBrowserProps {
  repoId: string;
}
export function FileBrowser({ repoId: propRepoId }: FileBrowserProps) {
  const { username, reponame, '*': splat } = useParams();
  // Se repoId não veio via props, tentamos derivar (no novo sistema de rotas context pode ser usado)
  const repoId = propRepoId || 'r2'; // Fallback seguro para demonstração
  const currentPath = splat || '';
  const pathSegments = currentPath.split('/').filter(Boolean);
  const key = currentPath === '' ? repoId : `${repoId}-${currentPath.replace(/\//g, '-')}`;
  const nodes = MOCK_FILE_NODES[key] || [];
  const readmeFile = nodes.find(n => n.name.toLowerCase() === 'readme.md' && n.type === 'file');
  return (
    <div className="space-y-10">
      <nav className="flex items-center space-x-2 text-[13px] font-medium text-zinc-400">
        <Link to={`/${username}/${reponame}`} className="hover:text-zinc-900 transition-colors">
          {reponame}
        </Link>
        {pathSegments.map((segment, idx) => {
          const path = pathSegments.slice(0, idx + 1).join('/');
          return (
            <React.Fragment key={path}>
              <ChevronRight className="h-3.5 w-3.5 text-zinc-200" />
              <Link
                to={`/${username}/${reponame}/tree/main/${path}`}
                className={idx === pathSegments.length - 1 ? "text-zinc-900 font-bold" : "hover:text-zinc-900 transition-colors"}
              >
                {segment}
              </Link>
            </React.Fragment>
          );
        })}
      </nav>
      <div className="border border-zinc-100 rounded-2xl bg-white overflow-hidden">
        <div className="bg-zinc-50/50 p-4 px-6 flex items-center justify-between border-b border-zinc-100">
          <div className="flex items-center gap-3">
            <Avatar className="h-6 w-6 border border-zinc-200">
              <AvatarImage src="https://api.dicebear.com/7.x/bottts/svg?seed=cleudo" />
              <AvatarFallback>CC</AvatarFallback>
            </Avatar>
            <span className="text-xs font-medium text-zinc-600">
              <strong className="text-zinc-900">automacoescomerciais</strong> atualizou o motor principal
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
            <Clock className="h-3 w-3" /> há 1 dia
          </div>
        </div>
        <div className="divide-y divide-zinc-50">
          {nodes.length > 0 ? nodes.map((node) => (
            <div key={node.id} className="flex items-center justify-between p-4 px-6 hover:bg-zinc-50/50 transition-colors group">
              <div className="flex items-center gap-4 flex-1 min-w-0">
                {node.type === 'folder' ? (
                  <Folder className="h-4 w-4 text-zinc-400" />
                ) : (
                  <FileCode className="h-4 w-4 text-zinc-300" />
                )}
                <Link
                  to={`/${username}/${reponame}/${node.type === 'folder' ? 'tree' : 'blob'}/main/${node.path}`}
                  className="text-[13px] font-medium text-zinc-700 group-hover:text-zinc-900 truncate"
                >
                  {node.name}
                </Link>
              </div>
              <div className="flex items-center gap-12 text-[11px] font-medium text-zinc-400">
                <span className="hidden md:inline max-w-[240px] truncate text-zinc-300">{node.lastCommitMsg}</span>
                <span className="w-24 text-right uppercase tracking-tighter">há {formatDistanceToNow(new Date(node.lastCommitDate), { locale: ptBR })}</span>
              </div>
            </div>
          )) : (
            <div className="p-16 text-center text-sm text-zinc-300 font-medium italic">
              Diretório vazio.
            </div>
          )}
        </div>
      </div>
      {readmeFile && (
        <div className="border border-zinc-100 rounded-2xl bg-white">
          <div className="bg-zinc-50/50 px-6 py-4 border-b border-zinc-100 flex items-center gap-2.5">
            <Book className="h-4 w-4 text-zinc-400" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500">{readmeFile.name}</span>
          </div>
          <div className="p-10 lg:p-16">
            <MarkdownViewer content={readmeFile.content || "# README\nConteúdo indisponível."} />
          </div>
        </div>
      )}
    </div>
  );
}