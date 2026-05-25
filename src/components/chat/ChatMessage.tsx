import React from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, RotateCcw, User, Terminal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ChatMessage as TChatMessage } from '@shared/types';
import { MarkdownViewer } from '@/components/MarkdownViewer';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
interface ChatMessageProps {
  message: TChatMessage;
}
export function ChatMessage({ message }: ChatMessageProps) {
  const isAssistant = message.role === 'assistant';
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "flex w-full gap-4 group",
        !isAssistant && "flex-row-reverse"
      )}
    >
      <div className={cn(
        "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border text-xs",
        isAssistant ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
      )}>
        {isAssistant ? <Terminal className="w-4 h-4" /> : <User className="w-4 h-4" />}
      </div>
      <div className={cn(
        "max-w-[85%] space-y-2",
        !isAssistant && "items-end flex flex-col"
      )}>
        <div className={cn(
          "px-4 py-3 rounded-2xl shadow-sm leading-relaxed",
          isAssistant 
            ? "bg-card border text-card-foreground" 
            : "bg-primary text-primary-foreground"
        )}>
          {isAssistant ? (
            <MarkdownViewer content={message.content} />
          ) : (
            <p className="whitespace-pre-wrap text-sm">{message.content}</p>
          )}
        </div>
        <div className={cn(
          "flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity",
          !isAssistant && "flex-row-reverse"
        )}>
          <button 
            onClick={handleCopy}
            className="text-muted-foreground hover:text-foreground p-1 rounded-md transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          {isAssistant && (
            <button className="text-muted-foreground hover:text-foreground p-1 rounded-md transition-colors">
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}