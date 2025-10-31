import { notFound } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Award, Download, AlertCircle, FileText, ArrowLeft } from "lucide-react";
import { modelCSQs } from "../../data";

export default function CSQDetailPage({ params }: { params: { id: string } }) {
  const csq = modelCSQs.find((c) => c.id === params.id);

  if (!csq) {
    notFound();
  }

  const totalMarks = csq.parts.reduce((sum, p) => sum + parseInt(p.marks), 0);

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/essays">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to All CSQs
          </Button>
        </Link>

        <div className="mb-8 space-y-4">
          <div className="flex gap-2 items-center flex-wrap">
            <Badge variant="secondary">{csq.level}</Badge>
            <Badge variant="outline">{totalMarks} total marks</Badge>
            <Badge variant="outline">{csq.parts.length} parts</Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold flex items-center gap-3">
            <Award className="w-8 h-8 text-primary flex-shrink-0" />
            {csq.title}
          </h1>
        </div>

        {csq.parts.map((part) => (
          <div key={part.part} className="mb-8">
            <Card className="border-2 border-primary">
              <CardHeader className="bg-primary/5">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex gap-2 items-center flex-wrap">
                      <Badge>Part {part.part}</Badge>
                      <Badge variant="outline">{part.marks} marks</Badge>
                    </div>
                    <h2 className="text-xl font-semibold">{part.question}</h2>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div className="p-4 bg-muted/50 rounded-lg border-l-4 border-primary">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    Extract
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                    {part.extract}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3">Marking Scheme</h3>
                  <div className="space-y-2">
                    {part.markingScheme.map((item, idx) => (
                      <div key={idx} className="flex gap-3 items-start p-3 bg-muted rounded-lg">
                        <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-muted-foreground">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-primary/5 rounded-lg border-2 border-primary">
                  <h3 className="font-semibold text-lg mb-3">Model Answer</h3>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {part.modelAnswer}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}

        <Card className="bg-muted/50 border-2">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <h3 className="font-semibold text-lg mb-1">Complete Case Study</h3>
                <p className="text-sm text-muted-foreground">
                  Download the full CSQ with all extracts, questions, and model answers
                </p>
              </div>
              <Button>
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between items-center pt-6 border-t mt-6">
          <Link href="/essays">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to All CSQs
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
