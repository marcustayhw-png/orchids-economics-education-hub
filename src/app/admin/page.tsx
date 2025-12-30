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
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase">Content Dashboard</h1>
          <p className="text-white/40 font-bold uppercase tracking-[0.2em] text-xs">Manage your platform resources</p>
        </div>
  
        <Tabs defaultValue="essays" className="space-y-8">
          <div className="sticky top-16 md:top-0 z-30 bg-[#080808]/80 backdrop-blur-xl py-4 -mx-6 px-6 md:mx-0 md:px-0 border-b border-white/5 md:border-none">
            <div className="overflow-x-auto pb-2 scrollbar-hide">
              <TabsList className="flex w-max md:grid md:w-full md:max-w-5xl md:grid-cols-5 bg-white/5 border border-white/10 p-1 rounded-2xl">
                <TabsTrigger value="essays" className="px-8 md:px-3 py-3 rounded-xl font-bold uppercase tracking-wider text-[10px]">Essays</TabsTrigger>
                <TabsTrigger value="csqs" className="px-8 md:px-3 py-3 rounded-xl font-bold uppercase tracking-wider text-[10px]">CSQs</TabsTrigger>
                <TabsTrigger value="notes" className="px-8 md:px-3 py-3 rounded-xl font-bold uppercase tracking-wider text-[10px]">Notes</TabsTrigger>
                <TabsTrigger value="flashcards" className="px-8 md:px-3 py-3 rounded-xl font-bold uppercase tracking-wider text-[10px]">Flashcards</TabsTrigger>
                <TabsTrigger value="current-affairs" className="px-8 md:px-3 py-3 rounded-xl font-bold uppercase tracking-wider text-[10px]">Current Affairs</TabsTrigger>
              </TabsList>
            </div>
          </div>
  
          <TabsContent value="essays" className="mt-0">
            <Card className="bg-white/[0.02] border-white/5 backdrop-blur-sm rounded-[2rem] overflow-hidden">
              <CardHeader className="p-8 border-b border-white/5">
                <CardTitle className="text-2xl font-black tracking-tight uppercase">Essay Management</CardTitle>
              </CardHeader>
              <CardContent className="p-0 sm:p-8">
                <EssayManager />
              </CardContent>
            </Card>
          </TabsContent>
  
          <TabsContent value="csqs" className="mt-0">
            <Card className="bg-white/[0.02] border-white/5 backdrop-blur-sm rounded-[2rem] overflow-hidden">
              <CardHeader className="p-8 border-b border-white/5">
                <CardTitle className="text-2xl font-black tracking-tight uppercase">CSQ Management</CardTitle>
              </CardHeader>
              <CardContent className="p-0 sm:p-8">
                <CSQManager />
              </CardContent>
            </Card>
          </TabsContent>
  
          <TabsContent value="notes" className="mt-0">
            <Card className="bg-white/[0.02] border-white/5 backdrop-blur-sm rounded-[2rem] overflow-hidden">
              <CardHeader className="p-8 border-b border-white/5">
                <CardTitle className="text-2xl font-black tracking-tight uppercase">Notes Management</CardTitle>
              </CardHeader>
              <CardContent className="p-0 sm:p-8">
                <NotesManager />
              </CardContent>
            </Card>
          </TabsContent>
  
          <TabsContent value="flashcards" className="mt-0">
            <Card className="bg-white/[0.02] border-white/5 backdrop-blur-sm rounded-[2rem] overflow-hidden">
              <CardHeader className="p-8 border-b border-white/5">
                <CardTitle className="text-2xl font-black tracking-tight uppercase">Flashcard Management</CardTitle>
              </CardHeader>
              <CardContent className="p-0 sm:p-8">
                <FlashcardManager />
              </CardContent>
            </Card>
          </TabsContent>
  
          <TabsContent value="current-affairs" className="mt-0">
            <Card className="bg-white/[0.02] border-white/5 backdrop-blur-sm rounded-[2rem] overflow-hidden">
              <CardHeader className="p-8 border-b border-white/5">
                <CardTitle className="text-2xl font-black tracking-tight uppercase">Current Affairs Management</CardTitle>
              </CardHeader>
              <CardContent className="p-0 sm:p-8">
                <CurrentAffairsManager />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    );
}
