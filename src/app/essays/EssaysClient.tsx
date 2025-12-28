"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Award, ArrowRight, Filter, Clock, Trophy } from "lucide-react";

interface Essay {
  id: number;
  essayId: string;
  question: string;
  level: string;
  marks: string;
  topic: string;
  difficulty: string;
}

interface CSQ {
  id: number;
  csqId: string;
  title: string;
  level: string;
  topic: string;
  difficulty: string;
  totalMarks: number;
  parts: any[];
}

export function EssaysClient({ 
  initialEssays, 
  initialCSQs,
  activeTab
}: { 
  initialEssays: Essay[], 
  initialCSQs: CSQ[],
  activeTab: "essays" | "csq"
}) {
  // Essay filters
  const [essayLevel, setEssayLevel] = useState<string>("all");
  const [essayTopic, setEssayTopic] = useState<string>("all");
  const [essayDifficulty, setEssayDifficulty] = useState<string>("all");

  // CSQ filters
  const [csqLevel, setCSQLevel] = useState<string>("all");
  const [csqTopic, setCSQTopic] = useState<string>("all");
  const [csqDifficulty, setCSQDifficulty] = useState<string>("all");

  // Extract unique topics
  const essayTopics = Array.from(new Set(initialEssays.map(e => e.topic).filter(Boolean)));
  const csqTopics = Array.from(new Set(initialCSQs.map(c => c.topic).filter(Boolean)));

  // Filter essays
  const filteredEssays = initialEssays.filter(essay => {
    if (essayLevel !== "all" && essay.level !== essayLevel) return false;
    if (essayTopic !== "all" && essay.topic !== essayTopic) return false;
    if (essayDifficulty !== "all" && essay.difficulty !== essayDifficulty) return false;
    return true;
  });

  // Filter CSQs
  const filteredCSQs = initialCSQs.filter(csq => {
    if (csqLevel !== "all" && csq.level !== csqLevel) return false;
    if (csqTopic !== "all" && csq.topic !== csqTopic) return false;
    if (csqDifficulty !== "all" && csq.difficulty !== csqDifficulty) return false;
    return true;
  });

  return (
    <div className="space-y-6 sm:space-y-8 w-full">
      {/* Model Essays Content */}
      {activeTab === "essays" && (
        <div className="space-y-4 sm:space-y-6">
          {/* Essay Filters */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <Filter className="w-5 h-5 flex-shrink-0" />
                <span className="truncate">Filter Essays</span>
              </CardTitle>
              <CardDescription className="text-sm">
                Showing {filteredEssays.length} of {initialEssays.length} essays
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <div className="space-y-2 min-w-0">
                  <label className="text-sm font-medium">Level</label>
                  <Select value={essayLevel} onValueChange={setEssayLevel}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="All Levels" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="JC">JC</SelectItem>
                      <SelectItem value="Secondary">Secondary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 min-w-0">
                  <label className="text-sm font-medium">Topic</label>
                  <Select value={essayTopic} onValueChange={setEssayTopic}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="All Topics" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Topics</SelectItem>
                      {essayTopics.map(topic => (
                        <SelectItem key={topic} value={topic}>{topic}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 min-w-0">
                  <label className="text-sm font-medium">Difficulty</label>
                  <Select value={essayDifficulty} onValueChange={setEssayDifficulty}>
                    <SelectTrigger className="w-full">
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
              </div>
            </CardContent>
          </Card>

          {/* Essays List */}
          {filteredEssays.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                No essays match your current filters. Try adjusting your selection.
              </CardContent>
            </Card>
          ) : (
            filteredEssays.map((essay) => (
              <Card key={essay.id} className="border-2 hover:border-primary transition-colors overflow-hidden">
                <CardHeader>
                  <div className="flex items-start justify-between gap-3 sm:gap-4">
                    <div className="space-y-2 sm:space-y-3 flex-1 min-w-0">
                      <div className="flex gap-2 items-center flex-wrap">
                        <Badge variant="secondary" className="whitespace-nowrap">{essay.level}</Badge>
                        <Badge variant="outline" className="whitespace-nowrap">{essay.marks} marks</Badge>
                        <Badge variant="outline" className="whitespace-nowrap">{essay.topic}</Badge>
                        <Badge 
                          variant={
                            essay.difficulty === "Easy" ? "secondary" : 
                            essay.difficulty === "Hard" ? "destructive" : 
                            "default"
                          }
                          className="whitespace-nowrap"
                        >
                          {essay.difficulty}
                        </Badge>
                      </div>
                      <h3 className="text-base sm:text-lg font-semibold leading-tight break-words">{essay.question}</h3>
                    </div>
                    <Award className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0" />
                  </div>
                </CardHeader>
                <CardContent>
                  <Link href={`/essays/${essay.essayId}`}>
                    <Button className="w-full">
                      <span className="truncate">View Full Question & Answer</span>
                      <ArrowRight className="w-4 h-4 ml-2 flex-shrink-0" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}

      {/* CSQ Answers Content */}
      {activeTab === "csq" && (
        <div className="space-y-4 sm:space-y-6">
          {/* CSQ Filters */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <Filter className="w-5 h-5 flex-shrink-0" />
                <span className="truncate">Filter CSQs</span>
              </CardTitle>
              <CardDescription className="text-sm">
                Showing {filteredCSQs.length} of {initialCSQs.length} CSQs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <div className="space-y-2 min-w-0">
                  <label className="text-sm font-medium">Level</label>
                  <Select value={csqLevel} onValueChange={setCSQLevel}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="All Levels" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="JC">JC</SelectItem>
                      <SelectItem value="Secondary">Secondary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 min-w-0">
                  <label className="text-sm font-medium">Topic</label>
                  <Select value={csqTopic} onValueChange={setCSQTopic}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="All Topics" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Topics</SelectItem>
                      {csqTopics.map(topic => (
                        <SelectItem key={topic} value={topic}>{topic}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 min-w-0">
                  <label className="text-sm font-medium">Difficulty</label>
                  <Select value={csqDifficulty} onValueChange={setCSQDifficulty}>
                    <SelectTrigger className="w-full">
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
              </div>
            </CardContent>
          </Card>

          {/* CSQs List */}
          {filteredCSQs.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                No CSQs match your current filters. Try adjusting your selection.
              </CardContent>
            </Card>
          ) : (
            filteredCSQs.map((csq) => (
              <Card key={csq.id} className="border-2 hover:border-primary transition-colors overflow-hidden">
                <CardHeader>
                  <div className="flex items-start justify-between gap-3 sm:gap-4">
                    <div className="space-y-2 sm:space-y-3 flex-1 min-w-0">
                      <div className="flex gap-2 items-center flex-wrap">
                        <Badge variant="secondary" className="whitespace-nowrap">{csq.level}</Badge>
                        <Badge variant="outline" className="whitespace-nowrap">{csq.totalMarks} marks</Badge>
                        <Badge variant="outline" className="whitespace-nowrap">{csq.topic}</Badge>
                        <Badge 
                          variant={
                            csq.difficulty === "Easy" ? "secondary" : 
                            csq.difficulty === "Hard" ? "destructive" : 
                            "default"
                          }
                          className="whitespace-nowrap"
                        >
                          {csq.difficulty}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg sm:text-xl break-words">{csq.title}</CardTitle>
                      <p className="text-sm text-muted-foreground break-words">
                        {csq.parts?.length || 0} parts
                      </p>
                    </div>
                    <Award className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0" />
                  </div>
                </CardHeader>
                <CardContent>
                  <Link href={`/essays/csq/${csq.csqId}`}>
                    <Button className="w-full">
                      <span className="truncate">View Full Case Study & Answers</span>
                      <ArrowRight className="w-4 h-4 ml-2 flex-shrink-0" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
}
