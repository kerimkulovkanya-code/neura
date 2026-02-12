import { Outlet, Link } from 'react-router-dom';
import { Toaster } from 'sonner';
import ConnectButton from '@/components/web3/ConnectButton';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function MainLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-animate">
      <Toaster richColors position="bottom-right" />
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="text-xl font-bold">
            Neura
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
              Canvas
            </Link>
            <Link to="/challenges" className="text-sm font-medium hover:text-primary transition-colors">
              Challenges
            </Link>
            <Link to="/profile" className="text-sm font-medium hover:text-primary transition-colors">
              Profile
            </Link>
            <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors">
              About
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <ConnectButton />
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden border-t bg-background/95 backdrop-blur">
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-3">
              <Link to="/" className="text-sm font-medium hover:text-primary transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>Canvas</Link>
              <Link to="/challenges" className="text-sm font-medium hover:text-primary transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>Challenges</Link>
              <Link to="/profile" className="text-sm font-medium hover:text-primary transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>Profile</Link>
              <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>About</Link>
            </div>
          </nav>
        )}
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <Outlet />
      </main>

      <footer className="border-t py-6 bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Neura – Where discipline meets community.
        </div>
      </footer>
    </div>
  );
}