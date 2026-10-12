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
export function FileBrowser({ repoId }: FileBrowserProps) {
  const { username, reponame, '*': splat } = useParams();
  const currentPath = splat || '';
  // Cálculo de breadcrumb
  const pathSegments = currentPath.split('/').filter(Boolean);
  // Lógica para buscar nós com base no caminho
  const key = currentPath === '' ? repoId : `${repoId}-${currentPath.replace(/\//g, '-')}`;
  const nodes = MOCK_FILE_NODES[key] || [];
  // Encontrar README se existir nos nós atuais
  const readmeFile = nodes.find(n => n.name.toLowerCase() === 'readme.md' && n.type === 'file');
  return (
    <div className="space-y-6">
      {/* Breadcrumbs Interativos */}
      <nav className="flex items-center space-x-1 text-sm font-medium text-muted-foreground">
        <Link to={`/${username}/${reponame}`} className="hover:text-primary transition-colors">
          {reponame}
        </Link>
        {pathSegments.map((segment, idx) => {
          const path = pathSegments.slice(0, idx + 1).join('/');
          return (
            <React.Fragment key={path}>
              <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
              <Link
                to={`/${username}/${reponame}/tree/main/${path}`}
                className={idx === pathSegments.length - 1 ? "text-foreground font-bold" : "hover:text-primary transition-colors"}
              >
                {segment}
              </Link>
            </React.Fragment>
          );
        })}
      </nav>
      <div className="border rounded-xl bg-card overflow-hidden shadow-sm">
        <div className="bg-muted/50 p-4 flex items-center justify-between border-b">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Avatar className="h-6 w-6 border shadow-sm">
              <AvatarImage src="https://api.dicebear.com/7.x/bottts/svg?seed=cleudo" />
              <AvatarFallback>CC</AvatarFallback>
            </Avatar>
            <span>Último commit por <strong className="text-primary hover:underline cursor-pointer">automacoescomerciais</strong></span>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="hidden sm:inline">Refatoração do sistema para Cleudocode Core v3</span>
            <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> Há 1 dia</span>
          </div>
        </div>
        <div className="divide-y">
          {nodes.length > 0 ? nodes.map((node) => (
            <div key={node.id} className="flex items-center justify-between p-3 px-4 hover:bg-muted/30 transition-colors group">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                {node.type === 'folder' ? (
                  <Folder className="h-4 w-4 text-blue-500 fill-blue-500/20" />
                ) : (
                  <FileCode className="h-4 w-4 text-muted-foreground/70" />
                )}
                <Link
                  to={`/${username}/${reponame}/${node.type === 'folder' ? 'tree' : 'blob'}/main/${node.path}`}
                  className="text-sm font-medium group-hover:text-primary truncate"
                >
                  {node.name}
                </Link>
              </div>
              <div className="flex items-center gap-8 text-xs text-muted-foreground">
                <span className="hidden md:inline max-w-[200px] truncate">{node.lastCommitMsg}</span>
                <span className="w-24 text-right">há {formatDistanceToNow(new Date(node.lastCommitDate), { locale: ptBR })}</span>
              </div>
            </div>
          )) : (
            <div className="p-8 text-center text-sm text-muted-foreground">
              Nenhum arquivo encontrado neste diretório.
            </div>
          )}
        </div>
      </div>
      {readmeFile && (
        <div id="readme" className="border rounded-xl bg-card shadow-sm overflow-hidden">
          <div className="bg-muted/30 px-4 py-2 border-b flex items-center gap-2">
            <Book className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs font-bold uppercase tracking-wider">{readmeFile.name}</span>
          </div>
          <div className="p-8 prose prose-sm dark:prose-invert max-w-none">
            <MarkdownViewer content={readmeFile.content || "# README\nConteúdo não disponível."} />
          </div>
        </div>
      )}
    </div>
  );
}