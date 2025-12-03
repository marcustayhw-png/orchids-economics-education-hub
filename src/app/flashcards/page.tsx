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
import { Loader2, Sparkles, RefreshCw, BookOpen, ArrowRight, ArrowLeft, Users, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
  const [studyMode, setStudyMode] = useState<"sequential" | "random">("sequential");

  useEffect(() => {
    fetchFlashcards();
  }, []);

  useEffect(() => {
    if (selectedEconomicsType && selectedChapter) {
      applyFilters();
    }
  }, [flashcards, selectedLevel, selectedEconomicsType, selectedChapter]);

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
    if (studyMode === "random") {
      const randomIndex = Math.floor(Math.random() * filteredCards.length);
      setCurrentIndex(randomIndex);
    } else {
      setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
    }
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
            Test your knowledge with interactive flashcards. Select your focus area to begin.
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
                        className="border-2 cursor-pointer hover:border-primary transition-all hover:shadow-lg bg-gradient-to-br from-background to-muted/30"
                        onClick={() => handleEconomicsTypeSelect("Microeconomics")}
                      >
                        <CardContent className="pt-8 pb-8 text-center space-y-4">
                          <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                            <Users className="w-8 h-8 text-primary" />
                          </div>
                          <h3 className="text-xl font-semibold">Microeconomics</h3>
                          <p className="text-sm text-muted-foreground">
                            Study individual markets, consumer behavior, and firm decisions
                          </p>
                          <Button className="w-full" size="lg">
                            Select
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Card
                        className="border-2 cursor-pointer hover:border-primary transition-all hover:shadow-lg bg-gradient-to-br from-background to-muted/30"
                        onClick={() => handleEconomicsTypeSelect("Macroeconomics")}
                      >
                        <CardContent className="pt-8 pb-8 text-center space-y-4">
                          <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                            <Globe className="w-8 h-8 text-primary" />
                          </div>
                          <h3 className="text-xl font-semibold">Macroeconomics</h3>
                          <p className="text-sm text-muted-foreground">
                            Explore national economies, GDP, inflation, and fiscal policy
                          </p>
                          <Button className="w-full" size="lg">
                            Select
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
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
                      Choose the H2 Economics chapter you want to study
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
                              <motion.div
                                key={chapter}
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                              >
                                <Button
                                  variant="outline"
                                  className="w-full justify-between h-auto py-4 px-6 text-left"
                                  onClick={() => handleChapterSelect(chapter)}
                                >
                                  <span className="font-medium">{chapter}</span>
                                  <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                              </motion.div>
                            ))}
                          </div>
                        )}

                        <Button
                          variant="ghost"
                          className="w-full"
                          onClick={handleBackToEconomicsType}
                        >
                          <ArrowLeft className="w-4 h-4 mr-2" />
                          Back to Economics Type
                        </Button>
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
                  {/* Breadcrumb */}
                  <div className="flex items-center justify-center gap-2 flex-wrap">
                    <Badge variant="secondary">{selectedEconomicsType}</Badge>
                    <span className="text-muted-foreground">/</span>
                    <Badge variant="outline">{selectedChapter}</Badge>
                  </div>

                  {/* Study Mode Selector */}
                  <Card className="border-2 max-w-md mx-auto">
                    <CardContent className="pt-6 space-y-4">
                      <label className="text-sm font-medium">Study Mode</label>
                      <Select
                        value={studyMode}
                        onValueChange={(value: "sequential" | "random") =>
                          setStudyMode(value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sequential">Sequential</SelectItem>
                          <SelectItem value="random">Random</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button
                        variant="ghost"
                        className="w-full"
                        onClick={handleBackToChapter}
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Change Chapter
                      </Button>
                    </CardContent>
                  </Card>

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

                      {/* 3D Flip Card Container */}
                      <div className="perspective-1000 w-full flex justify-center">
                        <div 
                          className="relative w-full max-w-2xl cursor-pointer"
                          style={{ 
                            perspective: '1000px',
                          }}
                          onClick={handleFlip}
                        >
                          <motion.div
                            className="relative w-full h-full"
                            style={{ 
                              transformStyle: 'preserve-3d',
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
                              className="absolute inset-0 w-full h-full"
                              style={{
                                backfaceVisibility: 'hidden',
                                WebkitBackfaceVisibility: 'hidden'
                              }}
                            >
                              <Card className="border-2 shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-gradient-to-br from-background to-muted/20">
                                <CardContent className="p-8 sm:p-12 flex flex-col min-h-[400px] max-h-[600px]">
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

                            {/* Back of Card (Answer) */}
                            <motion.div
                              className="absolute inset-0 w-full h-full"
                              style={{
                                backfaceVisibility: 'hidden',
                                WebkitBackfaceVisibility: 'hidden',
                                rotateY: 180
                              }}
                            >
                              <Card className="border-2 shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-gradient-to-br from-primary/5 to-muted/20">
                                <CardContent className="p-8 sm:p-12 flex flex-col min-h-[400px] max-h-[600px]">
                                  <div className="flex-none mb-6">
                                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                                      <Sparkles className="w-8 h-8 text-primary" />
                                    </div>
                                  </div>
                                  <div className="flex-1 overflow-y-auto space-y-4 flex flex-col items-center text-center px-2 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
                                    <p className="text-xs sm:text-sm font-semibold text-primary uppercase tracking-wide flex-none">
                                      Answer
                                    </p>
                                    <p className="text-sm sm:text-base lg:text-lg font-medium leading-relaxed text-left max-w-prose">
                                      {currentCard?.answer}
                                    </p>
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
                        </div>
                      </div>

                      {/* Controls */}
                      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center">
                        <Button
                          onClick={handlePrevious}
                          variant="outline"
                          size="lg"
                          className="flex-1 sm:flex-none"
                          disabled={filteredCards.length <= 1}
                        >
                          <ArrowLeft className="w-4 h-4 mr-2" />
                          Previous
                        </Button>
                        <Button
                          onClick={handleFlip}
                          variant="default"
                          size="lg"
                          className="flex-1 sm:flex-none"
                        >
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Flip Card
                        </Button>
                        <Button
                          onClick={handleShuffle}
                          variant="outline"
                          size="lg"
                          className="flex-1 sm:flex-none"
                        >
                          <Sparkles className="w-4 h-4 mr-2" />
                          Shuffle
                        </Button>
                        <Button
                          onClick={handleNext}
                          variant="outline"
                          size="lg"
                          className="flex-1 sm:flex-none"
                          disabled={filteredCards.length <= 1}
                        >
                          Next
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
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
                <p>
                  • Use sequential mode for comprehensive coverage or random mode for varied practice
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