"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Loader2, Plus, Edit, Trash2, X, PlusCircle, MinusCircle } from "lucide-react";
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

interface CSQPart {
  part: string;
  question: string;
  marks: string;
  extract: string;
  markingScheme: string[];
  modelAnswer: string;
  orderIndex: number;
}

interface CSQ {
  id: number;
  csqId: string;
  title: string;
  level: string;
  topic: string;
  difficulty: string;
  totalMarks: number;
  parts: CSQPart[];
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

export function CSQManager() {
  const [csqs, setCSQs] = useState<CSQ[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Filter states
  const [filterLevel, setFilterLevel] = useState<string>("All");
  const [filterTopic, setFilterTopic] = useState<string>("All");

  const [formData, setFormData] = useState({
    csqId: "",
    title: "",
    level: "JC",
    topic: "",
    difficulty: "Medium",
    parts: [
      {
        part: "a",
        question: "",
        marks: "",
        extract: "",
        markingScheme: "",
        modelAnswer: "",
        orderIndex: 0,
      },
    ],
  });

  useEffect(() => {
    fetchCSQs();
  }, []);

  const fetchCSQs = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("bearer_token");
      const response = await fetch("/api/csqs?limit=100", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setCSQs(data);
      } else {
        toast.error("Failed to load CSQs");
      }
    } catch (error) {
      toast.error("Error loading CSQs");
    } finally {
      setIsLoading(false);
    }
  };

  // Get unique topics for filter dropdown
  const uniqueTopics = Array.from(
    new Set(csqs.map((c) => c.topic).filter(Boolean))
  ).sort();

  // Filter CSQs based on selected filters
  const filteredCSQs = csqs.filter((csq) => {
    const matchesLevel = filterLevel === "All" || csq.level === filterLevel;
    const matchesTopic = filterTopic === "All" || csq.topic === filterTopic;
    return matchesLevel && matchesTopic;
  });

  const resetForm = () => {
    setFormData({
      csqId: "",
      title: "",
      level: "JC",
      topic: "",
      difficulty: "Medium",
      parts: [
        {
          part: "a",
          question: "",
          marks: "",
          extract: "",
          markingScheme: "",
          modelAnswer: "",
          orderIndex: 0,
        },
      ],
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (csq: CSQ) => {
    setFormData({
      csqId: csq.csqId,
      title: csq.title,
      level: csq.level,
      topic: csq.topic || "",
      difficulty: csq.difficulty || "Medium",
      parts: csq.parts.map((part) => ({
        part: part.part,
        question: part.question,
        marks: part.marks,
        extract: part.extract || "",
        markingScheme: part.markingScheme?.join("\n") || "",
        modelAnswer: part.modelAnswer || "",
        orderIndex: part.orderIndex,
      })),
    });
    setEditingId(csq.csqId);
    setShowForm(true);
  };

  const addPart = () => {
    const nextLetter = String.fromCharCode(97 + formData.parts.length); // a, b, c, etc.
    setFormData({
      ...formData,
      parts: [
        ...formData.parts,
        {
          part: nextLetter,
          question: "",
          marks: "",
          extract: "",
          markingScheme: "",
          modelAnswer: "",
          orderIndex: formData.parts.length,
        },
      ],
    });
  };

  const removePart = (index: number) => {
    if (formData.parts.length === 1) {
      toast.error("CSQ must have at least one part");
      return;
    }
    const newParts = formData.parts.filter((_, i) => i !== index);
    setFormData({ ...formData, parts: newParts });
  };

  const updatePart = (index: number, field: string, value: string) => {
    const newParts = [...formData.parts];
    newParts[index] = { ...newParts[index], [field]: value };
    setFormData({ ...formData, parts: newParts });
  };

  const calculateTotalMarks = () => {
    return formData.parts.reduce((sum, part) => {
      const marks = parseInt(part.marks) || 0;
      return sum + marks;
    }, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const token = localStorage.getItem("bearer_token");

    const partsPayload = formData.parts.map((part, index) => ({
      part: part.part,
      question: part.question,
      marks: part.marks,
      extract: part.extract || null,
      markingScheme:
        part.markingScheme
          .split("\n")
          .filter((line) => line.trim() !== "")
          .length > 0
          ? part.markingScheme.split("\n").filter((line) => line.trim() !== "")
          : null,
      modelAnswer: part.modelAnswer || null,
      orderIndex: index,
    }));

    const payload = {
      csqId: formData.csqId,
      title: formData.title,
      level: formData.level,
      topic: formData.topic,
      difficulty: formData.difficulty,
      totalMarks: calculateTotalMarks(),
      parts: partsPayload,
    };

    try {
      if (editingId) {
        // Update
        const response = await fetch(`/api/csqs?csq_id=${editingId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          toast.success("CSQ updated successfully");
          fetchCSQs();
          resetForm();
        } else {
          const error = await response.json();
          toast.error(error.error || "Failed to update CSQ");
        }
      } else {
        // Create
        const response = await fetch("/api/csqs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          toast.success("CSQ created successfully");
          fetchCSQs();
          resetForm();
        } else {
          const error = await response.json();
          toast.error(error.error || "Failed to create CSQ");
        }
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (csqId: string) => {
    if (!confirm("Are you sure you want to delete this CSQ and all its parts?"))
      return;

    const token = localStorage.getItem("bearer_token");
    try {
      const response = await fetch(`/api/csqs?csq_id=${csqId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        toast.success("CSQ deleted successfully");
        fetchCSQs();
      } else {
        toast.error("Failed to delete CSQ");
      }
    } catch (error) {
      toast.error("Error deleting CSQ");
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
          Add New CSQ
        </Button>
      )}

      {/* Form */}
      {showForm && (
        <Card className="border-2 border-primary">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{editingId ? "Edit CSQ" : "Add New CSQ"}</CardTitle>
              <Button variant="ghost" size="sm" onClick={resetForm}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* CSQ Header Fields */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="csqId">CSQ ID *</Label>
                    <Input
                      id="csqId"
                      value={formData.csqId}
                      onChange={(e) =>
                        setFormData({ ...formData, csqId: e.target.value })
                      }
                      placeholder="e.g., c1, c2"
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
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="e.g., Case Study: Singapore's Economic Response"
                    required
                  />
                </div>

                <div className="p-3 bg-muted rounded-md">
                  <p className="text-sm font-medium">Total Marks: {calculateTotalMarks()}</p>
                  <p className="text-xs text-muted-foreground mt-1">Calculated from all parts</p>
                </div>
              </div>

              {/* Parts */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-lg font-semibold">
                    Parts ({formData.parts.length})
                  </Label>
                  <Button type="button" size="sm" onClick={addPart}>
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Add Part
                  </Button>
                </div>

                {formData.parts.map((part, index) => (
                  <Card key={index} className="border-2">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary">Part {part.part}</Badge>
                        {formData.parts.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removePart(index)}
                          >
                            <MinusCircle className="w-4 h-4 text-destructive" />
                          </Button>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <Label>Part Letter *</Label>
                          <Input
                            value={part.part}
                            onChange={(e) =>
                              updatePart(index, "part", e.target.value)
                            }
                            placeholder="a, b, c"
                            required
                          />
                        </div>
                        <div>
                          <Label>Marks *</Label>
                          <Input
                            value={part.marks}
                            onChange={(e) =>
                              updatePart(index, "marks", e.target.value)
                            }
                            placeholder="e.g., 4"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label>Question * (Use syllabus command words)</Label>
                        <Textarea
                          value={part.question}
                          onChange={(e) =>
                            updatePart(index, "question", e.target.value)
                          }
                          placeholder="e.g., Explain how an increase in consumer income affects demand. (4 marks)&#10;&#10;Command words: Define, Explain, Calculate, Analyse, Describe, Discuss"
                          rows={2}
                          required
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          📘 Use command words from syllabus: Define, Explain, Calculate, Analyse, Describe, Discuss
                        </p>
                      </div>

                      <div>
                        <Label>Extract (with image upload support)</Label>
                        <RichTextEditor
                          content={part.extract}
                          onChange={(html) => updatePart(index, "extract", html)}
                          placeholder="Add extract text with images, formatting, diagrams..."
                          minHeight="200px"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Use the image button in toolbar to upload diagrams and charts
                        </p>
                      </div>

                      <div>
                        <Label>Marking Scheme * (Succinct points - one per line)</Label>
                        <Textarea
                          value={part.markingScheme}
                          onChange={(e) =>
                            updatePart(index, "markingScheme", e.target.value)
                          }
                          placeholder="Keep points brief and exam-focused:&#10;• Define key term (1m)&#10;• Explain concept with example (2m)&#10;• Apply to context (1m)&#10;&#10;Use bullet points for clarity!"
                          rows={4}
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          ✅ Best practice: Use bullet points (•) and mark allocation per point
                        </p>
                      </div>

                      <div>
                        <Label>Model Answer * (Keep succinct - use point form)</Label>
                        <RichTextEditor
                          content={part.modelAnswer}
                          onChange={(html) => updatePart(index, "modelAnswer", html)}
                          placeholder="Write model answer in clear point form:&#10;&#10;• Point 1: Brief explanation&#10;• Point 2: Key concept with example&#10;• Point 3: Application to context&#10;&#10;Avoid lengthy paragraphs. Keep it exam-focused and succinct!"
                          minHeight="250px"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          ✅ Use bullet points in editor toolbar. Keep answers concise and aligned with marking scheme.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex gap-2">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>{editingId ? "Update" : "Create"} CSQ</>
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
            <CardTitle className="text-base">Filter CSQs</CardTitle>
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

      {/* CSQs List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">
          {filterLevel === "All" && filterTopic === "All"
            ? `All CSQs (${csqs.length})`
            : `Filtered CSQs (${filteredCSQs.length} of ${csqs.length})`
          }
        </h3>
        {filteredCSQs.map((csq) => (
          <Card key={csq.id}>
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex gap-2 flex-wrap">
                    <Badge variant="secondary">{csq.csqId}</Badge>
                    <Badge variant="outline">{csq.level}</Badge>
                    <Badge>{csq.parts.length} parts</Badge>
                    <Badge>{csq.totalMarks} marks</Badge>
                    <Badge variant="outline">{csq.topic}</Badge>
                    <Badge 
                      variant={
                        csq.difficulty === "Easy" ? "secondary" : 
                        csq.difficulty === "Hard" ? "destructive" : 
                        "default"
                      }
                    >
                      {csq.difficulty}
                    </Badge>
                  </div>
                  <p className="font-medium">{csq.title}</p>
                  <p className="text-sm text-muted-foreground">
                    Parts: {csq.parts.map((p) => p.part).join(", ")}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(csq)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(csq.csqId)}
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