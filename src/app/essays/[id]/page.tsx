"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Loader2 } from "lucide-react";

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
      <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Essay Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The essay you're looking for doesn't exist.
          </p>
          <Link href="/essays">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to All Essays
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Back Button */}
        <Link href="/essays">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to All Essays
          </Button>
        </Link>

        {/* Question Card */}
        <Card className="border-2">
          <CardHeader>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Badge variant="secondary">{essay.level}</Badge>
                <Badge variant="outline">{essay.marks} marks</Badge>
              </div>
              <CardTitle className="text-2xl">{essay.question}</CardTitle>
            </div>
          </CardHeader>
        </Card>

        {/* Preamble */}
        {essay.preamble && (
          <Card>
            <CardHeader>
              <CardTitle>Preamble</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {essay.preamble}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Structure Notes */}
        {essay.structureNotes && (
          <Card>
            <CardHeader>
              <CardTitle>Essay Structure</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground font-medium">
                {essay.structureNotes}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Examiner Comments */}
        {essay.examinerComments && essay.examinerComments.length > 0 && (
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle>Examiner Comments</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {essay.examinerComments.map((comment, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span className="text-muted-foreground">{comment}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Model Answer */}
        {essay.modelAnswer && (
          <Card className="border-2 border-primary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>Model Answer</span>
                <Badge variant="outline" className="ml-auto">
                  {essay.marks} marks
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none">
                <p className="whitespace-pre-wrap text-foreground leading-relaxed">
                  {essay.modelAnswer}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Download Button */}
        <Card>
          <CardContent className="pt-6">
            <Button className="w-full" disabled>
              <Download className="w-4 h-4 mr-2" />
              Download Full Model Answer (Coming Soon)
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}