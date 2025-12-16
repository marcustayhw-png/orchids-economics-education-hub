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

  const generateStructuredData = () => {
    if (notes.length === 0) return null;

    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": notes.slice(0, 20).map((note, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Course",
          "name": note.title,
          "description": note.description,
          "educationalLevel": note.level,
          "courseCode": note.category,
          "about": {
            "@type": "Thing",
            "name": note.topics.join(", ")
          }
        }
      }))
    };
  };

  return (
    <div className="min-h-screen bg-background py-8 sm:py-12 px-4 sm:px-6 lg:px-8 overflow-x-hidden">
      {notes.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateStructuredData())
          }}
        />
      )}
      <div className="max-w-7xl mx-auto w-full">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16 space-y-4 sm:space-y-5">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight break-words px-2 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
              Economics Notes
            </h1>
            <p className="text-base sm:text-lg leading-relaxed text-muted-foreground/90 max-w-2xl mx-auto break-words px-2">
              Comprehensive study notes organized by topic and difficulty level
            </p>
          </div>

          {/* Level Selector - Mobile Optimized */}
          <Tabs defaultValue="secondary" className="space-y-8 sm:space-y-10 w-full" onValueChange={setSelectedLevel}>
            <TabsList className="flex flex-col sm:grid sm:grid-cols-2 w-full max-w-md mx-auto h-auto sm:h-11 p-1 gap-1 bg-muted/50 backdrop-blur-sm">
              <TabsTrigger 
                value="secondary" 
                className="w-full text-sm sm:text-base py-3 sm:py-2 font-medium data-[state=active]:bg-background data-[state=active]:shadow-md transition-all"
              >
                Secondary School
              </TabsTrigger>
              <TabsTrigger 
                value="jc" 
                className="w-full text-sm sm:text-base py-3 sm:py-2 font-medium data-[state=active]:bg-background data-[state=active]:shadow-md transition-all"
              >
                Junior College
              </TabsTrigger>
            </TabsList>

          <TabsContent value="secondary" className="space-y-4 sm:space-y-6">
            {secondaryNotes.length === 0 ? (
              <Card className="border-2 border-dashed overflow-hidden">
                <CardContent className="py-8 sm:py-12 text-center">
                  <p className="text-muted-foreground break-words px-2">No notes available for Secondary level yet.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 sm:gap-6">
                  {secondaryNotes.map((note) => (
                    <Card key={note.id} className="border border-border/50 hover:border-primary/50 hover:shadow-lg transition-all duration-300 overflow-hidden">
                      <CardHeader>
                        <div className="flex items-start justify-between gap-3 sm:gap-4">
                          <div className="space-y-3 flex-1 min-w-0">
                            <CardTitle className="text-xl sm:text-2xl font-bold break-words leading-tight tracking-tight">{note.title}</CardTitle>
                            <Badge variant="secondary" className="whitespace-nowrap text-xs font-semibold px-3 py-1">{note.category}</Badge>
                          </div>
                          <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-primary/70 flex-shrink-0" />
                        </div>
                        <CardDescription className="text-sm sm:text-base leading-relaxed break-words">{note.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {note.pdfUrl ? (
                          <div className="p-4 sm:p-5 bg-gradient-to-br from-muted/50 to-muted/30 rounded-xl overflow-hidden border border-border/50">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                              <div className="flex items-center gap-3 min-w-0">
                                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                                  <FileText className="w-5 h-5 text-primary flex-shrink-0" />
                                </div>
                                <span className="font-semibold text-sm sm:text-base break-words">Complete Study Notes</span>
                              </div>
                              <Button asChild size="default" className="w-full sm:w-auto whitespace-nowrap font-medium shadow-sm hover:shadow-md transition-shadow">
                                <a href={note.pdfUrl} target="_blank" rel="noopener noreferrer">
                                  <Download className="w-4 h-4 mr-2 flex-shrink-0" />
                                  <span className="truncate">Download PDF</span>
                                </a>
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <Accordion type="single" collapsible>
                            <AccordionItem value="topics" className="border-none">
                              <AccordionTrigger className="text-sm font-semibold break-words hover:no-underline hover:text-primary transition-colors">
                                View Topics Covered ({note.topics.length})
                              </AccordionTrigger>
                              <AccordionContent>
                                <div className="space-y-3 sm:space-y-4 pt-2">
                                  {note.topics.map((topic, idx) => (
                                    <div key={idx} className="p-4 sm:p-5 bg-gradient-to-br from-muted/40 to-muted/20 rounded-lg overflow-hidden border border-border/30">
                                      <h4 className="font-bold mb-2 text-sm sm:text-base break-words tracking-tight">{topic}</h4>
                                      <p className="text-xs sm:text-sm text-muted-foreground/80 leading-relaxed break-words">
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
                          <SuggestedPath noteId={note.id} noteTitle={note.title} />
                        </CardContent>
                      </Card>
                    ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="jc" className="space-y-4 sm:space-y-6">
            {jcNotes.length === 0 ? (
              <Card className="border-2 border-dashed overflow-hidden">
                <CardContent className="py-8 sm:py-12 text-center">
                  <p className="text-muted-foreground break-words px-2">No notes available for JC level yet.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 sm:gap-6">
                  {jcNotes.map((note) => (
                    <Card key={note.id} className="border border-border/50 hover:border-primary/50 hover:shadow-lg transition-all duration-300 overflow-hidden">
                      <CardHeader>
                        <div className="flex items-start justify-between gap-3 sm:gap-4">
                          <div className="space-y-3 flex-1 min-w-0">
                            <CardTitle className="text-xl sm:text-2xl font-bold break-words leading-tight tracking-tight">{note.title}</CardTitle>
                            <Badge variant="secondary" className="whitespace-nowrap text-xs font-semibold px-3 py-1">{note.category}</Badge>
                          </div>
                          <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-primary/70 flex-shrink-0" />
                        </div>
                        <CardDescription className="text-sm sm:text-base leading-relaxed break-words">{note.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {note.pdfUrl ? (
                          <div className="p-4 sm:p-5 bg-gradient-to-br from-muted/50 to-muted/30 rounded-xl overflow-hidden border border-border/50">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                              <div className="flex items-center gap-3 min-w-0">
                                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                                  <FileText className="w-5 h-5 text-primary flex-shrink-0" />
                                </div>
                                <span className="font-semibold text-sm sm:text-base break-words">Complete Study Notes</span>
                              </div>
                              <Button asChild size="default" className="w-full sm:w-auto whitespace-nowrap font-medium shadow-sm hover:shadow-md transition-shadow">
                                <a href={note.pdfUrl} target="_blank" rel="noopener noreferrer">
                                  <Download className="w-4 h-4 mr-2 flex-shrink-0" />
                                  <span className="truncate">Download PDF</span>
                                </a>
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <Accordion type="single" collapsible>
                            <AccordionItem value="topics" className="border-none">
                              <AccordionTrigger className="text-sm font-semibold break-words hover:no-underline hover:text-primary transition-colors">
                                View Topics Covered ({note.topics.length})
                              </AccordionTrigger>
                              <AccordionContent>
                                <div className="space-y-3 sm:space-y-4 pt-2">
                                  {note.topics.map((topic, idx) => (
                                    <div key={idx} className="p-4 sm:p-5 bg-gradient-to-br from-muted/40 to-muted/20 rounded-lg overflow-hidden border border-border/30">
                                      <h4 className="font-bold mb-2 text-sm sm:text-base break-words tracking-tight">{topic}</h4>
                                      <p className="text-xs sm:text-sm text-muted-foreground/80 leading-relaxed break-words">
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
        <Card className="mt-10 sm:mt-14 bg-gradient-to-br from-muted/30 to-muted/10 border border-border/50 overflow-hidden">
          <CardHeader>
            <CardTitle className="break-words text-xl sm:text-2xl font-bold tracking-tight">Study Guide</CardTitle>
            <CardDescription className="text-sm sm:text-base">Maximize your learning with these proven strategies</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4 text-sm sm:text-base text-muted-foreground/90">
            <div className="flex gap-3 items-start">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">1</div>
              <p className="break-words leading-relaxed">Read through the notes systematically, starting from basic concepts before moving to advanced topics</p>
            </div>
            <div className="flex gap-3 items-start">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">2</div>
              <p className="break-words leading-relaxed">Draw your own diagrams to reinforce understanding of economic models</p>
            </div>
            <div className="flex gap-3 items-start">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">3</div>
              <p className="break-words leading-relaxed">Attempt to explain concepts in your own words to test comprehension</p>
            </div>
            <div className="flex gap-3 items-start">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">4</div>
              <p className="break-words leading-relaxed">Link theoretical concepts to real-world examples from current affairs</p>
            </div>
            <div className="flex gap-3 items-start">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">5</div>
              <p className="break-words leading-relaxed">Use these notes alongside model essays and practice questions for comprehensive exam preparation</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, BookOpen, Loader2, FileText } from "lucide-react";
import { SuggestedPath } from "@/components/suggested-path";

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

  const generateStructuredData = () => {
    if (notes.length === 0) return null;

    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": notes.slice(0, 20).map((note, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Course",
          "name": note.title,
          "description": note.description,
          "educationalLevel": note.level,
          "courseCode": note.category,
          "about": {
            "@type": "Thing",
            "name": note.topics.join(", ")
          }
        }
      }))
    };
  };

  return (
    <div className="min-h-screen bg-background py-8 sm:py-12 px-4 sm:px-6 lg:px-8 overflow-x-hidden">
      {notes.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateStructuredData())
          }}
        />
      )}
      <div className="max-w-7xl mx-auto w-full">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16 space-y-4 sm:space-y-5">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight break-words px-2 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
              Economics Notes
            </h1>
            <p className="text-base sm:text-lg leading-relaxed text-muted-foreground/90 max-w-2xl mx-auto break-words px-2">
              Comprehensive study notes organized by topic and difficulty level
            </p>
          </div>

          {/* Level Selector - Mobile Optimized */}
          <Tabs defaultValue="secondary" className="space-y-8 sm:space-y-10 w-full" onValueChange={setSelectedLevel}>
            <TabsList className="flex flex-col sm:grid sm:grid-cols-2 w-full max-w-md mx-auto h-auto sm:h-11 p-1 gap-1 bg-muted/50 backdrop-blur-sm">
              <TabsTrigger 
                value="secondary" 
                className="w-full text-sm sm:text-base py-3 sm:py-2 font-medium data-[state=active]:bg-background data-[state=active]:shadow-md transition-all"
              >
                Secondary School
              </TabsTrigger>
              <TabsTrigger 
                value="jc" 
                className="w-full text-sm sm:text-base py-3 sm:py-2 font-medium data-[state=active]:bg-background data-[state=active]:shadow-md transition-all"
              >
                Junior College
              </TabsTrigger>
            </TabsList>

          <TabsContent value="secondary" className="space-y-4 sm:space-y-6">
            {secondaryNotes.length === 0 ? (
              <Card className="border-2 border-dashed overflow-hidden">
                <CardContent className="py-8 sm:py-12 text-center">
                  <p className="text-muted-foreground break-words px-2">No notes available for Secondary level yet.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 sm:gap-6">
                  {secondaryNotes.map((note) => (
                    <Card key={note.id} className="border border-border/50 hover:border-primary/50 hover:shadow-lg transition-all duration-300 overflow-hidden">
                      <CardHeader>
                        <div className="flex items-start justify-between gap-3 sm:gap-4">
                          <div className="space-y-3 flex-1 min-w-0">
                            <CardTitle className="text-xl sm:text-2xl font-bold break-words leading-tight tracking-tight">{note.title}</CardTitle>
                            <Badge variant="secondary" className="whitespace-nowrap text-xs font-semibold px-3 py-1">{note.category}</Badge>
                          </div>
                          <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-primary/70 flex-shrink-0" />
                        </div>
                        <CardDescription className="text-sm sm:text-base leading-relaxed break-words">{note.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {note.pdfUrl ? (
                          <div className="p-4 sm:p-5 bg-gradient-to-br from-muted/50 to-muted/30 rounded-xl overflow-hidden border border-border/50">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                              <div className="flex items-center gap-3 min-w-0">
                                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                                  <FileText className="w-5 h-5 text-primary flex-shrink-0" />
                                </div>
                                <span className="font-semibold text-sm sm:text-base break-words">Complete Study Notes</span>
                              </div>
                              <Button asChild size="default" className="w-full sm:w-auto whitespace-nowrap font-medium shadow-sm hover:shadow-md transition-shadow">
                                <a href={note.pdfUrl} target="_blank" rel="noopener noreferrer">
                                  <Download className="w-4 h-4 mr-2 flex-shrink-0" />
                                  <span className="truncate">Download PDF</span>
                                </a>
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <Accordion type="single" collapsible>
                            <AccordionItem value="topics" className="border-none">
                              <AccordionTrigger className="text-sm font-semibold break-words hover:no-underline hover:text-primary transition-colors">
                                View Topics Covered ({note.topics.length})
                              </AccordionTrigger>
                              <AccordionContent>
                                <div className="space-y-3 sm:space-y-4 pt-2">
                                  {note.topics.map((topic, idx) => (
                                    <div key={idx} className="p-4 sm:p-5 bg-gradient-to-br from-muted/40 to-muted/20 rounded-lg overflow-hidden border border-border/30">
                                      <h4 className="font-bold mb-2 text-sm sm:text-base break-words tracking-tight">{topic}</h4>
                                      <p className="text-xs sm:text-sm text-muted-foreground/80 leading-relaxed break-words">
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
                          <SuggestedPath noteId={note.id} noteTitle={note.title} />
                        </CardContent>
                      </Card>
                    ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="jc" className="space-y-4 sm:space-y-6">
            {jcNotes.length === 0 ? (
              <Card className="border-2 border-dashed overflow-hidden">
                <CardContent className="py-8 sm:py-12 text-center">
                  <p className="text-muted-foreground break-words px-2">No notes available for JC level yet.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 sm:gap-6">
                  {jcNotes.map((note) => (
                    <Card key={note.id} className="border border-border/50 hover:border-primary/50 hover:shadow-lg transition-all duration-300 overflow-hidden">
                      <CardHeader>
                        <div className="flex items-start justify-between gap-3 sm:gap-4">
                          <div className="space-y-3 flex-1 min-w-0">
                            <CardTitle className="text-xl sm:text-2xl font-bold break-words leading-tight tracking-tight">{note.title}</CardTitle>
                            <Badge variant="secondary" className="whitespace-nowrap text-xs font-semibold px-3 py-1">{note.category}</Badge>
                          </div>
                          <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-primary/70 flex-shrink-0" />
                        </div>
                        <CardDescription className="text-sm sm:text-base leading-relaxed break-words">{note.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {note.pdfUrl ? (
                          <div className="p-4 sm:p-5 bg-gradient-to-br from-muted/50 to-muted/30 rounded-xl overflow-hidden border border-border/50">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                              <div className="flex items-center gap-3 min-w-0">
                                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                                  <FileText className="w-5 h-5 text-primary flex-shrink-0" />
                                </div>
                                <span className="font-semibold text-sm sm:text-base break-words">Complete Study Notes</span>
                              </div>
                              <Button asChild size="default" className="w-full sm:w-auto whitespace-nowrap font-medium shadow-sm hover:shadow-md transition-shadow">
                                <a href={note.pdfUrl} target="_blank" rel="noopener noreferrer">
                                  <Download className="w-4 h-4 mr-2 flex-shrink-0" />
                                  <span className="truncate">Download PDF</span>
                                </a>
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <Accordion type="single" collapsible>
                            <AccordionItem value="topics" className="border-none">
                              <AccordionTrigger className="text-sm font-semibold break-words hover:no-underline hover:text-primary transition-colors">
                                View Topics Covered ({note.topics.length})
                              </AccordionTrigger>
                              <AccordionContent>
                                <div className="space-y-3 sm:space-y-4 pt-2">
                                  {note.topics.map((topic, idx) => (
                                    <div key={idx} className="p-4 sm:p-5 bg-gradient-to-br from-muted/40 to-muted/20 rounded-lg overflow-hidden border border-border/30">
                                      <h4 className="font-bold mb-2 text-sm sm:text-base break-words tracking-tight">{topic}</h4>
                                      <p className="text-xs sm:text-sm text-muted-foreground/80 leading-relaxed break-words">
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
        <Card className="mt-10 sm:mt-14 bg-gradient-to-br from-muted/30 to-muted/10 border border-border/50 overflow-hidden">
          <CardHeader>
            <CardTitle className="break-words text-xl sm:text-2xl font-bold tracking-tight">Study Guide</CardTitle>
            <CardDescription className="text-sm sm:text-base">Maximize your learning with these proven strategies</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4 text-sm sm:text-base text-muted-foreground/90">
            <div className="flex gap-3 items-start">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">1</div>
              <p className="break-words leading-relaxed">Read through the notes systematically, starting from basic concepts before moving to advanced topics</p>
            </div>
            <div className="flex gap-3 items-start">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">2</div>
              <p className="break-words leading-relaxed">Draw your own diagrams to reinforce understanding of economic models</p>
            </div>
            <div className="flex gap-3 items-start">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">3</div>
              <p className="break-words leading-relaxed">Attempt to explain concepts in your own words to test comprehension</p>
            </div>
            <div className="flex gap-3 items-start">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">4</div>
              <p className="break-words leading-relaxed">Link theoretical concepts to real-world examples from current affairs</p>
            </div>
            <div className="flex gap-3 items-start">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">5</div>
              <p className="break-words leading-relaxed">Use these notes alongside model essays and practice questions for comprehensive exam preparation</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, BookOpen, Loader2, FileText } from "lucide-react";
import { SuggestedPath } from "@/components/suggested-path";

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

  const generateStructuredData = () => {
    if (notes.length === 0) return null;

    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": notes.slice(0, 20).map((note, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Course",
          "name": note.title,
          "description": note.description,
          "educationalLevel": note.level,
          "courseCode": note.category,
          "about": {
            "@type": "Thing",
            "name": note.topics.join(", ")
          }
        }
      }))
    };
  };

  return (
    <div className="min-h-screen bg-background py-8 sm:py-12 px-4 sm:px-6 lg:px-8 overflow-x-hidden">
      {notes.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateStructuredData())
          }}
        />
      )}
      <div className="max-w-7xl mx-auto w-full">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16 space-y-4 sm:space-y-5">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight break-words px-2 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
              Economics Notes
            </h1>
            <p className="text-base sm:text-lg leading-relaxed text-muted-foreground/90 max-w-2xl mx-auto break-words px-2">
              Comprehensive study notes organized by topic and difficulty level
            </p>
          </div>

          {/* Level Selector - Mobile Optimized */}
          <Tabs defaultValue="secondary" className="space-y-8 sm:space-y-10 w-full" onValueChange={setSelectedLevel}>
            <TabsList className="flex flex-col sm:grid sm:grid-cols-2 w-full max-w-md mx-auto h-auto sm:h-11 p-1 gap-1 bg-muted/50 backdrop-blur-sm">
              <TabsTrigger 
                value="secondary" 
                className="w-full text-sm sm:text-base py-3 sm:py-2 font-medium data-[state=active]:bg-background data-[state=active]:shadow-md transition-all"
              >
                Secondary School
              </TabsTrigger>
              <TabsTrigger 
                value="jc" 
                className="w-full text-sm sm:text-base py-3 sm:py-2 font-medium data-[state=active]:bg-background data-[state=active]:shadow-md transition-all"
              >
                Junior College
              </TabsTrigger>
            </TabsList>

          <TabsContent value="secondary" className="space-y-4 sm:space-y-6">
            {secondaryNotes.length === 0 ? (
              <Card className="border-2 border-dashed overflow-hidden">
                <CardContent className="py-8 sm:py-12 text-center">
                  <p className="text-muted-foreground break-words px-2">No notes available for Secondary level yet.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 sm:gap-6">
                  {secondaryNotes.map((note) => (
                    <Card key={note.id} className="border border-border/50 hover:border-primary/50 hover:shadow-lg transition-all duration-300 overflow-hidden">
                      <CardHeader>
                        <div className="flex items-start justify-between gap-3 sm:gap-4">
                          <div className="space-y-3 flex-1 min-w-0">
                            <CardTitle className="text-xl sm:text-2xl font-bold break-words leading-tight tracking-tight">{note.title}</CardTitle>
                            <Badge variant="secondary" className="whitespace-nowrap text-xs font-semibold px-3 py-1">{note.category}</Badge>
                          </div>
                          <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-primary/70 flex-shrink-0" />
                        </div>
                        <CardDescription className="text-sm sm:text-base leading-relaxed break-words">{note.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {note.pdfUrl ? (
                          <div className="p-4 sm:p-5 bg-gradient-to-br from-muted/50 to-muted/30 rounded-xl overflow-hidden border border-border/50">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                              <div className="flex items-center gap-3 min-w-0">
                                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                                  <FileText className="w-5 h-5 text-primary flex-shrink-0" />
                                </div>
                                <span className="font-semibold text-sm sm:text-base break-words">Complete Study Notes</span>
                              </div>
                              <Button asChild size="default" className="w-full sm:w-auto whitespace-nowrap font-medium shadow-sm hover:shadow-md transition-shadow">
                                <a href={note.pdfUrl} target="_blank" rel="noopener noreferrer">
                                  <Download className="w-4 h-4 mr-2 flex-shrink-0" />
                                  <span className="truncate">Download PDF</span>
                                </a>
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <Accordion type="single" collapsible>
                            <AccordionItem value="topics" className="border-none">
                              <AccordionTrigger className="text-sm font-semibold break-words hover:no-underline hover:text-primary transition-colors">
                                View Topics Covered ({note.topics.length})
                              </AccordionTrigger>
                              <AccordionContent>
                                <div className="space-y-3 sm:space-y-4 pt-2">
                                  {note.topics.map((topic, idx) => (
                                    <div key={idx} className="p-4 sm:p-5 bg-gradient-to-br from-muted/40 to-muted/20 rounded-lg overflow-hidden border border-border/30">
                                      <h4 className="font-bold mb-2 text-sm sm:text-base break-words tracking-tight">{topic}</h4>
                                      <p className="text-xs sm:text-sm text-muted-foreground/80 leading-relaxed break-words">
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
                          <SuggestedPath noteId={note.id} noteTitle={note.title} />
                        </CardContent>
                      </Card>
                    ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="jc" className="space-y-4 sm:space-y-6">
            {jcNotes.length === 0 ? (
              <Card className="border-2 border-dashed overflow-hidden">
                <CardContent className="py-8 sm:py-12 text-center">
                  <p className="text-muted-foreground break-words px-2">No notes available for JC level yet.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 sm:gap-6">
                  {jcNotes.map((note) => (
                    <Card key={note.id} className="border border-border/50 hover:border-primary/50 hover:shadow-lg transition-all duration-300 overflow-hidden">
                      <CardHeader>
                        <div className="flex items-start justify-between gap-3 sm:gap-4">
                          <div className="space-y-3 flex-1 min-w-0">
                            <CardTitle className="text-xl sm:text-2xl font-bold break-words leading-tight tracking-tight">{note.title}</CardTitle>
                            <Badge variant="secondary" className="whitespace-nowrap text-xs font-semibold px-3 py-1">{note.category}</Badge>
                          </div>
                          <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-primary/70 flex-shrink-0" />
                        </div>
                        <CardDescription className="text-sm sm:text-base leading-relaxed break-words">{note.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {note.pdfUrl ? (
                          <div className="p-4 sm:p-5 bg-gradient-to-br from-muted/50 to-muted/30 rounded-xl overflow-hidden border border-border/50">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                              <div className="flex items-center gap-3 min-w-0">
                                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                                  <FileText className="w-5 h-5 text-primary flex-shrink-0" />
                                </div>
                                <span className="font-semibold text-sm sm:text-base break-words">Complete Study Notes</span>
                              </div>
                              <Button asChild size="default" className="w-full sm:w-auto whitespace-nowrap font-medium shadow-sm hover:shadow-md transition-shadow">
                                <a href={note.pdfUrl} target="_blank" rel="noopener noreferrer">
                                  <Download className="w-4 h-4 mr-2 flex-shrink-0" />
                                  <span className="truncate">Download PDF</span>
                                </a>
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <Accordion type="single" collapsible>
                            <AccordionItem value="topics" className="border-none">
                              <AccordionTrigger className="text-sm font-semibold break-words hover:no-underline hover:text-primary transition-colors">
                                View Topics Covered ({note.topics.length})
                              </AccordionTrigger>
                              <AccordionContent>
                                <div className="space-y-3 sm:space-y-4 pt-2">
                                  {note.topics.map((topic, idx) => (
                                    <div key={idx} className="p-4 sm:p-5 bg-gradient-to-br from-muted/40 to-muted/20 rounded-lg overflow-hidden border border-border/30">
                                      <h4 className="font-bold mb-2 text-sm sm:text-base break-words tracking-tight">{topic}</h4>
                                      <p className="text-xs sm:text-sm text-muted-foreground/80 leading-relaxed break-words">
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
                          <SuggestedPath noteId={note.id} noteTitle={note.title} />
                        </CardContent>
                      </Card>
                    ))}
                </div>
              )}
            </TabsContent>
          </Tabs>

        {/* Study Tips */}
        <Card className="mt-10 sm:mt-14 bg-gradient-to-br from-muted/30 to-muted/10 border border-border/50 overflow-hidden">
          <CardHeader>
            <CardTitle className="break-words text-xl sm:text-2xl font-bold tracking-tight">Study Guide</CardTitle>
            <CardDescription className="text-sm sm:text-base">Maximize your learning with these proven strategies</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4 text-sm sm:text-base text-muted-foreground/90">
            <div className="flex gap-3 items-start">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">1</div>
              <p className="break-words leading-relaxed">Read through the notes systematically, starting from basic concepts before moving to advanced topics</p>
            </div>
            <div className="flex gap-3 items-start">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">2</div>
              <p className="break-words leading-relaxed">Draw your own diagrams to reinforce understanding of economic models</p>
            </div>
            <div className="flex gap-3 items-start">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">3</div>
              <p className="break-words leading-relaxed">Attempt to explain concepts in your own words to test comprehension</p>
            </div>
            <div className="flex gap-3 items-start">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">4</div>
              <p className="break-words leading-relaxed">Link theoretical concepts to real-world examples from current affairs</p>
            </div>
            <div className="flex gap-3 items-start">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">5</div>
              <p className="break-words leading-relaxed">Use these notes alongside model essays and practice questions for comprehensive exam preparation</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}