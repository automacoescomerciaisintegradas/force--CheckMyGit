import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronRight, Terminal } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { ChatInput } from '@/components/chat/ChatInput';
import { ChatMessage } from '@/components/chat/ChatMessage';
import { api } from '@/lib/api-client';
import { ChatSession, ChatMessage as TChatMessage } from '@shared/types';
import { SUGGESTED_PROMPTS } from '@shared/mock-data';
import { ScrollArea } from '@/components/ui/scroll-area';
export function HomePage() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);
  const { data: session, isLoading } = useQuery({
    queryKey: ['session', sessionId],
    queryFn: () => sessionId ? api<ChatSession>(`/api/sessions/${sessionId}`) : null,
    enabled: !!sessionId,
  });
  const sendMessage = useMutation({
    mutationFn: ({ content }: { content: string }) => 
      api<ChatSession>(`/api/chat/${sessionId}`, {
        method: 'POST',
        body: JSON.stringify({ content })
      }),
    onMutate: async ({ content }) => {
      setIsTyping(true);
      await queryClient.cancelQueries({ queryKey: ['session', sessionId] });
      const previousSession = queryClient.getQueryData(['session', sessionId]);
      if (previousSession) {
        queryClient.setQueryData(['session', sessionId], (old: ChatSession) => ({
          ...old,
          messages: [...old.messages, { id: 'temp', role: 'user', content, timestamp: Date.now() }]
        }));
      }
      return { previousSession };
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['session', sessionId], data);
    },
    onSettled: () => {
      setIsTyping(false);
    }
  });
  const createAndSend = useMutation({
    mutationFn: async (content: string) => {
      const newSession = await api<ChatSession>('/api/sessions', { method: 'POST' });
      navigate(`/c/${newSession.id}`, { replace: true });
      return api<ChatSession>(`/api/chat/${newSession.id}`, {
        method: 'POST',
        body: JSON.stringify({ content })
      });
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['session', data.id], data);
    }
  });
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [session?.messages]);
  const handleSend = (content: string) => {
    if (sessionId) {
      sendMessage.mutate({ content });
    } else {
      createAndSend.mutate(content);
    }
  };
  return (
    <AppLayout>
      <div className="flex-1 flex flex-col relative h-[calc(100vh-3.5rem)]">
        <ScrollArea className="flex-1">
          <div className="max-w-3xl mx-auto px-4 py-8 md:py-12 flex flex-col gap-8 min-h-full">
            <AnimatePresence mode="popLayout">
              {!sessionId || (session && session.messages.length === 0) ? (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex-1 flex flex-col items-center justify-center text-center space-y-8 pt-12"
                >
                  <div className="space-y-4">
                    <div className="w-16 h-16 rounded-3xl bg-primary/5 flex items-center justify-center mx-auto ring-1 ring-primary/10">
                      <Sparkles className="w-8 h-8 text-primary" />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight">How can I help you?</h1>
                    <p className="text-muted-foreground text-lg max-w-md mx-auto">
                      Forge AI is your minimalist companion for building and creating.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl">
                    {SUGGESTED_PROMPTS.map((prompt) => (
                      <button
                        key={prompt}
                        onClick={() => handleSend(prompt)}
                        className="p-4 text-left border rounded-2xl hover:bg-muted/50 transition-colors flex items-center justify-between group"
                      >
                        <span className="text-sm font-medium">{prompt}</span>
                        <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <div className="flex flex-col gap-8">
                  {session.messages.map((msg, idx) => (
                    <ChatMessage key={msg.id + idx} message={msg} />
                  ))}
                  {isTyping && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-4 items-start"
                    >
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                        <Terminal className="w-4 h-4" />
                      </div>
                      <div className="flex gap-1.5 pt-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-foreground/30 animate-bounce" />
                        <span className="w-1.5 h-1.5 rounded-full bg-foreground/30 animate-bounce delay-150" />
                        <span className="w-1.5 h-1.5 rounded-full bg-foreground/30 animate-bounce delay-300" />
                      </div>
                    </motion.div>
                  )}
                  <div ref={scrollRef} className="h-4" />
                </div>
              )}
            </AnimatePresence>
          </div>
        </ScrollArea>
        <div className="border-t bg-background/80 backdrop-blur-md pb-8 pt-4">
          <div className="max-w-3xl mx-auto px-4">
            <ChatInput 
              onSend={handleSend} 
              isLoading={sendMessage.isPending || createAndSend.isPending} 
            />
            <p className="text-[10px] text-center text-muted-foreground mt-3">
              Forge AI can make mistakes. Check important info.
            </p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}