"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, Trophy, Clock, Target, Timer, Award, BookOpen, PenTool } from "lucide-react";

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
}

export default function EssayDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [essay, setEssay] = useState<Essay | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetchEssay();
  }, [params.id]);

  const fetchEssay = async () => {
    setIsLoading(true);
    setNotFound(false);
    try {
      const response = await fetch(`/api/essays?essay_id=${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setEssay(data);
      } else if (response.status === 404) {
        setNotFound(true);
      }
    } catch (error) {
      console.error("Error fetching essay:", error);
      setNotFound(true);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (notFound || !essay) {
    return (
      <div className="min-h-screen bg-background py-8 sm:py-12 px-4 sm:px-6 lg:px-8 overflow-x-hidden">
        <div className="max-w-4xl mx-auto text-center w-full">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 break-words px-2">Essay Not Found</h1>
          <p className="text-muted-foreground mb-6 sm:mb-8 break-words px-2">
            The essay you're looking for doesn't exist.
          </p>
          <Link href="/essays">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="truncate">Back to All Essays</span>
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 sm:py-12 px-4 sm:px-6 lg:px-8 overflow-x-hidden">
      <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 w-full">
        {/* Back Button */}
        <Link href="/essays">
          <Button variant="outline" className="text-foreground">
            <ArrowLeft className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="truncate">Back to All Essays</span>
          </Button>
        </Link>

        {/* Question Card */}
        <Card className="border-2 overflow-hidden bg-card relative">
          <div className="absolute top-0 right-0 p-4 flex gap-2">
             <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/50">
                <Trophy className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span className="text-[11px] font-bold text-amber-700 dark:text-amber-300 uppercase tracking-tight">
                  {essay.marks} Marks
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50">
                <Timer className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                <span className="text-[11px] font-bold text-indigo-700 dark:text-indigo-300 uppercase tracking-tight">
                  {Math.ceil(parseInt(essay.marks) * 1.5)} Mins
                </span>
              </div>
          </div>
          <CardHeader className="pt-16 sm:pt-6">
            <div className="space-y-3 sm:space-y-4">
              <div className="flex gap-2 flex-wrap">
                <Badge className="bg-primary/10 text-primary border-primary/20">{essay.level}</Badge>
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50">
                  <Target className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase">
                    {parseInt(essay.marks) <= 12 ? "Standard" : "Full Length"}
                  </span>
                </div>
              </div>
              <CardTitle className="text-xl sm:text-2xl break-words leading-tight">{essay.question}</CardTitle>
            </div>
          </CardHeader>
        </Card>

        {/* Preamble */}
        {essay.preamble && (
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle className="break-words">Preamble</CardTitle>
            </CardHeader>
              <CardContent>
                <div 
                  className="prose prose-sm dark:prose-invert max-w-none rich-text-content break-words overflow-x-auto"
                  dangerouslySetInnerHTML={{ __html: essay.preamble }}
                />
              </CardContent>
          </Card>
        )}

        {/* Structure Notes */}
        {essay.structureNotes && (
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle className="break-words">Essay Structure</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground font-medium break-words">
                {essay.structureNotes}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Examiner Comments */}
        {essay.examinerComments && essay.examinerComments.length > 0 && (
          <Card className="bg-primary/5 border-primary/20 overflow-hidden">
            <CardHeader>
              <CardTitle className="break-words">Examiner Comments</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {essay.examinerComments.map((comment, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary mt-1 flex-shrink-0">✓</span>
                    <span className="text-muted-foreground break-words flex-1 min-w-0">{comment}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Model Answer */}
        {essay.modelAnswer && (
          <Card className="border-2 border-primary overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 flex-wrap">
                <span className="break-words">Model Answer</span>
                <Badge variant="outline" className="ml-auto whitespace-nowrap">
                  {essay.marks} marks
                </Badge>
              </CardTitle>
            </CardHeader>
              <CardContent>
                <div 
                  className="prose prose-sm dark:prose-invert max-w-none rich-text-content break-words overflow-x-auto"
                  dangerouslySetInnerHTML={{ __html: essay.modelAnswer }}
                />
              </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}