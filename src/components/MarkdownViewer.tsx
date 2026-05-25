import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';
interface CodeBlockProps {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}
const CodeBlock = ({ inline, className, children, ...props }: CodeBlockProps & any) => {
  const match = /language-(\w+)/.exec(className || '');
  const [copied, setCopied] = useState(false);
  const codeString = String(children).replace(/\n$/, '');
  const handleCopy = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  if (!inline && match) {
    return (
      <div className="relative group my-6 rounded-lg overflow-hidden border border-border/50 shadow-sm">
        <div className="flex items-center justify-between px-4 py-1.5 bg-muted/80 border-b border-border/50">
          <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
            {match[1]}
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-[10px] font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3" /> Copied
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" /> Copy
              </>
            )}
          </button>
        </div>
        <SyntaxHighlighter
          style={vscDarkPlus}
          language={match[1]}
          PreTag="div"
          customStyle={{
            margin: 0,
            borderRadius: 0,
            fontSize: '13px',
            backgroundColor: 'transparent',
            padding: '1rem',
          }}
          {...props}
        >
          {codeString}
        </SyntaxHighlighter>
      </div>
    );
  }
  return (
    <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-[13px] text-foreground border border-border/30" {...props}>
      {children}
    </code>
  );
};
export function MarkdownViewer({ content }: { content: string }) {
  return (
    <div className="prose prose-sm dark:prose-invert max-w-none prose-pre:p-0 prose-pre:bg-transparent">
      <ReactMarkdown
        components={{
          code: CodeBlock,
        }}
      >
        {content}
      </ReactMarkdown>
      <style>{`
        .prose h1 { @apply text-2xl font-bold mt-8 mb-4 tracking-tight; }
        .prose h2 { @apply text-lg font-semibold mt-6 mb-3 tracking-tight; }
        .prose p { @apply my-4 leading-relaxed text-foreground/90; }
        .prose ul { @apply list-disc list-outside my-4 pl-6 space-y-2; }
        .prose li { @apply pl-1; }
        .prose blockquote { @apply border-l-4 border-primary/20 bg-muted/30 pl-4 py-1 italic my-6 rounded-r-md; }
        .prose table { @apply w-full my-6 border-collapse text-xs; }
        .prose th { @apply bg-muted/50 border border-border p-2 text-left font-semibold; }
        .prose td { @apply border border-border p-2; }
      `}</style>
    </div>
  );
}