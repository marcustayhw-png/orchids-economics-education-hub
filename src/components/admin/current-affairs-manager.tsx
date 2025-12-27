"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { RichTextEditor } from "@/components/admin/rich-text-editor";

interface EconNews {
  id: number;
  title: string;
  content: string;
  context: string;
  explanation: string;
  theoryConnection: string;
  newsCategory: string;
  topics: string[];
  theories: string[];
  publishedDate: string;
  createdAt: string;
  updatedAt: string;
}

export function CurrentAffairsManager() {
  const [articles, setArticles] = useState<EconNews[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [filterCategory, setFilterCategory] = useState<string>("All");

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    context: "",
    explanation: "",
    theoryConnection: "",
    newsCategory: "International",
    topics: "",
    theories: "",
    publishedDate: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    fetchArticles();
  }, []);

    const fetchArticles = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("bearer_token");
        const response = await fetch("/api/econ-news?limit=100", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setArticles(data);
        } else {
          toast.error("Failed to load articles");
        }
      } catch (error) {
        toast.error("Error loading articles");
      } finally {
        setIsLoading(false);
      }
    };

  const filteredArticles = articles.filter((article) => {
    const matchesCategory = filterCategory === "All" || article.newsCategory === filterCategory;
    return matchesCategory;
  });

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      context: "",
      explanation: "",
      theoryConnection: "",
      newsCategory: "International",
      topics: "",
      theories: "",
      publishedDate: new Date().toISOString().split('T')[0],
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (article: EconNews) => {
    setFormData({
      title: article.title,
      content: article.content || "",
      context: article.context || "",
      explanation: article.explanation || "",
      theoryConnection: article.theoryConnection || "",
      newsCategory: article.newsCategory || "International",
      topics: article.topics.join(", "),
      theories: article.theories.join(", "),
      publishedDate: article.publishedDate.split('T')[0],
    });
    setEditingId(article.id);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const token = localStorage.getItem("bearer_token");
    
    const topicsArray = formData.topics
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t !== "");
    
    const theoriesArray = formData.theories
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t !== "");

    const payload = {
      title: formData.title,
      content: formData.content,
      context: formData.context,
      explanation: formData.explanation,
      theoryConnection: formData.theoryConnection,
      newsCategory: formData.newsCategory,
      topics: topicsArray,
      theories: theoriesArray,
      publishedDate: new Date(formData.publishedDate).toISOString(),
    };

    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId ? `/api/econ-news?id=${editingId}` : "/api/econ-news";
      
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success(`Article ${editingId ? "updated" : "created"} successfully`);
        fetchArticles();
        resetForm();
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to save article");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    const token = localStorage.getItem("bearer_token");
    
    try {
      const response = await fetch(`/api/econ-news?id=${deleteId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        toast.success("Article deleted successfully");
        fetchArticles();
      } else {
        const responseData = await response.json();
        toast.error(responseData.error || "Failed to delete article");
      }
    } catch (error) {
      toast.error("Error deleting article");
    } finally {
      setDeleteId(null);
    }
  };

  const renderEditForm = () => (
    <Card className="border-2 border-primary animate-in slide-in-from-top-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{editingId ? "Edit Article" : "Add New Article"}</CardTitle>
          <Button variant="ghost" size="sm" onClick={resetForm}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="e.g., Singapore Economy Grows 4.4% in 2024"
                  required
                />
              </div>

              <div>
                <Label htmlFor="content">Main News Content *</Label>
                <RichTextEditor
                  content={formData.content}
                  onChange={(html) => setFormData({ ...formData, content: html })}
                  placeholder="Write the core news details here..."
                  minHeight="150px"
                />
              </div>

              <div>
                <Label htmlFor="context">Background & Context *</Label>
                <RichTextEditor
                  content={formData.context}
                  onChange={(html) => setFormData({ ...formData, context: html })}
                  placeholder="Elaborate on the background and context of the news..."
                  minHeight="150px"
                />
              </div>

              <div>
                <Label htmlFor="explanation">Economic Explanation *</Label>
                <RichTextEditor
                  content={formData.explanation}
                  onChange={(html) => setFormData({ ...formData, explanation: html })}
                  placeholder="Provide a detailed economic explanation of the events..."
                  minHeight="150px"
                />
              </div>

              <div>
                <Label htmlFor="theoryConnection">Theory & Syllabus Connection *</Label>
                <RichTextEditor
                  content={formData.theoryConnection}
                  onChange={(html) => setFormData({ ...formData, theoryConnection: html })}
                  placeholder="Link this news to specific economic theories and concepts in the JC/Secondary syllabus..."
                  minHeight="150px"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="newsCategory">Category *</Label>
                <Select
                  value={formData.newsCategory}
                  onValueChange={(value) =>
                    setFormData({ ...formData, newsCategory: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="International">International News</SelectItem>
                    <SelectItem value="Singapore">Singapore News</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="publishedDate">Published Date *</Label>
                <Input
                  id="publishedDate"
                  type="date"
                  value={formData.publishedDate}
                  onChange={(e) =>
                    setFormData({ ...formData, publishedDate: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="topics">Topics * (comma-separated)</Label>
              <Input
                id="topics"
                value={formData.topics}
                onChange={(e) =>
                  setFormData({ ...formData, topics: e.target.value })
                }
                placeholder="e.g., Economic Growth, GDP, Trade, Manufacturing"
                required
              />
            </div>

            <div>
              <Label htmlFor="theories">Economic Theories/Concepts * (comma-separated)</Label>
              <Input
                id="theories"
                value={formData.theories}
                onChange={(e) =>
                  setFormData({ ...formData, theories: e.target.value })
                }
                placeholder="e.g., AD-AS Model, Supply Shocks, Price Floor, Multiplier Effect"
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
                <>{editingId ? "Update" : "Create"} Article</>
              )}
            </Button>
            <Button type="button" variant="outline" onClick={resetForm}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button onClick={() => { setEditingId(null); setShowForm(true); }}>
          <Plus className="w-4 h-4 mr-2" />
          Add New Article
        </Button>
        
        <div className="w-64">
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Categories</SelectItem>
              <SelectItem value="International">International News</SelectItem>
              <SelectItem value="Singapore">Singapore News</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {showForm && !editingId && renderEditForm()}

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">
          {filterCategory === "All"
            ? `All Articles (${articles.length})`
            : `Filtered Articles (${filteredArticles.length} of ${articles.length})`
          }
        </h3>
        {filteredArticles.map((article) => (
          <div key={article.id} className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex gap-2 flex-wrap">
                      <Badge variant={article.newsCategory === "Singapore" ? "default" : "secondary"}>
                        {article.newsCategory === "Singapore" ? "Singapore" : "International"}
                      </Badge>
                      <Badge variant="outline">
                        {new Date(article.publishedDate).toLocaleDateString()}
                      </Badge>
                    </div>
                    <p className="font-semibold text-lg">{article.title}</p>
                    <div 
                      className="text-sm text-muted-foreground prose prose-sm max-w-none line-clamp-2"
                      dangerouslySetInnerHTML={{ __html: article.content }}
                    />
                    <div className="flex gap-2 flex-wrap">
                      {article.topics.slice(0, 3).map((topic, idx) => (
                        <Badge key={idx} variant="outline">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {article.theories.slice(0, 3).map((theory, idx) => (
                        <Badge key={idx}>
                          {theory}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(article)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => setDeleteId(article.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
            
            {editingId === article.id && renderEditForm()}
          </div>
        ))}
      </div>

      <AlertDialog open={deleteId !== null} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this article. This action cannot be undone.
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
