import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Folder, File, History, ChevronRight } from 'lucide-react';
import { MOCK_FILE_TREE } from '@shared/mock-data';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MarkdownViewer } from '@/components/MarkdownViewer';
export function RepoCodePage() {
  const { username, repo } = useParams();
  // Simple simulation of path navigation
  const files = MOCK_FILE_TREE;
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm">
          <div className="bg-muted px-3 py-1 rounded-md font-mono text-xs border flex items-center gap-2">
            <History className="w-3 h-3" />
            main
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Link to={`/${username}/${repo}`} className="text-blue-600 hover:underline">{repo}</Link>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </div>
      <div className="border rounded-lg overflow-hidden">
        <div className="bg-muted/50 p-3 flex items-center justify-between border-b text-sm">
          <div className="flex items-center gap-2">
            <span className="font-semibold">forge-dev</span>
            <span className="text-muted-foreground">refactor: add code viewer functionality</span>
          </div>
          <div className="text-muted-foreground">2 hours ago</div>
        </div>
        <Table>
          <TableBody>
            {files.sort((a, b) => (a.type === b.type ? 0 : a.type === 'folder' ? -1 : 1)).map((node) => (
              <TableRow key={node.path} className="group cursor-pointer hover:bg-muted/30">
                <TableCell className="py-2 w-8">
                  {node.type === 'folder' ? <Folder className="w-4 h-4 text-blue-400 fill-blue-400" /> : <File className="w-4 h-4 text-muted-foreground" />}
                </TableCell>
                <TableCell className="py-2 font-medium">
                  <Link to={`/${username}/${repo}/${node.type === 'folder' ? 'tree' : 'blob'}/main/${node.path}`} className="hover:text-blue-600 hover:underline">
                    {node.name}
                  </Link>
                </TableCell>
                <TableCell className="py-2 text-muted-foreground group-hover:text-foreground truncate max-w-[300px]">
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
      <div className="border rounded-lg p-6">
        <div className="flex items-center gap-2 text-sm font-semibold border-b pb-4 mb-4">
          <File className="w-4 h-4" />
          README.md
        </div>
        <MarkdownViewer content={MOCK_FILE_TREE.find(f => f.name === 'README.md')?.content || ''} />
      </div>
    </div>
  );
}