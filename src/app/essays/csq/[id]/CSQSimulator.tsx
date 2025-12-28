"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info, HelpCircle, CheckCircle2, ChevronRight, BookOpen, PenTool, Award, Trophy, Clock, Target, Timer } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

export function CSQSimulator({ csq }: { csq: CSQ }) {
  const [selectedPartIndex, setSelectedPartIndex] = useState(0);
  const [highlightedText, setHighlightedText] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [tooltipContent, setTooltipContent] = useState("");
  const [activeTabMobile, setActiveTabMobile] = useState<"extract" | "questions">("extract");
  const extractRef = useRef<HTMLDivElement>(null);

  const selectedPart = csq.parts[selectedPartIndex];

    const totalMarks = csq.parts.reduce((acc, part) => acc + parseInt(part.marks || "0"), 0);

    // Mock evidence clues for the highlighting feature
  // In a real app, these would come from the database
  const clues = [
    { text: "price of steel increased", explanation: "This indicates an increase in cost of production, leading to a leftward shift in the supply curve." },
    { text: "income levels rose by 5%", explanation: "For a normal good, this leads to an increase in demand (rightward shift)." },
    { text: "government implemented a subsidy", explanation: "Subsidies lower the cost of production for firms, increasing supply." },
    { text: "consumer preferences shifted towards", explanation: "This is a non-price factor affecting demand directly." },
    { text: "unemployment rate reached 10%", explanation: "Evidence of a recessionary output gap in the macroeconomy." }
  ];

  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim().length > 0) {
      const text = selection.toString().toLowerCase().trim();
      const clue = clues.find(c => text.includes(c.text.toLowerCase()) || c.text.toLowerCase().includes(text));
      
      if (clue) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        setTooltipPos({ 
          x: rect.left + rect.width / 2, 
          y: rect.top - 10 
        });
        setTooltipContent(clue.explanation);
        setShowTooltip(true);
      } else {
        setShowTooltip(false);
      }
    } else {
      setShowTooltip(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mouseup", handleTextSelection);
    return () => document.removeEventListener("mouseup", handleTextSelection);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-120px)] min-h-[600px] border rounded-xl overflow-hidden bg-background relative">
      {/* Mobile Toggle Bar */}
      <div className="lg:hidden flex border-b bg-muted/30 sticky top-0 z-20">
        <button
          onClick={() => setActiveTabMobile("extract")}
          className={`flex-1 py-3 px-4 text-xs font-bold uppercase tracking-wider transition-all border-b-2 flex items-center justify-center gap-2 ${
            activeTabMobile === "extract" 
              ? "border-primary text-primary bg-background" 
              : "border-transparent text-muted-foreground hover:bg-muted/50"
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          Extract
        </button>
        <button
          onClick={() => setActiveTabMobile("questions")}
          className={`flex-1 py-3 px-4 text-xs font-bold uppercase tracking-wider transition-all border-b-2 flex items-center justify-center gap-2 ${
            activeTabMobile === "questions" 
              ? "border-primary text-primary bg-background" 
              : "border-transparent text-muted-foreground hover:bg-muted/50"
          }`}
        >
          <PenTool className="w-3.5 h-3.5" />
          Questions
        </button>
      </div>

      {/* Left Column: Case Study Extract */}
      <div className={`w-full lg:w-1/2 flex flex-col border-r bg-muted/5 ${
        activeTabMobile === "extract" ? "flex" : "hidden lg:flex"
      }`}>
        <div className="p-4 border-b bg-muted/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-primary" />
            <h3 className="font-bold text-sm">Case Study Data & Extracts</h3>
          </div>
          <Badge variant="outline" className="text-[10px] h-5">Highlight text for clues</Badge>
        </div>
        
        <ScrollArea className="flex-1 p-6 sm:p-8" ref={extractRef}>
          <div className="max-w-prose mx-auto space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight">{csq.title}</h2>
              <div className="flex gap-2">
                <Badge variant="secondary">{csq.level}</Badge>
                <Badge variant="outline">Case Study Analysis</Badge>
              </div>
            </div>

            <div className="prose prose-slate dark:prose-invert max-w-none">
              <div 
                className="selection:bg-primary/20 selection:text-primary leading-relaxed text-base sm:text-lg"
                dangerouslySetInnerHTML={{ __html: selectedPart?.extract || "No extract available for this part." }}
              />
            </div>

            <Card className="bg-primary/5 border-dashed">
              <CardContent className="pt-6">
                <p className="text-xs text-muted-foreground flex items-start gap-2 italic leading-relaxed">
                  <Info className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  Tip: Actively read the extract. Highlight key economic data or events mentioned in the text to see how they link to economic theory.
                </p>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
      </div>

        {/* Right Column: Questions & Answers */}
        <div className={`w-full lg:w-1/2 flex flex-col bg-card ${
          activeTabMobile === "questions" ? "flex" : "hidden lg:flex"
        }`}>
          <div className="p-4 border-b flex flex-col gap-4">
            <div className="flex items-center justify-between overflow-x-auto gap-4 scrollbar-hide">
              <div className="flex items-center gap-2 whitespace-nowrap">
                <PenTool className="w-4 h-4 text-primary" />
                <h3 className="font-bold text-sm">Questions & Solutions</h3>
              </div>
              <div className="flex gap-1">
                {csq.parts.map((_, idx) => (
                  <Button 
                    key={idx}
                    variant={selectedPartIndex === idx ? "default" : "ghost"}
                    size="sm"
                    className="h-7 w-7 p-0 text-xs"
                    onClick={() => setSelectedPartIndex(idx)}
                  >
                    {csq.parts[idx].part}
                  </Button>
                ))}
              </div>
            </div>

            {/* Assessment Stats Summary */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-100 dark:bg-amber-900/40 border border-amber-200 dark:border-amber-800/60 shadow-sm transition-all hover:scale-[1.02]">
                <Trophy className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-amber-700 dark:text-amber-300 uppercase leading-none">Total Marks</span>
                  <span className="text-xs font-black text-amber-800 dark:text-amber-200">{totalMarks}</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 border border-indigo-200 dark:border-indigo-800/60 shadow-sm transition-all hover:scale-[1.02]">
                <Timer className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-indigo-700 dark:text-indigo-300 uppercase leading-none">Total Time</span>
                  <span className="text-xs font-black text-indigo-800 dark:text-indigo-200">{estimatedTotalTime} Mins</span>
                </div>
              </div>
            </div>
          </div>

          <ScrollArea className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedPartIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-6 sm:p-8 space-y-8"
              >
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors">Part {selectedPart?.part}</Badge>
                        <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50">
                          <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase">
                            {parseInt(selectedPart?.marks) <= 4 ? "Easy" : parseInt(selectedPart?.marks) <= 8 ? "Medium" : "Hard"}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/50 shadow-sm">
                          <Trophy className="w-3.5 h-3.5 text-amber-500" />
                          <span className="text-xs font-bold text-amber-700 dark:text-amber-300">{selectedPart?.marks} Marks</span>
                        </div>
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 shadow-sm">
                          <Clock className="w-3.5 h-3.5 text-indigo-500" />
                          <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300">{Math.ceil(parseInt(selectedPart?.marks) * 1.5)} Mins</span>
                        </div>
                      </div>
                    </div>
                  <h3 className="text-xl font-bold leading-snug">{selectedPart?.question}</h3>
                </div>


              <Tabs defaultValue="marking" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="marking" className="text-xs sm:text-sm">Marking Scheme</TabsTrigger>
                  <TabsTrigger value="model" className="text-xs sm:text-sm">Model Answer</TabsTrigger>
                </TabsList>
                
                <TabsContent value="marking" className="space-y-4 animate-in fade-in-50 duration-500">
                  <div className="bg-muted/50 rounded-xl p-6 border">
                    <h4 className="font-bold text-sm mb-4 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      Step-by-Step Marking Logic
                    </h4>
                    <ul className="space-y-4">
                      {selectedPart?.markingScheme?.map((item, idx) => (
                        <li key={idx} className="flex gap-3 items-start group">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-background border flex items-center justify-center text-[10px] font-bold group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                            {idx + 1}
                          </span>
                          <p className="text-sm text-muted-foreground leading-relaxed pt-0.5">{item}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>

                <TabsContent value="model" className="animate-in fade-in-50 duration-500">
                  <div className="bg-primary/5 rounded-xl p-6 border border-primary/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-3 opacity-10">
                      <Award className="w-12 h-12" />
                    </div>
                    <div 
                      className="prose prose-sm dark:prose-invert max-w-none text-base leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: selectedPart?.modelAnswer || "No answer available." }}
                    />
                  </div>
                </TabsContent>
              </Tabs>

              {selectedPartIndex < csq.parts.length - 1 && (
                <Button 
                  onClick={() => setSelectedPartIndex(prev => prev + 1)}
                  variant="outline"
                  className="w-full group hover:border-primary transition-all py-6"
                >
                  Next Part
                  <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              )}
            </motion.div>
          </AnimatePresence>
        </ScrollArea>
      </div>

      {/* Floating Tooltip for evidence clues */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            style={{ 
              position: "fixed", 
              top: tooltipPos.y, 
              left: tooltipPos.x,
              transform: "translate(-50%, -100%)",
              zIndex: 100 
            }}
            className="pointer-events-none"
          >
            <div className="bg-primary text-primary-foreground px-4 py-3 rounded-lg shadow-2xl max-w-xs border-2 border-primary-foreground/20">
              <div className="flex items-start gap-2">
                <HelpCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <p className="text-sm font-medium leading-relaxed">
                  {tooltipContent}
                </p>
              </div>
              <div className="absolute bottom-[-8px] left-1/2 -translate-x-1/2 w-4 h-4 bg-primary rotate-45" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
