import React from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';
interface ChatHistorySearchProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}
export function ChatHistorySearch({ value, onChange, className }: ChatHistorySearchProps) {
  return (
    <div className={cn("relative group px-2", className)}>
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground group-focus-within:text-primary transition-colors" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search conversations..."
        className="w-full bg-muted/50 hover:bg-muted focus:bg-background border-none h-8 pl-8 pr-8 rounded-lg text-xs transition-all ring-offset-background focus-visible:ring-1 focus-visible:ring-primary/20 outline-none"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-muted-foreground/20 text-muted-foreground transition-colors"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </div>
  );
}