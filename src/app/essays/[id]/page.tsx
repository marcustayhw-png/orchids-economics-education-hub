import { notFound } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Award, Download, CheckCircle2, FileText, ArrowLeft } from "lucide-react";
import { modelEssays } from "../data";

export default function EssayDetailPage({ params }: { params: { id: string } }) {
  const essay = modelEssays.find((e) => e.id === params.id);

  if (!essay) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/essays">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to All Essays
          </Button>
        </Link>

        <div className="mb-8 space-y-4">
          <div className="flex gap-2 items-center flex-wrap">
            <Badge variant="secondary">{essay.level}</Badge>
            <Badge variant="outline">{essay.marks} marks</Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold">{essay.question}</h1>
        </div>

        <Card className="mb-6 border-l-4 border-primary">
          <CardHeader>
            <h2 className="font-semibold text-xl flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Preamble
            </h2>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">{essay.preamble}</p>
          </CardContent>
        </Card>

        <Card className="mb-6 bg-muted/50">
          <CardHeader>
            <h2 className="font-semibold text-xl flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              Essay Structure
            </h2>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{essay.structureNotes}</p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <h2 className="font-semibold text-xl flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              Examiner Comments
            </h2>
          </CardHeader>
          <CardContent className="space-y-3">
            {essay.examinerComments.map((comment, idx) => (
              <div key={idx} className="flex gap-3 items-start p-3 bg-muted rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-muted-foreground">{comment}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="mb-6 border-2 border-primary">
          <CardHeader>
            <h2 className="font-semibold text-xl">Full Model Answer</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              [Full model answer with detailed paragraphs, diagrams, examples, and evaluation. 
              Each paragraph would demonstrate strong economic analysis, use of terminology, 
              and clear linkages between points. The answer would follow the structure guide 
              provided above and incorporate all the key strengths highlighted.]
            </p>
            <Button variant="outline" className="mt-4">
              <Download className="w-4 h-4 mr-2" />
              Download Full Answer PDF
            </Button>
          </CardContent>
        </Card>

        <div className="flex justify-between items-center pt-6 border-t">
          <Link href="/essays">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to All Essays
            </Button>
          </Link>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </div>
    </div>
  );
}