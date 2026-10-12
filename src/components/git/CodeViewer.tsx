import React, { useState } from 'react';
import { useParams, useNavigate, useOutletContext } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FileCode, Copy, Check, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { MOCK_FILE_NODES } from '@shared/mock-data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
export function CodeViewer() {
  const { username, reponame, '*': splat } = useParams();
  const filePath = splat || '';
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const extension = filePath.split('.').pop()?.toLowerCase();
  const getLanguage = (ext?: string) => {
    switch(ext) {
      case 'ts': case 'tsx': return 'typescript';
      case 'js': case 'jsx': return 'javascript';
      case 'py': return 'python';
      case 'md': return 'markdown';
      case 'json': return 'json';
      case 'css': return 'css';
      case 'html': return 'html';
      default: return 'typescript';
    }
  };
  const fileName = filePath.split('/').pop();
  const fileNode = Object.values(MOCK_FILE_NODES).flat().find(n => n.path === filePath);
  const content = fileNode?.content || '// Conteúdo de demonstração.\n// Em uma aplicação real, isto seria buscado do armazenamento persistente.';
  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const goBack = () => {
    const segments = filePath.split('/').filter(Boolean);
    if (segments.length > 1) {
      const parentPath = segments.slice(0, -1).join('/');
      navigate(`/${username}/${reponame}/tree/main/${parentPath}`);
    } else {
      navigate(`/${username}/${reponame}`);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button variant="ghost" size="sm" onClick={goBack} className="-ml-2 h-8 text-muted-foreground hover:text-foreground">
            <ChevronLeft className="h-4 w-4 mr-1" /> Voltar
          </Button>
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-sm font-mono text-muted-foreground truncate">{filePath}</span>
            <Badge variant="secondary" className="text-[10px] px-1.5 py-0 uppercase bg-muted border-none shrink-0">
              {getLanguage(extension)}
            </Badge>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={handleCopy} className="h-8 gap-1.5 shadow-sm ml-auto sm:ml-0">
          {copied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? 'Copiado' : 'Copiar'}
        </Button>
      </div>
      <div className="border rounded-xl md:rounded-2xl bg-[#1e1e1e] overflow-hidden shadow-xl border-zinc-800/50">
        <div className="bg-[#252526] border-b border-zinc-800 px-4 md:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileCode className="h-4 w-4 text-blue-400" />
            <span className="text-xs font-semibold text-zinc-300 truncate">{fileName}</span>
          </div>
          <div className="hidden sm:block text-[10px] text-zinc-500 font-mono tracking-tight">
            {content.split('\n').length} linhas · {(content.length / 1024).toFixed(2)} KB
          </div>
        </div>
        <div className="overflow-x-auto selection:bg-blue-500/30">
          <SyntaxHighlighter
            language={getLanguage(extension)}
            style={vscDarkPlus}
            showLineNumbers
            customStyle={{
              margin: 0,
              padding: '1.5rem 1rem',
              fontSize: '13px',
              backgroundColor: 'transparent',
              fontFamily: 'JetBrains Mono, monospace',
              lineHeight: '1.6',
            }}
            lineNumberStyle={{
              minWidth: '3.5em',
              paddingRight: '1.5em',
              color: '#4b4b4b',
              textAlign: 'right',
              userSelect: 'none',
              borderRight: '1px solid #333',
              marginRight: '1rem'
            }}
          >
            {content}
          </SyntaxHighlighter>
        </div>
      </div>
    </motion.div>
  );
}