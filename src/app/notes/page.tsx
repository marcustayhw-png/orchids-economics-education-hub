import { Metadata } from "next";
import { db } from "@/db";
import { notes as notesTable } from "@/db/schema";
import { desc } from "drizzle-orm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { NotesClient } from "./NotesClient";
import { Sidebar } from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Economics Study Notes | EconStack",
  description: "Comprehensive economics study notes for JC and Secondary school students in Singapore. Covering Microeconomics, Macroeconomics, and International Economics.",
  keywords: ["economics notes", "JC economics", "Secondary economics", "Singapore education", "A-Level Economics", "O-Level Economics"],
};

async function getNotes() {
  try {
    const results = await db.select().from(notesTable).orderBy(desc(notesTable.createdAt));
    return results;
  } catch (error) {
    console.error("Error fetching notes for SEO page:", error);
    return [];
  }
}

export default async function NotesPage() {
  const notes = await getNotes();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Economics Study Notes",
    "description": "Comprehensive economics study notes organized by topic and level.",
    "itemListElement": notes.slice(0, 20).map((note, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Course",
        "name": note.title,
        "description": note.description,
        "educationalLevel": note.level,
        "courseCode": note.category,
        "about": {
          "@type": "Thing",
          "name": Array.isArray(note.topics) ? note.topics.join(", ") : ""
        }
      }
    }))
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
        <div className="text-center mb-12 sm:mb-16 space-y-4 sm:space-y-5">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight break-words px-2 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
            Economics Notes
          </h1>
          <p className="text-base sm:text-lg leading-relaxed text-muted-foreground/90 max-w-2xl mx-auto break-words px-2">
            Comprehensive study notes organized by topic and difficulty level. Access high-quality resources for JC H1/H2 and Secondary School Economics.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 min-w-0">
            <NotesClient initialNotes={notes as any} />

            <Card className="mt-10 sm:mt-14 bg-gradient-to-br from-muted/30 to-muted/10 border border-border/50 overflow-hidden">
              <CardHeader>
                <CardTitle className="break-words text-xl sm:text-2xl font-bold tracking-tight">Study Guide</CardTitle>
                <CardDescription className="text-sm sm:text-base">Maximize your learning with these proven strategies</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4 text-sm sm:text-base text-muted-foreground/90">
                <div className="flex gap-3 items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">1</div>
                  <p className="break-words leading-relaxed">Read through the notes systematically, starting from basic concepts before moving to advanced topics</p>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">2</div>
                  <p className="break-words leading-relaxed">Draw your own diagrams to reinforce understanding of economic models</p>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">3</div>
                  <p className="break-words leading-relaxed">Attempt to explain concepts in your own words to test comprehension</p>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">4</div>
                  <p className="break-words leading-relaxed">Link theoretical concepts to real-world examples from current affairs</p>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">5</div>
                  <p className="break-words leading-relaxed">Use these notes alongside model essays and practice questions for comprehensive exam preparation</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <aside className="w-full lg:w-80 flex-shrink-0">
            <Sidebar />
          </aside>
        </div>
      </div>
    </div>
  );
}
