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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">Content Dashboard</h1>
      </div>

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
  );
}
