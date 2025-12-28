"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, BookOpen, FileText } from "lucide-react";
import { SuggestedPath } from "@/components/suggested-path";

type Note = {
  id: number;
  title: string;
  category: string;
  level: string;
  topics: string[];
  description: string;
  pdfUrl: string | null;
  economicsType: string | null;
  chapter: string | null;
  createdAt: string;
  updatedAt: string;
};

export function NotesClient({ initialNotes }: { initialNotes: Note[] }) {
  const [selectedLevel, setSelectedLevel] = useState("secondary");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  
  const notes = initialNotes;

  const secondaryNotes = notes.filter(note => note.level === "Secondary");
  const jcNotes = notes.filter(note => note.level === "JC");

  const microNotes = jcNotes.filter(note => note.economicsType === "Micro");
  const macroNotes = jcNotes.filter(note => note.economicsType === "Macro");

  const renderNoteCard = (note: Note) => (
    <Card key={note.id} className="border border-border/50 hover:border-primary/50 hover:shadow-lg transition-all duration-300 overflow-hidden">
      <CardHeader>
        <div className="flex items-start justify-between gap-3 sm:gap-4">
          <div className="space-y-3 flex-1 min-w-0">
            <CardTitle className="text-xl sm:text-2xl font-bold break-words leading-tight tracking-tight">{note.title}</CardTitle>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="whitespace-nowrap text-xs font-semibold px-3 py-1">{note.category}</Badge>
              {note.chapter && (
                <Badge variant="outline" className="whitespace-nowrap text-xs font-semibold px-3 py-1 text-primary border-primary/30">{note.chapter}</Badge>
              )}
            </div>
          </div>
          <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-primary/70 flex-shrink-0" />
        </div>
        <CardDescription className="text-sm sm:text-base leading-relaxed break-words">{note.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {note.pdfUrl ? (
          <div className="p-4 sm:p-5 bg-gradient-to-br from-muted/50 to-muted/30 rounded-xl overflow-hidden border border-border/50">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                  <FileText className="w-5 h-5 text-primary flex-shrink-0" />
                </div>
                <span className="font-semibold text-sm sm:text-base break-words">Complete Study Notes</span>
              </div>
              <Button asChild size="default" className="w-full sm:w-auto whitespace-nowrap font-medium shadow-sm hover:shadow-md transition-shadow">
                <a href={note.pdfUrl} target="_blank" rel="noopener noreferrer">
                  <Download className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="truncate">Download PDF</span>
                </a>
              </Button>
            </div>
          </div>
        ) : (
          <Accordion type="single" collapsible>
            <AccordionItem value="topics" className="border-none">
              <AccordionTrigger className="text-sm font-semibold break-words hover:no-underline hover:text-primary transition-colors">
                View Topics Covered ({note.topics.length})
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 sm:space-y-4 pt-2">
                  {note.topics.map((topic, idx) => (
                    <div key={idx} className="p-4 sm:p-5 bg-gradient-to-br from-muted/40 to-muted/20 rounded-lg overflow-hidden border border-border/30">
                      <h4 className="font-bold mb-2 text-sm sm:text-base break-words tracking-tight">{topic}</h4>
                      <p className="text-xs sm:text-sm text-muted-foreground/80 leading-relaxed break-words">
                        Detailed explanation of {topic.toLowerCase()} including definitions, diagrams, 
                        real-world examples, and common exam questions.
                      </p>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
        <SuggestedPath noteId={note.id} noteTitle={note.title} />
      </CardContent>
    </Card>
  );

  const jcChapters = {
    Micro: [
      "Demand and Supply",
      "Market Failure",
      "Firms and Decisions (Market Structure)"
    ],
    Macro: [
      "Introduction to Macroeconomics",
      "Macroeconomic Objectives and Policies",
      "Globalisation and the International Economy"
    ]
  };

  return (
    <div className="w-full">
      <Tabs defaultValue="secondary" className="space-y-8 sm:space-y-10 w-full" onValueChange={setSelectedLevel}>
        <TabsList className="flex flex-col sm:grid sm:grid-cols-2 w-full max-w-md mx-auto h-auto sm:h-11 p-1 gap-1 bg-muted/50 backdrop-blur-sm">
          <TabsTrigger 
            value="secondary" 
            className="w-full text-sm sm:text-base py-3 sm:py-2 font-medium data-[state=active]:bg-background data-[state=active]:shadow-md transition-all"
          >
            Secondary School
          </TabsTrigger>
          <TabsTrigger 
            value="jc" 
            className="w-full text-sm sm:text-base py-3 sm:py-2 font-medium data-[state=active]:bg-background data-[state=active]:shadow-md transition-all"
          >
            Junior College
          </TabsTrigger>
        </TabsList>

        <TabsContent value="secondary" className="space-y-4 sm:space-y-6">
          {secondaryNotes.length === 0 ? (
            <Card className="border-2 border-dashed overflow-hidden">
              <CardContent className="py-8 sm:py-12 text-center">
                <p className="text-muted-foreground break-words px-2">No notes available for Secondary level yet.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 sm:gap-6">
              {secondaryNotes.map(renderNoteCard)}
            </div>
          )}
        </TabsContent>

        <TabsContent value="jc" className="space-y-6 sm:space-y-8">
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              variant={selectedType === null ? "default" : "outline"}
              onClick={() => setSelectedType(null)}
              className="rounded-full px-8"
            >
              All JC Notes
            </Button>
            <Button 
              variant={selectedType === "Micro" ? "default" : "outline"}
              onClick={() => setSelectedType("Micro")}
              className="rounded-full px-8"
            >
              Microeconomics
            </Button>
            <Button 
              variant={selectedType === "Macro" ? "default" : "outline"}
              onClick={() => setSelectedType("Macro")}
              className="rounded-full px-8"
            >
              Macroeconomics
            </Button>
          </div>

          {(selectedType === null || selectedType === "Micro") && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <h3 className="text-2xl font-black tracking-tight text-primary">Microeconomics</h3>
                <div className="h-[2px] flex-1 bg-gradient-to-r from-primary/20 to-transparent" />
              </div>
              
              {jcChapters.Micro.map(chapter => {
                const chapterNotes = microNotes.filter(n => n.chapter === chapter);
                return (
                  <div key={chapter} className="space-y-4">
                    <h4 className="text-lg font-bold flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      {chapter}
                    </h4>
                    {chapterNotes.length === 0 ? (
                      <p className="text-sm text-muted-foreground italic pl-4">No notes for this chapter yet.</p>
                    ) : (
                      <div className="grid gap-4 sm:gap-6 pl-4 border-l-2 border-muted">
                        {chapterNotes.map(renderNoteCard)}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {(selectedType === null || selectedType === "Macro") && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 pt-8">
                <h3 className="text-2xl font-black tracking-tight text-primary">Macroeconomics</h3>
                <div className="h-[2px] flex-1 bg-gradient-to-r from-primary/20 to-transparent" />
              </div>

              {jcChapters.Macro.map(chapter => {
                const chapterNotes = macroNotes.filter(n => n.chapter === chapter);
                return (
                  <div key={chapter} className="space-y-4">
                    <h4 className="text-lg font-bold flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      {chapter}
                    </h4>
                    {chapterNotes.length === 0 ? (
                      <p className="text-sm text-muted-foreground italic pl-4">No notes for this chapter yet.</p>
                    ) : (
                      <div className="grid gap-4 sm:gap-6 pl-4 border-l-2 border-muted">
                        {chapterNotes.map(renderNoteCard)}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {jcNotes.length === 0 && (
            <Card className="border-2 border-dashed overflow-hidden">
              <CardContent className="py-8 sm:py-12 text-center">
                <p className="text-muted-foreground break-words px-2">No notes available for JC level yet.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
