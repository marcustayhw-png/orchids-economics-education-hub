"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Award, Download, CheckCircle2, AlertCircle, GraduationCap, Clock, Users, Star, FileText } from "lucide-react";

const modelEssays = [
{
  id: "e1",
  question: "Discuss whether fiscal policy is more effective than monetary policy in achieving economic growth.",
  level: "JC",
  marks: "15",
  preamble: "Economic growth is a key macroeconomic objective for most governments. To achieve this, policymakers can employ various demand-side policies, with fiscal and monetary policy being the two main tools. The effectiveness of these policies in promoting sustained economic growth has been widely debated among economists.",
  examinerComments: [
  "Strong introduction defining key terms and setting context",
  "Excellent use of AD-AS diagrams to illustrate points",
  "Well-balanced discussion of both policies with real-world examples",
  "Clear evaluation with well-justified conclusion"],

  keyStrengths: [
  "Precise definitions of fiscal and monetary policy",
  "Effective use of economic theory and diagrams",
  "Good consideration of time lags and implementation challenges",
  "Strong evaluative points throughout"],

  structureNotes: "Introduction → Define policies → Explain fiscal policy effectiveness → Explain monetary policy effectiveness → Evaluation comparing contexts → Conclusion"
},
{
  id: "e2",
  question: "Assess the view that free trade is always beneficial to an economy.",
  level: "JC",
  marks: "25",
  preamble: "International trade has grown significantly over the past few decades, driven by globalization and trade liberalization. Proponents argue that free trade brings numerous benefits to economies, while critics point to potential costs and challenges, particularly for developing countries and specific industries.",
  examinerComments: [
  "Thorough analysis of comparative advantage theory",
  "Good discussion of both static and dynamic gains from trade",
  "Balanced consideration of potential costs and limitations",
  "Strong use of examples from developed and developing economies"],

  keyStrengths: [
  "Clear explanation of comparative advantage with numerical examples",
  "Discussion of distributional effects on different stakeholders",
  "Consideration of infant industry argument",
  "Well-reasoned conclusion acknowledging context-dependency"],

  structureNotes: "Introduction → Theory of comparative advantage → Benefits of free trade → Limitations and costs → Evaluation based on country characteristics → Conclusion"
},
{
  id: "e3",
  question: "Explain how market forces determine prices and discuss whether governments should intervene when prices are too high.",
  level: "Secondary",
  marks: "12",
  preamble: "In a market economy, prices play a crucial role in allocating scarce resources. They are determined by the interaction of demand and supply forces. However, when prices become too high, concerns arise about affordability and access, leading to debates about the need for government intervention.",
  examinerComments: [
  "Clear explanation of demand and supply interaction",
  "Good use of diagrams showing equilibrium",
  "Balanced discussion of price control pros and cons",
  "Appropriate real-world examples"],

  keyStrengths: [
  "Accurate demand and supply diagram",
  "Clear explanation of equilibrium price formation",
  "Discussion of unintended consequences of price controls",
  "Consideration of alternative government interventions"],

  structureNotes: "Introduction → Explain demand and supply → Show equilibrium determination → Discuss government intervention (price ceiling) → Evaluate effectiveness → Conclusion"
},
{
  id: "e4",
  question: "Explain how market forces determine prices and discuss whether governments should intervene when prices are too high.",
  level: "Secondary",
  marks: "12",
  preamble: "In a market economy, prices play a crucial role in allocating scarce resources. They are determined by the interaction of demand and supply forces. However, when prices become too high, concerns arise about affordability and access, leading to debates about the need for government intervention.",
  examinerComments: [
  "Clear explanation of demand and supply interaction",
  "Good use of diagrams showing equilibrium",
  "Balanced discussion of price control pros and cons",
  "Appropriate real-world examples"],

  keyStrengths: [
  "Accurate demand and supply diagram",
  "Clear explanation of equilibrium price formation",
  "Discussion of unintended consequences of price controls",
  "Consideration of alternative government interventions"],

  structureNotes: "Introduction → Explain demand and supply → Show equilibrium determination → Discuss government intervention (price ceiling) → Evaluate effectiveness → Conclusion"
},

{
  id: "e5",
  question: "Explain how market forces determine prices and discuss whether governments should intervene when prices are too high.",
  level: "Secondary",
  marks: "12",
  preamble: "In a market economy, prices play a crucial role in allocating scarce resources. They are determined by the interaction of demand and supply forces. However, when prices become too high, concerns arise about affordability and access, leading to debates about the need for government intervention.",
  examinerComments: [
  "Clear explanation of demand and supply interaction",
  "Good use of diagrams showing equilibrium",
  "Balanced discussion of price control pros and cons",
  "Appropriate real-world examples"],

  keyStrengths: [
  "Accurate demand and supply diagram",
  "Clear explanation of equilibrium price formation",
  "Discussion of unintended consequences of price controls",
  "Consideration of alternative government interventions"],

  structureNotes: "Introduction → Explain demand and supply → Show equilibrium determination → Discuss government intervention (price ceiling) → Evaluate effectiveness → Conclusion"
},
];


const modelCSQs = [
{
  id: "c1",
  title: "Case Study: Singapore's Economic Response to COVID-19",
  level: "JC",
  parts: [
  {
    part: "a",
    question: "With reference to Extract 1, explain the causes of the recession in Singapore during 2020.",
    marks: "4",
    extract: "Extract 1: Singapore's Economy During COVID-19\n\nIn 2020, Singapore experienced its worst recession since independence, with GDP contracting by 5.4%. The aviation and tourism sectors were particularly hard hit as international travel came to a standstill. Singapore Airlines reported record losses as passenger numbers plummeted by 98% during the circuit breaker period. The manufacturing sector also faced significant challenges, with exports falling by 4.8% as global supply chains were disrupted and demand from major trading partners weakened. Domestically, consumer spending declined sharply as unemployment rose to 4.1% and businesses closed temporarily during the lockdown.",
    markingScheme: [
    "Fall in export demand due to global lockdowns (1 mark for identification + 1 mark for explanation)",
    "Decline in domestic consumption due to job losses and uncertainty (1 mark for identification + 1 mark for explanation)"],

    modelAnswer: "The recession was caused by a significant fall in aggregate demand. Firstly, export revenue declined sharply as Singapore's trading partners implemented lockdowns, reducing demand for Singapore's exports (DD falls). Secondly, domestic consumption fell due to rising unemployment and consumer uncertainty, as households became more cautious with spending (C falls). These factors combined to shift AD leftwards, resulting in negative economic growth."
  },
  {
    part: "b",
    question: "Using an AD-AS diagram, explain how the fiscal measures mentioned in Extract 2 would help the economy recover.",
    marks: "6",
    extract: "Extract 2: Government's Fiscal Response\n\nThe Singapore government introduced a series of unprecedented fiscal stimulus packages totaling S$100 billion, approximately 20% of GDP. These measures included direct cash transfers to households, wage subsidies through the Jobs Support Scheme to help businesses retain workers, and rental rebates for businesses. The government also increased spending on infrastructure projects and enhanced support for training and skills upgrading programs to prepare workers for the post-pandemic economy.",
    markingScheme: [
    "Correctly labeled AD-AS diagram (1 mark)",
    "Show rightward shift of AD (1 mark)",
    "Explain increase in government spending (G) component (2 marks)",
    "Explain multiplier effect (2 marks)"],

    modelAnswer: "The government's fiscal stimulus packages, including cash handouts and wage subsidies, increase government expenditure (G), which is a component of AD. This causes AD to shift rightwards from AD1 to AD2. The increase in G leads to a multiplier effect as the initial injection of spending generates further rounds of income and consumption. For example, wage subsidies help firms retain workers, who continue to spend, creating more income for businesses. This multiplied increase in national income helps the economy recover towards full employment equilibrium."
  },
  {
    part: "c",
    question: "Discuss whether supply-side policies would be more effective than demand-side policies in ensuring Singapore's long-term economic growth.",
    marks: "10",
    extract: "Extract 3: Singapore's Economic Strategy\n\nBeyond immediate fiscal stimulus, Singapore has focused on long-term structural transformation. The government has invested heavily in research and development, particularly in emerging sectors like artificial intelligence, biotechnology, and green technology. Initiatives to upgrade workforce skills through SkillsFuture programs have been expanded, recognizing that technological disruption requires continuous learning. However, some economists argue that with weak global demand and uncertainty persisting, demand-side measures remain crucial to support businesses and maintain employment in the near term.",
    markingScheme: [
    "Explanation of demand-side policies with examples (3 marks)",
    "Explanation of supply-side policies with examples (3 marks)",
    "Evaluation and comparison (4 marks)"],

    modelAnswer: "[Comprehensive answer would follow discussing both policy types, their mechanisms, advantages, limitations, and contextual evaluation specific to Singapore's economy]"
  }]

},
{
  id: "c2",
  title: "Case Study: Market Failure in Healthcare",
  level: "Secondary",
  parts: [
  {
    part: "a",
    question: "Explain why healthcare is considered a merit good.",
    marks: "4",
    extract: "Extract 1: Healthcare Consumption Patterns\n\nMany people avoid regular medical check-ups and preventive care despite their importance. A survey found that 40% of adults have not visited a doctor in over two years, primarily citing costs and the belief that they don't need healthcare when feeling well. Public health experts warn that this under-consumption of healthcare leads to delayed diagnoses and more severe health complications later, which are costlier to treat. Moreover, infectious diseases can spread more easily when people don't seek timely treatment, affecting the wider community.",
    markingScheme: [
    "Definition of merit good (1 mark)",
    "Explanation of positive externalities (1.5 marks)",
    "Explanation of information failure (1.5 marks)"],

    modelAnswer: "Healthcare is a merit good because it generates positive externalities and consumers tend to under-consume it due to imperfect information. When people receive healthcare, society benefits through reduced disease transmission and a healthier, more productive workforce (positive externalities). However, individuals may not fully appreciate these benefits or may undervalue preventive care, leading to under-consumption from society's perspective. Therefore, the free market would provide less than the socially optimal quantity of healthcare."
  },
  {
    part: "b",
    question: "Using a diagram, explain how government subsidies can increase consumption of healthcare.",
    marks: "6",
    extract: "Extract 2: Government Healthcare Subsidies\n\nTo address the under-consumption of healthcare, the government has introduced subsidies covering 60-80% of costs for basic healthcare services at public clinics and hospitals. The subsidies are designed to make healthcare more affordable, particularly for lower-income families. Since implementation, the number of people seeking preventive care has increased by 35%, and vaccination rates have improved significantly.",
    markingScheme: [
    "Correctly labeled demand and supply diagram (2 marks)",
    "Show downward shift of supply curve (1 mark)",
    "Explain reduction in price and increase in quantity (3 marks)"],

    modelAnswer: "Government subsidies reduce the cost of providing healthcare, causing the supply curve to shift rightward from S1 to S2. This is because healthcare providers can afford to supply more at each price level with the subsidy. As a result, the equilibrium price falls from P1 to P2, making healthcare more affordable, while the equilibrium quantity rises from Q1 to Q2. This encourages more people to consume healthcare services, moving towards the socially optimal level of consumption."
  }]

}];


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
            {modelEssays.map((essay) =>
            <Card key={essay.id} className="border-2 hover:border-primary transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      <div className="flex gap-2 items-center flex-wrap">
                        <Badge variant="secondary">{essay.level}</Badge>
                        <Badge variant="outline">{essay.marks} marks</Badge>
                      </div>
                    </div>
                    <Award className="w-6 h-6 text-primary flex-shrink-0" />
                  </div>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="question">
                      <AccordionTrigger className="text-lg font-semibold text-left">
                        {essay.question}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-6 pt-4">
                          {/* Preamble */}
                          <div className="p-4 bg-muted/50 rounded-lg border-l-4 border-primary">
                            <h4 className="font-semibold mb-2 flex items-center gap-2">
                              <FileText className="w-5 h-5 text-primary" />
                              Preamble
                            </h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">{essay.preamble}</p>
                          </div>

                          {/* Structure Guide */}
                          <div className="p-4 bg-muted rounded-lg">
                            <h4 className="font-semibold mb-2 flex items-center gap-2">
                              <CheckCircle2 className="w-5 h-5 text-green-600" />
                              Essay Structure
                            </h4>
                            <p className="text-sm text-muted-foreground">{essay.structureNotes}</p>
                          </div>

                          {/* Examiner Comments */}
                          <div className="space-y-2">
                            <h4 className="font-semibold text-base">Examiner Comments</h4>
                            {essay.examinerComments.map((comment, idx) => (
                              <div key={idx} className="flex gap-3 items-start p-3 bg-muted rounded">
                                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-muted-foreground">{comment}</p>
                              </div>
                            ))}
                          </div>

                          {/* Model Answer */}
                          <div className="p-4 bg-muted rounded-lg">
                            <h4 className="font-semibold mb-3">Full Model Answer</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              [Full model answer with detailed paragraphs, diagrams, examples, and evaluation. 
                              Each paragraph would demonstrate strong economic analysis, use of terminology, 
                              and clear linkages between points. The answer would follow the structure guide 
                              provided above and incorporate all the key strengths highlighted.]
                            </p>
                            <Button variant="outline" size="sm" className="mt-4">
                              <Download className="w-4 h-4 mr-2" />
                              Download Full Answer PDF
                            </Button>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* CSQ Answers Tab */}
          <TabsContent value="csq" id="csq" className="space-y-6">
            {modelCSQs.map((csq) =>
            <Card key={csq.id} className="border-2 hover:border-primary transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      <Badge variant="secondary">{csq.level}</Badge>
                      <CardTitle className="text-xl">{csq.title}</CardTitle>
                    </div>
                    <Award className="w-6 h-6 text-primary flex-shrink-0" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {csq.parts.map((part) =>
                <div key={part.part} className="border-l-4 border-primary pl-4">
                      <Accordion type="single" collapsible>
                        <AccordionItem value={`question-${part.part}`} className="border-none">
                          <AccordionTrigger className="text-base font-semibold hover:no-underline">
                            <div className="flex items-center gap-2 flex-wrap">
                              <Badge variant="outline">Part {part.part}</Badge>
                              <Badge variant="outline">{part.marks} marks</Badge>
                              <span className="text-left">{part.question}</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-6 pt-4">
                              {/* Extract */}
                              <div className="p-4 bg-muted/50 rounded-lg border-l-4 border-primary">
                                <h4 className="font-semibold mb-2 flex items-center gap-2">
                                  <FileText className="w-5 h-5 text-primary" />
                                  Extract
                                </h4>
                                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{part.extract}</p>
                              </div>

                              {/* Marking Scheme */}
                              <div>
                                <h4 className="font-semibold mb-3 text-base">Marking Scheme</h4>
                                <div className="space-y-2">
                                  {part.markingScheme.map((item, idx) =>
                                    <div key={idx} className="flex gap-3 items-start p-3 bg-muted rounded">
                                      <AlertCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                                      <p className="text-sm text-muted-foreground">{item}</p>
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Model Answer */}
                              <div className="p-4 bg-muted rounded-lg">
                                <h4 className="font-semibold mb-3">Model Answer</h4>
                                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                                  {part.modelAnswer}
                                </p>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                )}

                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download Complete CSQ with Answers
                  </Button>
                </CardContent>
              </Card>
            )}
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