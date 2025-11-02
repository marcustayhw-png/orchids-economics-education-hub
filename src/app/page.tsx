import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, FileText, PenTool, Target, Award, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-6 sm:space-y-8">
            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-tight">
                Master Economics with
                <span className="block text-primary mt-1 sm:mt-2">Comprehensive Resources</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto px-2">
                A curated collection of notes, model essays, CSQ answers, and practice questions for JC and Secondary School Economics students
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
              <Button asChild size="lg" className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 h-11 sm:h-12">
                <Link href="/notes">Explore Notes</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 h-11 sm:h-12">
                <Link href="/about">Learn About This Project</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 pt-8 sm:pt-12 max-w-4xl mx-auto px-2">
              <div className="space-y-1 sm:space-y-2">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary">50+</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Study Notes</div>
              </div>
              <div className="space-y-1 sm:space-y-2">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary">30+</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Model Essays</div>
              </div>
              <div className="space-y-1 sm:space-y-2">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary">25+</div>
                <div className="text-xs sm:text-sm text-muted-foreground">CSQ Answers</div>
              </div>
              <div className="space-y-1 sm:space-y-2">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary">100+</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Practice Questions</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 px-2">Everything You Need to Excel</h2>
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              Comprehensive resources designed to help students understand and master economics concepts
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            <Card className="border-2 hover:border-primary transition-colors">
              <CardHeader className="pb-3 sm:pb-6">
                <BookOpen className="w-10 h-10 sm:w-12 sm:h-12 text-primary mb-3 sm:mb-4" />
                <CardTitle className="text-lg sm:text-xl">Comprehensive Notes</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Detailed notes covering all major topics for both JC and Secondary School Economics, organized by theme and difficulty
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button asChild variant="link" className="px-0 h-auto text-sm sm:text-base">
                  <Link href="/notes">View Notes →</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-colors">
              <CardHeader className="pb-3 sm:pb-6">
                <FileText className="w-10 h-10 sm:w-12 sm:h-12 text-primary mb-3 sm:mb-4" />
                <CardTitle className="text-lg sm:text-xl">Model Essays</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  High-quality model essays with examiner comments, marking schemes, and detailed analysis of exemplary answers
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button asChild variant="link" className="px-0 h-auto text-sm sm:text-base">
                  <Link href="/essays">View Essays →</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-colors">
              <CardHeader className="pb-3 sm:pb-6">
                <PenTool className="w-10 h-10 sm:w-12 sm:h-12 text-primary mb-3 sm:mb-4" />
                <CardTitle className="text-lg sm:text-xl">CSQ Solutions</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Step-by-step solutions to Case Study Questions with marking points and examiner insights
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button asChild variant="link" className="px-0 h-auto text-sm sm:text-base">
                  <Link href="/essays#csq">View CSQ →</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-colors">
              <CardHeader className="pb-3 sm:pb-6">
                <Target className="w-10 h-10 sm:w-12 sm:h-12 text-primary mb-3 sm:mb-4" />
                <CardTitle className="text-lg sm:text-xl">Practice Questions</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Interactive question bank with filtering by topic and difficulty, complete with detailed answers
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button asChild variant="link" className="px-0 h-auto text-sm sm:text-base">
                  <Link href="/practice">Start Practicing →</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-colors">
              <CardHeader className="pb-3 sm:pb-6">
                <Award className="w-10 h-10 sm:w-12 sm:h-12 text-primary mb-3 sm:mb-4" />
                <CardTitle className="text-lg sm:text-xl">Quality Content</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  All resources are carefully curated and aligned with MOE syllabus requirements and exam formats
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary transition-colors">
              <CardHeader className="pb-3 sm:pb-6">
                <Users className="w-10 h-10 sm:w-12 sm:h-12 text-primary mb-3 sm:mb-4" />
                <CardTitle className="text-lg sm:text-xl">Student-Focused</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Designed with students in mind, making complex economics concepts accessible and easy to understand
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-6">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold px-2">My Mission</h2>
          <div className="text-sm sm:text-base lg:text-lg text-muted-foreground space-y-3 sm:space-y-4 leading-relaxed px-4">
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
          <Button asChild size="lg" variant="outline" className="w-full sm:w-auto h-11 sm:h-12 text-base sm:text-lg">
            <Link href="/about">Read My Full Story</Link>
          </Button>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-6">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold px-2">Ready to Start Learning?</h2>
          <p className="text-sm sm:text-base lg:text-lg opacity-90 px-4">
            Explore our comprehensive collection of resources and take your economics understanding to the next level
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto h-11 sm:h-12 text-base sm:text-lg">
              <Link href="/notes">Browse Notes</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto h-11 sm:h-12 text-base sm:text-lg bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
              <Link href="/practice">Start Practicing</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}