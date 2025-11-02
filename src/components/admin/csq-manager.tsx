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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

export function CSQManager() {
  const [csqs, setCSQs] = useState<CSQ[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

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
                    <Label htmlFor="topic">Topic *</Label>
                    <Input
                      id="topic"
                      value={formData.topic}
                      onChange={(e) =>
                        setFormData({ ...formData, topic: e.target.value })
                      }
                      placeholder="e.g., Market Failure, Trade"
                      required
                    />
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
                        <Label>Question *</Label>
                        <Textarea
                          value={part.question}
                          onChange={(e) =>
                            updatePart(index, "question", e.target.value)
                          }
                          placeholder="Enter the question for this part"
                          rows={2}
                          required
                        />
                      </div>

                      <div>
                        <Label>Extract</Label>
                        <Textarea
                          value={part.extract}
                          onChange={(e) =>
                            updatePart(index, "extract", e.target.value)
                          }
                          placeholder="Extract text for this part"
                          rows={4}
                        />
                      </div>

                      <div>
                        <Label>Marking Scheme (one point per line)</Label>
                        <Textarea
                          value={part.markingScheme}
                          onChange={(e) =>
                            updatePart(index, "markingScheme", e.target.value)
                          }
                          placeholder="Point 1 (2 marks)&#10;Point 2 (1 mark)"
                          rows={3}
                        />
                      </div>

                      <div>
                        <Label>Model Answer</Label>
                        <Textarea
                          value={part.modelAnswer}
                          onChange={(e) =>
                            updatePart(index, "modelAnswer", e.target.value)
                          }
                          placeholder="Full model answer for this part"
                          rows={5}
                        />
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

      {/* CSQs List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">All CSQs ({csqs.length})</h3>
        {csqs.map((csq) => (
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