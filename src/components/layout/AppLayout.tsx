import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Terminal, Search, Bell, Plus } from "lucide-react";
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
      <header className="sticky top-0 z-50 w-full border-b border-zinc-100 bg-white/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <Link to="/" className="flex items-center space-x-2.5 group">
              <div className="bg-zinc-950 rounded-[10px] p-1.5 transition-all group-hover:scale-105 group-hover:rotate-3 shadow-sm">
                <Terminal className="h-4.5 w-4.5 text-white" />
              </div>
              <span className="font-bold text-[17px] tracking-tight text-zinc-900">Cleudocode</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-8 text-[13px] font-medium text-zinc-400">
              <Link to="/" className="hover:text-zinc-900 transition-colors">Explorar</Link>
              <Link to="/issues" className="hover:text-zinc-900 transition-colors">Issues</Link>
              <Link to="/pulls" className="hover:text-zinc-900 transition-colors">Pull Requests</Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:block relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-300" />
              <Input
                type="search"
                placeholder="Pesquisar..."
                className="pl-9 w-[220px] lg:w-[320px] bg-zinc-100/50 border-transparent focus:bg-white focus:ring-0 focus:border-zinc-200 transition-all rounded-xl h-9 text-[13px]"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100">
                <Plus className="h-4 w-4" />
              </Button>
              <ThemeToggle className="static" />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-9 w-9 rounded-full ml-1 hover:bg-zinc-100 transition-all p-0">
                    <Avatar className="h-7 w-7 border border-zinc-200/50 shadow-ultra-sm">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 rounded-2xl border-zinc-100 shadow-2xl p-2" align="end">
                  <DropdownMenuLabel className="font-normal p-3">
                    <div className="flex flex-col space-y-1">
                      <p className="text-[13px] font-bold">Desenvolvedor</p>
                      <p className="text-[11px] text-zinc-400">contato@automacoescomerciais.com.br</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-zinc-50" />
                  <DropdownMenuItem asChild>
                    <Link to="/automacoescomerciais" className="p-3 cursor-pointer rounded-xl text-[13px] font-medium">Seu perfil</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="p-3 cursor-pointer rounded-xl text-[13px] font-medium">Configurações</DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-zinc-50" />
                  <DropdownMenuItem className="p-3 cursor-pointer rounded-xl text-[13px] font-medium text-red-500">Sair</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>
      <main className={`flex-1 ${className}`}>
        {children}
      </main>
      <footer className="border-t border-zinc-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
            <div className="col-span-2 space-y-6">
              <div className="flex items-center gap-2.5">
                <div className="bg-zinc-900 rounded-lg p-1">
                  <Terminal className="h-4 w-4 text-white" />
                </div>
                <span className="font-bold text-lg tracking-tight">Cleudocode</span>
              </div>
              <p className="text-[14px] text-zinc-400 max-w-sm leading-relaxed font-medium">
                A IA de elite para automação comercial e orquestração de sistemas. Desenvolvido com exclusividade pela Automações Comerciais Integradas.
              </p>
            </div>
            <div className="space-y-5">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-300">Conexão</h4>
              <nav className="flex flex-col gap-3">
                <a href="mailto:contato@automacoescomerciais.com.br" className="text-[13px] font-medium text-zinc-500 hover:text-zinc-900 transition-colors">Email</a>
                <a href="https://wa.me/558894227586" className="text-[13px] font-medium text-zinc-500 hover:text-zinc-900 transition-colors">WhatsApp</a>
              </nav>
            </div>
            <div className="space-y-5">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-300">Plataforma</h4>
              <nav className="flex flex-col gap-3">
                <Link to="#" className="text-[13px] font-medium text-zinc-500 hover:text-zinc-900 transition-colors">Privacidade</Link>
                <Link to="#" className="text-[13px] font-medium text-zinc-500 hover:text-zinc-900 transition-colors">Termos de Uso</Link>
              </nav>
            </div>
          </div>
          <div className="mt-24 pt-8 border-t border-zinc-50 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-[11px] font-medium text-zinc-300">© 2026 Automações Comerciais Integradas.</p>
            <div className="flex items-center gap-6">
               <span className="text-[9px] font-bold tracking-[0.3em] text-zinc-200 uppercase">Designed for Performance</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}