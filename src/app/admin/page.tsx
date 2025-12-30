"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EssayManager } from "@/components/admin/essay-manager";
import { CSQManager } from "@/components/admin/csq-manager";
import { NotesManager } from "@/components/admin/notes-manager";
import { FlashcardManager } from "@/components/admin/flashcard-manager";
import { CurrentAffairsManager } from "@/components/admin/current-affairs-manager";

export default function AdminPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">Content Dashboard</h1>
        <p className="text-muted-foreground">Manage your educational materials and resources.</p>
      </div>

      <Tabs defaultValue="essays" className="space-y-8">
        <div className="relative">
          <div className="overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">
            <TabsList className="inline-flex w-auto md:grid md:w-full md:grid-cols-5 h-auto p-1 bg-muted/50 rounded-xl">
              <TabsTrigger value="essays" className="px-6 py-2.5 md:px-3 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all">Essays</TabsTrigger>
              <TabsTrigger value="csqs" className="px-6 py-2.5 md:px-3 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all">CSQs</TabsTrigger>
              <TabsTrigger value="notes" className="px-6 py-2.5 md:px-3 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all">Notes</TabsTrigger>
              <TabsTrigger value="flashcards" className="px-6 py-2.5 md:px-3 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all">Flashcards</TabsTrigger>
              <TabsTrigger value="current-affairs" className="px-6 py-2.5 md:px-3 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all">News</TabsTrigger>
            </TabsList>
          </div>
        </div>

        <div className="mt-8 transition-all duration-300">
          <TabsContent value="essays" className="mt-0 outline-none">
            <Card className="border-none shadow-sm bg-card/50 backdrop-blur-sm">
              <CardHeader className="px-4 md:px-6">
                <CardTitle>Essay Management</CardTitle>
              </CardHeader>
              <CardContent className="px-4 md:px-6">
                <EssayManager />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="csqs" className="mt-0 outline-none">
            <Card className="border-none shadow-sm bg-card/50 backdrop-blur-sm">
              <CardHeader className="px-4 md:px-6">
                <CardTitle>CSQ Management</CardTitle>
              </CardHeader>
              <CardContent className="px-4 md:px-6">
                <CSQManager />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notes" className="mt-0 outline-none">
            <Card className="border-none shadow-sm bg-card/50 backdrop-blur-sm">
              <CardHeader className="px-4 md:px-6">
                <CardTitle>Notes Management</CardTitle>
              </CardHeader>
              <CardContent className="px-4 md:px-6">
                <NotesManager />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="flashcards" className="mt-0 outline-none">
            <Card className="border-none shadow-sm bg-card/50 backdrop-blur-sm">
              <CardHeader className="px-4 md:px-6">
                <CardTitle>Flashcard Management</CardTitle>
              </CardHeader>
              <CardContent className="px-4 md:px-6">
                <FlashcardManager />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="current-affairs" className="mt-0 outline-none">
            <Card className="border-none shadow-sm bg-card/50 backdrop-blur-sm">
              <CardHeader className="px-4 md:px-6">
                <CardTitle>Current Affairs Management</CardTitle>
              </CardHeader>
              <CardContent className="px-4 md:px-6">
                <CurrentAffairsManager />
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

