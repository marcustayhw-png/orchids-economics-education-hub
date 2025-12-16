"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, LogOut } from "lucide-react";
import { EssayManager } from "@/components/admin/essay-manager";
import { CSQManager } from "@/components/admin/csq-manager";
import { NotesManager } from "@/components/admin/notes-manager";
import { FlashcardManager } from "@/components/admin/flashcard-manager";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export default function AdminPage() {
  const { data: session, isPending, refetch } = useSession();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/login?redirect=/admin");
    }
  }, [session, isPending, router]);

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

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          <Button
            variant="outline"
            onClick={handleSignOut}
            disabled={isLoggingOut}
          >
            {isLoggingOut ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Logging out...
              </>
            ) : (
              <>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </>
            )}
          </Button>
        </div>

        {/* Content Management Tabs */}
        <Tabs defaultValue="essays" className="space-y-6">
          <TabsList className="grid w-full max-w-4xl grid-cols-5">
            <TabsTrigger value="essays">Essays</TabsTrigger>
            <TabsTrigger value="csqs">CSQs</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
            <TabsTrigger value="flashcards">Flashcards</TabsTrigger>
            <TabsTrigger value="current-affairs">Current Affairs</TabsTrigger>
          </TabsList>

          <TabsContent value="essays">
            <Card>
              <CardHeader>
                <CardTitle>Essay Management</CardTitle>
              </CardHeader>
              <CardContent>
                <EssayManager />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="csqs">
            <Card>
              <CardHeader>
                <CardTitle>CSQ Management</CardTitle>
              </CardHeader>
              <CardContent>
                <CSQManager />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notes">
            <Card>
              <CardHeader>
                <CardTitle>Notes Management</CardTitle>
              </CardHeader>
              <CardContent>
                <NotesManager />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="flashcards">
            <Card>
              <CardHeader>
                <CardTitle>Flashcard Management</CardTitle>
              </CardHeader>
              <CardContent>
                <FlashcardManager />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, LogOut } from "lucide-react";
import { EssayManager } from "@/components/admin/essay-manager";
import { CSQManager } from "@/components/admin/csq-manager";
import { NotesManager } from "@/components/admin/notes-manager";
import { FlashcardManager } from "@/components/admin/flashcard-manager";
import { CurrentAffairsManager } from "@/components/admin/current-affairs-manager";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export default function AdminPage() {
  const { data: session, isPending, refetch } = useSession();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/login?redirect=/admin");
    }
  }, [session, isPending, router]);

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

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          <Button
            variant="outline"
            onClick={handleSignOut}
            disabled={isLoggingOut}
          >
            {isLoggingOut ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Logging out...
              </>
            ) : (
              <>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </>
            )}
          </Button>
        </div>

        {/* Content Management Tabs */}
        <Tabs defaultValue="essays" className="space-y-6">
          <TabsList className="grid w-full max-w-4xl grid-cols-5">
            <TabsTrigger value="essays">Essays</TabsTrigger>
            <TabsTrigger value="csqs">CSQs</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
            <TabsTrigger value="flashcards">Flashcards</TabsTrigger>
            <TabsTrigger value="current-affairs">Current Affairs</TabsTrigger>
          </TabsList>

          <TabsContent value="essays">
            <Card>
              <CardHeader>
                <CardTitle>Essay Management</CardTitle>
              </CardHeader>
              <CardContent>
                <EssayManager />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="csqs">
            <Card>
              <CardHeader>
                <CardTitle>CSQ Management</CardTitle>
              </CardHeader>
              <CardContent>
                <CSQManager />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notes">
            <Card>
              <CardHeader>
                <CardTitle>Notes Management</CardTitle>
              </CardHeader>
              <CardContent>
                <NotesManager />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="flashcards">
            <Card>
              <CardHeader>
                <CardTitle>Flashcard Management</CardTitle>
              </CardHeader>
              <CardContent>
                <FlashcardManager />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, LogOut } from "lucide-react";
import { EssayManager } from "@/components/admin/essay-manager";
import { CSQManager } from "@/components/admin/csq-manager";
import { NotesManager } from "@/components/admin/notes-manager";
import { FlashcardManager } from "@/components/admin/flashcard-manager";
import { CurrentAffairsManager } from "@/components/admin/current-affairs-manager";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export default function AdminPage() {
  const { data: session, isPending, refetch } = useSession();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/login?redirect=/admin");
    }
  }, [session, isPending, router]);

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

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          <Button
            variant="outline"
            onClick={handleSignOut}
            disabled={isLoggingOut}
          >
            {isLoggingOut ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Logging out...
              </>
            ) : (
              <>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </>
            )}
          </Button>
        </div>

        {/* Content Management Tabs */}
        <Tabs defaultValue="essays" className="space-y-6">
          <TabsList className="grid w-full max-w-4xl grid-cols-5">
            <TabsTrigger value="essays">Essays</TabsTrigger>
            <TabsTrigger value="csqs">CSQs</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
            <TabsTrigger value="flashcards">Flashcards</TabsTrigger>
            <TabsTrigger value="current-affairs">Current Affairs</TabsTrigger>
          </TabsList>

          <TabsContent value="essays">
            <Card>
              <CardHeader>
                <CardTitle>Essay Management</CardTitle>
              </CardHeader>
              <CardContent>
                <EssayManager />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="csqs">
            <Card>
              <CardHeader>
                <CardTitle>CSQ Management</CardTitle>
              </CardHeader>
              <CardContent>
                <CSQManager />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notes">
            <Card>
              <CardHeader>
                <CardTitle>Notes Management</CardTitle>
              </CardHeader>
              <CardContent>
                <NotesManager />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="flashcards">
            <Card>
              <CardHeader>
                <CardTitle>Flashcard Management</CardTitle>
              </CardHeader>
              <CardContent>
                <FlashcardManager />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="current-affairs">
            <Card>
              <CardHeader>
                <CardTitle>Current Affairs Management</CardTitle>
              </CardHeader>
              <CardContent>
                <CurrentAffairsManager />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}