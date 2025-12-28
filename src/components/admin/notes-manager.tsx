"use client";

import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Loader2, Plus, Edit, Trash2, X, Upload, FileText, ExternalLink } from "lucide-react";
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

interface Note {
  id: number;
  title: string;
  category: string;
  level: string;
  topics: string[];
  description: string;
  pdfUrl: string | null;
  economicsType: string | null;
  chapter: string | null;
  createdAt: string;
  updatedAt: string;
}

const jcChapters = {
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

const secondaryChapters = {
  Micro: [
    "The basic economic problem",
    "The allocation of resources",
    "Microeconomic decision makers"
  ],
  Macro: [
    "Government and the macroeconomy",
    "Economic development",
    "International trade and globalisation"
  ]
};

export function NotesManager() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Browser states
  const [viewStep, setViewStep] = useState<"level" | "type" | "chapter" | "list">("level");
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<"Micro" | "Macro" | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);

  const filteredNotesList = notes.filter(note => {
    if (selectedLevel && note.level !== selectedLevel) return false;
    if (selectedType && note.economicsType !== selectedType) return false;
    if (selectedChapter && note.chapter !== selectedChapter) return false;
    return true;
  });

  const fetchNotes = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("bearer_token");
      const response = await fetch("/api/notes?limit=1000", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setNotes(Array.isArray(data) ? data : []);
      } else {
        toast.error("Failed to load notes");
      }
    } catch (error) {
      toast.error("Error loading notes");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const resetForm = () => {
    setFormData({
      title: "",
      category: "Theory",
      level: selectedLevel || "JC",
      economicsType: selectedType || "Micro",
      chapter: selectedChapter || "",
      topics: "",
      description: "",
      pdfUrl: "",
    });
    setEditingId(null);
    setShowForm(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleAddNew = () => {
    setFormData({
      title: "",
      category: "Theory",
      level: selectedLevel || "JC",
      economicsType: selectedType || "Micro",
      chapter: selectedChapter || "",
      topics: "",
      description: "",
      pdfUrl: "",
    });
    setEditingId(null);
    setShowForm(true);
  };

  const handleEdit = (note: Note) => {
    setFormData({
      title: note.title,
      category: note.category,
      level: note.level,
      economicsType: (note.economicsType as any) || (note.level === "JC" ? "Micro" : ""),
      chapter: note.chapter || "",
      topics: note.topics.join(", "),
      description: note.description,
      pdfUrl: note.pdfUrl || "",
    });
    setEditingId(note.id);
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
        setFormData((prev) => ({ ...prev, pdfUrl: data.fileUrl }));
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
    const topicsArray = formData.topics
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t !== "");

    const payload = {
      title: formData.title,
      category: formData.category,
      level: formData.level,
      economicsType: formData.economicsType || null,
      chapter: formData.chapter || null,
      topics: topicsArray,
      description: formData.description,
      pdfUrl: formData.pdfUrl || null,
    };

    try {
      if (editingId) {
        // Update
        const response = await fetch(`/api/notes?id=${editingId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          toast.success("Note updated successfully");
          fetchNotes();
          resetForm();
        } else {
          const error = await response.json();
          toast.error(error.error || "Failed to update note");
        }
      } else {
        // Create
        const response = await fetch("/api/notes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          toast.success("Note created successfully");
          fetchNotes();
          resetForm();
        } else {
          const error = await response.json();
          toast.error(error.error || "Failed to create note");
        }
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this note?")) return;

    const token = localStorage.getItem("bearer_token");
    try {
      const response = await fetch(`/api/notes?id=${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        toast.success("Note deleted successfully");
        fetchNotes();
      } else {
        toast.error("Failed to delete note");
      }
    } catch (error) {
      toast.error("Error deleting note");
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
      {/* Browser View */}
      {!showForm && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Filter Level</Label>
              <Select
                value={selectedLevel || "all"}
                onValueChange={(v) => setSelectedLevel(v === "all" ? null : v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Levels" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="JC">JC</SelectItem>
                  <SelectItem value="Secondary">Secondary School</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Filter Focus</Label>
              <Select
                value={selectedType || "all"}
                onValueChange={(v) => setSelectedType(v === "all" ? null : v as "Micro" | "Macro")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Focus Areas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Focus Areas</SelectItem>
                  <SelectItem value="Micro">Microeconomics</SelectItem>
                  <SelectItem value="Macro">Macroeconomics</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Filter Chapter</Label>
              <Select
                value={selectedChapter || "all"}
                onValueChange={(v) => setSelectedChapter(v === "all" ? null : v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Chapters" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Chapters</SelectItem>
                  {selectedLevel && selectedType && (selectedLevel === "JC" ? jcChapters : secondaryChapters)[selectedType as keyof typeof jcChapters] ? (
                    ((selectedLevel === "JC" ? jcChapters : secondaryChapters)[selectedType as keyof typeof jcChapters] as string[]).map(ch => (
                      <SelectItem key={ch} value={ch}>{ch}</SelectItem>
                    ))
                  ) : (
                    Array.from(new Set(notes.map(n => n.chapter).filter(Boolean))).map(ch => (
                      <SelectItem key={ch!} value={ch!}>{ch!}</SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">
              {selectedLevel || selectedType || selectedChapter ? "Filtered Notes" : "All Notes"} ({filteredNotesList.length})
            </h3>
            <Button onClick={handleAddNew}>
              <Plus className="w-4 h-4 mr-2" />
              Add Note to this Category
            </Button>
          </div>
          
          <div className="space-y-4">
            {filteredNotesList.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed rounded-lg text-muted-foreground">
                No notes found matching these filters.
              </div>
            ) : (
              filteredNotesList.map((note) => (
                <Card key={note.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-2 flex-1">
                        <div className="flex gap-2 flex-wrap">
                          <Badge variant="secondary">{note.category}</Badge>
                          <Badge variant="outline">{note.level}</Badge>
                          {note.economicsType && (
                            <Badge variant="outline" className="border-primary/50 text-primary">
                              {note.economicsType}
                            </Badge>
                          )}
                          {note.chapter && (
                            <Badge variant="outline" className="border-primary/30 text-primary/80">
                              {note.chapter}
                            </Badge>
                          )}
                          <Badge>{note.topics.length} topics</Badge>
                          {note.pdfUrl && (
                            <Badge variant="default">
                              <FileText className="w-3 h-3 mr-1" />
                              PDF
                            </Badge>
                          )}
                        </div>
                        <p className="font-medium">{note.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {note.description}
                        </p>
                        {note.pdfUrl && (
                          <a
                            href={note.pdfUrl}
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
                          onClick={() => handleEdit(note)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(note.id)}
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

      {/* Form */}
      {showForm && (
        <Card className="border-2 border-primary">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{editingId ? "Edit Note" : "Add New Note"}</CardTitle>
              <Button variant="ghost" size="sm" onClick={resetForm}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="e.g., Understanding Market Failure"
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
                      <SelectItem value="JC">JC</SelectItem>
                      <SelectItem value="Secondary">Secondary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    placeholder="e.g., Theory, Fundamentals"
                    required
                  />
                </div>
              </div>

              {(formData.level === "JC" || formData.level === "Secondary") && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg border border-border">
                  <div>
                    <Label htmlFor="economicsType">Economics Type *</Label>
                    <Select
                      value={formData.economicsType}
                      onValueChange={(value: "Micro" | "Macro") =>
                        setFormData({ ...formData, economicsType: value, chapter: "" })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
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
                      onValueChange={(value) =>
                        setFormData({ ...formData, chapter: value })
                      }
                      disabled={!formData.economicsType}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select chapter" />
                      </SelectTrigger>
                          <SelectContent>
                            {formData.economicsType && 
                              (formData.level === "JC" ? jcChapters : secondaryChapters)[formData.economicsType as keyof typeof jcChapters] && 
                              Array.isArray((formData.level === "JC" ? jcChapters : secondaryChapters)[formData.economicsType as keyof typeof jcChapters]) ?
                              ((formData.level === "JC" ? jcChapters : secondaryChapters)[formData.economicsType as keyof typeof jcChapters] as string[]).map((chapter) => (
                                <SelectItem key={chapter} value={chapter}>
                                  {chapter}
                                </SelectItem>
                              )) : null}
                          </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              <div>
                <Label htmlFor="topics">Topics (comma-separated) *</Label>
                <Input
                  id="topics"
                  value={formData.topics}
                  onChange={(e) =>
                    setFormData({ ...formData, topics: e.target.value })
                  }
                  placeholder="e.g., Market Failure, Externalities, Public Goods"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Describe the content of this note"
                  rows={4}
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
                    <>{editingId ? "Update" : "Create"} Note</>
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

      {/* Notes List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">All Notes ({notes.length})</h3>
        {Array.isArray(notes) && notes.map((note) => (
          <Card key={note.id}>
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex gap-2 flex-wrap">
                    <Badge variant="secondary">{note.category}</Badge>
                    <Badge variant="outline">{note.level}</Badge>
                    {note.economicsType && (
                      <Badge variant="outline" className="border-primary/50 text-primary">
                        {note.economicsType}
                      </Badge>
                    )}
                    {note.chapter && (
                      <Badge variant="outline" className="border-primary/30 text-primary/80">
                        {note.chapter}
                      </Badge>
                    )}
                    <Badge>{note.topics.length} topics</Badge>
                    {note.pdfUrl && (
                      <Badge variant="default">
                        <FileText className="w-3 h-3 mr-1" />
                        PDF
                      </Badge>
                    )}
                  </div>
                  <p className="font-medium">{note.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {note.description}
                  </p>
                  {note.pdfUrl && (
                    <a
                      href={note.pdfUrl}
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
                    onClick={() => handleEdit(note)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(note.id)}
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
