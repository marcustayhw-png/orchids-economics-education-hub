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

// O-Level syllabus chapters for Secondary level
const SECONDARY_CHAPTERS = [
  "1. The Basic Economic Problem",
  "1.1 Nature of Economic Problem",
  "1.2 Factors of Production",
  "1.3 Opportunity Cost",
  "1.4 Production Possibility Curve (PPC)",
  "2. Allocation of Resources",
  "2.1 Microeconomics vs Macroeconomics",
  "2.2 Role of Markets",
  "2.3 Demand",
  "2.4 Supply",
  "2.5 Price Determination",
  "2.6 Price Changes",
  "2.7 Price Elasticity of Demand (PED)",
  "2.8 Price Elasticity of Supply (PES)",
  "2.9 Market Economic System",
  "2.10 Market Failure",
  "2.11 Mixed Economic System",
  "3. Microeconomic Decision Makers",
  "3.1 Money and Banking",
  "3.2 Households",
  "3.3 Workers",
  "3.4 Trade Unions",
  "3.5 Firms",
  "3.6 Firms and Production",
  "3.7 Firms' Costs, Revenue and Objectives",
  "3.8 Market Structure",
  "4. Government and Macroeconomy",
  "4.1 Role of Government",
  "4.2 Macroeconomic Aims",
  "4.3 Fiscal Policy",
  "4.4 Monetary Policy",
  "4.5 Supply-Side Policy",
  "4.6 Economic Growth",
  "4.7 Employment and Unemployment",
  "4.8 Inflation and Deflation",
  "5. Economic Development",
  "5.1 Living Standards",
  "5.2 Poverty",
  "5.3 Population",
  "5.4 Differences in Economic Development",
  "6. International Trade and Globalisation",
  "6.1 International Specialisation",
  "6.2 Globalisation, Free Trade and Protection",
  "6.3 Foreign Exchange Rates",
  "6.4 Current Account of Balance of Payments",
];

// H2 A-Level syllabus chapters for JC level (Syllabus 9570, 2026)
const JC_CHAPTERS = [
  "Theme 1: The Central Economic Problem",
  "1.1 Scarcity, Choice and Resource Allocation",
  "1.2 Decision-Making Process of Economic Agents",
  "Theme 2: Markets",
  "2.1 Price Mechanism and its Functions",
  "2.2 Demand and Supply Analysis",
  "2.3 Government Intervention in Markets",
  "2.4 Objectives of Firms",
  "2.5 Cost and Revenue",
  "2.6 Firms' Decisions and Strategies",
  "2.7 Governments' Microeconomic Objectives",
  "2.8 Market Failure and its Causes",
  "2.9 Microeconomic Policies",
  "Theme 3: The National and International Economy",
  "3.1 Circular Flow of Income",
  "3.2 Aggregate Demand and Aggregate Supply",
  "3.3 Standard of Living and Macroeconomic Indicators",
  "3.4 Macroeconomic Issues",
  "3.5 Macroeconomic Policies",
  "3.6 Globalisation and International Trade",
  "3.7 Economic Co-operation and Protectionism",
];

// Helper function to format answer text into point form
const formatAnswerAsPoints = (answer: string) => {
  // Split by newlines and filter empty lines
  const lines = answer.split('\n').map(line => line.trim()).filter(line => line.length > 0);
  
  return lines.map((line, index) => {
    // Remove common bullet point characters if they exist at the start
    const cleanedLine = line.replace(/^[•\-\*]\s*/, '');
    return (
      <li key={index} className="text-sm text-muted-foreground mb-3">
        {cleanedLine}
      </li>
    );
  });
};

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

  // Get chapters based on selected level
  const getChaptersForLevel = (level: string) => {
    return level === "JC" ? JC_CHAPTERS : SECONDARY_CHAPTERS;
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
                  placeholder="e.g., What is the law of demand? Define opportunity cost. Explain PED."
                  rows={3}
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">
                  📘 Use syllabus command words: Define, Explain, Calculate, Analyse, Describe
                </p>
              </div>

              <div>
                <Label htmlFor="answer">Answer * (Keep succinct - use point form)</Label>
                <Textarea
                  id="answer"
                  value={formData.answer}
                  onChange={(e) =>
                    setFormData({ ...formData, answer: e.target.value })
                  }
                  placeholder="Use bullet points for clarity:&#10;• Point 1: Brief explanation&#10;• Point 2: Key concept&#10;• Point 3: Example if needed&#10;&#10;Keep it concise and exam-focused!"
                  rows={6}
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">
                  ✅ Best practice: Use bullet points (•) for clarity. Keep each point brief and exam-relevant.
                </p>
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
                      <SelectItem value="Secondary">Secondary (O-Level)</SelectItem>
                      <SelectItem value="JC">JC (A-Level)</SelectItem>
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
                  <Label htmlFor="chapter">
                    Chapter * 
                    {formData.level === "JC" 
                      ? " (H2 A-Level Syllabus 9570)" 
                      : " (O-Level Syllabus 2286)"}
                  </Label>
                  <Select
                    value={formData.chapter}
                    onValueChange={(value) =>
                      setFormData({ ...formData, chapter: value })
                    }
                  >
                    <SelectTrigger id="chapter">
                      <SelectValue placeholder="Select syllabus chapter" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px]">
                      {getChaptersForLevel(formData.level).map((chapter) => (
                        <SelectItem key={chapter} value={chapter}>
                          {chapter}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formData.level === "JC"
                      ? "Based on Singapore-Cambridge GCE A-Level H2 Economics Syllabus 9570 (2026)"
                      : "Based on Cambridge O-Level Economics Syllabus 2286 (2026)"}
                  </p>
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
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      {formatAnswerAsPoints(flashcard.answer)}
                    </ul>
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

        <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Flashcard</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this flashcard? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    );
  }
