import React from 'react';
import ReactMarkdown from 'react-markdown';
interface MarkdownViewerProps {
  content: string;
}
export function MarkdownViewer({ content }: MarkdownViewerProps) {
  return (
    <div className="prose prose-sm dark:prose-invert max-w-none prose-headings:border-b prose-headings:pb-2 prose-pre:bg-muted prose-pre:text-foreground prose-a:text-blue-600 hover:prose-a:underline">
      <ReactMarkdown>{content}</ReactMarkdown>
      <style>{`
        .prose h1 { @apply text-3xl font-bold mt-8 mb-4; }
        .prose h2 { @apply text-xl font-semibold mt-6 mb-3; }
        .prose p { @apply my-4 leading-relaxed text-muted-foreground; }
        .prose ul { @apply list-disc list-inside my-4 space-y-1 text-muted-foreground; }
        .prose li { @apply ml-2; }
        .prose code { @apply bg-muted px-1 py-0.5 rounded font-mono text-xs; }
        .prose pre { @apply p-4 rounded-lg bg-muted/50 border overflow-x-auto my-4; }
        .prose pre code { @apply bg-transparent p-0; }
        .prose blockquote { @apply border-l-4 border-muted pl-4 italic my-4; }
      `}</style>
    </div>
  );
}