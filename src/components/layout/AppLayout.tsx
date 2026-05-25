import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sparkles, Plus, History, Settings, LogOut, Trash2, Moon, Sun, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { ChatSidebar } from "@/components/chat/ChatSidebar";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { ChatSession } from "@shared/types";
import { useTheme } from "@/hooks/use-theme";
type AppLayoutProps = {
  children: React.ReactNode;
  className?: string;
};
export function AppLayout({ children, className }: AppLayoutProps): JSX.Element {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isDark, toggleTheme } = useTheme();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const createSession = useMutation({
    mutationFn: () => api<ChatSession>('/api/sessions', { method: 'POST' }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['sessions'] });
      navigate(`/c/${data.id}`);
    }
  });
  const clearAllChats = useMutation({
    mutationFn: async () => {
      const { items } = await api<{ items: ChatSession[] }>('/api/sessions');
      await Promise.all(items.map(s => api(`/api/sessions/${s.id}`, { method: 'DELETE' })));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sessions'] });
      setSettingsOpen(false);
      navigate('/');
    }
  });
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background font-sans selection:bg-primary/10">
        <ChatSidebar />
        <SidebarInset className="flex flex-col">
          <header className="h-14 border-b bg-background/80 backdrop-blur-md sticky top-0 z-50 transition-all duration-300">
            <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="lg:hidden" />
                <Link to="/" className="flex items-center gap-2 group lg:hidden">
                  <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Sparkles className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <span className="font-bold tracking-tight text-lg">Forge</span>
                </Link>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="hidden md:flex items-center gap-2 rounded-full h-8 px-4 border-primary/20 hover:bg-primary/5"
                  onClick={() => createSession.mutate()}
                  disabled={createSession.isPending}
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span className="text-xs font-semibold">New Chat</span>
                </Button>
                <ThemeToggle className="static" />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full p-0 ring-offset-background focus-visible:ring-2 focus-visible:ring-primary/20">
                      <Avatar className="h-8 w-8 border">
                        <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
                        <AvatarFallback>FU</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">Forge User</p>
                        <p className="text-[10px] leading-none text-muted-foreground">Premium Builder</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setSettingsOpen(true)}>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive focus:text-destructive">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>
          <main className={`flex-1 overflow-hidden flex flex-col ${className}`}>
            {children}
          </main>
        </SidebarInset>
      </div>
      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogContent className="sm:max-w-[425px] rounded-[32px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Preferences</DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">
              Customize your Forge experience
            </DialogDescription>
          </DialogHeader>
          <div className="py-6 space-y-6">
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase text-muted-foreground/60">Appearance</h4>
              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-2xl border">
                <div className="flex items-center gap-3">
                  {isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                  <span className="text-sm font-medium">Dark Mode</span>
                </div>
                <Button variant="ghost" size="sm" onClick={toggleTheme} className="text-xs rounded-lg">
                  {isDark ? "Disable" : "Enable"}
                </Button>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase text-muted-foreground/60">AI Persona</h4>
              <div className="flex flex-wrap gap-2">
                {['Minimalist', 'Concise', 'Detailed'].map(p => (
                  <Button key={p} variant={p === 'Minimalist' ? 'secondary' : 'outline'} size="sm" className="text-[11px] rounded-full h-7">
                    {p}
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-4 pt-4 border-t">
              <h4 className="text-xs font-bold uppercase text-destructive/60">Data Management</h4>
              <Button 
                variant="destructive" 
                size="sm" 
                className="w-full gap-2 rounded-xl h-9"
                onClick={() => clearAllChats.mutate()}
                disabled={clearAllChats.isPending}
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All Chat History</span>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  );
}