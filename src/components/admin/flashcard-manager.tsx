"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Loader2, Plus, Edit, Trash2, X, Sparkles } from "lucide-react";
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

export function FlashcardManager() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Filter states
  const [filterLevel, setFilterLevel] = useState<string>("All");
  const [filterChapter, setFilterChapter] = useState<string>("All");

  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    level: "Secondary",
    category: "",
    topic: "",
    difficulty: "",
    economicsType: "Microeconomics",
    chapter: "",
  });

  useEffect(() => {
    fetchFlashcards();
  }, []);

  const fetchFlashcards = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("bearer_token");
      const response = await fetch("/api/flashcards?limit=100", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setFlashcards(data);
      } else {
        toast.error("Failed to load flashcards");
      }
    } catch (error) {
      toast.error("Error loading flashcards");
    } finally {
      setIsLoading(false);
    }
  };

  // Get unique chapters for filter dropdown
  const uniqueChapters = Array.from(
    new Set(flashcards.map((f) => f.chapter).filter(Boolean))
  ).sort();

  // Filter flashcards based on selected filters
  const filteredFlashcards = flashcards.filter((flashcard) => {
    const matchesLevel = filterLevel === "All" || flashcard.level === filterLevel;
    const matchesChapter = filterChapter === "All" || flashcard.chapter === filterChapter;
    return matchesLevel && matchesChapter;
  });

  const resetForm = () => {
    setFormData({
      question: "",
      answer: "",
      level: "Secondary",
      category: "",
      topic: "",
      difficulty: "",
      economicsType: "Microeconomics",
      chapter: "",
    });
    setEditingId(null);
    setShowForm(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const token = localStorage.getItem("bearer_token");

    const payload = {
      question: formData.question,
      answer: formData.answer,
      level: formData.level,
      category: formData.category,
      topic: formData.topic,
      difficulty: formData.difficulty || null,
      economicsType: formData.economicsType,
      chapter: formData.chapter,
    };

    try {
      if (editingId) {
        // Update
        const response = await fetch(`/api/flashcards?id=${editingId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          toast.success("Flashcard updated successfully");
          fetchFlashcards();
          resetForm();
        } else {
          const error = await response.json();
          toast.error(error.error || "Failed to update flashcard");
        }
      } else {
        // Create
        const response = await fetch("/api/flashcards", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          toast.success("Flashcard created successfully");
          fetchFlashcards();
          resetForm();
        } else {
          const error = await response.json();
          toast.error(error.error || "Failed to create flashcard");
        }
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this flashcard?")) return;

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

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Add Button */}
      {!showForm && (
        <Button onClick={() => setShowForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add New Flashcard
        </Button>
      )}

      {/* Form */}
      {showForm && (
        <Card className="border-2 border-primary">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>
                {editingId ? "Edit Flashcard" : "Add New Flashcard"}
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={resetForm}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="question">Question *</Label>
                <Textarea
                  id="question"
                  value={formData.question}
                  onChange={(e) =>
                    setFormData({ ...formData, question: e.target.value })
                  }
                  placeholder="e.g., What is the law of demand?"
                  rows={3}
                  required
                />
              </div>

              <div>
                <Label htmlFor="answer">Answer *</Label>
                <Textarea
                  id="answer"
                  value={formData.answer}
                  onChange={(e) =>
                    setFormData({ ...formData, answer: e.target.value })
                  }
                  placeholder="Provide a comprehensive answer"
                  rows={5}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="level">Level *</Label>
                  <Select
                    value={formData.level}
                    onValueChange={(value) =>
                      setFormData({ ...formData, level: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Secondary">Secondary</SelectItem>
                      <SelectItem value="JC">JC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="economicsType">Economics Type *</Label>
                  <Select
                    value={formData.economicsType}
                    onValueChange={(value) =>
                      setFormData({ ...formData, economicsType: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Microeconomics">Microeconomics</SelectItem>
                      <SelectItem value="Macroeconomics">Macroeconomics</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="chapter">H2 Chapter *</Label>
                  <Input
                    id="chapter"
                    value={formData.chapter}
                    onChange={(e) =>
                      setFormData({ ...formData, chapter: e.target.value })
                    }
                    placeholder="e.g., Market Failure, Elasticity"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="difficulty">Difficulty</Label>
                  <Select
                    value={formData.difficulty}
                    onValueChange={(value) =>
                      setFormData({ ...formData, difficulty: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">None</SelectItem>
                      <SelectItem value="Easy">Easy</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    placeholder="e.g., Microeconomics"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="topic">Topic *</Label>
                  <Input
                    id="topic"
                    value={formData.topic}
                    onChange={(e) =>
                      setFormData({ ...formData, topic: e.target.value })
                    }
                    placeholder="e.g., Demand and Supply"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>{editingId ? "Update" : "Create"} Flashcard</>
                  )}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Filter Controls */}
      {!showForm && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Filter Flashcards</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
      )}

      {/* Flashcards List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">
          {filterLevel === "All" && filterChapter === "All" 
            ? `All Flashcards (${flashcards.length})`
            : `Filtered Flashcards (${filteredFlashcards.length} of ${flashcards.length})`
          }
        </h3>
        {filteredFlashcards.map((flashcard) => (
          <Card key={flashcard.id}>
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex gap-2 flex-wrap">
                    <Badge variant="secondary">{flashcard.economicsType}</Badge>
                    <Badge variant="outline">{flashcard.chapter}</Badge>
                    <Badge>{flashcard.level}</Badge>
                    <Badge variant="outline">{flashcard.category}</Badge>
                    <Badge>{flashcard.topic}</Badge>
                    {flashcard.difficulty && (
                      <Badge
                        variant={
                          flashcard.difficulty === "Easy"
                            ? "secondary"
                            : flashcard.difficulty === "Medium"
                            ? "default"
                            : "destructive"
                        }
                      >
                        {flashcard.difficulty}
                      </Badge>
                    )}
                  </div>
                  <div className="space-y-2">
                    <p className="font-semibold text-sm flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-primary" />
                      Question
                    </p>
                    <p className="text-sm">{flashcard.question}</p>
                    <p className="font-semibold text-sm flex items-center gap-2 mt-3">
                      <Sparkles className="w-4 h-4 text-primary" />
                      Answer
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {flashcard.answer}
                    </p>
                  </div>
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
        ))}
      </div>
    </div>
  );
}