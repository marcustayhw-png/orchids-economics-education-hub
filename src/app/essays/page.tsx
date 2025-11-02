"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Award, ArrowRight, Loader2 } from "lucide-react";

interface Essay {
  id: number;
  essayId: string;
  question: string;
  level: string;
  marks: string;
}

interface CSQ {
  id: number;
  csqId: string;
  title: string;
  level: string;
  parts: Array<{
    part: string;
    marks: string;
  }>;
}

export default function EssaysPage() {
  const [selectedTab, setSelectedTab] = useState("essays");
  const [essays, setEssays] = useState<Essay[]>([]);
  const [csqs, setCSQs] = useState<CSQ[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [essaysRes, csqsRes] = await Promise.all([
        fetch("/api/essays?limit=100"),
        fetch("/api/csqs?limit=100"),
      ]);

      if (essaysRes.ok) {
        const essaysData = await essaysRes.json();
        setEssays(essaysData);
      }

      if (csqsRes.ok) {
        const csqsData = await csqsRes.json();
        setCSQs(csqsData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
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

  return (
    <div className="min-h-screen bg-background py-8 sm:py-12 px-4 sm:px-6 lg:px-8 overflow-x-hidden">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 space-y-3 sm:space-y-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold break-words px-2">Model Essays & CSQ Answers</h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto break-words px-2">
            Learn from high-quality model answers with detailed examiner comments, marking schemes, and analysis of what makes them exemplary.
          </p>
        </div>

        {/* Content Tabs - Mobile Optimized */}
        <Tabs defaultValue="essays" className="space-y-6 sm:space-y-8 w-full" onValueChange={setSelectedTab}>
          <TabsList className="flex flex-col sm:grid sm:grid-cols-2 w-full max-w-md mx-auto h-auto sm:h-9 p-1 gap-1">
            <TabsTrigger value="essays" className="w-full text-sm sm:text-base py-2.5 sm:py-1">
              Model Essays
            </TabsTrigger>
            <TabsTrigger value="csq" className="w-full text-sm sm:text-base py-2.5 sm:py-1">
              CSQ Answers
            </TabsTrigger>
          </TabsList>

          {/* Model Essays Tab */}
          <TabsContent value="essays" className="space-y-4 sm:space-y-6">
            {essays.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  No essays available yet.
                </CardContent>
              </Card>
            ) : (
              essays.map((essay) => (
                <Card key={essay.id} className="border-2 hover:border-primary transition-colors overflow-hidden">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-3 sm:gap-4">
                      <div className="space-y-2 sm:space-y-3 flex-1 min-w-0">
                        <div className="flex gap-2 items-center flex-wrap">
                          <Badge variant="secondary" className="whitespace-nowrap">{essay.level}</Badge>
                          <Badge variant="outline" className="whitespace-nowrap">{essay.marks} marks</Badge>
                        </div>
                        <h3 className="text-base sm:text-lg font-semibold leading-tight break-words">{essay.question}</h3>
                      </div>
                      <Award className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Link href={`/essays/${essay.essayId}`}>
                      <Button className="w-full" variant="outline">
                        <span className="truncate">View Full Question & Answer</span>
                        <ArrowRight className="w-4 h-4 ml-2 flex-shrink-0" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          {/* CSQ Answers Tab */}
          <TabsContent value="csq" className="space-y-4 sm:space-y-6">
            {csqs.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  No CSQs available yet.
                </CardContent>
              </Card>
            ) : (
              csqs.map((csq) => (
                <Card key={csq.id} className="border-2 hover:border-primary transition-colors overflow-hidden">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-3 sm:gap-4">
                      <div className="space-y-2 sm:space-y-3 flex-1 min-w-0">
                        <Badge variant="secondary" className="whitespace-nowrap">{csq.level}</Badge>
                        <CardTitle className="text-lg sm:text-xl break-words">{csq.title}</CardTitle>
                        <p className="text-sm text-muted-foreground break-words">
                          {csq.parts.length} parts • {csq.parts.reduce((sum, p) => sum + parseInt(p.marks), 0)} total marks
                        </p>
                      </div>
                      <Award className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Link href={`/essays/csq/${csq.csqId}`}>
                      <Button className="w-full" variant="outline">
                        <span className="truncate">View Full Case Study & Answers</span>
                        <ArrowRight className="w-4 h-4 ml-2 flex-shrink-0" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>

        {/* Study Tips */}
        <Card className="mt-8 sm:mt-12 bg-muted/50 border-2 overflow-hidden">
          <CardHeader>
            <CardTitle className="break-words">How to Learn from Model Answers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 sm:space-y-3 text-sm sm:text-base text-muted-foreground">
            <p className="break-words">• Study the structure and flow of arguments - note how each paragraph builds on the previous one</p>
            <p className="break-words">• Pay attention to how economic concepts are defined and applied to the question</p>
            <p className="break-words">• Observe how diagrams are integrated and explained within the text</p>
            <p className="break-words">• Learn from the evaluative comments - understand why certain points earn more marks</p>
            <p className="break-words">• Practice rewriting answers in your own words to internalize the techniques</p>
            <p className="break-words">• Compare your own attempts with these models to identify areas for improvement</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}