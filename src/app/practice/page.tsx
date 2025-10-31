"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Eye, EyeOff, Filter } from "lucide-react";

type Question = {
  id: string;
  question: string;
  topic: string;
  difficulty: "Easy" | "Medium" | "Hard";
  level: "Secondary" | "JC";
  marks: number;
  answer: string;
};

const practiceQuestions: Question[] = [
  {
    id: "q1",
    question: "Define the term 'opportunity cost' and provide a real-world example.",
    topic: "Basic Economic Problem",
    difficulty: "Easy",
    level: "Secondary",
    marks: 2,
    answer: "Opportunity cost is the benefit forgone from the next best alternative when making a choice. For example, if a student chooses to spend 2 hours studying economics, the opportunity cost might be the enjoyment they would have gained from watching a movie or the income from working part-time during those 2 hours.",
  },
  {
    id: "q2",
    question: "Using a demand and supply diagram, explain how a subsidy on electric vehicles would affect the market equilibrium.",
    topic: "Demand and Supply",
    difficulty: "Medium",
    level: "Secondary",
    marks: 6,
    answer: "A subsidy on electric vehicles effectively reduces the cost of production for manufacturers. This causes the supply curve to shift rightward from S1 to S2. At the original price P1, there is now excess supply, putting downward pressure on price. The new equilibrium is established at a lower price (P2) and higher quantity (Q2). This achieves the government's objective of encouraging greater consumption of electric vehicles to reduce carbon emissions.",
  },
  {
    id: "q3",
    question: "Explain two reasons why the demand for petrol is likely to be price inelastic.",
    topic: "Elasticity",
    difficulty: "Medium",
    level: "Secondary",
    marks: 4,
    answer: "Firstly, petrol is a necessity for many people who need to drive to work, with few close substitutes in the short run. Even if price rises, consumers cannot easily switch to alternatives like public transport if it's unavailable or inconvenient. Secondly, petrol represents a small proportion of most households' income. A 10% rise in petrol price has minimal impact on total expenditure, so consumers don't significantly reduce consumption in response to price changes.",
  },
  {
    id: "q4",
    question: "Explain how the multiplier process works when there is an increase in government spending.",
    topic: "Fiscal Policy",
    difficulty: "Hard",
    level: "JC",
    marks: 8,
    answer: "When government increases spending, there is an initial injection into the circular flow of income. For example, if the government spends $100m on infrastructure, this becomes income for construction firms and workers. They will spend a proportion of this income (determined by MPC), creating income for others. If MPC is 0.8, the initial $100m generates $80m in the second round, then $64m in the third round, and so on. The multiplier = 1/(1-MPC) = 1/0.2 = 5. Therefore, the total increase in national income = $100m × 5 = $500m. However, the multiplier effect may be weakened by withdrawals (savings, taxes, imports) and supply constraints in the economy.",
  },
  {
    id: "q5",
    question: "Discuss whether monetary policy is effective in controlling inflation.",
    topic: "Monetary Policy",
    difficulty: "Hard",
    level: "JC",
    marks: 12,
    answer: "[Detailed essay answer discussing: definition of monetary policy and inflation; how contractionary monetary policy (raising interest rates) works through various transmission mechanisms; effectiveness depends on type of inflation (demand-pull vs cost-push); time lags involved; side effects on growth and unemployment; comparison with other policies; contextual evaluation based on economic conditions. Conclusion would provide balanced judgment based on circumstances.]",
  },
  {
    id: "q6",
    question: "Explain the law of comparative advantage using a numerical example.",
    topic: "International Trade",
    difficulty: "Medium",
    level: "JC",
    marks: 6,
    answer: "The law of comparative advantage states that countries should specialize in producing goods where they have the lowest opportunity cost. Example: Country A can produce either 100 units of cloth OR 50 units of wine. Country B can produce either 60 units of cloth OR 60 units of wine. For Country A: 1 wine costs 2 cloth (100/50). For Country B: 1 wine costs 1 cloth (60/60). Country B has comparative advantage in wine (lower opportunity cost). Country A has comparative advantage in cloth. Even though Country A is absolutely more efficient at producing both goods, both countries gain from trade if A specializes in cloth and B in wine, then they trade.",
  },
  {
    id: "q7",
    question: "Explain two government measures to correct the market failure caused by demerit goods.",
    topic: "Market Failure",
    difficulty: "Medium",
    level: "Secondary",
    marks: 6,
    answer: "Firstly, the government can impose indirect taxes on demerit goods like cigarettes. This increases the price, reducing quantity demanded, especially if demand is price elastic. The tax internalizes the negative externalities by making consumers pay closer to the true social cost. Secondly, the government can use regulation, such as banning advertising or restricting sales to certain age groups. This reduces information failure and limits accessibility, thereby reducing over-consumption of the demerit good.",
  },
  {
    id: "q8",
    question: "Define GDP and explain one limitation of using GDP as a measure of living standards.",
    topic: "National Income",
    difficulty: "Easy",
    level: "JC",
    marks: 4,
    answer: "GDP (Gross Domestic Product) is the total value of all final goods and services produced within a country's borders in a given time period. One limitation is that GDP does not account for income distribution. A country may have high GDP per capita, but if income is concentrated among a small wealthy elite, the majority may have low living standards. GDP figures alone don't reveal whether economic growth benefits everyone or just a privileged few.",
  },
];

export default function PracticePage() {
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [selectedTopic, setSelectedTopic] = useState<string>("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [revealedAnswers, setRevealedAnswers] = useState<Set<string>>(new Set());

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
    setRevealedAnswers(new Set(filteredQuestions.map(q => q.id)));
  };

  const hideAllAnswers = () => {
    setRevealedAnswers(new Set());
  };

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
                    </div>
                    <CardTitle className="text-lg leading-relaxed">{q.question}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={() => toggleAnswer(q.id)}
                  variant={revealedAnswers.has(q.id) ? "default" : "outline"}
                  className="w-full sm:w-auto"
                >
                  {revealedAnswers.has(q.id) ? (
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

                {revealedAnswers.has(q.id) && (
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
