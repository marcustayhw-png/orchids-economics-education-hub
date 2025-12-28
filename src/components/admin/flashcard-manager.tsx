"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Loader2, Plus, Edit, Trash2, X, Sparkles, ChevronRight, ArrowLeft, BookOpen, Users, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Flashcard {
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
}

const JC_CHAPTERS = {
  Microeconomics: [
    "Scarcity as the Central Economic Problem",
    "Demand and Supply",
    "Market Failure",
    "Firms and Decisions (Market Structure)"
  ],
  Macroeconomics: [
    "Introduction to Macroeconomics",
    "Macroeconomic Objectives and Policies",
    "Globalisation and the International Economy"
  ]
};

const SECONDARY_CHAPTERS = {
  Microeconomics: [
    "The basic economic problem",
    "The allocation of resources",
    "Microeconomic decision makers"
  ],
  Macroeconomics: [
    "Government and the macroeconomy",
    "Economic development",
    "International trade and globalisation"
  ]
};

export function FlashcardManager() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);

  const [viewStep, setViewStep] = useState<"level" | "type" | "chapter" | "list">("level");
  const [filterLevel, setFilterLevel] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<"Microeconomics" | "Macroeconomics" | null>(null);
  const [filterChapter, setFilterChapter] = useState<string | null>(null);

  const fetchFlashcards = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/flashcards?limit=1000");
      if (response.ok) {
        const data = await response.json();
        setFlashcards(Array.isArray(data) ? data : []);
      } else {
        toast.error("Failed to load flashcards");
      }
    } catch (error) {
      toast.error("Error loading flashcards");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFlashcards();
  }, []);

  const resetForm = () => {
    setFormData({
      question: "",
      answer: "",
      level: filterLevel || "Secondary",
      category: "",
      topic: "",
      difficulty: "",
      economicsType: filterType || "Microeconomics",
      chapter: filterChapter || "",
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleAddNew = () => {
    setFormData({
      question: "",
      answer: "",
      level: filterLevel || "Secondary",
      category: "",
      topic: "",
      difficulty: "",
      economicsType: filterType || "Microeconomics",
      chapter: filterChapter || "",
    });
    setEditingId(null);
    setShowForm(true);
  };

  const handleEdit = (flashcard: Flashcard) => {
    setFormData({
      question: flashcard.question,
      answer: flashcard.answer,
      level: flashcard.level,
      category: flashcard.category,
      topic: flashcard.topic,
      difficulty: flashcard.difficulty || "",
      economicsType: flashcard.economicsType,
      chapter: flashcard.chapter,
    });
    setEditingId(flashcard.id);
    setShowForm(true);
  };

  const filteredFlashcards = flashcards.filter((flashcard) => {
    if (filterLevel && flashcard.level !== filterLevel) return false;
    if (filterType && flashcard.economicsType !== filterType) return false;
    if (filterChapter && flashcard.chapter !== filterChapter) return false;
    return true;
  });


  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Browser View */}
      {!showForm && (
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Button 
              variant="link" 
              size="sm" 
              className="p-0 h-auto" 
              onClick={() => { setViewStep("level"); setFilterLevel(null); setFilterType(null); setFilterChapter(null); }}
            >
              All
            </Button>
            {filterLevel && (
              <>
                <ChevronRight className="w-4 h-4" />
                <Button 
                  variant="link" 
                  size="sm" 
                  className="p-0 h-auto" 
                  onClick={() => { setViewStep("type"); setFilterType(null); setFilterChapter(null); }}
                >
                  {filterLevel}
                </Button>
              </>
            )}
            {filterType && (
              <>
                <ChevronRight className="w-4 h-4" />
                <Button 
                  variant="link" 
                  size="sm" 
                  className="p-0 h-auto" 
                  onClick={() => { setViewStep("chapter"); setFilterChapter(null); }}
                >
                  {filterType}
                </Button>
              </>
            )}
            {filterChapter && (
              <>
                <ChevronRight className="w-4 h-4" />
                <span className="text-foreground font-medium">{filterChapter}</span>
              </>
            )}
          </div>

          <AnimatePresence mode="wait">
            {viewStep === "level" && (
              <motion.div
                key="level"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <Card className="hover:border-primary cursor-pointer transition-all" onClick={() => { setFilterLevel("JC"); setViewStep("type"); }}>
                  <CardContent className="p-6 text-center">
                    <h3 className="text-xl font-bold">Junior College (JC)</h3>
                    <p className="text-muted-foreground">H1/H2 Economics Flashcards</p>
                  </CardContent>
                </Card>
                <Card className="hover:border-primary cursor-pointer transition-all" onClick={() => { setFilterLevel("Secondary"); setViewStep("type"); }}>
                  <CardContent className="p-6 text-center">
                    <h3 className="text-xl font-bold">Secondary School</h3>
                    <p className="text-muted-foreground">O-Level Economics Flashcards</p>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {viewStep === "type" && (
              <motion.div
                key="type"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <Card className="hover:border-primary cursor-pointer transition-all" onClick={() => { setFilterType("Microeconomics"); setViewStep("chapter"); }}>
                  <CardContent className="p-6 text-center">
                    <h3 className="text-xl font-bold">Microeconomics</h3>
                    <p className="text-muted-foreground">Markets and Decisions</p>
                  </CardContent>
                </Card>
                <Card className="hover:border-primary cursor-pointer transition-all" onClick={() => { setFilterType("Macroeconomics"); setViewStep("chapter"); }}>
                  <CardContent className="p-6 text-center">
                    <h3 className="text-xl font-bold">Macroeconomics</h3>
                    <p className="text-muted-foreground">The National Economy</p>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {viewStep === "chapter" && (
              <motion.div
                key="chapter"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-3"
              >
                {filterLevel && filterType && (filterLevel === "JC" ? JC_CHAPTERS : SECONDARY_CHAPTERS)[filterType].map(chapter => (
                  <Button
                    key={chapter}
                    variant="outline"
                    className="h-auto py-4 px-6 justify-between text-left hover:border-primary group"
                    onClick={() => { setFilterChapter(chapter); setViewStep("list"); }}
                  >
                    <span>{chapter}</span>
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Button>
                ))}
              </motion.div>
            )}

            {viewStep === "list" && (
              <motion.div
                key="list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <div className="flex justify-between items-center bg-muted/30 p-4 rounded-lg border border-border">
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold">{filterChapter}</h3>
                    <p className="text-sm text-muted-foreground">
                      {filterLevel} • {filterType}
                    </p>
                  </div>
                  <Button onClick={handleAddNew} size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Flashcard
                  </Button>
                </div>

                {filteredFlashcards.length === 0 ? (
                  <div className="text-center py-12 border-2 border-dashed rounded-lg text-muted-foreground">
                    <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-20" />
                    <p>No flashcards found for this chapter.</p>
                    <Button variant="link" onClick={handleAddNew} className="mt-2">
                      Add the first one
                    </Button>
                  </div>
                ) : (
                  filteredFlashcards.map((flashcard) => (
                    <Card key={flashcard.id} className="hover:border-primary/50 transition-colors">
                      <CardHeader className="p-4 sm:p-6">
                        <div className="flex items-start justify-between gap-4">
                          <div className="space-y-2 flex-1">
                            <div className="flex gap-2 flex-wrap">
                              <Badge variant="secondary" className="bg-primary/10 text-primary border-none">{flashcard.topic}</Badge>
                              {flashcard.difficulty && (
                                <Badge variant="outline" className={
                                  flashcard.difficulty === "Hard" ? "border-red-200 text-red-600" :
                                  flashcard.difficulty === "Medium" ? "border-amber-200 text-amber-600" :
                                  "border-green-200 text-green-600"
                                }>
                                  {flashcard.difficulty}
                                </Badge>
                              )}
                            </div>
                            <p className="font-bold text-lg">{flashcard.question}</p>
                            <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                              {flashcard.answer}
                            </p>
                          </div>
                          <div className="flex gap-1">
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => handleEdit(flashcard)}
                              className="hover:text-primary"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => handleDelete(flashcard.id)}
                              className="hover:text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  ))
                )}
                
                <Button variant="ghost" className="w-full mt-8" onClick={() => setViewStep("chapter")}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Chapters
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
