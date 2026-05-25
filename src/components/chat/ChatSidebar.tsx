import React, { useState, useMemo } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Plus, MessageSquare, Trash2, Clock, Sparkles } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuAction,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api-client";
import { ChatSession } from "@shared/types";
import { ChatHistorySearch } from "./ChatHistorySearch";
export function ChatSidebar(): JSX.Element {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const { data: sessions, isLoading } = useQuery({
    queryKey: ['sessions'],
    queryFn: () => api<{ items: ChatSession[] }>('/api/sessions'),
  });
  const filteredSessions = useMemo(() => {
    if (!sessions?.items) return [];
    if (!searchQuery.trim()) return sessions.items;
    return sessions.items.filter(s => 
      s.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [sessions, searchQuery]);
  const createSession = useMutation({
    mutationFn: () => api<ChatSession>('/api/sessions', { method: 'POST' }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['sessions'] });
      navigate(`/c/${data.id}`);
    }
  });
  const deleteSession = useMutation({
    mutationFn: (id: string) => api(`/api/sessions/${id}`, { method: 'DELETE' }),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['sessions'] });
      if (sessionId === id) navigate('/');
    }
  });
  return (
    <Sidebar className="border-r">
      <SidebarHeader className="p-4 flex flex-col gap-4">
        <div className="flex items-center gap-2 px-1">
          <div className="w-6 h-6 rounded-lg bg-primary flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-primary-foreground" />
          </div>
          <span className="font-bold text-sm tracking-tight">Forge AI</span>
        </div>
        <Button
          className="w-full justify-start gap-2 rounded-xl h-9"
          onClick={() => createSession.mutate()}
          disabled={createSession.isPending}
        >
          <Plus className="h-4 w-4" />
          <span className="text-xs font-medium">New Chat</span>
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <ChatHistorySearch 
          value={searchQuery} 
          onChange={setSearchQuery} 
          className="mb-2"
        />
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] uppercase tracking-wider font-bold opacity-50 px-3">
            History
          </SidebarGroupLabel>
          <SidebarMenu className="px-1">
            {isLoading ? (
              <div className="px-4 py-2 space-y-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-9 w-full bg-muted/50 animate-pulse rounded-lg" />
                ))}
              </div>
            ) : filteredSessions.length === 0 ? (
              <div className="px-4 py-8 text-center">
                <p className="text-[11px] text-muted-foreground">
                  {searchQuery ? "No matching chats" : "Start your first chat"}
                </p>
              </div>
            ) : (
              <AnimatePresence mode="popLayout" initial={false}>
                {filteredSessions.map((session) => (
                  <motion.div
                    key={session.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                  >
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={sessionId === session.id}
                        tooltip={session.title}
                        className="h-11 rounded-lg transition-all"
                      >
                        <Link to={`/c/${session.id}`} className="flex items-center gap-3 overflow-hidden">
                          <MessageSquare className="h-4 w-4 shrink-0 text-muted-foreground" />
                          <div className="flex flex-col items-start overflow-hidden text-left gap-0.5">
                            <span className="w-full truncate font-medium text-[13px] leading-tight">
                              {session.title || "Untitled Chat"}
                            </span>
                            <span className="text-[10px] text-muted-foreground/60 flex items-center gap-1">
                              <Clock className="h-2.5 w-2.5" />
                              {formatDistanceToNow(session.updatedAt, { addSuffix: true })}
                            </span>
                          </div>
                        </Link>
                      </SidebarMenuButton>
                      <SidebarMenuAction
                        onClick={() => deleteSession.mutate(session.id)}
                        className="hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </SidebarMenuAction>
                    </SidebarMenuItem>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t bg-muted/20">
        <div className="flex items-center justify-between text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
          <span>Forge v1.2</span>
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            <span>Online</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}