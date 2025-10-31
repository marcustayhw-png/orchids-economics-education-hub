import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, FileText, PenTool, Target, Award, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
                Master Economics with
                <span className="block text-primary mt-2">Comprehensive Resources</span>
              </h1>
              <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto">
                A curated collection of notes, model essays, CSQ answers, and practice questions for JC and Secondary School Economics students
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild size="lg" className="text-lg px-8">
                <Link href="/notes">Explore Notes</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8">
                <Link href="/about">Learn About This Project</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 max-w-4xl mx-auto">
              <div className="space-y-2">
                <div className="text-4xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Study Notes</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-primary">30+</div>
                <div className="text-sm text-muted-foreground">Model Essays</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-primary">25+</div>
                <div className="text-sm text-muted-foreground">CSQ Answers</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-primary">100+</div>
                <div className="text-sm text-muted-foreground">Practice Questions</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Everything You Need to Excel</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive resources designed to help students understand and master economics concepts
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-2 hover:border-primary transition-colors">
              <CardHeader>
                <BookOpen className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Comprehensive Notes</CardTitle>
                <CardDescription>
                  Detailed notes covering all major topics for both JC and Secondary School Economics, organized by theme and difficulty
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="link" className="px-0">
                  <Link href="/notes">View Notes →</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-colors">
              <CardHeader>
                <FileText className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Model Essays</CardTitle>
                <CardDescription>
                  High-quality model essays with examiner comments, marking schemes, and detailed analysis of exemplary answers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="link" className="px-0">
                  <Link href="/essays">View Essays →</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-colors">
              <CardHeader>
                <PenTool className="w-12 h-12 text-primary mb-4" />
                <CardTitle>CSQ Solutions</CardTitle>
                <CardDescription>
                  Step-by-step solutions to Case Study Questions with marking points and examiner insights
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="link" className="px-0">
                  <Link href="/essays#csq">View CSQ →</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-colors">
              <CardHeader>
                <Target className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Practice Questions</CardTitle>
                <CardDescription>
                  Interactive question bank with filtering by topic and difficulty, complete with detailed answers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="link" className="px-0">
                  <Link href="/practice">Start Practicing →</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-colors">
              <CardHeader>
                <Award className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Quality Content</CardTitle>
                <CardDescription>
                  All resources are carefully curated and aligned with MOE syllabus requirements and exam formats
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary transition-colors">
              <CardHeader>
                <Users className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Student-Focused</CardTitle>
                <CardDescription>
                  Designed with students in mind, making complex economics concepts accessible and easy to understand
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold">My Mission</h2>
          <div className="text-lg text-muted-foreground space-y-4 leading-relaxed">
            <p>
              This platform represents my commitment to making quality economics education accessible to all students. 
              As an aspiring economics educator, I believe that every student deserves access to comprehensive, 
              well-structured learning resources that can help them excel in their studies.
            </p>
            <p>
              Through this project, I aim to demonstrate my passion for teaching and my dedication to improving 
              economics education in Singapore. My goal is to support students in their learning journey and 
              contribute to the broader educational community.
            </p>
          </div>
          <Button asChild size="lg" variant="outline">
            <Link href="/about">Read My Full Story</Link>
          </Button>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold">Ready to Start Learning?</h2>
          <p className="text-lg opacity-90">
            Explore our comprehensive collection of resources and take your economics understanding to the next level
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/notes">Browse Notes</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
              <Link href="/practice">Start Practicing</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}