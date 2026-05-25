import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Folder, File, History, ChevronRight, Terminal } from 'lucide-react';
import { MOCK_FILE_TREE, FileNode } from '@shared/mock-data';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { MarkdownViewer } from '@/components/MarkdownViewer';
export function RepoCodePage() {
  const { username, repo, "*": splatPath } = useParams();
  // Resolve the current folder based on the splat path
  const resolvePath = (nodes: FileNode[], pathParts: string[]): FileNode[] => {
    if (!pathParts.length || pathParts[0] === '') return nodes;
    const [current, ...rest] = pathParts;
    const found = nodes.find(node => node.name === current);
    if (found && found.type === 'folder' && found.children) {
      if (rest.length === 0) return found.children;
      return resolvePath(found.children, rest);
    }
    return nodes; // Fallback to root or current if not found
  };
  const pathParts = splatPath ? splatPath.split('/') : [];
  const currentFiles = resolvePath(MOCK_FILE_TREE, pathParts);
  // Breadcrumb generator
  const breadcrumbs = [
    { name: repo, path: `/${username}/${repo}` },
    ...pathParts.map((part, idx) => ({
      name: part,
      path: `/${username}/${repo}/tree/main/${pathParts.slice(0, idx + 1).join('/')}`
    }))
  ];
  const readme = currentFiles.find(f => f.name.toLowerCase() === 'readme.md');
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm flex-wrap">
          <div className="bg-muted px-3 py-1 rounded-md font-mono text-xs border flex items-center gap-2 hover:bg-muted/80 cursor-pointer">
            <History className="w-3 h-3" />
            main
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={crumb.path}>
                <Link 
                  to={crumb.path} 
                  className={cn("hover:text-blue-600 hover:underline", idx === breadcrumbs.length - 1 && "font-bold text-foreground")}
                >
                  {crumb.name}
                </Link>
                {idx < breadcrumbs.length - 1 && <ChevronRight className="w-4 h-4" />}
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-muted px-2 py-1 rounded border text-xs font-mono text-muted-foreground flex items-center gap-2">
            <Terminal className="w-3 h-3" /> Go to file <span className="bg-secondary px-1 rounded border">t</span>
          </div>
          <Button variant="outline" size="sm" className="h-7 text-xs font-semibold bg-green-600 hover:bg-green-700 text-white border-none">
            Code
          </Button>
        </div>
      </div>
      <div className="border rounded-lg overflow-hidden bg-card shadow-sm">
        <div className="bg-muted/30 p-3 flex items-center justify-between border-b text-sm">
          <div className="flex items-center gap-3">
            <Avatar className="w-6 h-6 border">
              <AvatarImage src="https://github.com/forge-dev.png" />
              <AvatarFallback>FD</AvatarFallback>
            </Avatar>
            <span className="font-semibold hover:text-blue-600 cursor-pointer">forge-dev</span>
            <span className="text-muted-foreground truncate">refactor: improve recursive file navigation logic</span>
          </div>
          <div className="text-muted-foreground whitespace-nowrap ml-4">15 mins ago</div>
        </div>
        <Table>
          <TableBody>
            {currentFiles.sort((a, b) => (a.type === b.type ? 0 : a.type === 'folder' ? -1 : 1)).map((node) => (
              <TableRow key={node.path} className="group cursor-pointer hover:bg-muted/20 border-none">
                <TableCell className="py-2 w-8">
                  {node.type === 'folder' ? <Folder className="w-4 h-4 text-blue-400 fill-blue-400" /> : <File className="w-4 h-4 text-muted-foreground" />}
                </TableCell>
                <TableCell className="py-2 font-medium">
                  <Link to={`/${username}/${repo}/${node.type === 'folder' ? 'tree' : 'blob'}/main/${node.path}`} className="hover:text-blue-600 hover:underline">
                    {node.name}
                  </Link>
                </TableCell>
                <TableCell className="py-2 text-muted-foreground group-hover:text-foreground truncate max-w-[200px] md:max-w-[400px]">
                  {node.lastCommitMessage}
                </TableCell>
                <TableCell className="py-2 text-right text-muted-foreground whitespace-nowrap">
                  {node.lastCommitDate}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {readme && (
        <div className="border rounded-lg bg-card shadow-sm">
          <div className="flex items-center gap-2 text-sm font-semibold border-b px-6 py-3 sticky top-16 bg-card z-10">
            <File className="w-4 h-4" />
            {readme.name}
          </div>
          <div className="p-10">
            <MarkdownViewer content={readme.content || ''} />
          </div>
        </div>
      )}
    </div>
  );
}