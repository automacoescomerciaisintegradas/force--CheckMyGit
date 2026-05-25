import React, { useState, useRef, useEffect } from 'react';
import { ArrowUp, Terminal } from 'lucide-react';
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
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
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
    <div className="relative flex items-end w-full bg-muted/30 dark:bg-muted/10 border rounded-2xl focus-within:ring-1 focus-within:ring-primary/20 transition-all p-2 pr-3">
      <textarea
        ref={textareaRef}
        rows={1}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Message Forge AI..."
        className="w-full bg-transparent border-none focus:ring-0 text-sm py-2.5 px-3 resize-none max-h-[200px] transition-all"
        disabled={isLoading}
      />
      <Button
        size="icon"
        className={cn(
          "mb-1 flex-shrink-0 w-8 h-8 rounded-xl transition-all",
          content.trim() ? "bg-primary text-primary-foreground opacity-100" : "bg-muted-foreground/20 text-muted-foreground/50 cursor-not-allowed"
        )}
        onClick={handleSend}
        disabled={!content.trim() || isLoading}
      >
        <ArrowUp className="w-4 h-4" />
      </Button>
    </div>
  );
}