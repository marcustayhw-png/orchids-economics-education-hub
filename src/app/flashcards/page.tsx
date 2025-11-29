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
import { Loader2, Sparkles, RefreshCw, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Flashcard = {
  id: number;
  question: string;
  answer: string;
  level: string;
  category: string;
  topic: string;
  difficulty: string | null;
  createdAt: string;
  updatedAt: string;
};

export default function FlashcardsPage() {
  const [selectedLevel, setSelectedLevel] = useState("Secondary");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
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
    applyFilters();
  }, [flashcards, selectedLevel, selectedCategory, selectedDifficulty]);

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

    if (selectedCategory !== "all") {
      filtered = filtered.filter((card) => card.category === selectedCategory);
    }

    if (selectedDifficulty !== "all") {
      filtered = filtered.filter(
        (card) => card.difficulty === selectedDifficulty
      );
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

  const categories = Array.from(
    new Set(
      flashcards
        .filter((card) => card.level === selectedLevel)
        .map((card) => card.category)
    )
  );

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
            Test your knowledge with interactive flashcards. Click to reveal
            answers and track your progress.
          </p>
        </div>

        {/* Level Selector */}
        <Tabs
          defaultValue="Secondary"
          className="space-y-6"
          onValueChange={setSelectedLevel}
        >
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="Secondary">Secondary School</TabsTrigger>
            <TabsTrigger value="JC">Junior College</TabsTrigger>
          </TabsList>

          <TabsContent value={selectedLevel} className="space-y-6">
            {/* Filters */}
            <Card className="border-2">
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Category</label>
                    <Select
                      value={selectedCategory}
                      onValueChange={setSelectedCategory}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Difficulty</label>
                    <Select
                      value={selectedDifficulty}
                      onValueChange={setSelectedDifficulty}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Difficulties</SelectItem>
                        <SelectItem value="Easy">Easy</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
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
                  </div>
                </div>
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
                  <div className="flex gap-2 items-center">
                    {currentCard?.difficulty && (
                      <Badge
                        variant={
                          currentCard.difficulty === "Easy"
                            ? "secondary"
                            : currentCard.difficulty === "Medium"
                            ? "default"
                            : "destructive"
                        }
                      >
                        {currentCard.difficulty}
                      </Badge>
                    )}
                    <Badge variant="outline">{currentCard?.topic}</Badge>
                  </div>
                </div>

                {/* Flip Card */}
                <div className="perspective-1000">
                  <motion.div
                    className="relative w-full"
                    style={{ minHeight: "400px" }}
                    onClick={handleFlip}
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        key={isFlipped ? "answer" : "question"}
                        initial={{ rotateY: 90, opacity: 0 }}
                        animate={{ rotateY: 0, opacity: 1 }}
                        exit={{ rotateY: -90, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-full"
                      >
                        <Card className="border-2 hover:border-primary transition-all cursor-pointer bg-gradient-to-br from-background to-muted/30 shadow-lg h-full">
                          <CardContent className="p-8 sm:p-12 flex flex-col items-center justify-center text-center min-h-[400px]">
                            <div className="mb-6">
                              {isFlipped ? (
                                <Sparkles className="w-12 h-12 text-primary" />
                              ) : (
                                <BookOpen className="w-12 h-12 text-primary" />
                              )}
                            </div>
                            <div className="space-y-4 w-full">
                              <p className="text-xs sm:text-sm font-semibold text-primary uppercase tracking-wide">
                                {isFlipped ? "Answer" : "Question"}
                              </p>
                              <p className="text-lg sm:text-xl lg:text-2xl font-medium leading-relaxed">
                                {isFlipped
                                  ? currentCard?.answer
                                  : currentCard?.question}
                              </p>
                            </div>
                            <p className="text-xs text-muted-foreground mt-8">
                              {isFlipped
                                ? "Click to see question"
                                : "Click to reveal answer"}
                            </p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </AnimatePresence>
                  </motion.div>
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
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Study Tips */}
        <Card className="mt-12 bg-muted/50 border-2">
          <CardContent className="pt-6 space-y-3 text-sm sm:text-base text-muted-foreground">
            <p className="font-semibold text-foreground">
              How to Use Flashcards Effectively:
            </p>
            <p>
              • Try to answer the question before flipping the card
            </p>
            <p>
              • Use sequential mode for comprehensive coverage or random mode
              for varied practice
            </p>
            <p>• Revisit difficult cards multiple times until mastered</p>
            <p>
              • Combine flashcard study with notes and practice questions for
              best results
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
