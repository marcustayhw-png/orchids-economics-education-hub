"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, BookOpen, Loader2, FileText } from "lucide-react";

type Note = {
  id: number;
  title: string;
  category: string;
  level: string;
  topics: string[];
  description: string;
  pdfUrl: string | null;
  createdAt: string;
  updatedAt: string;
};

export default function NotesPage() {
  const [selectedLevel, setSelectedLevel] = useState("secondary");
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/notes?limit=100");
      if (response.ok) {
        const data = await response.json();
        setNotes(data);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const secondaryNotes = notes.filter(note => note.level === "Secondary");
  const jcNotes = notes.filter(note => note.level === "JC");

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold">Economics Notes</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive study notes organized by topic and difficulty level. Click on any topic to expand and view detailed content.
          </p>
        </div>

        {/* Level Selector */}
        <Tabs defaultValue="secondary" className="space-y-8" onValueChange={setSelectedLevel}>
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="secondary">Secondary School</TabsTrigger>
            <TabsTrigger value="jc">Junior College</TabsTrigger>
          </TabsList>

          <TabsContent value="secondary" className="space-y-6">
            {secondaryNotes.length === 0 ? (
              <Card className="border-2 border-dashed">
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No notes available for Secondary level yet.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6">
                {secondaryNotes.map((note) => (
                  <Card key={note.id} className="border-2 hover:border-primary transition-colors">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <CardTitle className="text-2xl">{note.title}</CardTitle>
                          <Badge variant="secondary">{note.category}</Badge>
                        </div>
                        <BookOpen className="w-6 h-6 text-primary" />
                      </div>
                      <CardDescription className="text-base">{note.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {note.pdfUrl ? (
                        <div className="p-4 bg-muted rounded-lg">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <FileText className="w-5 h-5 text-primary" />
                              <span className="font-semibold">Full Notes PDF Available</span>
                            </div>
                            <Button asChild>
                              <a href={note.pdfUrl} target="_blank" rel="noopener noreferrer">
                                <Download className="w-4 h-4 mr-2" />
                                Download PDF
                              </a>
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <Accordion type="single" collapsible>
                          <AccordionItem value="topics" className="border-none">
                            <AccordionTrigger className="text-sm font-semibold">
                              View Topics Covered ({note.topics.length})
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="space-y-4 pt-2">
                                {note.topics.map((topic, idx) => (
                                  <div key={idx} className="p-4 bg-muted rounded-lg">
                                    <h4 className="font-semibold mb-2">{topic}</h4>
                                    <p className="text-sm text-muted-foreground">
                                      Detailed explanation of {topic.toLowerCase()} including definitions, diagrams, 
                                      real-world examples, and common exam questions.
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="jc" className="space-y-6">
            {jcNotes.length === 0 ? (
              <Card className="border-2 border-dashed">
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No notes available for JC level yet.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6">
                {jcNotes.map((note) => (
                  <Card key={note.id} className="border-2 hover:border-primary transition-colors">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <CardTitle className="text-2xl">{note.title}</CardTitle>
                          <Badge variant="secondary">{note.category}</Badge>
                        </div>
                        <BookOpen className="w-6 h-6 text-primary" />
                      </div>
                      <CardDescription className="text-base">{note.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {note.pdfUrl ? (
                        <div className="p-4 bg-muted rounded-lg">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <FileText className="w-5 h-5 text-primary" />
                              <span className="font-semibold">Full Notes PDF Available</span>
                            </div>
                            <Button asChild>
                              <a href={note.pdfUrl} target="_blank" rel="noopener noreferrer">
                                <Download className="w-4 h-4 mr-2" />
                                Download PDF
                              </a>
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <Accordion type="single" collapsible>
                          <AccordionItem value="topics" className="border-none">
                            <AccordionTrigger className="text-sm font-semibold">
                              View Topics Covered ({note.topics.length})
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="space-y-4 pt-2">
                                {note.topics.map((topic, idx) => (
                                  <div key={idx} className="p-4 bg-muted rounded-lg">
                                    <h4 className="font-semibold mb-2">{topic}</h4>
                                    <p className="text-sm text-muted-foreground">
                                      In-depth coverage of {topic.toLowerCase()} with advanced economic analysis, 
                                      mathematical models where applicable, case studies, and examination techniques.
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Study Tips */}
        <Card className="mt-12 bg-muted/50 border-2">
          <CardHeader>
            <CardTitle>How to Use These Notes Effectively</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-muted-foreground">
            <p>• Read through the notes systematically, starting from basic concepts before moving to advanced topics</p>
            <p>• Draw your own diagrams to reinforce understanding of economic models</p>
            <p>• Attempt to explain concepts in your own words to test comprehension</p>
            <p>• Link theoretical concepts to real-world examples from current affairs</p>
            <p>• Use these notes alongside model essays and practice questions for comprehensive exam preparation</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}