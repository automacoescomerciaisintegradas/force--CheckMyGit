import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronRight, Terminal, ArrowDown } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { ChatInput } from '@/components/chat/ChatInput';
import { ChatMessage } from '@/components/chat/ChatMessage';
import { api } from '@/lib/api-client';
import { ChatSession } from '@shared/types';
import { SUGGESTED_PROMPTS } from '@shared/mock-data';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
export function HomePage() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollViewportRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [showScrollDown, setShowScrollDown] = useState(false);
  const { data: session } = useQuery({
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
          messages: [...old.messages, { id: 'temp-' + Date.now(), role: 'user', content, timestamp: Date.now() }]
        }));
      }
      return { previousSession };
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['session', sessionId], data);
      queryClient.invalidateQueries({ queryKey: ['sessions'] });
    },
    onSettled: () => setIsTyping(false)
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
      queryClient.invalidateQueries({ queryKey: ['sessions'] });
    }
  });
  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior });
    }
  };
  useEffect(() => {
    if (!showScrollDown) scrollToBottom();
  }, [session?.messages, isTyping]);
  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    const isAtBottom = target.scrollHeight - target.scrollTop <= target.clientHeight + 100;
    setShowScrollDown(!isAtBottom);
  };
  const handleSend = (content: string) => {
    if (sessionId) sendMessage.mutate({ content });
    else createAndSend.mutate(content);
  };
  return (
    <AppLayout>
      <div className="flex-1 flex flex-col relative h-[calc(100vh-3.5rem)] max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <ScrollArea 
          className="flex-1 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8" 
          onScrollCapture={handleScroll}
        >
          <div className="max-w-3xl mx-auto py-8 md:py-16 flex flex-col gap-10 min-h-full relative">
            <AnimatePresence mode="popLayout">
              {!sessionId || (session && session.messages.length === 0) ? (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="flex-1 flex flex-col items-center justify-center text-center space-y-12 pt-12"
                >
                  <div className="space-y-6">
                    <div className="w-20 h-20 rounded-[40px] bg-primary/5 flex items-center justify-center mx-auto ring-1 ring-primary/10 shadow-inner">
                      <Sparkles className="w-10 h-10 text-primary animate-pulse" />
                    </div>
                    <div className="space-y-2">
                      <h1 className="text-4xl font-extrabold tracking-tight text-foreground">What will you build?</h1>
                      <p className="text-muted-foreground text-lg max-w-lg mx-auto leading-relaxed">
                        Forge AI combines minimalist design with elite coding intelligence to help you ship faster.
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
                    {SUGGESTED_PROMPTS.map((prompt, i) => (
                      <motion.button
                        key={prompt}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        onClick={() => handleSend(prompt)}
                        className="p-5 text-left border border-border/60 bg-card/50 backdrop-blur-sm rounded-[24px] hover:border-primary/30 hover:bg-accent/30 transition-all flex items-center justify-between group shadow-sm hover:shadow-md"
                      >
                        <span className="text-[13px] font-semibold text-foreground/80 group-hover:text-foreground">
                          {prompt}
                        </span>
                        <ChevronRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-primary transition-colors" />
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <div className="flex flex-col gap-10">
                  {session.messages.map((msg, idx) => (
                    <ChatMessage key={msg.id + idx} message={msg} />
                  ))}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-4 items-start"
                    >
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                        <Terminal className="w-4 h-4 text-primary-foreground" />
                      </div>
                      <div className="flex gap-1.5 pt-3.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/30 animate-bounce" />
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/30 animate-bounce delay-150" />
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/30 animate-bounce delay-300" />
                      </div>
                    </motion.div>
                  )}
                  <div ref={scrollRef} className="h-20" />
                </div>
              )}
            </AnimatePresence>
          </div>
        </ScrollArea>
        <AnimatePresence>
          {showScrollDown && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute bottom-36 left-1/2 -translate-x-1/2 z-20"
            >
              <Button
                variant="secondary"
                size="icon"
                onClick={() => scrollToBottom()}
                className="w-9 h-9 rounded-full shadow-lg border border-border/50 bg-background/80 backdrop-blur-md"
              >
                <ArrowDown className="w-4 h-4" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="pb-8 pt-4 bg-gradient-to-t from-background via-background/95 to-transparent">
          <div className="max-w-3xl mx-auto">
            <ChatInput
              onSend={handleSend}
              isLoading={sendMessage.isPending || createAndSend.isPending}
            />
            <p className="text-[10px] text-center text-muted-foreground/40 mt-4 font-medium uppercase tracking-widest">
              Secured by Cloudflare Durable Objects
            </p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}