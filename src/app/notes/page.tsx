"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, BookOpen } from "lucide-react";

const secondaryNotes = [
  {
    id: "s1",
    title: "Introduction to Economics",
    category: "Fundamentals",
    topics: ["Basic Economic Problem", "Scarcity and Choice", "Opportunity Cost", "Production Possibility Curve"],
    description: "Understanding the fundamental concepts of economics and how societies allocate resources",
  },
  {
    id: "s2",
    title: "Demand and Supply",
    category: "Market Forces",
    topics: ["Law of Demand", "Law of Supply", "Market Equilibrium", "Price Mechanism", "Consumer & Producer Surplus"],
    description: "Learn how prices are determined through the interaction of demand and supply forces",
  },
  {
    id: "s3",
    title: "Elasticity",
    category: "Market Forces",
    topics: ["Price Elasticity of Demand", "Income Elasticity", "Cross Elasticity", "Price Elasticity of Supply"],
    description: "Understanding responsiveness of quantity demanded/supplied to changes in price and income",
  },
  {
    id: "s4",
    title: "Market Failure",
    category: "Government Intervention",
    topics: ["Public Goods", "Externalities", "Merit & Demerit Goods", "Imperfect Information"],
    description: "Examine situations where markets fail to allocate resources efficiently",
  },
  {
    id: "s5",
    title: "Government Intervention",
    category: "Government Intervention",
    topics: ["Taxation", "Subsidies", "Price Controls", "Direct Provision", "Regulation"],
    description: "Study various government policies to correct market failures",
  },
];

const jcNotes = [
  {
    id: "j1",
    title: "Macroeconomic Aims",
    category: "Macroeconomics",
    topics: ["Economic Growth", "Full Employment", "Price Stability", "Balance of Payments Equilibrium"],
    description: "Understanding the four key macroeconomic objectives of governments",
  },
  {
    id: "j2",
    title: "National Income Accounting",
    category: "Macroeconomics",
    topics: ["GDP Measurement", "Real vs Nominal GDP", "GDP Deflator", "Limitations of GDP"],
    description: "Learn how to measure and evaluate a country's economic performance",
  },
  {
    id: "j3",
    title: "Aggregate Demand & Supply",
    category: "Macroeconomics",
    topics: ["Components of AD", "AS Curve", "AD-AS Model", "Inflationary & Deflationary Gaps"],
    description: "Master the AD-AS framework for analyzing macroeconomic issues",
  },
  {
    id: "j4",
    title: "Fiscal Policy",
    category: "Macroeconomic Policies",
    topics: ["Government Spending", "Taxation", "Budget Balance", "Multiplier Effect", "Crowding Out"],
    description: "Explore how governments use spending and taxation to influence the economy",
  },
  {
    id: "j5",
    title: "Monetary Policy",
    category: "Macroeconomic Policies",
    topics: ["Interest Rates", "Money Supply", "Exchange Rate Policy", "Transmission Mechanism"],
    description: "Study how central banks manage the economy through monetary tools",
  },
  {
    id: "j6",
    title: "Supply-Side Policies",
    category: "Macroeconomic Policies",
    topics: ["Market-Based Policies", "Interventionist Policies", "Education & Training", "Infrastructure"],
    description: "Learn about policies that increase the productive capacity of the economy",
  },
  {
    id: "j7",
    title: "International Trade",
    category: "International Economics",
    topics: ["Comparative Advantage", "Free Trade Benefits", "Protectionism", "Trade Agreements", "WTO"],
    description: "Understand the theory and practice of international trade",
  },
  {
    id: "j8",
    title: "Exchange Rates",
    category: "International Economics",
    topics: ["Determination of Exchange Rates", "Fixed vs Floating", "Marshall-Lerner Condition", "J-Curve Effect"],
    description: "Study how exchange rates are determined and their economic impacts",
  },
  {
    id: "j9",
    title: "Globalization",
    category: "International Economics",
    topics: ["Causes of Globalization", "Benefits & Costs", "MNCs", "Capital Flows"],
    description: "Examine the growing interdependence of economies worldwide",
  },
];

export default function NotesPage() {
  const [selectedLevel, setSelectedLevel] = useState("secondary");

  const notes = selectedLevel === "secondary" ? secondaryNotes : jcNotes;

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
                                <p className="text-sm text-muted-foreground mb-3">
                                  Detailed explanation of {topic.toLowerCase()} including definitions, diagrams, 
                                  real-world examples, and common exam questions. Content is aligned with MOE syllabus 
                                  requirements and includes tips for answering exam questions effectively.
                                </p>
                                <Button variant="outline" size="sm">
                                  <Download className="w-4 h-4 mr-2" />
                                  Download PDF
                                </Button>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="jc" className="space-y-6">
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
                                <p className="text-sm text-muted-foreground mb-3">
                                  In-depth coverage of {topic.toLowerCase()} with advanced economic analysis, 
                                  mathematical models where applicable, case studies, and examination techniques. 
                                  Includes essay and CSQ question examples with model answers.
                                </p>
                                <Button variant="outline" size="sm">
                                  <Download className="w-4 h-4 mr-2" />
                                  Download PDF
                                </Button>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              ))}
            </div>
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
