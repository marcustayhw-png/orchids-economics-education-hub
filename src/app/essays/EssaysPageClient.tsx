"use client";

import { useState } from "react";
import { EssaysClient } from "./EssaysClient";
import { Sidebar } from "@/components/Sidebar";

interface Essay {
  id: number;
  essayId: string;
  question: string;
  level: string;
  marks: string;
  topic: string;
  difficulty: string;
  economicsType: string | null;
  chapter: string | null;
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
  economicsType: string | null;
  chapter: string | null;
}

export function EssaysPageClient({ 
  essays, 
  csqs 
}: { 
  essays: Essay[], 
  csqs: CSQ[] 
}) {
  const [activeTab, setActiveTab] = useState<"essays" | "csq">("essays");

  return (
    <div className="w-full">
      {/* Tab Toggle - Centered above content */}
      <div className="w-full flex justify-center mb-6 sm:mb-8 px-4">
        <div className="inline-flex rounded-xl bg-muted p-1 sm:p-1.5 shadow-sm border">
          <button
            onClick={() => setActiveTab("essays")}
            className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 ${
              activeTab === "essays"
                ? "bg-primary text-primary-foreground shadow-md"
                : "text-muted-foreground hover:text-foreground hover:bg-muted-foreground/10"
            }`}
          >
            Model Essays
          </button>
          <button
            onClick={() => setActiveTab("csq")}
            className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 ${
              activeTab === "csq"
                ? "bg-primary text-primary-foreground shadow-md"
                : "text-muted-foreground hover:text-foreground hover:bg-muted-foreground/10"
            }`}
          >
            CSQ Answers
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
        <div className="flex-1 min-w-0">
          <EssaysClient 
            initialEssays={essays} 
            initialCSQs={csqs} 
            activeTab={activeTab}
          />

          <div className="mt-8 sm:mt-12 p-6 bg-muted/50 border-2 rounded-xl overflow-hidden">
            <h2 className="text-xl font-bold mb-4">Tips for Using Model Essays & CSQs</h2>
            <div className="space-y-2 sm:space-y-3 text-sm sm:text-base text-muted-foreground">
              <p className="break-words">• Read the question carefully first, then attempt your own answer before viewing the model</p>
              <p className="break-words">• Identify the essay structure: introduction, body paragraphs (thesis & anti-thesis), and conclusion</p>
              <p className="break-words">• Note how economic concepts are defined and linked to real-world examples</p>
              <p className="break-words">• For CSQs, pay attention to command words (explain, analyse, discuss, evaluate) and adjust your response depth accordingly</p>
              <p className="break-words">• Highlight key phrases and economic terminology that can be reused in your own essays</p>
              <p className="break-words">• Practice time management by writing timed responses and comparing with these models</p>
            </div>
          </div>
        </div>

        <aside className="w-full lg:w-80 flex-shrink-0">
          <Sidebar activeTab={activeTab} />
        </aside>
      </div>
    </div>
  );
}
