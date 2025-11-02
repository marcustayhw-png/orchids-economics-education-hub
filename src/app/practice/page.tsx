"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, EyeOff, Filter, Loader2, FileText, Download } from "lucide-react";

type Question = {
  id: number;
  questionId: string;
  question: string;
  topic: string;
  difficulty: "Easy" | "Medium" | "Hard";
  level: "Secondary" | "JC";
  marks: number;
  answer: string;
  pdfUrl: string | null;
  createdAt: string;
  updatedAt: string;
};

export default function PracticePage() {
  const [practiceQuestions, setPracticeQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [selectedTopic, setSelectedTopic] = useState<string>("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [revealedAnswers, setRevealedAnswers] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/practice-questions?limit=100");
      if (response.ok) {
        const data = await response.json();
        setPracticeQuestions(data);
      }
    } catch (error) {
      console.error("Error fetching practice questions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Extract unique topics
  const topics = Array.from(new Set(practiceQuestions.map(q => q.topic)));

  // Filter questions
  const filteredQuestions = practiceQuestions.filter(q => {
    if (selectedLevel !== "all" && q.level !== selectedLevel) return false;
    if (selectedTopic !== "all" && q.topic !== selectedTopic) return false;
    if (selectedDifficulty !== "all" && q.difficulty !== selectedDifficulty) return false;
    return true;
  });

  const toggleAnswer = (questionId: string) => {
    setRevealedAnswers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  const revealAllAnswers = () => {
    setRevealedAnswers(new Set(filteredQuestions.map(q => q.questionId)));
  };

  const hideAllAnswers = () => {
    setRevealedAnswers(new Set());
  };

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
          <h1 className="text-4xl sm:text-5xl font-bold">Practice Questions</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Test your understanding with our comprehensive question bank. Filter by level, topic, and difficulty.
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filter Questions
            </CardTitle>
            <CardDescription>
              Showing {filteredQuestions.length} of {practiceQuestions.length} questions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Level</label>
                <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Levels" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="Secondary">Secondary</SelectItem>
                    <SelectItem value="JC">JC</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Topic</label>
                <Select value={selectedTopic} onValueChange={setSelectedTopic}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Topics" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Topics</SelectItem>
                    {topics.map(topic => (
                      <SelectItem key={topic} value={topic}>{topic}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Difficulty</label>
                <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Difficulties" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Difficulties</SelectItem>
                    <SelectItem value="Easy">Easy</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Quick Actions</label>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={revealAllAnswers} className="flex-1">
                    <Eye className="w-4 h-4 mr-1" />
                    Show All
                  </Button>
                  <Button variant="outline" size="sm" onClick={hideAllAnswers} className="flex-1">
                    <EyeOff className="w-4 h-4 mr-1" />
                    Hide All
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Questions */}
        <div className="space-y-4">
          {filteredQuestions.map((q, index) => (
            <Card key={q.id} className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex gap-2 items-center flex-wrap">
                      <Badge variant="outline">Question {index + 1}</Badge>
                      <Badge variant="secondary">{q.level}</Badge>
                      <Badge variant="outline">{q.topic}</Badge>
                      <Badge 
                        variant={
                          q.difficulty === "Easy" ? "secondary" : 
                          q.difficulty === "Medium" ? "default" : 
                          "destructive"
                        }
                      >
                        {q.difficulty}
                      </Badge>
                      <Badge variant="outline">{q.marks} marks</Badge>
                      {q.pdfUrl && (
                        <Badge variant="default">
                          <FileText className="w-3 h-3 mr-1" />
                          PDF
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg leading-relaxed">{q.question}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Button 
                    onClick={() => toggleAnswer(q.questionId)}
                    variant={revealedAnswers.has(q.questionId) ? "default" : "outline"}
                    className="w-full sm:w-auto"
                  >
                    {revealedAnswers.has(q.questionId) ? (
                      <>
                        <EyeOff className="w-4 h-4 mr-2" />
                        Hide Answer
                      </>
                    ) : (
                      <>
                        <Eye className="w-4 h-4 mr-2" />
                        Reveal Answer
                      </>
                    )}
                  </Button>
                  {q.pdfUrl && (
                    <Button variant="outline" asChild>
                      <a href={q.pdfUrl} target="_blank" rel="noopener noreferrer">
                        <Download className="w-4 h-4 mr-2" />
                        Download PDF
                      </a>
                    </Button>
                  )}
                </div>

                {revealedAnswers.has(q.questionId) && (
                  <div className="p-4 bg-muted rounded-lg border-l-4 border-primary animate-in slide-in-from-top-2">
                    <h4 className="font-semibold mb-2 text-primary">Model Answer:</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                      {q.answer}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}

          {filteredQuestions.length === 0 && (
            <Card className="border-2 border-dashed">
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">
                  No questions match your current filters. Try adjusting your selection.
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Study Tips */}
        <Card className="mt-12 bg-muted/50 border-2">
          <CardHeader>
            <CardTitle>Practice Tips</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-muted-foreground">
            <p>• Attempt questions under timed conditions to simulate exam pressure</p>
            <p>• Write out your full answer before revealing the model answer</p>
            <p>• Compare your answer with the model - identify what you missed or could improve</p>
            <p>• For diagram questions, always draw the diagram first, then explain it in words</p>
            <p>• Start with easier questions to build confidence, then progress to harder ones</p>
            <p>• Review questions you got wrong multiple times until you master the concept</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}