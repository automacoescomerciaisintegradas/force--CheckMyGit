import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { File, ChevronRight, Copy, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MOCK_FILE_TREE } from '@shared/mock-data';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
export function RepoFileViewer() {
  const { username, repo, branch, "*": filePath } = useParams();
  // Flatten mock tree for easy searching
  const findFile = (nodes: any[], path: string): any => {
    for (const node of nodes) {
      if (node.path === path) return node;
      if (node.children) {
        const found = findFile(node.children, path);
        if (found) return found;
      }
    }
    return null;
  };
  const file = findFile(MOCK_FILE_TREE, filePath || '') || { 
    name: 'Unknown', 
    content: '// File not found in mock data',
    path: filePath
  };
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-sm">
          <Link to={`/${username}/${repo}`} className="text-blue-600 hover:underline">{repo}</Link>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
          <span className="bg-muted px-2 py-0.5 rounded text-xs font-mono">{branch}</span>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
          <span className="font-semibold">{filePath}</span>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="outline" size="sm" className="h-7 px-2 text-xs">Raw</Button>
          <Button variant="outline" size="sm" className="h-7 px-2 text-xs"><Copy className="w-3 h-3 mr-1" /> Copy</Button>
          <Button variant="outline" size="sm" className="h-7 px-2 text-xs"><Download className="w-3 h-3 mr-1" /> Download</Button>
        </div>
      </div>
      <div className="border rounded-lg overflow-hidden">
        <div className="bg-muted/50 p-2 flex items-center justify-between border-b text-xs text-muted-foreground font-mono">
          <div>{file.content?.split('\n').length} lines | {file.content?.length} bytes</div>
        </div>
        <div className="bg-[#1e1e1e] p-0 overflow-x-auto text-sm leading-relaxed">
          <SyntaxHighlighter
            language="typescript"
            style={vscDarkPlus}
            customStyle={{ margin: 0, padding: '1rem', background: 'transparent' }}
            showLineNumbers
          >
            {file.content || ''}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
}