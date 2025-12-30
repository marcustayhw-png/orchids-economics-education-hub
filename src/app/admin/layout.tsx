"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Loader2, LogOut, LayoutDashboard, CheckSquare, FileText, BookOpen, Layers, Zap, Newspaper } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, isPending, refetch } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/login?redirect=" + pathname);
    }
  }, [session, isPending, router, pathname]);

  const handleSignOut = async () => {
    setIsLoggingOut(true);
    const token = localStorage.getItem("bearer_token");

    const { error } = await authClient.signOut({
      fetchOptions: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });

    if (error?.code) {
      toast.error(error.code);
      setIsLoggingOut(false);
    } else {
      localStorage.removeItem("bearer_token");
      refetch();
      toast.success("Logged out successfully");
      router.push("/");
    }
  };

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

    const navItems = [
      { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
      { name: "Marking", href: "/admin/marking", icon: CheckSquare },
    ];

    const NavLinks = ({ onClick }: { onClick?: () => void }) => (
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClick}
            className={cn(
              "flex items-center gap-3 px-3 py-3 text-sm font-semibold rounded-xl transition-all",
              pathname === item.href
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-[1.02]"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            <item.icon className="w-5 h-5" />
            {item.name}
          </Link>
        ))}
      </nav>
    );

    return (
      <div className="min-h-screen bg-[#050505] text-white flex flex-col md:flex-row font-sans">
        {/* Mobile Header */}
        <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-black/80 backdrop-blur-xl md:hidden">
          <div className="flex h-16 items-center justify-between px-4">
            <div className="flex items-center gap-3">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="hover:bg-white/5 rounded-full">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] bg-black border-white/5 p-0">
                  <div className="flex flex-col h-full">
                    <div className="p-8 border-b border-white/5">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                          <Layers className="w-6 h-6 text-primary" />
                        </div>
                        <h2 className="text-xl font-black tracking-tighter uppercase">Admin Panel</h2>
                      </div>
                      <p className="text-xs text-white/40 font-bold uppercase tracking-[0.2em]">Management Console</p>
                    </div>
                    <div className="p-6 flex-1">
                      <NavLinks onClick={() => setIsMobileMenuOpen(false)} />
                    </div>
                    <div className="p-6 mt-auto border-t border-white/5 bg-white/[0.02]">
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-white/60 hover:text-red-400 hover:bg-red-400/10 rounded-xl h-12 font-bold"
                        onClick={handleSignOut}
                        disabled={isLoggingOut}
                      >
                        {isLoggingOut ? (
                          <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                        ) : (
                          <LogOut className="w-5 h-5 mr-3" />
                        )}
                        Logout
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-black tracking-tighter uppercase">EconStack</h2>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost" size="icon" className="rounded-full hover:bg-white/5">
                <Link href="/admin/marking">
                  <CheckSquare className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/5" onClick={handleSignOut}>
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>

        {/* Desktop Sidebar */}
        <aside className="w-72 border-r border-white/5 bg-black hidden md:flex flex-col sticky top-0 h-screen">
          <div className="p-10 border-b border-white/5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Layers className="w-7 h-7 text-primary" />
              </div>
              <h2 className="text-2xl font-black tracking-tighter uppercase">Admin</h2>
            </div>
            <p className="text-[10px] text-white/30 font-black uppercase tracking-[0.3em]">System Controller</p>
          </div>
          <div className="flex-1 p-6">
            <NavLinks />
          </div>
          <div className="p-6 border-t border-white/5 bg-white/[0.01]">
            <Button
              variant="ghost"
              className="w-full justify-start text-white/50 hover:text-red-400 hover:bg-red-400/10 h-12 rounded-xl font-bold transition-all"
              onClick={handleSignOut}
              disabled={isLoggingOut}
            >
              {isLoggingOut ? (
                <Loader2 className="w-5 h-5 mr-3 animate-spin" />
              ) : (
                <LogOut className="w-5 h-5 mr-3" />
              )}
              Logout
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col min-w-0 bg-[#080808]">
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-7xl mx-auto p-6 md:p-12">
              {children}
            </div>
          </div>
        </main>
      </div>
    );
}
