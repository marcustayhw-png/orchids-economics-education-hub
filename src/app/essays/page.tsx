import { Metadata } from "next";
import { db } from "@/db";
import { essays as essaysTable, csqs as csqsTable } from "@/db/schema";
import { desc } from "drizzle-orm";
import { EssaysClient } from "./EssaysClient";
import { Sidebar } from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Economics Model Essays & CSQ Answers | EconStack",
  description: "Learn from high-quality economics model essays and Case Study Question (CSQ) answers. Detailed examiner comments and marking schemes for JC and Secondary students.",
  keywords: ["economics model essays", "CSQ model answers", "JC economics model answers", "Singapore economics essays", "H2 Economics essays"],
};

async function getData() {
  try {
    const [essays, csqs] = await Promise.all([
      db.select().from(essaysTable).orderBy(desc(essaysTable.createdAt)),
      db.select().from(csqsTable).orderBy(desc(csqsTable.createdAt))
    ]);
    return { essays, csqs };
  } catch (error) {
    console.error("Error fetching essays/csqs for SEO page:", error);
    return { essays: [], csqs: [] };
  }
}

export default async function EssaysPage() {
  const { essays, csqs } = await getData();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      ...essays.slice(0, 5).map(essay => ({
        "@type": "Question",
        "name": essay.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Level: ${essay.level}, Topic: ${essay.topic}. View the full model answer on EconStack.`
        }
      })),
      ...csqs.slice(0, 5).map(csq => ({
        "@type": "Question",
        "name": csq.title,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Case Study Level: ${csq.level}, Topic: ${csq.topic}. View the full case study analysis and answers on EconStack.`
        }
      }))
    ]
  };

  return (
    <div className="min-h-screen bg-background py-8 sm:py-12 px-4 sm:px-6 lg:px-8 overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 space-y-3 sm:space-y-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold break-words px-2">Model Essays & CSQ Answers</h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto break-words px-2">
            Learn from high-quality model answers with detailed examiner comments, marking schemes, and analysis of what makes them exemplary.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 min-w-0">
            <EssaysClient initialEssays={essays as any} initialCSQs={csqs as any} />

            {/* Study Tips */}
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
            <Sidebar />
          </aside>
        </div>
      </div>
    </div>
  );
}