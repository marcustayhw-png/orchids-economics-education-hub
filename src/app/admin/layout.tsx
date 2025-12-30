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
              "flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200",
              pathname === item.href
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-[1.02]"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground hover:translate-x-1"
            )}
          >
            <item.icon className="w-4 h-4" />
            {item.name}
          </Link>
        ))}
      </nav>
    );

    return (
      <div className="min-h-screen bg-[#f8fafc] dark:bg-background flex flex-col md:flex-row">
        {/* Mobile Header */}
        <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 md:hidden">
          <div className="flex h-16 items-center justify-between px-4">
            <div className="flex items-center gap-3">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden hover:bg-accent rounded-full">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[280px] sm:w-[320px] p-0 border-r-0">
                  <div className="flex flex-col h-full bg-card">
                    <div className="p-6 border-b">
                      <h2 className="text-xl font-bold bg-gradient-to-br from-primary to-primary/60 bg-clip-text text-transparent">Admin Panel</h2>
                      <p className="text-xs text-muted-foreground mt-1">Management Console</p>
                    </div>
                    <div className="p-4 flex-1">
                      <NavLinks onClick={() => setIsMobileMenuOpen(false)} />
                    </div>
                    <div className="p-4 mt-auto border-t bg-muted/30">
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl"
                        onClick={handleSignOut}
                        disabled={isLoggingOut}
                      >
                        {isLoggingOut ? (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <LogOut className="w-4 h-4 mr-2" />
                        )}
                        Logout
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
              <h2 className="text-lg font-bold tracking-tight">Admin</h2>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/admin/marking" className={cn(
                "p-2 rounded-full transition-colors",
                pathname === "/admin/marking" ? "bg-primary/10 text-primary" : "text-muted-foreground"
              )}>
                <CheckSquare className="h-5 w-5" />
              </Link>
              <Button variant="ghost" size="icon" className="rounded-full" onClick={handleSignOut}>
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>

        {/* Desktop Sidebar */}
        <aside className="w-64 border-r bg-card hidden md:flex flex-col sticky top-0 h-screen shadow-sm">
          <div className="p-8">
            <h2 className="text-2xl font-bold bg-gradient-to-br from-primary to-primary/60 bg-clip-text text-transparent">Admin</h2>
            <p className="text-xs text-muted-foreground mt-1">Management Console</p>
          </div>
          <div className="flex-1 px-4 space-y-4">
            <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Navigation
            </div>
            <NavLinks />
          </div>
          <div className="p-6 border-t bg-muted/10">
            <Button
              variant="ghost"
              className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl transition-all"
              onClick={handleSignOut}
              disabled={isLoggingOut}
            >
              {isLoggingOut ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <LogOut className="w-4 h-4 mr-2" />
              )}
              Logout
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 overflow-y-auto px-4 py-6 md:p-8">
            <div className="max-w-7xl mx-auto space-y-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    );

}
