import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Folder, FileCode, ChevronRight, Clock } from 'lucide-react';
import { MOCK_FILE_NODES } from '@shared/mock-data';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
interface FileBrowserProps {
  repoId: string;
}
export function FileBrowser({ repoId }: FileBrowserProps) {
  const { username, reponame, '*': splat } = useParams();
  const currentPath = splat || '';
  // Simple logic to fetch nodes based on path for mock purposes
  const key = currentPath === '' ? repoId : `${repoId}-${currentPath.replace(/\//g, '-')}`;
  const nodes = MOCK_FILE_NODES[key] || MOCK_FILE_NODES[repoId] || [];
  return (
    <div className="space-y-6">
      <div className="border rounded-xl bg-card overflow-hidden shadow-sm">
        <div className="bg-muted/50 p-4 flex items-center justify-between border-b">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Avatar className="h-6 w-6 border shadow-sm">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            <span>Latest commit by <strong>madeinlowcode</strong></span>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="hidden sm:inline">Refactor file navigation system</span>
            <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> 2 days ago</span>
          </div>
        </div>
        <div className="divide-y">
          {nodes.map((node) => (
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
                <span className="w-24 text-right">{formatDistanceToNow(new Date(node.lastCommitDate))} ago</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {currentPath === '' && (
        <div className="border rounded-xl p-8 bg-card shadow-sm prose prose-sm dark:prose-invert max-w-none">
          <h1 className="text-2xl font-bold border-b pb-4 mb-6">README.md</h1>
          <p className="text-muted-foreground text-base leading-relaxed">
            Welcome to the Forge repository. This is a minimalist Git platform built for modern development workflows.
          </p>
          <div className="mt-8 space-y-4">
            <h2 className="text-lg font-semibold">Features</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Ultra-fast file navigation</li>
              <li>Professional syntax highlighting</li>
              <li>Collaborative issue tracking</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}