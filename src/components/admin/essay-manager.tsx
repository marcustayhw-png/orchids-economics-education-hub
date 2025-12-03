"use client";

import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Loader2, Plus, Edit, Trash2, X } from "lucide-react";
import { ImageUploadButton } from "@/components/admin/image-upload-button";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

// O-Level syllabus topics aligned with Syllabus 2286
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

  // Filter states
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

  useEffect(() => {
    fetchEssays();
  }, []);

  const fetchEssays = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("bearer_token");
      const response = await fetch("/api/essays?limit=100", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setEssays(data);
      } else {
        toast.error("Failed to load essays");
      }
    } catch (error) {
      toast.error("Error loading essays");
    } finally {
      setIsLoading(false);
    }
  };

  // Get unique topics for filter dropdown
  const uniqueTopics = Array.from(
    new Set(essays.map((e) => e.topic).filter(Boolean))
  ).sort();

  // Filter essays based on selected filters
  const filteredEssays = essays.filter((essay) => {
    const matchesLevel = filterLevel === "All" || essay.level === filterLevel;
    const matchesTopic = filterTopic === "All" || essay.topic === filterTopic;
    return matchesLevel && matchesTopic;
  });

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
        // Update
        const response = await fetch(`/api/essays?essay_id=${editingId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          toast.success("Essay updated successfully");
          fetchEssays();
          resetForm();
        } else {
          const error = await response.json();
          toast.error(error.error || "Failed to update essay");
        }
      } else {
        // Create
        const response = await fetch("/api/essays", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          toast.success("Essay created successfully");
          fetchEssays();
          resetForm();
        } else {
          const error = await response.json();
          toast.error(error.error || "Failed to create essay");
        }
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (essayId: string) => {
    if (!confirm("Are you sure you want to delete this essay?")) return;

    const token = localStorage.getItem("bearer_token");
    try {
      const response = await fetch(`/api/essays?essay_id=${essayId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        toast.success("Essay deleted successfully");
        fetchEssays();
      } else {
        toast.error("Failed to delete essay");
      }
    } catch (error) {
      toast.error("Error deleting essay");
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
          Add New Essay
        </Button>
      )}

      {/* Form */}
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
                  <Label htmlFor="topic">Topic * (Align with Syllabus 2286)</Label>
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
                  <p className="text-xs text-muted-foreground mt-1">
                    Based on Cambridge O-Level Economics Syllabus 2286 (2026)
                  </p>
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
                <Label htmlFor="question">Question * (Use syllabus command words)</Label>
                <Textarea
                  id="question"
                  value={formData.question}
                  onChange={(e) =>
                    setFormData({ ...formData, question: e.target.value })
                  }
                  placeholder="e.g., Discuss whether fiscal policy is effective in achieving macroeconomic aims. (15 marks)&#10;&#10;Command words: Explain, Analyse, Discuss, Evaluate"
                  rows={3}
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">
                  📘 Use command words: Explain, Analyse, Discuss (requires AO3: Evaluation)
                </p>
              </div>

              <div>
                <Label htmlFor="preamble">Preamble</Label>
                <RichTextEditor
                  content={formData.preamble}
                  onChange={(html) => setFormData({ ...formData, preamble: html })}
                  placeholder="Add context or background information for the essay..."
                  minHeight="150px"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Use the toolbar to format text with bold, italics, colors, and more
                </p>
              </div>

              <div>
                <Label htmlFor="structureNotes">Structure Notes (Suggested outline)</Label>
                <Textarea
                  id="structureNotes"
                  value={formData.structureNotes}
                  onChange={(e) =>
                    setFormData({ ...formData, structureNotes: e.target.value })
                  }
                  placeholder="Suggested structure:&#10;• Introduction: Define key terms&#10;• Body Para 1: Explain concept + example&#10;• Body Para 2: Analyse with diagram&#10;• Body Para 3: Evaluate limitations&#10;• Conclusion: Balanced judgement"
                  rows={5}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  ✅ Guide students on essay structure using bullet points
                </p>
              </div>

              <div>
                <Label htmlFor="examinerComments">
                  Examiner Comments * (Succinct points - one per line)
                </Label>
                <Textarea
                  id="examinerComments"
                  value={formData.examinerComments}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      examinerComments: e.target.value,
                    })
                  }
                  placeholder="Keep feedback brief and actionable:&#10;• Clear definition of key terms&#10;• Good use of real-world examples&#10;• Strong evaluation with judgement&#10;• Effective use of diagrams&#10;• Well-structured argument"
                  rows={6}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  ✅ One point per line. Focus on assessment objectives (AO1, AO2, AO3)
                </p>
              </div>

              <div>
                <Label htmlFor="modelAnswer">Model Answer * (Succinct with clear structure)</Label>
                <RichTextEditor
                  content={formData.modelAnswer}
                  onChange={(html) => setFormData({ ...formData, modelAnswer: html })}
                  placeholder="Write model answer with clear structure:&#10;&#10;Introduction:&#10;• Define key terms briefly&#10;&#10;Body Paragraphs:&#10;• Topic sentence&#10;• Explanation with example&#10;• Diagram if relevant&#10;• Evaluation/Judgement&#10;&#10;Conclusion:&#10;• Balanced judgement&#10;&#10;Use bullet points and headings for clarity!"
                  minHeight="350px"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  ✅ Use headings (H2/H3) and bullet points. Keep explanations succinct. Show clear structure.
                </p>
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

      {/* Filter Controls */}
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

      {/* Essays List */}
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
                    onClick={() => handleDelete(essay.essayId)}
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