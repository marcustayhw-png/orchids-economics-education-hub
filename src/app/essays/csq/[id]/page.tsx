import { Metadata } from "next";
import { db } from "@/db";
import { csqs as csqsTable, csqParts as csqPartsTable } from "@/db/schema";
import { eq, asc } from "drizzle-orm";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { CSQSimulator } from "./CSQSimulator";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const csq = await db.query.csqs.findFirst({
    where: eq(csqsTable.csqId, params.id)
  });

  if (!csq) return { title: "CSQ Not Found | EconStack" };

  return {
    title: `${csq.title} | Case Study Question | EconStack`,
    description: `Detailed analysis and model answers for the economics case study: ${csq.title}. Level: ${csq.level}.`,
  };
}

async function getCSQData(id: string) {
  const csq = await db.query.csqs.findFirst({
    where: eq(csqsTable.csqId, id),
    with: {
      parts: {
        orderBy: [asc(csqPartsTable.orderIndex)]
      }
    }
  });

  return csq;
}

export default async function CSQDetailPage({ params }: { params: { id: string } }) {
  const csq = await getCSQData(params.id);

  if (!csq) {
    return (
      <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">CSQ Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The case study question you're looking for doesn't exist.
          </p>
          <Link href="/essays">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to All CSQs
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Nav for CSQ Detail */}
      <div className="bg-muted/30 border-b px-4 py-2 flex items-center justify-between">
        <Link href="/essays">
          <Button variant="ghost" size="sm" className="h-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to All CSQs
          </Button>
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground hidden sm:block">Interactive Simulator Mode</span>
        </div>
      </div>

      <main className="flex-1">
        <CSQSimulator csq={csq as any} />
      </main>
    </div>
  );
}