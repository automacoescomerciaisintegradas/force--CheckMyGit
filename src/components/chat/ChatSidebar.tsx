import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Plus, MessageSquare, Trash2, Clock } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
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
import { cn } from "@/lib/utils";
export function ChatSidebar(): JSX.Element {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: sessions, isLoading } = useQuery({
    queryKey: ['sessions'],
    queryFn: () => api<{ items: ChatSession[] }>('/api/sessions'),
  });
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
      if (sessionId === id) {
        navigate('/');
      }
    }
  });
  return (
    <Sidebar className="border-r">
      <SidebarHeader className="p-4">
        <Button 
          className="w-full justify-start gap-2 rounded-xl" 
          onClick={() => createSession.mutate()}
          disabled={createSession.isPending}
        >
          <Plus className="h-4 w-4" />
          <span>New Chat</span>
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Recent Conversations</SidebarGroupLabel>
          <SidebarMenu>
            {isLoading ? (
              <div className="px-4 py-2 space-y-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-8 w-full bg-muted animate-pulse rounded-md" />
                ))}
              </div>
            ) : sessions?.items?.length === 0 ? (
              <div className="px-4 py-8 text-center">
                <p className="text-xs text-muted-foreground">No recent chats</p>
              </div>
            ) : (
              sessions?.items.map((session) => (
                <SidebarMenuItem key={session.id}>
                  <SidebarMenuButton
                    asChild
                    isActive={sessionId === session.id}
                    tooltip={session.title}
                  >
                    <Link to={`/c/${session.id}`} className="flex items-center gap-2 overflow-hidden">
                      <MessageSquare className="h-4 w-4 shrink-0" />
                      <div className="flex flex-col items-start overflow-hidden text-left">
                        <span className="w-full truncate font-medium text-sm">
                          {session.title || "Untitled Chat"}
                        </span>
                        <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                          <Clock className="h-2.5 w-2.5" />
                          {formatDistanceToNow(session.updatedAt, { addSuffix: true })}
                        </span>
                      </div>
                    </Link>
                  </SidebarMenuButton>
                  <SidebarMenuAction 
                    onClick={() => deleteSession.mutate(session.id)}
                    className="hover:text-destructive transition-colors"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </SidebarMenuAction>
                </SidebarMenuItem>
              ))
            )}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t">
        <div className="flex items-center justify-between text-[10px] text-muted-foreground uppercase tracking-widest font-semibold px-2">
          <span>Forge AI v1.0</span>
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}