"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Loader2, Plus, Edit, Trash2, X } from "lucide-react";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
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

interface Essay {
  id: number;
  essayId: string;
  question: string;
  level: string;
  marks: string;
  topic: string;
  difficulty: string;
  preamble: string | null;
  examinerComments: string[] | null;
  structureNotes: string | null;
  modelAnswer: string | null;
  createdAt: string;
  updatedAt: string;
}

const SYLLABUS_TOPICS = [
  "1. The Basic Economic Problem",
  "2. Allocation of Resources",
  "3. Microeconomic Decision Makers",
  "4. Government and Macroeconomy",
  "5. Economic Development",
  "6. International Trade and Globalisation",
  "Demand and Supply",
  "Price Elasticity (PED/PES)",
  "Market Failure",
  "Market Structure",
  "Factors of Production",
  "Firms and Production",
  "Fiscal Policy",
  "Monetary Policy",
  "Supply-Side Policy",
  "Economic Growth",
  "Unemployment",
  "Inflation and Deflation",
  "Living Standards",
  "Poverty",
  "Population",
  "International Trade",
  "Exchange Rates",
  "Balance of Payments",
];

export function EssayManager() {
  const [essays, setEssays] = useState<Essay[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [filterLevel, setFilterLevel] = useState<string>("All");
  const [filterTopic, setFilterTopic] = useState<string>("All");

  const [formData, setFormData] = useState({
    essayId: "",
    question: "",
    level: "JC",
    marks: "",
    topic: "",
    difficulty: "Medium",
    preamble: "",
    examinerComments: "",
    structureNotes: "",
    modelAnswer: "",
  });

  const fetchEssays = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/essays?limit=1000");
      if (res.ok) {
        const data = await res.json();
        setEssays(data);
      }
    } catch (error) {
      toast.error("Error fetching essays");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEssays();
  }, []);

  const resetForm = () => {
    setFormData({
      essayId: "",
      question: "",
      level: "JC",
      marks: "",
      topic: "",
      difficulty: "Medium",
      preamble: "",
      examinerComments: "",
      structureNotes: "",
      modelAnswer: "",
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (essay: Essay) => {
    setFormData({
      essayId: essay.essayId,
      question: essay.question,
      level: essay.level,
      marks: essay.marks,
      topic: essay.topic || "",
      difficulty: essay.difficulty || "Medium",
      preamble: essay.preamble || "",
      examinerComments: essay.examinerComments?.join("\n") || "",
      structureNotes: essay.structureNotes || "",
      modelAnswer: essay.modelAnswer || "",
    });
    setEditingId(essay.essayId);
    setShowForm(true);
  };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);

      const token = localStorage.getItem("bearer_token");

      const examinerCommentsArray = formData.examinerComments
        .split("\n")
        .filter((line) => line.trim() !== "");

      const payload = {
        essayId: formData.essayId,
        question: formData.question,
        level: formData.level,
        marks: formData.marks,
        topic: formData.topic,
        difficulty: formData.difficulty,
        preamble: formData.preamble || null,
        examinerComments: examinerCommentsArray.length > 0 ? examinerCommentsArray : null,
        structureNotes: formData.structureNotes || null,
        modelAnswer: formData.modelAnswer || null,
      };

      try {
        if (editingId) {
          const response = await fetch(`/api/essays?essay_id=${editingId}`, {
            method: "PUT",
            headers: { 
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(payload),
          });

          if (response.ok) {
            toast.success("Essay updated successfully");
            fetchEssays();
            resetForm();
          } else {
            toast.error("Failed to update essay");
          }
        } else {
          const response = await fetch("/api/essays", {
            method: "POST",
            headers: { 
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(payload),
          });


        if (response.ok) {
          toast.success("Essay created successfully");
          fetchEssays();
          resetForm();
        } else {
          toast.error("Failed to create essay");
        }
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      const response = await fetch(`/api/essays?essay_id=${deleteId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Essay deleted successfully");
        fetchEssays();
      } else {
        toast.error("Failed to delete essay");
      }
    } catch (error) {
      toast.error("Error deleting essay");
    } finally {
      setDeleteId(null);
    }
  };

  const uniqueTopics = Array.from(
    new Set(essays.map((e) => e.topic).filter(Boolean))
  ).sort();

  const filteredEssays = essays.filter((essay) => {
    const matchesLevel = filterLevel === "All" || essay.level === filterLevel;
    const matchesTopic = filterTopic === "All" || essay.topic === filterTopic;
    return matchesLevel && matchesTopic;
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
        <Button onClick={() => setShowForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add New Essay
        </Button>
      )}

      {showForm && (
        <Card className="border-2 border-primary">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{editingId ? "Edit Essay" : "Add New Essay"}</CardTitle>
              <Button variant="ghost" size="sm" onClick={resetForm}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="essayId">Essay ID *</Label>
                  <Input
                    id="essayId"
                    value={formData.essayId}
                    onChange={(e) =>
                      setFormData({ ...formData, essayId: e.target.value })
                    }
                    placeholder="e.g., e1, e2"
                    required
                    disabled={!!editingId}
                  />
                </div>

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
                      <SelectItem value="JC">JC</SelectItem>
                      <SelectItem value="Secondary">Secondary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="topic">Topic *</Label>
                  <Select
                    value={formData.topic}
                    onValueChange={(value) =>
                      setFormData({ ...formData, topic: value })
                    }
                  >
                    <SelectTrigger id="topic">
                      <SelectValue placeholder="Select syllabus topic" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px]">
                      {SYLLABUS_TOPICS.map((topic) => (
                        <SelectItem key={topic} value={topic}>
                          {topic}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="difficulty">Difficulty *</Label>
                  <Select
                    value={formData.difficulty}
                    onValueChange={(value) =>
                      setFormData({ ...formData, difficulty: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Easy">Easy</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="marks">Marks *</Label>
                <Input
                  id="marks"
                  value={formData.marks}
                  onChange={(e) =>
                    setFormData({ ...formData, marks: e.target.value })
                  }
                  placeholder="e.g., 15"
                  required
                />
              </div>

              <div>
                <Label htmlFor="question">Question *</Label>
                <Textarea
                  id="question"
                  value={formData.question}
                  onChange={(e) =>
                    setFormData({ ...formData, question: e.target.value })
                  }
                  placeholder="Enter the essay question..."
                  rows={3}
                  required
                />
              </div>

              <div>
                <Label htmlFor="preamble">Preamble</Label>
                <RichTextEditor
                  content={formData.preamble}
                  onChange={(html) => setFormData({ ...formData, preamble: html })}
                  placeholder="Add context or background information..."
                  minHeight="150px"
                />
              </div>

              <div>
                <Label htmlFor="structureNotes">Structure Notes</Label>
                <Textarea
                  id="structureNotes"
                  value={formData.structureNotes}
                  onChange={(e) =>
                    setFormData({ ...formData, structureNotes: e.target.value })
                  }
                  placeholder="Suggested essay outline..."
                  rows={5}
                />
              </div>

              <div>
                <Label htmlFor="examinerComments">Examiner Comments (One per line)</Label>
                <Textarea
                  id="examinerComments"
                  value={formData.examinerComments}
                  onChange={(e) =>
                    setFormData({ ...formData, examinerComments: e.target.value })
                  }
                  placeholder="Brief actionable feedback..."
                  rows={6}
                />
              </div>

              <div>
                <Label htmlFor="modelAnswer">Model Answer *</Label>
                <RichTextEditor
                  content={formData.modelAnswer}
                  onChange={(html) => setFormData({ ...formData, modelAnswer: html })}
                  placeholder="Write model answer here..."
                  minHeight="350px"
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>{editingId ? "Update" : "Create"} Essay</>
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

      {!showForm && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Filter Essays</CardTitle>
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
                    <SelectItem value="JC">JC</SelectItem>
                    <SelectItem value="Secondary">Secondary</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="filterTopic">Topic</Label>
                <Select value={filterTopic} onValueChange={setFilterTopic}>
                  <SelectTrigger id="filterTopic">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Topics</SelectItem>
                    {uniqueTopics.map((topic) => (
                      <SelectItem key={topic} value={topic}>
                        {topic}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">
          {filterLevel === "All" && filterTopic === "All"
            ? `All Essays (${essays.length})`
            : `Filtered Essays (${filteredEssays.length} of ${essays.length})`
          }
        </h3>
        {filteredEssays.map((essay) => (
          <Card key={essay.id}>
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex gap-2 flex-wrap">
                    <Badge variant="secondary">{essay.essayId}</Badge>
                    <Badge variant="outline">{essay.level}</Badge>
                    <Badge>{essay.marks} marks</Badge>
                    <Badge variant="outline">{essay.topic}</Badge>
                    <Badge 
                      variant={
                        essay.difficulty === "Easy" ? "secondary" : 
                        essay.difficulty === "Hard" ? "destructive" : 
                        "default"
                      }
                    >
                      {essay.difficulty}
                    </Badge>
                  </div>
                  <p className="font-medium">{essay.question}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(essay)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => setDeleteId(essay.essayId)}
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
            <AlertDialogTitle>Delete Essay</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this essay? This action cannot be undone.
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
