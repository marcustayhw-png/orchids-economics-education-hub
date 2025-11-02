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
  preamble: string | null;
  examinerComments: string[] | null;
  structureNotes: string | null;
  modelAnswer: string | null;
  createdAt: string;
  updatedAt: string;
}

export function EssayManager() {
  const [essays, setEssays] = useState<Essay[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    essayId: "",
    question: "",
    level: "JC",
    marks: "",
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

  const resetForm = () => {
    setFormData({
      essayId: "",
      question: "",
      level: "JC",
      marks: "",
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
                  placeholder="Enter the essay question"
                  rows={3}
                  required
                />
              </div>

              <div>
                <Label htmlFor="preamble">Preamble</Label>
                <Textarea
                  id="preamble"
                  value={formData.preamble}
                  onChange={(e) =>
                    setFormData({ ...formData, preamble: e.target.value })
                  }
                  placeholder="Context for the essay"
                  rows={4}
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
                  placeholder="Introduction → Main points → Conclusion"
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="examinerComments">
                  Examiner Comments (one per line)
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
                  placeholder="Strong introduction&#10;Good use of examples&#10;Clear evaluation"
                  rows={5}
                />
              </div>

              <div>
                <Label htmlFor="modelAnswer">Model Answer</Label>
                <Textarea
                  id="modelAnswer"
                  value={formData.modelAnswer}
                  onChange={(e) =>
                    setFormData({ ...formData, modelAnswer: e.target.value })
                  }
                  placeholder="Full model answer for this essay"
                  rows={8}
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

      {/* Essays List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">
          All Essays ({essays.length})
        </h3>
        {essays.map((essay) => (
          <Card key={essay.id}>
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex gap-2">
                    <Badge variant="secondary">{essay.essayId}</Badge>
                    <Badge variant="outline">{essay.level}</Badge>
                    <Badge>{essay.marks} marks</Badge>
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