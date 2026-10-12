import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Terminal, Search, Bell, Plus, Mail, MessageCircle } from "lucide-react";
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
type AppLayoutProps = {
  children: React.ReactNode;
  className?: string;
};
export function AppLayout({ children, className }: AppLayoutProps): JSX.Element {
  useEffect(() => {
    document.title = "Cleudocode - Minimalismo e Potência.";
  }, []);
  return (
    <div className="min-h-screen bg-[#fafafa] text-zinc-900 flex flex-col font-sans selection:bg-zinc-200 selection:text-zinc-900">
      <header className="sticky top-0 z-50 w-full border-b border-zinc-200/60 bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center space-x-2.5 group">
              <div className="bg-zinc-900 rounded-lg p-1.5 transition-transform group-hover:scale-105">
                <Terminal className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-lg tracking-tight">Cleudocode</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-7 text-[13px] font-medium text-zinc-500">
              <Link to="/" className="hover:text-zinc-900 transition-colors">Explorar</Link>
              <Link to="/issues" className="hover:text-zinc-900 transition-colors">Issues</Link>
              <Link to="/pulls" className="hover:text-zinc-900 transition-colors">Pull Requests</Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:block relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
              <Input
                type="search"
                placeholder="Pesquisar..."
                className="pl-9 w-[200px] lg:w-[280px] bg-zinc-50 border-zinc-200/80 focus:bg-white focus:border-zinc-400 transition-all rounded-xl h-9 text-xs"
              />
            </div>
            <div className="flex items-center gap-1.5">
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-zinc-500">
                <Plus className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-zinc-500">
                <Bell className="h-4 w-4" />
              </Button>
              <ThemeToggle className="static" />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-9 w-9 rounded-full ml-1 ring-offset-background hover:bg-zinc-100 transition-all">
                    <Avatar className="h-8 w-8 border border-zinc-200">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 rounded-xl border-zinc-200 shadow-xl" align="end">
                  <DropdownMenuLabel className="font-normal p-3">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-semibold">Desenvolvedor</p>
                      <p className="text-xs text-zinc-500">contato@automacoescomerciais.com.br</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-zinc-100" />
                  <DropdownMenuItem asChild>
                    <Link to="/automacoescomerciais" className="p-3 cursor-pointer">Seu perfil</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="p-3 cursor-pointer">Configurações</DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-zinc-100" />
                  <DropdownMenuItem className="p-3 cursor-pointer text-red-500">Sair</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>
      <main className={`flex-1 ${className}`}>
        {children}
      </main>
      <footer className="border-t border-zinc-200/60 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-2 space-y-5">
              <div className="flex items-center gap-2.5">
                <Terminal className="h-5 w-5" />
                <span className="font-bold text-lg">Cleudocode</span>
              </div>
              <p className="text-sm text-zinc-500 max-w-sm leading-relaxed">
                A IA de elite para automação comercial e orquestração de sistemas. Desenvolvido com exclusividade pela Automações Comerciais Integradas.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400">Contato</h4>
              <nav className="flex flex-col gap-3">
                <a href="mailto:contato@automacoescomerciais.com.br" className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors">Email</a>
                <a href="https://wa.me/558894227586" className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors">WhatsApp</a>
              </nav>
            </div>
            <div className="space-y-4">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400">Legal</h4>
              <nav className="flex flex-col gap-3">
                <Link to="#" className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors">Privacidade</Link>
                <Link to="#" className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors">Termos</Link>
              </nav>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-zinc-100 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-zinc-400">© 2026 Automações Comerciais Integradas.</p>
            <p className="text-[10px] font-medium tracking-wider text-zinc-300 uppercase">Built for Excellence</p>
          </div>
        </div>
      </footer>
    </div>
  );
}