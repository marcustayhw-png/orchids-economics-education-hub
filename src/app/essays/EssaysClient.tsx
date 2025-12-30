"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Award, ArrowRight, ArrowLeft, Clock, Trophy, Users, Globe, BookOpen, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Essay {
  id: number;
  essayId: string;
  question: string;
  level: string;
  marks: string;
  topic: string;
  difficulty: string;
  economicsType?: string;
  chapter?: string;
}

interface CSQ {
  id: number;
  csqId: string;
  title: string;
  level: string;
  topic: string;
  difficulty: string;
  totalMarks: number;
  parts: any[];
  economicsType?: string;
  chapter?: string;
}

type Step = "economics-type" | "chapter" | "content";

const jcChapters = {
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
};

export function EssaysClient({ 
  initialEssays, 
  initialCSQs,
  activeTab
}: { 
  initialEssays: Essay[], 
  initialCSQs: CSQ[],
  activeTab: "essays" | "csq"
}) {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<Step>("economics-type");

  const jcEssays = useMemo(() => initialEssays.filter(e => e.level === "JC"), [initialEssays]);
  const jcCSQs = useMemo(() => initialCSQs.filter(c => c.level === "JC"), [initialCSQs]);

  const filteredEssays = useMemo(() => {
    let filtered = jcEssays;
    if (selectedType) {
      filtered = filtered.filter(e => e.economicsType === selectedType);
    }
    if (selectedChapter) {
      filtered = filtered.filter(e => e.chapter === selectedChapter);
    }
    return filtered;
  }, [jcEssays, selectedType, selectedChapter]);

  const filteredCSQs = useMemo(() => {
    let filtered = jcCSQs;
    if (selectedType) {
      filtered = filtered.filter(c => c.economicsType === selectedType);
    }
    if (selectedChapter) {
      filtered = filtered.filter(c => c.chapter === selectedChapter);
    }
    return filtered;
  }, [jcCSQs, selectedType, selectedChapter]);

  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
    setSelectedChapter(null);
    setCurrentStep("chapter");
  };

  const handleChapterSelect = (chapter: string) => {
    setSelectedChapter(chapter);
    setCurrentStep("content");
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

  const renderEssayCard = (essay: Essay) => (
    <Card key={essay.id} className="border-2 hover:border-primary transition-colors overflow-hidden group">
      <CardHeader>
        <div className="flex items-start justify-between gap-3 sm:gap-4">
          <div className="space-y-2 sm:space-y-3 flex-1 min-w-0">
            <div className="flex gap-2 items-center flex-wrap">
              <Badge variant="secondary" className="bg-primary/5 text-primary border-primary/10 whitespace-nowrap">JC</Badge>
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-900/40 border border-amber-200 dark:border-amber-800/60 shadow-sm transition-all group-hover:scale-105">
                <Trophy className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                <span className="text-[10px] font-bold text-amber-700 dark:text-amber-300 uppercase">{essay.marks} Marks</span>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-900/40 border border-indigo-200 dark:border-indigo-800/60 shadow-sm transition-all group-hover:scale-105">
                <Clock className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                <span className="text-[10px] font-bold text-indigo-700 dark:text-indigo-300 uppercase">{Math.ceil(parseInt(essay.marks) * 1.5)} Mins</span>
              </div>
              <Badge variant="outline" className="whitespace-nowrap text-[10px] uppercase font-bold tracking-wider">{essay.topic}</Badge>
              <Badge 
                variant={
                  essay.difficulty === "Easy" ? "secondary" : 
                  essay.difficulty === "Hard" ? "destructive" : 
                  "default"
                }
                className="whitespace-nowrap text-[10px] uppercase font-bold"
              >
                {essay.difficulty}
              </Badge>
            </div>
            <h3 className="text-base sm:text-lg font-semibold leading-tight break-words group-hover:text-primary transition-colors">{essay.question}</h3>
          </div>
          <Award className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0" />
        </div>
      </CardHeader>
      <CardContent>
        <Link href={`/essays/${essay.essayId}`}>
          <Button className="w-full">
            <span className="truncate">View Full Question & Answer</span>
            <ArrowRight className="w-4 h-4 ml-2 flex-shrink-0" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );

  const renderCSQCard = (csq: CSQ) => (
    <Card key={csq.id} className="border-2 hover:border-primary transition-colors overflow-hidden group">
      <CardHeader>
        <div className="flex items-start justify-between gap-3 sm:gap-4">
          <div className="space-y-2 sm:space-y-3 flex-1 min-w-0">
            <div className="flex gap-2 items-center flex-wrap">
              <Badge variant="secondary" className="bg-primary/5 text-primary border-primary/10 whitespace-nowrap">JC</Badge>
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/50">
                <Trophy className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                <span className="text-[10px] font-bold text-amber-700 dark:text-amber-300 uppercase">{csq.totalMarks} Marks</span>
              </div>
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50">
                <Clock className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                <span className="text-[10px] font-bold text-indigo-700 dark:text-indigo-300 uppercase">{Math.ceil(csq.totalMarks * 1.5)} Mins</span>
              </div>
              <Badge variant="outline" className="whitespace-nowrap text-[10px] uppercase font-bold tracking-wider">{csq.topic}</Badge>
              <Badge 
                variant={
                  csq.difficulty === "Easy" ? "secondary" : 
                  csq.difficulty === "Hard" ? "destructive" : 
                  "default"
                }
                className="whitespace-nowrap text-[10px] uppercase font-bold"
              >
                {csq.difficulty}
              </Badge>
            </div>
            <CardTitle className="text-lg sm:text-xl break-words group-hover:text-primary transition-colors">{csq.title}</CardTitle>
            <p className="text-sm text-muted-foreground break-words font-medium">
              {csq.parts?.length || 0} assessment parts
            </p>
          </div>
          <Award className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0" />
        </div>
      </CardHeader>
      <CardContent>
        <Link href={`/essays/csq/${csq.csqId}`}>
          <Button className="w-full">
            <span className="truncate">View Full Case Study & Answers</span>
            <ArrowRight className="w-4 h-4 ml-2 flex-shrink-0" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );

  const currentContent = activeTab === "essays" ? filteredEssays : filteredCSQs;
  const contentLabel = activeTab === "essays" ? "essays" : "CSQs";

  return (
    <div className="space-y-6 sm:space-y-8 w-full">
      <AnimatePresence mode="wait">
        {currentStep === "economics-type" && (
          <motion.div
            key="economics-type"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="text-center space-y-2">
              <Badge variant="outline" className="mb-2">H2 Economics (Syllabus 9570)</Badge>
              <h2 className="text-2xl sm:text-3xl font-bold">Choose Your Focus</h2>
              <p className="text-muted-foreground">Select Microeconomics or Macroeconomics to browse {contentLabel}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
              <Card 
                className="border-2 cursor-pointer hover:border-primary transition-all hover:shadow-lg bg-gradient-to-br from-background to-muted/30 group"
                onClick={() => handleTypeSelect("Micro")}
              >
                <CardContent className="p-6 sm:p-8 text-center space-y-4">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Users className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold">Microeconomics</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">Individual markets, consumer behavior, and firm decisions</p>
                  <Button className="w-full group/btn">
                    Select <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>

              <Card 
                className="border-2 cursor-pointer hover:border-primary transition-all hover:shadow-lg bg-gradient-to-br from-background to-muted/30 group"
                onClick={() => handleTypeSelect("Macro")}
              >
                <CardContent className="p-6 sm:p-8 text-center space-y-4">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Globe className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold">Macroeconomics</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">National economies, GDP, inflation, and fiscal policy</p>
                  <Button className="w-full group/btn">
                    Select <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}

        {currentStep === "chapter" && selectedType && (
          <motion.div
            key="chapter"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6 max-w-2xl mx-auto"
          >
            <div className="text-center space-y-2">
              <Badge className="mb-2">{selectedType === "Micro" ? "Microeconomics" : "Macroeconomics"}</Badge>
              <h2 className="text-2xl sm:text-3xl font-bold">Select a Chapter</h2>
              <p className="text-muted-foreground">Choose the H2 Economics chapter from Syllabus 9570 (2026)</p>
            </div>

            <div className="grid gap-3">
              {jcChapters[selectedType as "Micro" | "Macro"].map((chapter) => (
                <Button
                  key={chapter}
                  variant="outline"
                  className="h-auto py-4 px-6 justify-between text-left hover:border-primary hover:bg-primary/5 group"
                  onClick={() => handleChapterSelect(chapter)}
                >
                  <span className="font-medium text-sm sm:text-base">{chapter}</span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
                </Button>
              ))}
            </div>

            <Button variant="ghost" className="w-full" onClick={handleBackToType}>
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Focus Area
            </Button>
          </motion.div>
        )}

        {currentStep === "content" && (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b pb-4">
              <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-start">
                <Badge variant="secondary">{selectedType === "Micro" ? "Microeconomics" : "Macroeconomics"}</Badge>
                <span className="text-muted-foreground">/</span>
                <Badge variant="outline" className="text-xs sm:text-sm">{selectedChapter}</Badge>
              </div>
              <Button variant="outline" size="sm" onClick={handleBackToChapter}>
                <ArrowLeft className="w-4 h-4 mr-2" /> Change Chapter
              </Button>
            </div>

            {currentContent.length === 0 ? (
              <Card className="border-2 border-dashed">
                <CardContent className="py-12 text-center">
                  {activeTab === "essays" ? (
                    <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
                  ) : (
                    <BookOpen className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
                  )}
                  <p className="text-muted-foreground">No {contentLabel} available for this chapter yet.</p>
                  <Button variant="link" onClick={handleBackToChapter} className="mt-2">
                    Try another chapter
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Showing {currentContent.length} {contentLabel}
                </p>
                {activeTab === "essays" 
                  ? (currentContent as Essay[]).map(renderEssayCard)
                  : (currentContent as CSQ[]).map(renderCSQCard)
                }
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
