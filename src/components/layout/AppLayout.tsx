import React from "react";
import { Link } from "react-router-dom";
import { Github, Search, Plus, Bell, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/ThemeToggle";
type AppLayoutProps = {
  children: React.ReactNode;
  className?: string;
};
export function AppLayout({ children, className }: AppLayoutProps): JSX.Element {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="h-16 border-b bg-background sticky top-0 z-50">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
            <Link to="/" className="hover:opacity-80 transition-opacity">
              <Github className="w-8 h-8" />
            </Link>
            <div className="hidden md:flex items-center gap-1 flex-1 max-w-sm">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Type / to search" 
                  className="pl-9 bg-secondary border-none h-8 text-sm focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>
            </div>
            <nav className="hidden lg:flex items-center gap-4 text-sm font-semibold">
              <Link to="/" className="hover:text-muted-foreground">Pull requests</Link>
              <Link to="/issues" className="hover:text-muted-foreground">Issues</Link>
              <Link to="/explore" className="hover:text-muted-foreground">Explore</Link>
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle className="static" />
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Plus className="w-4 h-4" />
              <ChevronDown className="w-3 h-3 ml-0.5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="w-4 h-4" />
            </Button>
            <Link to="/forge-dev">
              <Avatar className="w-8 h-8 border">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>FD</AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </div>
      </header>
      <main className={`flex-1 ${className}`}>
        {children}
      </main>
      <footer className="border-t py-8 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <Github className="w-5 h-5 opacity-50" />
            <span>© 2023 Forge, Inc.</span>
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary underline-offset-4 hover:underline">Terms</a>
            <a href="#" className="hover:text-primary underline-offset-4 hover:underline">Privacy</a>
            <a href="#" className="hover:text-primary underline-offset-4 hover:underline">Docs</a>
            <a href="#" className="hover:text-primary underline-offset-4 hover:underline">Contact Forge</a>
          </div>
        </div>
      </footer>
    </div>
  );
}