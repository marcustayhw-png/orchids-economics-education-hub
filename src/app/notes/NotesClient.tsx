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

  const filteredNotes = useMemo(() => {
    let filtered = selectedLevel === "secondary" ? secondaryNotes : jcNotes;
    if (selectedType) {
      filtered = filtered.filter(note => note.economicsType === selectedType);
    }
    if (selectedChapter) {
      filtered = filtered.filter(note => note.chapter === selectedChapter);
    }
    return filtered;
  }, [selectedLevel, secondaryNotes, jcNotes, selectedType, selectedChapter]);

  const chaptersByLevel = {
    jc: {
      Micro: [
        "Scarcity as the Central Economic Problem",
        "Demand and Supply",
        "Market Failure",
        "Firms and Decisions (Market Structure)"
      ],
      Macro: [
        "Introduction to Macroeconomics",
        "Macroeconomic Objectives and Policies",
        "Globalisation and the International Economy"
      ]
    },
    secondary: {
      Micro: [
        "The basic economic problem",
        "The allocation of resources",
        "Microeconomic decision makers"
      ],
      Macro: [
        "Government and the macroeconomy",
        "Economic development",
        "International trade and globalisation"
      ]
    }
  };

  const currentChapters = chaptersByLevel[selectedLevel as "jc" | "secondary"];

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
    <Card key={note.id} className="overflow-hidden border-2 hover:border-primary transition-all group">
      <div className="flex flex-col md:flex-row">
        <div className="flex-1 p-6 space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-primary/10 text-primary border-none">
                  {note.category}
                </Badge>
                <Badge variant="outline" className="font-normal">
                  {note.level}
                </Badge>
              </div>
              <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                {note.title}
              </h3>
            </div>
            {note.pdfUrl && (
              <Button size="icon" variant="ghost" className="hidden sm:flex" asChild>
                <a href={note.pdfUrl} target="_blank" rel="noopener noreferrer">
                  <Download className="w-5 h-5" />
                </a>
              </Button>
            )}
          </div>

          <p className="text-muted-foreground line-clamp-2">
            {note.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {note.topics.map((topic, index) => (
              <Badge key={index} variant="secondary" className="bg-muted text-muted-foreground font-normal">
                {topic}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <FileText className="w-4 h-4" />
                PDF Note
              </span>
            </div>
            <div className="flex gap-2">
              {note.pdfUrl ? (
                <Button size="sm" className="rounded-full px-6" asChild>
                  <a href={note.pdfUrl} target="_blank" rel="noopener noreferrer">
                    View Note
                  </a>
                </Button>
              ) : (
                <Button size="sm" variant="outline" disabled className="rounded-full px-6">
                  Coming Soon
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );

  const renderSelectionFlow = (levelNotes: Note[]) => (
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
            {currentChapters[selectedType as "Micro" | "Macro"].map((chapter) => (
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

          {filteredNotes.length === 0 ? (
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
              {filteredNotes.map(renderNoteCard)}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
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

        <TabsContent value="secondary" className="space-y-6 sm:space-y-8">
          {renderSelectionFlow(secondaryNotes)}
        </TabsContent>

        <TabsContent value="jc" className="space-y-6 sm:space-y-8">
          {renderSelectionFlow(jcNotes)}
        </TabsContent>
      </Tabs>
    </div>
  );
}
