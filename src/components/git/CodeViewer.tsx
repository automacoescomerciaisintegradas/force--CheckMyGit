import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FileCode, Copy, Check, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { MOCK_FILE_NODES } from '@shared/mock-data';
import { Button } from '@/components/ui/button';
interface CodeViewerProps {
  repoId: string;
}
export function CodeViewer({ repoId }: CodeViewerProps) {
  const { username, reponame, '*': splat } = useParams();
  const filePath = splat || '';
  const [copied, setCopied] = useState(false);
  // Mock finding file content
  const fileName = filePath.split('/').pop();
  const fileNode = Object.values(MOCK_FILE_NODES).flat().find(n => n.path === filePath);
  const content = fileNode?.content || '// File content not found in mock data';
  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild className="-ml-2 h-8">
            <Link to={`/${username}/${reponame}`}>
              <ChevronLeft className="h-4 w-4 mr-1" /> Back
            </Link>
          </Button>
          <span className="text-sm font-mono text-muted-foreground">{filePath}</span>
        </div>
        <Button variant="outline" size="sm" onClick={handleCopy} className="h-8 gap-1.5">
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? 'Copied' : 'Copy'}
        </Button>
      </div>
      <div className="border rounded-xl bg-[#1e1e1e] overflow-hidden shadow-lg border-zinc-800">
        <div className="bg-[#252526] border-b border-zinc-800 px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileCode className="h-4 w-4 text-blue-400" />
            <span className="text-xs font-medium text-zinc-300">{fileName}</span>
          </div>
          <div className="text-[10px] text-zinc-500 font-mono">
            {content.split('\n').length} lines · {(content.length / 1024).toFixed(2)} KB
          </div>
        </div>
        <div className="overflow-x-auto">
          <SyntaxHighlighter
            language="typescript"
            style={vscDarkPlus}
            showLineNumbers
            customStyle={{
              margin: 0,
              padding: '1.5rem 1rem',
              fontSize: '13px',
              backgroundColor: 'transparent',
              fontFamily: 'JetBrains Mono, monospace',
            }}
            lineNumberStyle={{
              minWidth: '3em',
              paddingRight: '1em',
              color: '#5a5a5a',
              textAlign: 'right',
              userSelect: 'none',
            }}
          >
            {content}
          </SyntaxHighlighter>
        </div>
      </div>
    </motion.div>
  );
}