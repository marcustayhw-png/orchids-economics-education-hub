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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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

const SECONDARY_CHAPTERS = {
  Micro: [
    "1. The basic economic problem",
    "2. The allocation of resources",
    "3. Microeconomic decision makers"
  ],
  Macro: [
    "4. Government and the macroeconomy",
    "5. Economic development",
    "6. International trade and globalisation"
  ]
};

export function FlashcardManager() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [cardToDelete, setCardToDelete] = useState<number | null>(null);
  
    const [formData, setFormData] = useState({
      question: "",
      answer: "",
      level: "Secondary",
      category: "",
      topic: "",
      difficulty: "Medium" as string | null,
      economicsType: "Micro" as "Micro" | "Macro",
      chapter: "",
    });

    const [viewStep, setViewStep] = useState<"level" | "type" | "chapter" | "list">("level");
    const [filterLevel, setFilterLevel] = useState<string | null>(null);
    const [filterType, setFilterType] = useState<"Micro" | "Macro" | null>(null);
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
        difficulty: "Medium",
        economicsType: filterType || "Micro",
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
        difficulty: "Medium",
        economicsType: filterType || "Micro",
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
        difficulty: flashcard.difficulty || "Medium",
        economicsType: flashcard.economicsType as "Micro" | "Macro",
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


  const handleDelete = async (id: number) => {
    const token = localStorage.getItem("bearer_token");
    try {
      const response = await fetch(`/api/flashcards?id=${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        toast.success("Flashcard deleted successfully");
        fetchFlashcards();
      } else {
        toast.error("Failed to delete flashcard");
      }
    } catch (error) {
      toast.error("Error deleting flashcard");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const token = localStorage.getItem("bearer_token");
    const payload = {
      ...formData,
    };

    try {
      const url = editingId ? `/api/flashcards?id=${editingId}` : "/api/flashcards";
      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success(`Flashcard ${editingId ? "updated" : "created"} successfully`);
        fetchFlashcards();
        resetForm();
      } else {
        const error = await response.json();
        toast.error(error.error || `Failed to ${editingId ? "update" : "create"} flashcard`);
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AlertDialog open={!!cardToDelete} onOpenChange={(open) => !open && setCardToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the flashcard.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => {
                if (cardToDelete) {
                  handleDelete(cardToDelete);
                  setCardToDelete(null);
                }
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

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
                    {filterType === "Micro" ? "Microeconomics" : "Macroeconomics"}
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
                  <Card className="hover:border-primary cursor-pointer transition-all" onClick={() => { setFilterType("Micro"); setViewStep("chapter"); }}>
                    <CardContent className="p-6 text-center">
                      <h3 className="text-xl font-bold">Microeconomics</h3>
                      <p className="text-muted-foreground">Markets and Decisions</p>
                    </CardContent>
                  </Card>
                  <Card className="hover:border-primary cursor-pointer transition-all" onClick={() => { setFilterType("Macro"); setViewStep("chapter"); }}>
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
                {filterLevel && filterType && (filterLevel === "JC" ? JC_CHAPTERS : SECONDARY_CHAPTERS)[filterType as keyof typeof JC_CHAPTERS]?.map(chapter => (
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
                              onClick={() => setCardToDelete(flashcard.id)}
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

      {/* Form */}
      {showForm && (
        <Card className="border-2 border-primary">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{editingId ? "Edit Flashcard" : "Add New Flashcard"}</CardTitle>
              <Button variant="ghost" size="sm" onClick={resetForm}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="level">Level *</Label>
                  <Select
                    value={formData.level}
                    onValueChange={(value) => setFormData({ ...formData, level: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="JC">JC</SelectItem>
                      <SelectItem value="Secondary">Secondary School</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="difficulty">Difficulty</Label>
                  <Select
                    value={formData.difficulty}
                    onValueChange={(value) => setFormData({ ...formData, difficulty: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Easy">Easy</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="economicsType">Economics Type *</Label>
                  <Select
                    value={formData.economicsType}
                    onValueChange={(value: any) => setFormData({ ...formData, economicsType: value, chapter: "" })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Micro">Microeconomics</SelectItem>
                        <SelectItem value="Macro">Macroeconomics</SelectItem>
                      </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="chapter">Chapter *</Label>
                  <Select
                    value={formData.chapter}
                    onValueChange={(value) => setFormData({ ...formData, chapter: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Chapter" />
                    </SelectTrigger>
                    <SelectContent>
                      {formData.economicsType && (formData.level === "JC" ? JC_CHAPTERS : SECONDARY_CHAPTERS)[formData.economicsType as keyof typeof JC_CHAPTERS]?.map(chapter => (
                        <SelectItem key={chapter} value={chapter}>{chapter}</SelectItem>
                      ))}
                      <SelectItem value="Custom">Other (Specify in Topic)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="topic">Topic / Sub-topic *</Label>
                <Input
                  id="topic"
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  placeholder="e.g. Price Elasticity of Demand"
                  required
                />
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="e.g. Definitions, Concepts"
                />
              </div>

              <div>
                <Label htmlFor="question">Question *</Label>
                <Textarea
                  id="question"
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  placeholder="Enter the flashcard question"
                  rows={3}
                  required
                />
              </div>

              <div>
                <Label htmlFor="answer">Answer *</Label>
                <Textarea
                  id="answer"
                  value={formData.answer}
                  onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                  placeholder="Enter the answer"
                  rows={5}
                  required
                />
              </div>

              <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={resetForm}>Cancel</Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                  {editingId ? "Update" : "Create"} Flashcard
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* All Flashcards List (Fallback) */}
      {!showForm && viewStep !== "list" && (
        <div className="pt-8 border-t">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">All Flashcards ({flashcards.length})</h3>
            <Button onClick={handleAddNew} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Quick Add
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {flashcards.slice(0, 5).map(card => (
              <Card key={card.id} className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex gap-2 mb-2">
                      <Badge variant="outline" className="text-[10px]">{card.level}</Badge>
                      <Badge variant="outline" className="text-[10px]">{card.economicsType}</Badge>
                    </div>
                    <p className="font-medium">{card.question}</p>
                  </div>
                  <div className="flex gap-1">
                    <Button size="icon" variant="ghost" onClick={() => handleEdit(card)}><Edit className="w-3 h-3" /></Button>
                    <Button size="icon" variant="ghost" onClick={() => setCardToDelete(card.id)} className="text-destructive"><Trash2 className="w-3 h-3" /></Button>
                  </div>
                </div>
              </Card>
            ))}
            {flashcards.length > 5 && (
              <p className="text-center text-sm text-muted-foreground">And {flashcards.length - 5} more... use browser above to find specific cards.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

