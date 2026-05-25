import React, { useState, useRef, useEffect } from 'react';
import { ArrowUp, CornerDownLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
interface ChatInputProps {
  onSend: (content: string) => void;
  isLoading?: boolean;
}
export function ChatInput({ onSend, isLoading }: ChatInputProps) {
  const [content, setContent] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 240)}px`;
    }
  };
  useEffect(() => {
    adjustHeight();
  }, [content]);
  const handleSend = () => {
    if (content.trim() && !isLoading) {
      onSend(content.trim());
      setContent('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  return (
    <div className="relative flex flex-col w-full bg-background/50 dark:bg-muted/5 backdrop-blur-xl border border-border/50 rounded-[24px] focus-within:border-primary/30 focus-within:ring-4 focus-within:ring-primary/5 transition-all shadow-lg p-2 group">
      <textarea
        ref={textareaRef}
        rows={1}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask Forge anything..."
        className="w-full bg-transparent border-none focus:ring-0 text-[15px] py-3 px-4 resize-none max-h-[240px] transition-all placeholder:text-muted-foreground/50 scrollbar-none"
        disabled={isLoading}
      />
      <div className="flex items-center justify-between px-3 pb-1">
        <div className={cn(
          "flex items-center gap-2 transition-opacity duration-300",
          content.length > 0 ? "opacity-100" : "opacity-0"
        )}>
          <div className="flex items-center gap-1 text-[10px] font-medium text-muted-foreground/60 bg-muted/50 px-2 py-0.5 rounded-md border border-border/30">
            <CornerDownLeft className="w-2.5 h-2.5" />
            <span>Send</span>
          </div>
          <span className={cn(
            "text-[10px] font-mono",
            content.length > 1800 ? "text-destructive" : "text-muted-foreground/40"
          )}>
            {content.length}/2000
          </span>
        </div>
        <Button
          size="icon"
          className={cn(
            "w-8 h-8 rounded-full transition-all duration-300 transform",
            content.trim() 
              ? "bg-primary text-primary-foreground opacity-100 scale-100 shadow-md" 
              : "bg-muted text-muted-foreground/30 opacity-50 scale-90 cursor-not-allowed"
          )}
          onClick={handleSend}
          disabled={!content.trim() || isLoading}
        >
          <ArrowUp className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}