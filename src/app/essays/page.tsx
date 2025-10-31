"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Award, ArrowRight } from "lucide-react";
import { modelEssays, modelCSQs } from "./data";

export default function EssaysPage() {
  const [selectedTab, setSelectedTab] = useState("essays");

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold">Model Essays & CSQ Answers</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Learn from high-quality model answers with detailed examiner comments, marking schemes, and analysis of what makes them exemplary.
          </p>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="essays" className="space-y-8" onValueChange={setSelectedTab}>
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="essays">Model Essays</TabsTrigger>
            <TabsTrigger value="csq">CSQ Answers</TabsTrigger>
          </TabsList>

          {/* Model Essays Tab */}
          <TabsContent value="essays" className="space-y-6">
            {modelEssays.map((essay) => (
              <Card key={essay.id} className="border-2 hover:border-primary transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-3 flex-1">
                      <div className="flex gap-2 items-center flex-wrap">
                        <Badge variant="secondary">{essay.level}</Badge>
                        <Badge variant="outline">{essay.marks} marks</Badge>
                      </div>
                      <h3 className="text-lg font-semibold leading-tight">{essay.question}</h3>
                    </div>
                    <Award className="w-6 h-6 text-primary flex-shrink-0" />
                  </div>
                </CardHeader>
                <CardContent>
                  <Link href={`/essays/${essay.id}`}>
                    <Button className="w-full" variant="outline">
                      View Full Question & Answer
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* CSQ Answers Tab */}
          <TabsContent value="csq" className="space-y-6">
            {modelCSQs.map((csq) => (
              <Card key={csq.id} className="border-2 hover:border-primary transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-3 flex-1">
                      <Badge variant="secondary">{csq.level}</Badge>
                      <CardTitle className="text-xl">{csq.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {csq.parts.length} parts • {csq.parts.reduce((sum, p) => sum + parseInt(p.marks), 0)} total marks
                      </p>
                    </div>
                    <Award className="w-6 h-6 text-primary flex-shrink-0" />
                  </div>
                </CardHeader>
                <CardContent>
                  <Link href={`/essays/csq/${csq.id}`}>
                    <Button className="w-full" variant="outline">
                      View Full Case Study & Answers
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {/* Study Tips */}
        <Card className="mt-12 bg-muted/50 border-2">
          <CardHeader>
            <CardTitle>How to Learn from Model Answers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-muted-foreground">
            <p>• Study the structure and flow of arguments - note how each paragraph builds on the previous one</p>
            <p>• Pay attention to how economic concepts are defined and applied to the question</p>
            <p>• Observe how diagrams are integrated and explained within the text</p>
            <p>• Learn from the evaluative comments - understand why certain points earn more marks</p>
            <p>• Practice rewriting answers in your own words to internalize the techniques</p>
            <p>• Compare your own attempts with these models to identify areas for improvement</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}