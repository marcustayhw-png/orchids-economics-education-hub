"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Zap, FileQuestion, Loader2 } from "lucide-react";
import Link from "next/link";

type RelatedFlashcard = {
  id: number;
  question: string;
  topic: string;
  chapter: string;
  level: string;
};

type RelatedCSQ = {
  id: number;
  csqId: string;
  title: string;
  topic: string;
  level: string;
  difficulty: string;
};

type SuggestedPathProps = {
  noteId: number;
  noteTitle: string;
};

export function SuggestedPath({ noteId, noteTitle }: SuggestedPathProps) {
  const [flashcards, setFlashcards] = useState<RelatedFlashcard[]>([]);
  const [csqs, setCSQs] = useState<RelatedCSQ[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchRelatedResources();
  }, [noteId]);

  const fetchRelatedResources = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/notes/related?note_id=${noteId}`);
      if (response.ok) {
        const data = await response.json();
        setFlashcards(data.flashcards || []);
        setCSQs(data.csqs || []);
      }
    } catch (error) {
      console.error("Error fetching related resources:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Card className="mt-8 border-2 border-dashed bg-gradient-to-br from-primary/5 to-primary/10">
        <CardContent className="py-12 flex justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  if (flashcards.length === 0 && csqs.length === 0) {
    return null;
  }

  return (
    <Card className="mt-8 border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 overflow-hidden">
      <CardHeader className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary/10">
            <ArrowRight className="w-5 h-5 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Continue Your Learning Path</CardTitle>
        </div>
        <CardDescription className="text-base">
          Complete the learning cycle: <strong>Read → Test → Apply</strong>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {flashcards.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500" />
              <h3 className="font-bold text-lg">Test Your Knowledge</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Reinforce what you learned with flashcards
            </p>
            <div className="grid gap-3">
              {flashcards.map((flashcard) => (
                <div
                  key={flashcard.id}
                  className="p-4 bg-background rounded-lg border border-border/50 hover:border-primary/50 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="secondary" className="text-xs">
                          {flashcard.topic}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {flashcard.level}
                        </Badge>
                      </div>
                      <p className="text-sm font-medium line-clamp-2">
                        {flashcard.question}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button asChild className="w-full" variant="default">
              <Link href="/flashcards">
                View All Flashcards
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        )}

        {csqs.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <FileQuestion className="w-5 h-5 text-blue-500" />
              <h3 className="font-bold text-lg">Apply Your Skills</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Practice with case study questions using these concepts
            </p>
            <div className="grid gap-3">
              {csqs.map((csq) => (
                <div
                  key={csq.id}
                  className="p-4 bg-background rounded-lg border border-border/50 hover:border-primary/50 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="secondary" className="text-xs">
                          {csq.topic}
                        </Badge>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            csq.difficulty === 'Easy' 
                              ? 'border-green-500 text-green-600' 
                              : csq.difficulty === 'Medium' 
                              ? 'border-yellow-500 text-yellow-600' 
                              : 'border-red-500 text-red-600'
                          }`}
                        >
                          {csq.difficulty}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {csq.level}
                        </Badge>
                      </div>
                      <p className="text-sm font-medium line-clamp-2">
                        {csq.title}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button asChild className="w-full" variant="default">
              <Link href="/essays/csq">
                View All CSQ Solutions
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        )}

        <div className="pt-4 border-t border-border/50">
          <p className="text-xs text-muted-foreground text-center italic">
            Pro tip: Use flashcards for quick recall, then tackle CSQs to apply concepts in real scenarios
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
