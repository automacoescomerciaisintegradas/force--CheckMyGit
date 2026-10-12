import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Terminal, Search, Plus, Menu } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
type AppLayoutProps = {
  children: React.ReactNode;
  className?: string;
};
export function AppLayout({ children, className }: AppLayoutProps): JSX.Element {
  useEffect(() => {
    document.title = "Cleudocode - Minimalismo e Potência.";
  }, []);
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-muted selection:text-foreground">
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4 md:gap-10">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden h-9 w-9">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72">
                <SheetHeader className="mb-8">
                  <SheetTitle className="flex items-center gap-2">
                    <Terminal className="h-5 w-5" /> Cleudocode
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-4 text-sm font-medium">
                  <Link to="/" className="p-3 rounded-xl hover:bg-accent transition-colors">Explorar</Link>
                  <Link to="/issues" className="p-3 rounded-xl hover:bg-accent transition-colors">Issues</Link>
                  <Link to="/pulls" className="p-3 rounded-xl hover:bg-accent transition-colors">Pull Requests</Link>
                </nav>
              </SheetContent>
            </Sheet>
            <Link to="/" className="flex items-center space-x-2.5 group">
              <div className="bg-primary rounded-[10px] p-1.5 transition-all group-hover:scale-105 group-hover:rotate-3 shadow-sm">
                <Terminal className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-bold text-[17px] tracking-tight">Cleudocode</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-8 text-[13px] font-medium text-muted-foreground">
              <Link to="/" className="hover:text-foreground transition-colors">Explorar</Link>
              <Link to="/issues" className="hover:text-foreground transition-colors">Issues</Link>
              <Link to="/pulls" className="hover:text-foreground transition-colors">Pull Requests</Link>
            </nav>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden sm:block relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/50" />
              <Input
                type="search"
                placeholder="Pesquisar..."
                className="pl-9 w-[180px] lg:w-[320px] bg-secondary border-transparent focus:bg-background focus:ring-0 focus:border-border transition-all rounded-xl h-9 text-[13px]"
              />
            </div>
            <div className="flex items-center gap-1 md:gap-2">
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-muted-foreground hover:text-foreground">
                <Plus className="h-4 w-4" />
              </Button>
              <ThemeToggle className="static" />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-9 w-9 rounded-full ml-1 p-0 overflow-hidden ring-offset-background transition-all hover:opacity-80">
                    <Avatar className="h-7 w-7 border border-border shadow-ultra-sm">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 rounded-2xl border-border shadow-2xl p-2" align="end">
                  <DropdownMenuLabel className="font-normal p-3">
                    <div className="flex flex-col space-y-1">
                      <p className="text-[13px] font-bold">Desenvolvedor</p>
                      <p className="text-[11px] text-muted-foreground">contato@automacoescomerciais.com.br</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/automacoescomerciais" className="p-3 cursor-pointer rounded-xl text-[13px] font-medium">Seu perfil</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="p-3 cursor-pointer rounded-xl text-[13px] font-medium">Configurações</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="p-3 cursor-pointer rounded-xl text-[13px] font-medium text-destructive">Sair</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>
      <main className={`flex-1 ${className}`}>
        {children}
      </main>
      <footer className="border-t border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-16">
            <div className="col-span-1 md:col-span-2 space-y-6">
              <div className="flex items-center gap-2.5">
                <div className="bg-primary rounded-lg p-1">
                  <Terminal className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="font-bold text-lg tracking-tight">Cleudocode</span>
              </div>
              <p className="text-[14px] text-muted-foreground max-w-sm leading-relaxed font-medium">
                A IA de elite para automação comercial e orquestração de sistemas. Desenvolvido com exclusividade pela Automações Comerciais Integradas.
              </p>
            </div>
            <div className="space-y-5">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground/60">Conexão</h4>
              <nav className="flex flex-col gap-3">
                <a href="mailto:contato@automacoescomerciais.com.br" className="text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors">Email</a>
                <a href="https://wa.me/558894227586" className="text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors">WhatsApp</a>
              </nav>
            </div>
            <div className="space-y-5">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground/60">Plataforma</h4>
              <nav className="flex flex-col gap-3">
                <Link to="#" className="text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors">Privacidade</Link>
                <Link to="#" className="text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors">Termos de Uso</Link>
              </nav>
            </div>
          </div>
          <div className="mt-20 pt-8 border-t border-border/50 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-[11px] font-medium text-muted-foreground/60">© 2026 Automações Comerciais Integradas.</p>
            <div className="flex items-center gap-6">
               <span className="text-[9px] font-bold tracking-[0.3em] text-muted-foreground/40 uppercase">Designed for Performance</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}