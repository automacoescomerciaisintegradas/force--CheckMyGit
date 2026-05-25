import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Github, Search, Plus, Bell, ChevronDown, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
type AppLayoutProps = {
  children: React.ReactNode;
  className?: string;
};
export function AppLayout({ children, className }: AppLayoutProps): JSX.Element {
  const location = useLocation();
  const navLinks = [
    { label: "Pull requests", path: "/pulls" },
    { label: "Issues", path: "/issues" },
    { label: "Explore", path: "/explore" },
  ];
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="h-16 border-b bg-background sticky top-0 z-50">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader className="mb-6">
                  <SheetTitle className="flex items-center gap-2">
                    <Github className="w-6 h-6" /> Forge
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-4">
                  {navLinks.map(link => (
                    <Link 
                      key={link.path} 
                      to={link.path} 
                      className={cn(
                        "text-lg font-medium py-2 px-4 rounded-md hover:bg-muted transition-colors",
                        location.pathname === link.path && "bg-muted text-primary"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
            <Link to="/" className="hover:opacity-80 transition-opacity">
              <Github className="w-8 h-8" />
            </Link>
            <div className="hidden md:flex items-center gap-1 flex-1 max-w-sm">
              <div className="relative w-full group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  placeholder="Search or jump to..."
                  className="pl-9 bg-secondary/50 border-none h-8 text-sm focus-visible:ring-1 focus-visible:ring-ring w-full transition-all"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 hidden lg:flex items-center gap-0.5 border rounded px-1.5 py-0 bg-background text-[10px] text-muted-foreground font-mono">
                  <span>⌘</span><span>K</span>
                </div>
              </div>
            </div>
            <nav className="hidden lg:flex items-center gap-1 text-sm font-semibold">
              {navLinks.map(link => (
                <Link 
                  key={link.path} 
                  to={link.path} 
                  className={cn(
                    "px-3 py-1.5 rounded-md transition-colors",
                    location.pathname === link.path ? "text-primary bg-muted/50" : "text-muted-foreground hover:text-primary hover:bg-muted/30"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle className="static" />
            <Button variant="ghost" size="icon" className="hidden sm:flex hover:bg-muted/50">
              <Plus className="w-4 h-4" />
              <ChevronDown className="w-3 h-3 ml-0.5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-muted/50">
              <Bell className="w-4 h-4" />
            </Button>
            <Link to="/forge-dev">
              <Avatar className="w-8 h-8 border ring-offset-background transition-shadow hover:ring-2 hover:ring-ring">
                <AvatarImage src="https://github.com/forge-dev.png" />
                <AvatarFallback>FD</AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </div>
      </header>
      <main className={`flex-1 ${className}`}>
        {children}
      </main>
      <footer className="border-t py-12 bg-background mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8 text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <Github className="w-5 h-5 opacity-40" />
            <span className="font-medium">© 2023 Forge Git Platform</span>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="#" className="hover:text-primary transition-colors">Blog</a>
            <a href="#" className="hover:text-primary transition-colors">About</a>
            <a href="#" className="hover:text-primary transition-colors">Customer Service</a>
            <a href="#" className="hover:text-primary transition-colors">API</a>
            <a href="#" className="hover:text-primary transition-colors">Training</a>
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Security</a>
            <a href="#" className="hover:text-primary transition-colors">Status</a>
            <a href="#" className="hover:text-primary transition-colors font-bold">Docs</a>
          </div>
        </div>
      </footer>
    </div>
  );
}