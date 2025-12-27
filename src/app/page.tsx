"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, FileText, PenTool, Award, Users, Sparkles, Loader2, ArrowRight, TrendingUp, Globe, Zap } from "lucide-react";
import { motion, useScroll, useSpring } from "framer-motion";

export default function Home() {
  const [stats, setStats] = useState({
    notes: 0,
    essays: 0,
    csqs: 0,
    flashcards: 0,
    isLoading: true
  });

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

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
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-background selection:bg-primary/30 overflow-x-hidden">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-50"
        style={{ scaleX }}
      />
      
      {/* Hero Section */}
      <section className="relative pt-12 pb-16 sm:pt-16 sm:pb-20 md:pt-24 md:pb-28 lg:pt-32 lg:pb-32 px-4 sm:px-6 md:px-8 lg:px-8 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl -z-10 opacity-30 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] animate-pulse delay-700" />
        </div>

        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center space-y-8 sm:space-y-10"
          >
            <motion.div variants={itemVariants} className="space-y-4 sm:space-y-5 md:space-y-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black tracking-tighter leading-[0.9] px-2">
                Master Economics <br className="hidden sm:block" />
                <span className="text-primary drop-shadow-sm">Made Simple.</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto px-4 md:px-8 font-medium leading-relaxed">
                Unlock top-tier notes, model essays, and interactive tools designed specifically for Singapore's JC and Secondary Economics students.
              </p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4 md:px-0">
              <Button asChild size="lg" className="w-full sm:w-auto h-12 md:h-14 px-8 md:px-10 text-base md:text-lg rounded-2xl shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all hover:-translate-y-1">
                <Link href="/notes" className="flex items-center gap-2">
                  Start Learning <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full sm:w-auto h-12 md:h-14 px-8 md:px-10 text-base md:text-lg rounded-2xl border-2 hover:bg-muted/50 transition-all">
                <Link href="/about">Our Mission</Link>
              </Button>
            </motion.div>

            {/* Stats Grid */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8 pt-8 md:pt-12 max-w-5xl mx-auto px-4 md:px-6">
              {[
                { label: "Study Notes", value: stats.notes, icon: BookOpen },
                { label: "Model Essays", value: stats.essays, icon: FileText },
                { label: "CSQ Answers", value: stats.csqs, icon: TrendingUp },
                { label: "Flashcards", value: stats.flashcards, icon: Sparkles }
              ].map((stat, i) => (
                <div key={i} className="p-4 md:p-5 lg:p-6 rounded-2xl md:rounded-3xl bg-card/50 border border-border/50 backdrop-blur-sm shadow-sm">
                  <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-primary mb-1">
                    {stats.isLoading ? (
                      <Loader2 className="w-6 h-6 md:w-8 md:h-8 animate-spin mx-auto" />
                    ) : (
                      `${stat.value}+`
                    )}
                  </div>
                  <div className="text-[10px] sm:text-xs md:text-sm font-bold text-muted-foreground uppercase tracking-wider md:tracking-widest">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-muted/20 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-12 sm:mb-20"
          >
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4 px-2">Everything You Need to Excel</h2>
            <p className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4 font-medium">
              We've built the most comprehensive resource library to help you conquer the syllabus and ace your exams.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Comprehensive Notes", desc: "Detailed, exam-oriented notes covering all major themes for H1/H2 and Secondary Economics.", icon: BookOpen, href: "/notes", color: "text-blue-500", bg: "bg-blue-500/10" },
              { title: "Interactive Flashcards", desc: "Master definitions and key concepts with our specialized flashcard system designed for retention.", icon: Sparkles, href: "/flashcards", color: "text-yellow-500", bg: "bg-yellow-500/10" },
              { title: "Model Essays", desc: "Analyze high-scoring essays with detailed examiner comments and breakdown of marking points.", icon: FileText, href: "/essays", color: "text-green-500", bg: "bg-green-500/10" },
              { title: "CSQ Mastery", desc: "Practice Case Study Questions with curated data sets and step-by-step model answers.", icon: TrendingUp, href: "/essays/csq", color: "text-purple-500", bg: "bg-purple-500/10" },
              { title: "Mark My Work", desc: "Get personalized, professional feedback on your practice answers from experienced tutors.", icon: PenTool, href: "/mark-my-work", color: "text-orange-500", bg: "bg-orange-500/10" },
              { title: "Current Affairs", desc: "Stay updated with real-world economic news linked directly to your JC syllabus topics.", icon: Globe, href: "/econ-news", color: "text-pink-500", bg: "bg-pink-500/10" }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.05 }}
              >
                <Card className="group h-full border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 rounded-[2rem] overflow-hidden bg-card/50 backdrop-blur-sm">
                  <CardHeader className="p-8 pb-4">
                    <div className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className={`w-7 h-7 ${feature.color}`} />
                    </div>
                    <CardTitle className="text-xl sm:text-2xl font-bold mb-2">{feature.title}</CardTitle>
                    <CardDescription className="text-base leading-relaxed font-medium">
                      {feature.desc}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8 pt-0">
                    {feature.href && (
                      <Button asChild variant="ghost" className="px-0 hover:bg-transparent text-primary font-bold group-hover:gap-3 transition-all">
                        <Link href={feature.href}>
                          Explore Now <ArrowRight className="w-4 h-4" />
                        </Link>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden relative border-t border-border/50">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] -z-10" />
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center space-y-10"
        >
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight">Access Quality <span className="text-primary">Everywhere.</span></h2>
            <div className="text-base sm:text-xl text-muted-foreground space-y-6 leading-relaxed font-medium px-4">
              <p>
                As an aspiring economics educator, I've seen firsthand how high-quality resources can transform a student's trajectory. This platform is my commitment to democratizing that quality.
              </p>
              <p>
                Whether you're struggling with Market Failure or refining your Balance of Payments evaluations, we're here to provide the structure and clarity you need.
              </p>
            </div>
          </div>
          <Button asChild size="lg" variant="outline" className="h-14 px-10 text-base sm:text-lg rounded-2xl border-2 font-bold shadow-sm">
            <Link href="/about">Read the Full Story</Link>
          </Button>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-primary rounded-[3rem] p-8 sm:p-16 lg:p-20 text-primary-foreground text-center relative overflow-hidden shadow-2xl shadow-primary/40"
          >
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-black/10 rounded-full blur-3xl" />
            
            <div className="relative z-10 space-y-8">
              <h2 className="text-3xl sm:text-5xl lg:text-7xl font-black tracking-tighter leading-tight">
                Ready to Ace Your <br className="hidden sm:block" /> Economics Exam?
              </h2>
              <p className="text-lg sm:text-xl lg:text-2xl opacity-90 max-w-2xl mx-auto font-medium">
                Join hundreds of students using EconStack to master the syllabus and achieve their dream grades.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto h-16 px-12 text-lg font-black rounded-2xl shadow-xl hover:scale-105 transition-transform">
                  <Link href="/notes">Get Started Free</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="w-full sm:w-auto h-16 px-12 text-lg font-bold rounded-2xl bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-white hover:text-primary transition-all">
                  <Link href="/flashcards">Try Flashcards</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border/50 text-center text-muted-foreground">
        <p className="text-sm font-medium">© {new Date().getFullYear()} EconStack. Built with passion for Economics education.</p>
      </footer>
    </div>
  );
}
