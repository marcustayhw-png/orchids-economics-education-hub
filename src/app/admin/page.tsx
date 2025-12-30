"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { EssayManager } from "@/components/admin/essay-manager";
import { CSQManager } from "@/components/admin/csq-manager";
import { NotesManager } from "@/components/admin/notes-manager";
import { FlashcardManager } from "@/components/admin/flashcard-manager";
import { CurrentAffairsManager } from "@/components/admin/current-affairs-manager";
import { CheckSquare, ArrowRight, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AdminPage() {
  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Content Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage your educational resources and student submissions.</p>
        </div>
        <Link href="/admin/marking" className="sm:hidden">
          <Button className="w-full flex items-center justify-center gap-2">
            <CheckSquare className="w-4 h-4" />
            Marking Requests
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>

      {/* Quick Stats / Action for Mobile */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-primary" />
              Work Submissions
            </CardTitle>
            <CardDescription>Review student work and provide feedback.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/admin/marking">
              <Button variant="outline" size="sm" className="w-full group">
                View All Requests
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="essays" className="space-y-6">
        <div className="sticky top-[64px] z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-2 -mx-4 px-4 md:mx-0 md:px-0">
          <TabsList className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground w-full overflow-x-auto overflow-y-hidden scrollbar-none">
            <div className="flex min-w-max gap-1">
              <TabsTrigger value="essays" className="rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm">Essays</TabsTrigger>
              <TabsTrigger value="csqs" className="rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm">CSQs</TabsTrigger>
              <TabsTrigger value="notes" className="rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm">Notes</TabsTrigger>
              <TabsTrigger value="flashcards" className="rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm">Flashcards</TabsTrigger>
              <TabsTrigger value="current-affairs" className="rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm">Current Affairs</TabsTrigger>
            </div>
          </TabsList>
        </div>

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
  );
}
