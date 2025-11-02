"use client";

import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Loader2, Plus, Edit, Trash2, X, FileText, ExternalLink } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PracticeQuestion {
  id: number;
  questionId: string;
  question: string;
  topic: string;
  difficulty: string;
  level: string;
  marks: number;
  answer: string;
  pdfUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export function PracticeQuestionsManager() {
  const [questions, setQuestions] = useState<PracticeQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    questionId: "",
    question: "",
    topic: "",
    difficulty: "Medium",
    level: "JC",
    marks: "",
    answer: "",
    pdfUrl: "",
  });

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("bearer_token");
      const response = await fetch("/api/practice-questions?limit=100", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setQuestions(data);
      } else {
        toast.error("Failed to load practice questions");
      }
    } catch (error) {
      toast.error("Error loading practice questions");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      questionId: "",
      question: "",
      topic: "",
      difficulty: "Medium",
      level: "JC",
      marks: "",
      answer: "",
      pdfUrl: "",
    });
    setEditingId(null);
    setShowForm(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleEdit = (question: PracticeQuestion) => {
    setFormData({
      questionId: question.questionId,
      question: question.question,
      topic: question.topic,
      difficulty: question.difficulty,
      level: question.level,
      marks: question.marks.toString(),
      answer: question.answer,
      pdfUrl: question.pdfUrl || "",
    });
    setEditingId(question.questionId);
    setShowForm(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("Only PDF files are allowed");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size must be less than 10MB");
      return;
    }

    setIsUploading(true);
    const formDataUpload = new FormData();
    formDataUpload.append("file", file);

    try {
      const token = localStorage.getItem("bearer_token");
      const response = await fetch("/api/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataUpload,
      });

      if (response.ok) {
        const data = await response.json();
        setFormData({ ...formData, pdfUrl: data.fileUrl });
        toast.success("PDF uploaded successfully");
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to upload PDF");
      }
    } catch (error) {
      toast.error("Error uploading PDF");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const token = localStorage.getItem("bearer_token");
    const marksNum = parseInt(formData.marks);

    if (isNaN(marksNum) || marksNum <= 0) {
      toast.error("Marks must be a positive number");
      setIsSubmitting(false);
      return;
    }

    const payload = {
      questionId: formData.questionId,
      question: formData.question,
      topic: formData.topic,
      difficulty: formData.difficulty,
      level: formData.level,
      marks: marksNum,
      answer: formData.answer,
      pdfUrl: formData.pdfUrl || null,
    };

    try {
      if (editingId) {
        // Update
        const response = await fetch(`/api/practice-questions?question_id=${editingId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          toast.success("Practice question updated successfully");
          fetchQuestions();
          resetForm();
        } else {
          const error = await response.json();
          toast.error(error.error || "Failed to update practice question");
        }
      } else {
        // Create
        const response = await fetch("/api/practice-questions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          toast.success("Practice question created successfully");
          fetchQuestions();
          resetForm();
        } else {
          const error = await response.json();
          toast.error(error.error || "Failed to create practice question");
        }
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (questionId: string) => {
    if (!confirm("Are you sure you want to delete this practice question?")) return;

    const token = localStorage.getItem("bearer_token");
    try {
      const response = await fetch(`/api/practice-questions?question_id=${questionId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        toast.success("Practice question deleted successfully");
        fetchQuestions();
      } else {
        toast.error("Failed to delete practice question");
      }
    } catch (error) {
      toast.error("Error deleting practice question");
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
          Add New Practice Question
        </Button>
      )}

      {/* Form */}
      {showForm && (
        <Card className="border-2 border-primary">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>
                {editingId ? "Edit Practice Question" : "Add New Practice Question"}
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={resetForm}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="questionId">Question ID *</Label>
                  <Input
                    id="questionId"
                    value={formData.questionId}
                    onChange={(e) =>
                      setFormData({ ...formData, questionId: e.target.value })
                    }
                    placeholder="e.g., q1, pq1"
                    required
                    disabled={!!editingId}
                  />
                </div>

                <div>
                  <Label htmlFor="marks">Marks *</Label>
                  <Input
                    id="marks"
                    type="number"
                    value={formData.marks}
                    onChange={(e) =>
                      setFormData({ ...formData, marks: e.target.value })
                    }
                    placeholder="e.g., 10"
                    required
                    min="1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

                <div>
                  <Label htmlFor="topic">Topic *</Label>
                  <Input
                    id="topic"
                    value={formData.topic}
                    onChange={(e) =>
                      setFormData({ ...formData, topic: e.target.value })
                    }
                    placeholder="e.g., Market Failure"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="question">Question *</Label>
                <Textarea
                  id="question"
                  value={formData.question}
                  onChange={(e) =>
                    setFormData({ ...formData, question: e.target.value })
                  }
                  placeholder="Enter the practice question"
                  rows={3}
                  required
                />
              </div>

              <div>
                <Label htmlFor="answer">Model Answer *</Label>
                <Textarea
                  id="answer"
                  value={formData.answer}
                  onChange={(e) =>
                    setFormData({ ...formData, answer: e.target.value })
                  }
                  placeholder="Enter the model answer"
                  rows={6}
                  required
                />
              </div>

              <div>
                <Label htmlFor="pdfUpload">PDF File (optional)</Label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      id="pdfUpload"
                      ref={fileInputRef}
                      type="file"
                      accept="application/pdf"
                      onChange={handleFileUpload}
                      disabled={isUploading}
                    />
                    {isUploading && (
                      <Button type="button" disabled size="sm">
                        <Loader2 className="w-4 h-4 animate-spin" />
                      </Button>
                    )}
                  </div>
                  {formData.pdfUrl && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <FileText className="w-4 h-4" />
                      <span className="truncate">{formData.pdfUrl}</span>
                      <a
                        href={formData.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <Button type="submit" disabled={isSubmitting || isUploading}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>{editingId ? "Update" : "Create"} Question</>
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

      {/* Questions List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">
          All Practice Questions ({questions.length})
        </h3>
        {questions.map((question) => (
          <Card key={question.id}>
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex gap-2 flex-wrap">
                    <Badge variant="secondary">{question.questionId}</Badge>
                    <Badge variant="outline">{question.level}</Badge>
                    <Badge variant="outline">{question.topic}</Badge>
                    <Badge
                      variant={
                        question.difficulty === "Easy"
                          ? "secondary"
                          : question.difficulty === "Medium"
                          ? "default"
                          : "destructive"
                      }
                    >
                      {question.difficulty}
                    </Badge>
                    <Badge>{question.marks} marks</Badge>
                    {question.pdfUrl && (
                      <Badge variant="default">
                        <FileText className="w-3 h-3 mr-1" />
                        PDF
                      </Badge>
                    )}
                  </div>
                  <p className="font-medium">{question.question}</p>
                  {question.pdfUrl && (
                    <a
                      href={question.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                    >
                      View PDF <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(question)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(question.questionId)}
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
