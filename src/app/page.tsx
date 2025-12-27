"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, FileText, PenTool, Award, Users, Sparkles, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const [stats, setStats] = useState({
    notes: 0,
    essays: 0,
    csqs: 0,
    flashcards: 0,
    isLoading: true
  });

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "EconStack",
    "description": "Comprehensive economics education platform providing study notes, model essays, CSQ answers, and interactive flashcards for JC and Secondary School Economics students in Singapore",
    "url": typeof window !== "undefined" ? window.location.origin : "",
    "educationalCredentialAwarded": "Economics Study Resources",
    "offers": {
      "@type": "Offer",
      "category": "Educational Resources",
      "availability": "https://schema.org/InStock"
    }
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [notesRes, essaysRes, csqsRes, flashcardsRes] = await Promise.all([
          fetch("/api/notes?limit=1000"),
          fetch("/api/essays?limit=1000"),
          fetch("/api/csqs?limit=1000"),
          fetch("/api/flashcards?limit=1000")
        ]);

        const [notes, essays, csqs, flashcards] = await Promise.all([
          notesRes.json(),
          essaysRes.json(),
          csqsRes.json(),
          flashcardsRes.json()
        ]);

        setStats({
          notes: Array.isArray(notes) ? notes.length : 0,
          essays: Array.isArray(essays) ? essays.length : 0,
          csqs: Array.isArray(csqs) ? csqs.length : 0,
          flashcards: Array.isArray(flashcards) ? flashcards.length : 0,
          isLoading: false
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
        setStats(prev => ({ ...prev, isLoading: false }));
      }
    };

    fetchStats();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema)
        }}
      />
      {/* Hero Section */}
      <section className="relative py-8 sm:py-12 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center space-y-4 sm:space-y-6 lg:space-y-8"
          >
            <motion.div variants={itemVariants} className="space-y-2 sm:space-y-3 lg:space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-tight px-2">
                Master Economics with
                <span className="block text-primary mt-1 sm:mt-2">Comprehensive Resources</span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto px-2">
                A curated collection of notes, model essays, CSQ answers, and practice questions for JC and Secondary School Economics students
              </p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-2.5 sm:gap-4 justify-center items-stretch sm:items-center px-2 max-w-md sm:max-w-none mx-auto">
              <Button asChild size="lg" className="w-full sm:w-auto text-sm sm:text-base lg:text-lg px-6 sm:px-8 h-12 sm:h-12 touch-manipulation">
                <Link href="/notes">Explore Notes</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full sm:w-auto text-sm sm:text-base lg:text-lg px-6 sm:px-8 h-12 sm:h-12 touch-manipulation">
                <Link href="/about">Learn About This Project</Link>
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-8 pt-6 sm:pt-8 lg:pt-12 max-w-4xl mx-auto px-2">
              <div className="space-y-0.5 sm:space-y-1 lg:space-y-2">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary">
                  {stats.isLoading ? (
                    <Loader2 className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 animate-spin mx-auto" />
                  ) : (
                    `${stats.notes}+`
                  )}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">Study Notes</div>
              </div>
              <div className="space-y-0.5 sm:space-y-1 lg:space-y-2">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary">
                  {stats.isLoading ? (
                    <Loader2 className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 animate-spin mx-auto" />
                  ) : (
                    `${stats.essays}+`
                  )}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">Model Essays</div>
              </div>
              <div className="space-y-0.5 sm:space-y-1 lg:space-y-2">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary">
                  {stats.isLoading ? (
                    <Loader2 className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 animate-spin mx-auto" />
                  ) : (
                    `${stats.csqs}+`
                  )}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">CSQ Answers</div>
              </div>
              <div className="space-y-0.5 sm:space-y-1 lg:space-y-2">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary">
                  {stats.isLoading ? (
                    <Loader2 className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 animate-spin mx-auto" />
                  ) : (
                    `${stats.flashcards}+`
                  )}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">Flashcards</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-10 sm:py-12 lg:py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-10 lg:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 lg:mb-4 px-2">Everything You Need to Excel</h2>
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
              Comprehensive resources designed to help students understand and master economics concepts
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 lg:gap-6">
            {[
              { title: "Comprehensive Notes", desc: "Detailed notes covering all major topics for both JC and Secondary School Economics, organized by theme and difficulty", icon: BookOpen, href: "/notes", cta: "View Notes →" },
              { title: "Interactive Flashcards", desc: "Test your knowledge with interactive flip cards covering key concepts, definitions, and economic theories", icon: Sparkles, href: "/flashcards", cta: "Study Flashcards →" },
              { title: "Model Essays", desc: "High-quality model essays with examiner comments, marking schemes, and detailed analysis of exemplary answers", icon: FileText, href: "/essays", cta: "View Essays →" },
              { title: "Quality Content", desc: "All resources are carefully curated and aligned with MOE syllabus requirements and exam formats", icon: Award },
              { title: "Mark My Work", desc: "Submit your essays and CSQ answers for professional marking and personalized feedback to improve your grades", icon: PenTool, href: "/mark-my-work", cta: "Get Feedback →" },
              { title: "Student-Focused", desc: "Designed with students in mind, making complex economics concepts accessible and easy to understand", icon: Users }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="border-2 hover:border-primary transition-all hover:shadow-lg h-full touch-manipulation active:scale-[0.98]">
                  <CardHeader className="pb-2 sm:pb-4 lg:pb-6">
                    <feature.icon className="w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-primary mb-2 sm:mb-3 lg:mb-4" />
                    <CardTitle className="text-lg sm:text-xl">{feature.title}</CardTitle>
                    <CardDescription className="text-sm sm:text-base leading-relaxed">
                      {feature.desc}
                    </CardDescription>
                  </CardHeader>
                  {feature.cta && (
                    <CardContent className="pt-0">
                      <Button asChild variant="link" className="px-0 h-auto text-sm sm:text-base touch-manipulation">
                        <Link href={feature.href!}>{feature.cta}</Link>
                      </Button>
                    </CardContent>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-10 sm:py-12 lg:py-20 px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center space-y-3 sm:space-y-4 lg:space-y-6"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold px-2">My Mission</h2>
          <div className="text-sm sm:text-base lg:text-lg text-muted-foreground space-y-3 sm:space-y-4 leading-relaxed px-2">
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
          <Button asChild size="lg" variant="outline" className="w-full sm:w-auto h-12 text-sm sm:text-base lg:text-lg touch-manipulation mt-4">
            <Link href="/about">Read My Full Story</Link>
          </Button>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-10 sm:py-12 lg:py-20 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-5 lg:space-y-6">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold px-2"
          >
            Ready to Start Learning?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-sm sm:text-base lg:text-lg opacity-90 px-2"
          >
            Explore our comprehensive collection of resources and take your economics understanding to the next level
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-2.5 sm:gap-4 justify-center px-2 max-w-md sm:max-w-none mx-auto"
          >
            <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto h-12 text-sm sm:text-base lg:text-lg touch-manipulation">
              <Link href="/notes">Browse Notes</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto h-12 text-sm sm:text-base lg:text-lg bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 touch-manipulation">
              <Link href="/flashcards">Study Flashcards</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
