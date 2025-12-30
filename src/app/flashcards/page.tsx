"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Sparkles, RefreshCw, BookOpen, ArrowRight, ArrowLeft, Users, Globe, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type PanInfo = {
  point: { x: number; y: number };
  delta: { x: number; y: number };
  offset: { x: number; y: number };
  velocity: { x: number; y: number };
};

type Flashcard = {
  id: number;
  question: string;
  answer: string;
  level: string;
  category: string;
  topic: string;
  difficulty: string | null;
  economicsType: string;
  chapter: string;
  createdAt: string;
  updatedAt: string;
};

type Step = "economics-type" | "chapter" | "study";

// Helper function to format answer text into point form
const formatAnswerAsPoints = (answer: string) => {
    const numberedPattern = /\((\d+)\)/g;
    const hasNumberedPoints = numberedPattern.test(answer);
    
    if (hasNumberedPoints) {
      const points = answer.split(/\((\d+)\)/).filter(part => part.trim().length > 0);
      const formattedPoints: JSX.Element[] = [];
      
      for (let i = 0; i < points.length; i += 2) {
        if (i + 1 < points.length) {
          const number = points[i];
          const content = points[i + 1].trim();
          
          if (content) {
            formattedPoints.push(
              <div key={number} className="mb-4">
                <p className="text-base sm:text-lg leading-relaxed">
                  <span className="font-semibold text-primary">({number})</span> {content}
                </p>
              </div>
            );
          }
        }
      }
      
      return formattedPoints;
    }
    
    const lines = answer.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    
    return lines.map((line, index) => {
      const cleanedLine = line.replace(/^[•\-\*]\s*/, '');
      return (
        <li key={index} className="text-base sm:text-lg leading-relaxed mb-3">
          {cleanedLine}
        </li>
      );
    });
  };

export default function FlashcardsPage() {
  const [selectedLevel, setSelectedLevel] = useState("Secondary");
  const [selectedEconomicsType, setSelectedEconomicsType] = useState("");
  const [selectedChapter, setSelectedChapter] = useState("");
  const [currentStep, setCurrentStep] = useState<Step>("economics-type");
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [filteredCards, setFilteredCards] = useState<Flashcard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null);
  const [showSwipeHint, setShowSwipeHint] = useState(true);

  useEffect(() => {
    fetchFlashcards();
  }, []);

  useEffect(() => {
    if (selectedEconomicsType && selectedChapter) {
      applyFilters();
    }
  }, [flashcards, selectedLevel, selectedEconomicsType, selectedChapter]);

  useEffect(() => {
    // Hide swipe hint after first interaction or after 5 seconds
    const timer = setTimeout(() => {
      setShowSwipeHint(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [currentStep]);

  const fetchFlashcards = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/flashcards?limit=100");
      if (response.ok) {
        const data = await response.json();
        setFlashcards(data);
      }
    } catch (error) {
      console.error("Error fetching flashcards:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = flashcards.filter((card) => card.level === selectedLevel);

    if (selectedEconomicsType) {
      filtered = filtered.filter((card) => card.economicsType === selectedEconomicsType);
    }

    if (selectedChapter) {
      filtered = filtered.filter((card) => card.chapter === selectedChapter);
    }

    setFilteredCards(filtered);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
  };

  const handlePrevious = () => {
    setIsFlipped(false);
    setCurrentIndex(
      (prev) => (prev - 1 + filteredCards.length) % filteredCards.length
    );
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    const randomIndex = Math.floor(Math.random() * filteredCards.length);
    setCurrentIndex(randomIndex);
  };

  const handleSwipe = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50;
    
    // Hide hint after first swipe
    setShowSwipeHint(false);
    
    if (info.offset.x > swipeThreshold) {
      // Swiped right - go to previous
      setSwipeDirection("right");
      setTimeout(() => {
        handlePrevious();
        setSwipeDirection(null);
      }, 150);
    } else if (info.offset.x < -swipeThreshold) {
      // Swiped left - go to next
      setSwipeDirection("left");
      setTimeout(() => {
        handleNext();
        setSwipeDirection(null);
      }, 150);
    }
  };

  const handleEconomicsTypeSelect = (type: string) => {
    setSelectedEconomicsType(type);
    setSelectedChapter("");
    setCurrentStep("chapter");
  };

  const handleChapterSelect = (chapter: string) => {
    setSelectedChapter(chapter);
    setCurrentStep("study");
  };

  const handleBackToEconomicsType = () => {
    setSelectedEconomicsType("");
    setSelectedChapter("");
    setCurrentStep("economics-type");
  };

  const handleBackToChapter = () => {
    setSelectedChapter("");
    setCurrentStep("chapter");
  };

  const chapters = Array.from(
    new Set(
      flashcards
        .filter((card) => card.level === selectedLevel)
        .filter((card) => card.economicsType === selectedEconomicsType)
        .map((card) => card.chapter)
    )
  ).sort();

  const currentCard = filteredCards[currentIndex];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  const generateStructuredData = () => {
    if (filteredCards.length === 0) return null;

    const qaList = filteredCards.map(card => ({
      "@type": "Question",
      "name": card.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": card.answer
      }
    }));

    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": qaList.slice(0, 10)
    };
  };

    return (
        <div className="min-h-screen bg-[#050505] text-white py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8">
          <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
            <div className="absolute top-[10%] left-[10%] w-[30%] h-[30%] bg-primary/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-[10%] right-[10%] w-[30%] h-[30%] bg-blue-500/5 rounded-full blur-[120px]" />
          </div>

          {filteredCards.length > 0 && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(generateStructuredData())
              }}
            />
          )}
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12 md:mb-20 space-y-4"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-4">
                <Sparkles className="w-4 h-4 text-primary animate-spin-slow" />
                <span className="text-xs font-black tracking-widest uppercase opacity-70">Interactive Learning</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight">
                Master <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary/80">Economics.</span>
              </h1>
              <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto font-medium">
                {selectedLevel === "JC" 
                  ? "Master H2 Economics with interactive flashcards aligned to Syllabus 9570 (2026)"
                  : "Master O-Level Economics with interactive flashcards aligned to Syllabus 2286 (2026)"}
              </p>
            </motion.div>

            {/* Level Selector */}
            <Tabs
              defaultValue="Secondary"
              className="space-y-12"
              onValueChange={(value) => {
                setSelectedLevel(value);
                setSelectedEconomicsType("");
                setSelectedChapter("");
                setCurrentStep("economics-type");
              }}
            >
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 h-14 bg-white/5 border border-white/10 p-1.5 rounded-2xl backdrop-blur-xl">
                <TabsTrigger value="Secondary" className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-white transition-all font-bold">Secondary</TabsTrigger>
                <TabsTrigger value="JC" className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-white transition-all font-bold">Junior College</TabsTrigger>
              </TabsList>

            <TabsContent value={selectedLevel} className="space-y-8">
              <AnimatePresence mode="wait">
                {/* Step 1: Select Economics Type */}
                {currentStep === "economics-type" && (
                  <motion.div
                    key="economics-type"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    className="space-y-10"
                  >
                    <div className="text-center space-y-3">
                      <h2 className="text-3xl md:text-4xl font-black tracking-tight">Choose Your Focus</h2>
                      <p className="text-white/40 font-medium">Select a domain to explore specific chapters</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
                      <motion.div whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 300 }}>
                        <Card
                            className="relative h-full border-white/10 cursor-pointer bg-white/5 backdrop-blur-xl overflow-hidden group hover:border-primary/50 transition-all rounded-[2.5rem] p-4"
                            onClick={() => handleEconomicsTypeSelect("Micro")}
                          >
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <CardContent className="pt-10 pb-10 text-center space-y-6 relative z-10">
                              <div className="w-20 h-20 mx-auto rounded-3xl bg-primary/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                                <Users className="w-10 h-10 text-primary" />
                              </div>
                              <div className="space-y-2">
                                <h3 className="text-2xl md:text-3xl font-black tracking-tight text-white">Microeconomics</h3>
                                <p className="text-white/40 font-medium text-sm md:text-base">
                                  Individual markets, behavior, and decisions
                                </p>
                              </div>
                              <div className="inline-flex items-center gap-2 font-bold text-primary group-hover:gap-4 transition-all">
                                Select <ArrowRight className="w-5 h-5" />
                              </div>
                            </CardContent>
                          </Card>
                      </motion.div>
  
                      <motion.div whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 300 }}>
                        <Card
                            className="relative h-full border-white/10 cursor-pointer bg-white/5 backdrop-blur-xl overflow-hidden group hover:border-primary/50 transition-all rounded-[2.5rem] p-4"
                            onClick={() => handleEconomicsTypeSelect("Macro")}
                          >
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <CardContent className="pt-10 pb-10 text-center space-y-6 relative z-10">
                              <div className="w-20 h-20 mx-auto rounded-3xl bg-blue-500/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                                <Globe className="w-10 h-10 text-blue-500" />
                              </div>
                              <div className="space-y-2">
                                <h3 className="text-2xl md:text-3xl font-black tracking-tight text-white">Macroeconomics</h3>
                                <p className="text-white/40 font-medium text-sm md:text-base">
                                  National economies, growth, and policy
                                </p>
                              </div>
                              <div className="inline-flex items-center gap-2 font-bold text-blue-500 group-hover:gap-4 transition-all">
                                Select <ArrowRight className="w-5 h-5" />
                              </div>
                            </CardContent>
                          </Card>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
  
                {/* Step 2: Select Chapter */}
                {currentStep === "chapter" && (
                  <motion.div
                    key="chapter"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div className="text-center space-y-4">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30">
                        <span className="text-xs font-bold text-primary uppercase tracking-widest">{selectedEconomicsType}</span>
                      </div>
                      <h2 className="text-3xl md:text-4xl font-black tracking-tight">Select a Chapter</h2>
                    </div>
  
                    <div className="max-w-3xl mx-auto space-y-4">
                      {chapters.length === 0 ? (
                        <div className="text-center py-20 bg-white/5 rounded-[2rem] border border-white/10">
                          <BookOpen className="w-12 h-12 mx-auto mb-4 text-white/20" />
                          <p className="text-white/40 font-bold">No chapters available yet.</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 gap-3">
                          {chapters.map((chapter, idx) => (
                            <motion.button
                              key={chapter}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: idx * 0.05 }}
                              whileHover={{ x: 8, backgroundColor: "rgba(255,255,255,0.08)" }}
                              onClick={() => handleChapterSelect(chapter)}
                              className="w-full py-6 px-8 rounded-3xl border border-white/10 bg-white/5 text-left flex items-center justify-between group transition-all"
                            >
                              <span className="font-black text-lg md:text-xl tracking-tight">{chapter}</span>
                              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                                <ArrowRight className="w-5 h-5" />
                              </div>
                            </motion.button>
                          ))}
                        </div>
                      )}
  
                      <Button
                        variant="ghost"
                        onClick={handleBackToEconomicsType}
                        className="w-full py-8 rounded-3xl border border-white/5 text-white/40 hover:text-white hover:bg-white/5 transition-all font-bold gap-2"
                      >
                        <ArrowLeft className="w-5 h-5" />
                        Back to Categories
                      </Button>
                    </div>
                  </motion.div>
                )}
  
                {/* Step 3: Study Mode */}
                {currentStep === "study" && (
                  <motion.div
                    key="study"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-10"
                  >
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto px-4">
                      <div className="space-y-1 text-center md:text-left">
                        <p className="text-xs font-black text-primary uppercase tracking-[0.2em]">{selectedEconomicsType} • {selectedChapter}</p>
                        <h2 className="text-xl font-bold text-white/60">Topic: <span className="text-white">{currentCard?.topic}</span></h2>
                      </div>
                      <Button
                        variant="outline"
                        onClick={handleBackToChapter}
                        className="rounded-full border-white/10 bg-white/5 hover:bg-white/10 font-bold h-12 px-6"
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Change Chapter
                      </Button>
                    </div>
  
                    {/* Flashcard Display */}
                    <div className="max-w-4xl mx-auto">
                        {/* Progress Bar */}
                        <div className="w-full h-1.5 bg-white/5 rounded-full mb-8 overflow-hidden">
                          <motion.div 
                            className="h-full bg-primary"
                            initial={{ width: 0 }}
                            animate={{ width: `${((currentIndex + 1) / filteredCards.length) * 100}%` }}
                            transition={{ type: "spring", stiffness: 100, damping: 20 }}
                          />
                        </div>

                        {/* 3D Card */}
                        <div className="relative h-[500px] md:h-[600px] perspective-2000">
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={currentIndex}
                              initial={{ opacity: 0, x: swipeDirection === "left" ? 100 : -100, scale: 0.9 }}
                              animate={{ opacity: 1, x: 0, scale: 1 }}
                              exit={{ opacity: 0, x: swipeDirection === "left" ? -100 : 100, scale: 0.9 }}
                              transition={{ type: "spring", stiffness: 300, damping: 30 }}
                              className="w-full h-full cursor-pointer"
                              onClick={handleFlip}
                              style={{ transformStyle: "preserve-3d" }}
                            >
                                <motion.div
                                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                                  transition={{ duration: 0.6, type: "spring", stiffness: 100, damping: 20 }}
                                  className="w-full h-full relative"
                                  style={{ transformStyle: "preserve-3d" }}
                                >
                                  {/* Front */}
                                  <Card className="absolute inset-0 w-full h-full border-white/10 bg-white/5 backdrop-blur-2xl rounded-[3rem] p-8 md:p-16 flex flex-col items-center justify-center text-center overflow-hidden shadow-2xl" style={{ backfaceVisibility: "hidden" }}>
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                                    <div className="relative z-10 space-y-8">
                                      <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto">
                                        <BookOpen className="w-10 h-10 text-primary" />
                                      </div>
                                      <div className="space-y-4">
                                        <span className="text-xs font-black text-white/30 uppercase tracking-[0.3em]">The Question</span>
                                        <h3 className="text-2xl md:text-4xl font-black tracking-tight leading-tight text-white">{currentCard?.question}</h3>
                                      </div>
                                      <div className="pt-8 flex flex-col items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
                                        <span className="text-xs font-bold text-white/20 uppercase tracking-widest">Tap to reveal answer</span>
                                      </div>
                                    </div>
                                  </Card>

                                  {/* Back */}
                                  <Card className="absolute inset-0 w-full h-full border-white/10 bg-white/10 backdrop-blur-3xl rounded-[3rem] p-8 md:p-16 flex flex-col items-center justify-center text-left overflow-hidden shadow-2xl" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
                                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
                                    <div className="relative z-10 w-full h-full flex flex-col">
                                      <div className="mb-8 flex items-center justify-between">
                                        <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
                                          <Sparkles className="w-7 h-7 text-primary" />
                                        </div>
                                        <span className="text-xs font-black text-white/30 uppercase tracking-[0.3em]">The Explanation</span>
                                      </div>
                                      <div className="flex-1 overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                                        <div className="text-lg md:text-xl font-medium leading-relaxed text-white/90">
                                          {(() => {
                                            const formattedContent = formatAnswerAsPoints(currentCard?.answer || "");
                                            const hasNumberedPoints = currentCard?.answer && /\(\d+\)/.test(currentCard.answer);
                                            return hasNumberedPoints ? <div className="space-y-6">{formattedContent}</div> : <ul className="space-y-4 list-none">{formattedContent}</ul>;
                                          })()}
                                        </div>
                                      </div>
                                      <div className="pt-8 text-center text-white/20 font-bold text-xs uppercase tracking-widest border-t border-white/5 mt-4">
                                        Tap to see question
                                      </div>
                                    </div>
                                  </Card>
                                </motion.div>
                            </motion.div>
                          </AnimatePresence>
                        </div>

                        {/* Navigation Controls */}
                        <div className="grid grid-cols-4 gap-4 mt-12 max-w-2xl mx-auto">
                          <Button
                            variant="outline"
                            size="lg"
                            onClick={handlePrevious}
                            className="h-16 rounded-3xl border-white/10 bg-white/5 hover:bg-white/10"
                          >
                            <ArrowLeft className="w-6 h-6" />
                          </Button>
                          <Button
                            size="lg"
                            onClick={handleFlip}
                            className="col-span-2 h-16 rounded-3xl bg-primary hover:bg-primary/90 font-black text-lg shadow-xl shadow-primary/20"
                          >
                            Flip Card
                          </Button>
                          <Button
                            variant="outline"
                            size="lg"
                            onClick={handleNext}
                            className="h-16 rounded-3xl border-white/10 bg-white/5 hover:bg-white/10"
                          >
                            <ArrowRight className="w-6 h-6" />
                          </Button>
                        </div>
                        
                        <div className="mt-8 flex justify-center">
                          <Button
                            variant="ghost"
                            onClick={handleShuffle}
                            className="rounded-full text-white/40 hover:text-white hover:bg-white/5 font-bold gap-2"
                          >
                            <RefreshCw className="w-4 h-4" />
                            Shuffle Deck
                          </Button>
                        </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
}