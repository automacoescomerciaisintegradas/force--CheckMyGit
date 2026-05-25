import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sparkles, Plus, History, Settings, LogOut } from "lucide-react";
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
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { ChatSession } from "@shared/types";
type AppLayoutProps = {
  children: React.ReactNode;
  className?: string;
};
export function AppLayout({ children, className }: AppLayoutProps): JSX.Element {
  const navigate = useNavigate();
  const createSession = useMutation({
    mutationFn: () => api<ChatSession>('/api/sessions', { method: 'POST' }),
    onSuccess: (data) => {
      navigate(`/c/${data.id}`);
    }
  });
  return (
    <div className="min-h-screen bg-background flex flex-col font-sans selection:bg-primary/10">
      <header className="h-14 border-b bg-background/80 backdrop-blur-md sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-5xl mx-auto h-full px-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold tracking-tight text-lg hidden sm:inline-block">Forge AI</span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="hidden sm:flex items-center gap-2 rounded-full h-9"
              onClick={() => createSession.mutate()}
              disabled={createSession.isPending}
            >
              <Plus className="w-4 h-4" />
              <span>New Chat</span>
            </Button>
            <ThemeToggle className="static" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full p-0">
                  <Avatar className="h-9 w-9 border transition-all hover:ring-2 hover:ring-primary/20">
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
                    <AvatarFallback>FU</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Forge User</p>
                    <p className="text-xs leading-none text-muted-foreground">user@forge.ai</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <History className="mr-2 h-4 w-4" />
                  <span>Chat History</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <main className={`flex-1 overflow-hidden flex flex-col ${className}`}>
        {children}
      </main>
    </div>
  );
}