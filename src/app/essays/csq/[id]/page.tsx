"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Loader2 } from "lucide-react";

interface CSQPart {
  id: number;
  part: string;
  question: string;
  marks: string;
  extract: string | null;
  markingScheme: string[] | null;
  modelAnswer: string | null;
  orderIndex: number;
}

interface CSQ {
  id: number;
  csqId: string;
  title: string;
  level: string;
  parts: CSQPart[];
}

export default function CSQDetailPage() {
  const params = useParams();
  const [csq, setCSQ] = useState<CSQ | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetchCSQ();
  }, [params.id]);

  const fetchCSQ = async () => {
    setIsLoading(true);
    setNotFound(false);
    try {
      const response = await fetch(`/api/csqs?csq_id=${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setCSQ(data);
      } else if (response.status === 404) {
        setNotFound(true);
      }
    } catch (error) {
      console.error("Error fetching CSQ:", error);
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

  if (notFound || !csq) {
    return (
      <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">CSQ Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The case study question you're looking for doesn't exist.
          </p>
          <Link href="/essays">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to All CSQs
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const totalMarks = csq.parts.reduce((sum, part) => sum + parseInt(part.marks), 0);

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Back Button */}
        <Link href="/essays">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to All CSQs
          </Button>
        </Link>

        {/* Title Card */}
        <Card className="border-2">
          <CardHeader>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Badge variant="secondary">{csq.level}</Badge>
                <Badge variant="outline">{totalMarks} total marks</Badge>
                <Badge>{csq.parts.length} parts</Badge>
              </div>
              <CardTitle className="text-2xl">{csq.title}</CardTitle>
            </div>
          </CardHeader>
        </Card>

        {/* Parts */}
        {csq.parts.map((part, index) => (
          <div key={part.id} className="space-y-4">
            {/* Part Header */}
            <Card className="border-2 border-primary">
              <CardHeader>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <Badge>Part {part.part}</Badge>
                    <Badge variant="outline">{part.marks} marks</Badge>
                  </div>
                  <CardTitle className="text-lg">{part.question}</CardTitle>
                </div>
              </CardHeader>
            </Card>

            {/* Extract */}
            {part.extract && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Extract</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="whitespace-pre-wrap text-muted-foreground leading-relaxed">
                    {part.extract}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Marking Scheme */}
            {part.markingScheme && part.markingScheme.length > 0 && (
              <Card className="bg-muted/50">
                <CardHeader>
                  <CardTitle className="text-base">Marking Scheme</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {part.markingScheme.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Model Answer */}
            {part.modelAnswer && (
              <Card className="bg-primary/5 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-base">Model Answer</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="whitespace-pre-wrap text-muted-foreground leading-relaxed">
                    {part.modelAnswer}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Divider between parts */}
            {index < csq.parts.length - 1 && (
              <div className="border-t-2 border-dashed my-8" />
            )}
          </div>
        ))}

        {/* Download Button */}
        <Card>
          <CardContent className="pt-6">
            <Button className="w-full" disabled>
              <Download className="w-4 h-4 mr-2" />
              Download Complete Case Study (Coming Soon)
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}