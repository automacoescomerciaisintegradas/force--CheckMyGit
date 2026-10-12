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
    document.title = "Cleudocode - A IA que realmente faz as coisas.";
  }, []);
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 max-w-7xl mx-auto items-center px-4 sm:px-6 lg:px-8">
          <div className="mr-4 flex items-center gap-6">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="bg-primary rounded-lg p-1.5 transition-transform group-hover:scale-110">
                <Terminal className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="hidden font-bold text-xl sm:inline-block tracking-tight">Cleudocode</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
              <Link to="/" className="transition-colors hover:text-foreground text-foreground/60">Explorar</Link>
              <Link to="/issues" className="transition-colors hover:text-foreground text-foreground/60">Problemas</Link>
              <Link to="/pulls" className="transition-colors hover:text-foreground text-foreground/60">Solicitações de Pull</Link>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-foreground transition-colors" />
                <Input
                  type="search"
                  placeholder="Pesquisar no Cleudocode..."
                  className="pl-10 w-full md:w-[240px] lg:w-[320px] bg-muted/50 border-transparent focus:bg-background focus:border-border transition-all rounded-xl h-10"
                />
              </div>
            </div>
            <nav className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl">
                <Plus className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl">
                <Bell className="h-5 w-5" />
              </Button>
              <ThemeToggle className="static" />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full ml-2 ring-offset-background transition-all hover:ring-2 hover:ring-primary/20">
                    <Avatar className="h-9 w-9 border">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 rounded-xl" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">Desenvolvedor</p>
                      <p className="text-xs leading-none text-muted-foreground">contato@automacoescomerciais.com.br</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/automacoescomerciais" className="cursor-pointer">Seu perfil</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">Configurações</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">Sair</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>
          </div>
        </div>
      </header>
      <main className={`flex-1 ${className}`}>
        {children}
      </main>
      <footer className="border-t bg-muted/20">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Terminal className="h-6 w-6" />
                <span className="font-bold text-lg">Cleudocode</span>
              </div>
              <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
                A IA que realmente faz as coisas. Uma solução exclusiva da Automações Comerciais Integradas para automação avançada e criação de conteúdo.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-sm uppercase tracking-wider">Fale Conosco</h4>
              <div className="space-y-2">
                <a href="mailto:contato@automacoescomerciais.com.br" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <Mail className="h-4 w-4" />
                  contato@automacoescomerciais.com.br
                </a>
                <a href="https://wa.me/558894227586" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-green-500 transition-colors">
                  <MessageCircle className="h-4 w-4" />
                  Suporte WhatsApp
                </a>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-sm uppercase tracking-wider">Jurídico</h4>
              <p className="text-sm text-muted-foreground">
                © Automações Comerciais Integradas 2026. Todos os direitos reservados.
              </p>
            </div>
          </div>
          <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground">
              Construído com precisão para o futuro da criação. 🤖✨
            </p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <Link to="#" className="hover:underline">Política de Privacidade</Link>
              <Link to="#" className="hover:underline">Termos de Serviço</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}