import { Metadata } from "next";
import { db } from "@/db";
import { essays as essaysTable, csqs as csqsTable } from "@/db/schema";
import { desc } from "drizzle-orm";
import { EssaysClient } from "./EssaysClient";

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

        <EssaysClient initialEssays={essays as any} initialCSQs={csqs as any} />

        {/* Study Tips */}
        <div className="mt-8 sm:mt-12 p-6 bg-muted/50 border-2 rounded-xl overflow-hidden">
          <h2 className="text-xl font-bold mb-4">How to Learn from Model Answers</h2>
          <div className="space-y-2 sm:space-y-3 text-sm sm:text-base text-muted-foreground">
            <p className="break-words">• Study the structure and flow of arguments - note how each paragraph builds on the previous one</p>
            <p className="break-words">• Pay attention to how economic concepts are defined and applied to the question</p>
            <p className="break-words">• Observe how diagrams are integrated and explained within the text</p>
            <p className="break-words">• Learn from the evaluative comments - understand why certain points earn more marks</p>
            <p className="break-words">• Practice rewriting answers in your own words to internalize the techniques</p>
            <p className="break-words">• Compare your own attempts with these models to identify areas for improvement</p>
          </div>
        </div>
      </div>
    </div>
  );
}