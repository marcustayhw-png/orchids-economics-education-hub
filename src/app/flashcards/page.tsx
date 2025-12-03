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
import { motion, AnimatePresence, PanInfo } from "framer-motion";

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
  // Check if answer contains numbered points like (1), (2), etc.
  const numberedPattern = /\((\d+)\)/g;
  const hasNumberedPoints = numberedPattern.test(answer);
  
  if (hasNumberedPoints) {
    // Split by numbered points and format as separate paragraphs
    const points = answer.split(/\((\d+)\)/).filter(part => part.trim().length > 0);
    const formattedPoints: JSX.Element[] = [];
    
    for (let i = 0; i < points.length; i += 2) {
      if (i + 1 < points.length) {
        const number = points[i];
        const content = points[i + 1].trim();
        
        if (content) {
          formattedPoints.push(
            <div key={number} className="mb-4">
              <p className="text-sm leading-relaxed">
                <span className="font-semibold">({number})</span> {content}
              </p>
            </div>
          );
        }
      }
    }
    
    return formattedPoints;
  }
  
  // Original bullet point formatting for non-numbered answers
  const lines = answer.split('\n').map(line => line.trim()).filter(line => line.length > 0);
  
  return lines.map((line, index) => {
    const cleanedLine = line.replace(/^[•\-\*]\s*/, '');
    return (
      <li key={index} className="text-sm leading-relaxed mb-3">
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

  return (
    <div className="min-h-screen bg-background py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 space-y-3 sm:space-y-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Economics Flashcards
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            {selectedLevel === "JC" 
              ? "Master H2 Economics with interactive flashcards aligned to Syllabus 9570 (2026)"
              : "Master O-Level Economics with interactive flashcards aligned to Syllabus 2286 (2026)"}
          </p>
        </div>

        {/* Level Selector */}
        <Tabs
          defaultValue="Secondary"
          className="space-y-8"
          onValueChange={(value) => {
            setSelectedLevel(value);
            setSelectedEconomicsType("");
            setSelectedChapter("");
            setCurrentStep("economics-type");
          }}
        >
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="Secondary">Secondary School</TabsTrigger>
            <TabsTrigger value="JC">Junior College</TabsTrigger>
          </TabsList>

          <TabsContent value={selectedLevel} className="space-y-8">
            <AnimatePresence mode="wait">
              {/* Step 1: Select Economics Type */}
              {currentStep === "economics-type" && (
                <motion.div
                  key="economics-type"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="space-y-6"
                >
                  <div className="text-center space-y-3">
                    <h2 className="text-2xl sm:text-3xl font-semibold">
                      Choose Your Focus
                    </h2>
                    <p className="text-muted-foreground">
                      Select either Microeconomics or Macroeconomics to begin
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Card
                        className="border-2 cursor-pointer hover:border-primary transition-all hover:shadow-lg bg-gradient-to-br from-background to-muted/30 overflow-hidden group"
                        onClick={() => handleEconomicsTypeSelect("Microeconomics")}
                      >
                        <CardContent className="pt-8 pb-8 text-center space-y-4 relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform duration-300">
                            <Users className="w-8 h-8 text-primary group-hover:rotate-12 transition-transform duration-300" />
                          </div>
                          <h3 className="text-xl font-semibold relative z-10">Microeconomics</h3>
                          <p className="text-sm text-muted-foreground relative z-10">
                            Study individual markets, consumer behavior, and firm decisions
                          </p>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 relative z-10 group/btn overflow-hidden"
                          >
                            <span className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/20 to-primary/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
                            <span className="relative">Select</span>
                            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300 relative" />
                          </motion.button>
                        </CardContent>
                      </Card>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Card
                        className="border-2 cursor-pointer hover:border-primary transition-all hover:shadow-lg bg-gradient-to-br from-background to-muted/30 overflow-hidden group"
                        onClick={() => handleEconomicsTypeSelect("Macroeconomics")}
                      >
                        <CardContent className="pt-8 pb-8 text-center space-y-4 relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform duration-300">
                            <Globe className="w-8 h-8 text-primary group-hover:rotate-12 transition-transform duration-300" />
                          </div>
                          <h3 className="text-xl font-semibold relative z-10">Macroeconomics</h3>
                          <p className="text-sm text-muted-foreground relative z-10">
                            Explore national economies, GDP, inflation, and fiscal policy
                          </p>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 relative z-10 group/btn overflow-hidden"
                          >
                            <span className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/20 to-primary/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
                            <span className="relative">Select</span>
                            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300 relative" />
                          </motion.button>
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
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="space-y-6"
                >
                  <div className="text-center space-y-3">
                    <Badge variant="secondary" className="mb-2">
                      {selectedEconomicsType}
                    </Badge>
                    <h2 className="text-2xl sm:text-3xl font-semibold">
                      Select a Chapter
                    </h2>
                    <p className="text-muted-foreground">
                      {selectedLevel === "JC"
                        ? "Choose the H2 Economics chapter from Syllabus 9570 (2026)"
                        : "Choose the O-Level Economics chapter from Syllabus 2286 (2026)"}
                    </p>
                  </div>

                  <div className="max-w-2xl mx-auto">
                    <Card className="border-2">
                      <CardContent className="pt-6 space-y-4">
                        {chapters.length === 0 ? (
                          <div className="text-center py-8">
                            <p className="text-muted-foreground">
                              No chapters available for {selectedEconomicsType}
                            </p>
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 gap-3">
                            {chapters.map((chapter) => (
                              <motion.button
                                key={chapter}
                                whileHover={{ scale: 1.02, x: 4 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleChapterSelect(chapter)}
                                className="w-full py-4 px-6 rounded-lg border-2 border-border bg-gradient-to-r from-background to-muted/30 hover:border-primary hover:shadow-md transition-all duration-300 flex items-center justify-between group overflow-hidden relative"
                              >
                                <span className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <span className="font-medium relative z-10 text-left">{chapter}</span>
                                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300 relative z-10 flex-shrink-0 ml-2" />
                              </motion.button>
                            ))}
                          </div>
                        )}

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleBackToEconomicsType}
                          className="w-full py-3 px-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors duration-300 flex items-center justify-center gap-2 font-medium group"
                        >
                          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
                          Back to Economics Type
                        </motion.button>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Study Mode */}
              {currentStep === "study" && (
                <motion.div
                  key="study"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="space-y-6"
                >
                  {/* Breadcrumb with Change Chapter button */}
                  <div className="flex items-center justify-center gap-3 flex-wrap">
                    <Badge variant="secondary">{selectedEconomicsType}</Badge>
                    <span className="text-muted-foreground">/</span>
                    <Badge variant="outline">{selectedChapter}</Badge>
                    <span className="text-muted-foreground mx-2">•</span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleBackToChapter}
                      className="py-2 px-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors duration-300 flex items-center gap-2 text-sm font-medium group"
                    >
                      <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform duration-300" />
                      Change Chapter
                    </motion.button>
                  </div>

                  {/* Enhanced Swipe instruction for mobile */}
                  <motion.div 
                    className="text-center sm:hidden"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border-2 border-primary/20">
                      <motion.div
                        animate={{ x: [-3, 3, -3] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <ChevronLeft className="w-4 h-4 text-primary" />
                      </motion.div>
                      <span className="text-sm font-medium text-primary">
                        Swipe to navigate • Tap to flip
                      </span>
                      <motion.div
                        animate={{ x: [3, -3, 3] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <ChevronRight className="w-4 h-4 text-primary" />
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Flashcard Display */}
                  {filteredCards.length === 0 ? (
                    <Card className="border-2 border-dashed">
                      <CardContent className="py-12 text-center">
                        <BookOpen className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                        <p className="text-muted-foreground">
                          No flashcards available for the selected filters.
                        </p>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="space-y-6">
                      {/* Progress */}
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>
                          Card {currentIndex + 1} of {filteredCards.length}
                        </span>
                        <Badge>{currentCard?.topic}</Badge>
                      </div>

                      {/* 3D Flip Card Container with Swipe and Animated Indicators */}
                      <div className="perspective-1000 w-full flex justify-center mb-16 relative">
                        {/* Animated Swipe Indicators - Only on Mobile */}
                        <AnimatePresence>
                          {showSwipeHint && (
                            <>
                              {/* Left Swipe Indicator */}
                              <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 sm:hidden pointer-events-none"
                              >
                                <motion.div
                                  animate={{ 
                                    x: [-8, 0, -8],
                                    opacity: [0.4, 1, 0.4]
                                  }}
                                  transition={{ 
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                  }}
                                  className="flex items-center gap-1"
                                >
                                  <div className="w-12 h-12 rounded-full bg-primary/20 backdrop-blur-sm border-2 border-primary/30 flex items-center justify-center shadow-lg">
                                    <ChevronLeft className="w-6 h-6 text-primary" />
                                  </div>
                                </motion.div>
                              </motion.div>

                              {/* Right Swipe Indicator */}
                              <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 sm:hidden pointer-events-none"
                              >
                                <motion.div
                                  animate={{ 
                                    x: [8, 0, 8],
                                    opacity: [0.4, 1, 0.4]
                                  }}
                                  transition={{ 
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                  }}
                                  className="flex items-center gap-1"
                                >
                                  <div className="w-12 h-12 rounded-full bg-primary/20 backdrop-blur-sm border-2 border-primary/30 flex items-center justify-center shadow-lg">
                                    <ChevronRight className="w-6 h-6 text-primary" />
                                  </div>
                                </motion.div>
                              </motion.div>
                            </>
                          )}
                        </AnimatePresence>

                        <motion.div 
                          className="relative w-full max-w-2xl cursor-pointer touch-pan-y"
                          style={{ 
                            perspective: '1000px',
                            minHeight: '450px',
                          }}
                          drag="x"
                          dragConstraints={{ left: 0, right: 0 }}
                          dragElastic={0.2}
                          onDragEnd={handleSwipe}
                          onClick={handleFlip}
                          animate={{
                            x: swipeDirection === "left" ? -20 : swipeDirection === "right" ? 20 : 0,
                            opacity: swipeDirection ? 0.5 : 1
                          }}
                          transition={{
                            x: { duration: 0.15 },
                            opacity: { duration: 0.15 }
                          }}
                        >
                          <motion.div
                            className="relative w-full"
                            style={{ 
                              transformStyle: 'preserve-3d',
                              minHeight: '450px',
                            }}
                            animate={{ rotateY: isFlipped ? 180 : 0 }}
                            transition={{
                              duration: 0.6,
                              type: "spring",
                              stiffness: 100,
                              damping: 15
                            }}
                          >
                            {/* Front of Card (Question) */}
                            <motion.div
                              className="absolute inset-0 w-full"
                              style={{
                                backfaceVisibility: 'hidden',
                                WebkitBackfaceVisibility: 'hidden',
                                zIndex: isFlipped ? 0 : 1
                              }}
                            >
                              <Card className="border-2 shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-gradient-to-br from-background to-muted/20">
                                <CardContent className="p-8 sm:p-12 flex flex-col h-[450px]">
                                  <div className="flex-none mb-6">
                                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                                      <BookOpen className="w-8 h-8 text-primary" />
                                    </div>
                                  </div>
                                  <div className="flex-1 overflow-y-auto space-y-4 flex flex-col items-center text-center px-2">
                                    <p className="text-xs sm:text-sm font-semibold text-primary uppercase tracking-wide flex-none">
                                      Question
                                    </p>
                                    <p className="text-base sm:text-lg lg:text-xl font-medium leading-relaxed flex-none">
                                      {currentCard?.question}
                                    </p>
                                  </div>
                                  <div className="flex-none pt-6 text-center">
                                    <p className="text-xs text-muted-foreground">
                                      Click to reveal answer
                                    </p>
                                  </div>
                                </CardContent>
                              </Card>
                            </motion.div>

                            {/* Back of Card (Answer) - Updated with point-form display */}
                            <motion.div
                              className="absolute inset-0 w-full"
                              style={{
                                backfaceVisibility: 'hidden',
                                WebkitBackfaceVisibility: 'hidden',
                                rotateY: 180,
                                zIndex: isFlipped ? 1 : 0
                              }}
                            >
                              <Card className="border-2 shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-gradient-to-br from-primary/5 to-muted/20">
                                <CardContent className="p-8 sm:p-12 flex flex-col h-[450px]">
                                  <div className="flex-none mb-6">
                                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                                      <Sparkles className="w-8 h-8 text-primary" />
                                    </div>
                                  </div>
                                  <div className="flex-1 overflow-y-auto px-2 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
                                    <p className="text-xs sm:text-sm font-semibold text-primary uppercase tracking-wide mb-4 text-center">
                                      Answer
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 text-left max-w-prose mx-auto">
                                      {formatAnswerAsPoints(currentCard?.answer || "")}
                                    </ul>
                                  </div>
                                  <div className="flex-none pt-6 text-center">
                                    <p className="text-xs text-muted-foreground">
                                      Click to see question
                                    </p>
                                  </div>
                                </CardContent>
                              </Card>
                            </motion.div>
                          </motion.div>
                        </motion.div>
                      </div>

                      {/* Enhanced Controls */}
                      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center mt-12 relative z-10">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handlePrevious}
                          disabled={filteredCards.length <= 1}
                          className="flex-1 sm:flex-none py-3 px-6 rounded-lg border-2 border-border bg-gradient-to-r from-background to-muted/30 hover:border-primary hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 font-semibold group overflow-hidden relative"
                        >
                          <span className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300 relative z-10" />
                          <span className="relative z-10">Previous</span>
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleFlip}
                          className="flex-1 sm:flex-none py-3 px-8 rounded-lg bg-gradient-to-r from-primary via-primary to-primary/80 text-primary-foreground font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group overflow-hidden relative"
                        >
                          <span className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/30 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                          <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500 relative z-10" />
                          <span className="relative z-10">Flip Card</span>
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleShuffle}
                          className="flex-1 sm:flex-none py-3 px-6 rounded-lg border-2 border-primary/50 bg-gradient-to-r from-primary/10 to-primary/5 hover:from-primary/20 hover:to-primary/10 hover:border-primary hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 font-semibold group overflow-hidden relative"
                        >
                          <span className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <Sparkles className="w-4 h-4 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300 relative z-10" />
                          <span className="relative z-10">Shuffle</span>
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleNext}
                          disabled={filteredCards.length <= 1}
                          className="flex-1 sm:flex-none py-3 px-6 rounded-lg border-2 border-border bg-gradient-to-r from-background to-muted/30 hover:border-primary hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 font-semibold group overflow-hidden relative"
                        >
                          <span className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <span className="relative z-10">Next</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
                        </motion.button>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </TabsContent>
        </Tabs>

        {/* Study Tips */}
        {currentStep === "study" && filteredCards.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="mt-12 bg-muted/50 border-2">
              <CardContent className="pt-6 space-y-3 text-sm sm:text-base text-muted-foreground">
                <p className="font-semibold text-foreground">
                  Study Tips:
                </p>
                <p>
                  • Try to answer the question before flipping the card
                </p>
                <p className="sm:hidden">
                  • Swipe left/right to navigate between cards
                </p>
                <p className="hidden sm:block">
                  • Use sequential navigation for comprehensive coverage
                </p>
                <p>
                  • Focus on succinct, point-form answers aligned with {selectedLevel === "JC" ? "H2 A-Level" : "O-Level"} syllabus
                </p>
                <p>
                  • Revisit difficult cards multiple times until mastered
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}