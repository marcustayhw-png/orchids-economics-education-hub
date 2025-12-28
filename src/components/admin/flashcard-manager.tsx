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
      {!showForm && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold">Browse & Filter</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="filterLevel">Level</Label>
                  <Select value={filterLevel} onValueChange={setFilterLevel}>
                    <SelectTrigger id="filterLevel">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Levels</SelectItem>
                      <SelectItem value="Secondary">Secondary</SelectItem>
                      <SelectItem value="JC">JC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="filterType">Focus Area</Label>
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger id="filterType">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Focus Areas</SelectItem>
                      <SelectItem value="Microeconomics">Microeconomics</SelectItem>
                      <SelectItem value="Macroeconomics">Macroeconomics</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="filterChapter">Chapter</Label>
                  <Select value={filterChapter} onValueChange={setFilterChapter}>
                    <SelectTrigger id="filterChapter">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Chapters</SelectItem>
                      {uniqueChapters.map((chapter) => (
                        <SelectItem key={chapter} value={chapter}>
                          {chapter}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">
              Flashcards ({filteredFlashcards.length})
            </h3>
            <Button onClick={handleAddNew}>
              <Plus className="w-4 h-4 mr-2" />
              Add Flashcard to this Category
            </Button>
          </div>

          <div className="space-y-4">
            {filteredFlashcards.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed rounded-lg text-muted-foreground">
                No flashcards found matching these filters.
              </div>
            ) : (
              filteredFlashcards.map((flashcard) => (
                <Card key={flashcard.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-2 flex-1">
                        <div className="flex gap-2 flex-wrap">
                          <Badge variant="secondary">{flashcard.economicsType}</Badge>
                          <Badge variant="outline">{flashcard.chapter}</Badge>
                          <Badge>{flashcard.level}</Badge>
                        </div>
                        <p className="font-semibold">{flashcard.question}</p>
                        <p className="text-sm text-muted-foreground whitespace-pre-wrap">{flashcard.answer}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(flashcard)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(flashcard.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
