"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, BookOpen, FileText, ArrowRight, ArrowLeft, Users, Globe } from "lucide-react";
import { SuggestedPath } from "@/components/suggested-path";
import { motion, AnimatePresence } from "framer-motion";

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

type Step = "economics-type" | "chapter" | "notes";

export function NotesClient({ initialNotes }: { initialNotes: Note[] }) {
  const [selectedLevel, setSelectedLevel] = useState("secondary");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<Step>("economics-type");
  
  const notes = initialNotes;

  const secondaryNotes = useMemo(() => notes.filter(note => note.level === "Secondary"), [notes]);
  const jcNotes = useMemo(() => notes.filter(note => note.level === "JC"), [notes]);

  const filteredJCNotes = useMemo(() => {
    let filtered = jcNotes;
    if (selectedType) {
      filtered = filtered.filter(note => note.economicsType === selectedType);
    }
    if (selectedChapter) {
      filtered = filtered.filter(note => note.chapter === selectedChapter);
    }
    return filtered;
  }, [jcNotes, selectedType, selectedChapter]);

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

  const handleLevelChange = (value: string) => {
    setSelectedLevel(value);
    setSelectedType(null);
    setSelectedChapter(null);
    setCurrentStep("economics-type");
  };

  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
    setSelectedChapter(null);
    setCurrentStep("chapter");
  };

  const handleChapterSelect = (chapter: string) => {
    setSelectedChapter(chapter);
    setCurrentStep("notes");
  };

  const handleBackToType = () => {
    setSelectedType(null);
    setSelectedChapter(null);
    setCurrentStep("economics-type");
  };

  const handleBackToChapter = () => {
    setSelectedChapter(null);
    setCurrentStep("chapter");
  };

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

  return (
    <div className="w-full">
      <Tabs value={selectedLevel} className="space-y-8 sm:space-y-10 w-full" onValueChange={handleLevelChange}>
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
          <AnimatePresence mode="wait">
            {currentStep === "economics-type" && (
              <motion.div
                key="economics-type"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto"
              >
                <Card 
                  className="border-2 cursor-pointer hover:border-primary transition-all hover:shadow-lg bg-gradient-to-br from-background to-muted/30 group"
                  onClick={() => handleTypeSelect("Micro")}
                >
                  <CardContent className="p-8 text-center space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Users className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">Microeconomics</h3>
                    <p className="text-sm text-muted-foreground">Individual markets and consumer behavior</p>
                    <Button className="w-full group">
                      Select <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>

                <Card 
                  className="border-2 cursor-pointer hover:border-primary transition-all hover:shadow-lg bg-gradient-to-br from-background to-muted/30 group"
                  onClick={() => handleTypeSelect("Macro")}
                >
                  <CardContent className="p-8 text-center space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Globe className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">Macroeconomics</h3>
                    <p className="text-sm text-muted-foreground">National economies and global policies</p>
                    <Button className="w-full group">
                      Select <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {currentStep === "chapter" && (
              <motion.div
                key="chapter"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6 max-w-2xl mx-auto"
              >
                <div className="text-center space-y-2">
                  <Badge className="mb-2">{selectedType === "Micro" ? "Microeconomics" : "Macroeconomics"}</Badge>
                  <h2 className="text-2xl font-bold">Select a Chapter</h2>
                </div>

                <div className="grid gap-3">
                  {jcChapters[selectedType as "Micro" | "Macro"].map((chapter) => (
                    <Button
                      key={chapter}
                      variant="outline"
                      className="h-auto py-4 px-6 justify-between text-left hover:border-primary hover:bg-primary/5 group"
                      onClick={() => handleChapterSelect(chapter)}
                    >
                      <span className="font-medium">{chapter}</span>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </Button>
                  ))}
                </div>

                <Button variant="ghost" className="w-full" onClick={handleBackToType}>
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back to Focus Area
                </Button>
              </motion.div>
            )}

            {currentStep === "notes" && (
              <motion.div
                key="notes"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b pb-4">
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary">{selectedType === "Micro" ? "Microeconomics" : "Macroeconomics"}</Badge>
                    <span className="text-muted-foreground">/</span>
                    <Badge variant="outline">{selectedChapter}</Badge>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleBackToChapter}>
                    <ArrowLeft className="w-4 h-4 mr-2" /> Change Chapter
                  </Button>
                </div>

                {filteredJCNotes.length === 0 ? (
                  <Card className="border-2 border-dashed">
                    <CardContent className="py-12 text-center">
                      <BookOpen className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
                      <p className="text-muted-foreground">No notes available for this chapter yet.</p>
                      <Button variant="link" onClick={handleBackToChapter} className="mt-2">
                        Try another chapter
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid gap-6">
                    {filteredJCNotes.map(renderNoteCard)}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </TabsContent>
      </Tabs>
    </div>
  );
}
