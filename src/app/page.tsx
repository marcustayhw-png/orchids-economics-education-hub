"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, FileText, PenTool, Award, Users, Sparkles, Loader2, ArrowRight, TrendingUp, Globe, Zap, CheckCircle2 } from "lucide-react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";

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
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-primary/30 overflow-x-hidden font-sans">
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-blue-500 to-primary origin-left z-[100]"
        style={{ scaleX }}
      />
      
      {/* Abstract Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-blue-600/10 rounded-full blur-[100px] animate-pulse delay-1000" />
        <div className="absolute bottom-[10%] left-[20%] w-[25%] h-[25%] bg-purple-600/10 rounded-full blur-[110px] animate-pulse delay-500" />
      </div>
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 sm:pt-32 sm:pb-32 md:pt-40 md:pb-44 lg:pt-48 lg:pb-56 px-4 sm:px-6 md:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center space-y-10 sm:space-y-12"
          >
            <motion.div variants={itemVariants} className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-4"
              >
                <Sparkles className="w-4 h-4 text-primary animate-spin-slow" />
                <span className="text-xs sm:text-sm font-bold tracking-wider uppercase opacity-80">Singapore's Premium Economics Resource</span>
              </motion.div>
              
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-black tracking-tight leading-[0.85] px-2">
                Economics <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary via-white to-primary/80 drop-shadow-2xl">Simplified.</span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-white/60 max-w-3xl mx-auto px-4 md:px-8 font-medium leading-relaxed">
                Unlock top-tier notes, model essays, and interactive tools designed specifically for Singapore's JC and Secondary students.
              </p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-5 justify-center items-center px-4 md:px-0">
              <Button asChild size="lg" className="w-full sm:w-auto h-14 md:h-16 px-10 md:px-12 text-base md:text-lg rounded-full shadow-2xl shadow-primary/40 hover:shadow-primary/60 transition-all hover:-translate-y-1.5 font-bold">
                <Link href="/notes" className="flex items-center gap-3">
                  Start Learning <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full sm:w-auto h-14 md:h-16 px-10 md:px-12 text-base md:text-lg rounded-full border-2 border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-md transition-all font-bold">
                <Link href="/about">My Mission</Link>
              </Button>
            </motion.div>

            {/* Premium Stats Bar */}
            <motion.div variants={itemVariants} className="pt-16 md:pt-24 max-w-6xl mx-auto">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                {[
                  { label: "Study Notes", value: stats.notes, icon: BookOpen, gradient: "from-blue-500/20 to-transparent" },
                  { label: "Model Essays", value: stats.essays, icon: FileText, gradient: "from-primary/20 to-transparent" },
                  { label: "CSQ Answers", value: stats.csqs, icon: TrendingUp, gradient: "from-purple-500/20 to-transparent" },
                  { label: "Flashcards", value: stats.flashcards, icon: Sparkles, gradient: "from-yellow-500/20 to-transparent" }
                ].map((stat, i) => (
                  <motion.div 
                    key={i} 
                    whileHover={{ y: -5 }}
                    className="relative group p-6 sm:p-8 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-xl overflow-hidden"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    <div className="relative z-10">
                      <div className="text-3xl sm:text-4xl md:text-5xl font-black mb-2 tracking-tighter">
                        {stats.isLoading ? (
                          <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
                        ) : (
                          `${stat.value}+`
                        )}
                      </div>
                      <div className="text-[10px] sm:text-xs font-black text-white/40 uppercase tracking-[0.2em]">{stat.label}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section - Bento Style */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 md:px-8 relative bg-[#080808]">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16 md:mb-24"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6">Everything You Need to <span className="text-primary">Excel.</span></h2>
            <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto font-medium">
              I've built a comprehensive ecosystem to help you conquer the syllabus and ace your exams.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-6 gap-4 md:gap-6 lg:gap-8">
            {/* Featured Bento Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-4"
            >
              <Link href="/notes" className="group block relative h-full rounded-[2.5rem] bg-gradient-to-br from-primary to-primary/60 p-8 md:p-12 overflow-hidden shadow-2xl shadow-primary/20">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-700" />
                <div className="relative z-10 flex flex-col h-full justify-between gap-12">
                  <div className="space-y-4">
                    <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                      <BookOpen className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-3xl md:text-5xl font-black text-white tracking-tighter">Comprehensive <br />Study Notes</h3>
                    <p className="text-white/80 text-lg md:text-xl font-medium max-w-md">
                      Detailed, exam-oriented notes covering all major themes for H1/H2 and Secondary Economics.
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-2 font-bold text-white text-lg group-hover:gap-4 transition-all">
                    Access Notes <ArrowRight className="w-6 h-6" />
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Smaller Bento Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-2"
            >
              <Link href="/flashcards" className="group block relative h-full rounded-[2.5rem] bg-white/5 border border-white/10 p-8 overflow-hidden hover:border-primary/50 transition-colors">
                <div className="relative z-10 space-y-6">
                  <div className="w-14 h-14 rounded-2xl bg-yellow-500/10 flex items-center justify-center">
                    <Sparkles className="w-7 h-7 text-yellow-500" />
                  </div>
                  <h3 className="text-2xl font-black text-white tracking-tight">Interactive <br />Flashcards</h3>
                  <p className="text-white/40 font-medium leading-relaxed">
                    Master definitions and key concepts with our specialized system.
                  </p>
                </div>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-3"
            >
              <Link href="/essays" className="group block relative h-full rounded-[2.5rem] bg-white/5 border border-white/10 p-8 overflow-hidden hover:border-primary/50 transition-colors">
                <div className="relative z-10 space-y-6">
                  <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center">
                    <FileText className="w-7 h-7 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-black text-white tracking-tight">Model Essays</h3>
                  <p className="text-white/40 font-medium leading-relaxed">
                    Analyze high-scoring essays with detailed examiner comments and breakdown of marking points.
                  </p>
                </div>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-3"
            >
              <Link href="/mark-my-work" className="group block relative h-full rounded-[2.5rem] bg-white/5 border border-white/10 p-8 overflow-hidden hover:border-primary/50 transition-colors">
                <div className="relative z-10 space-y-6">
                  <div className="w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center">
                    <PenTool className="w-7 h-7 text-orange-500" />
                  </div>
                  <h3 className="text-2xl font-black text-white tracking-tight">Mark My Work</h3>
                  <p className="text-white/40 font-medium leading-relaxed">
                    Get personalized, professional feedback on your practice answers from experienced tutors.
                  </p>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 md:px-8 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-[200px] -z-10" />
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center space-y-12"
        >
            <div className="space-y-6">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight">The <span className="text-primary">Vision.</span></h2>
              <div className="text-lg md:text-xl text-white/60 space-y-6 leading-relaxed font-medium px-4">
              <p>
                As an aspiring economics educator, I've seen firsthand how high-quality resources can transform a student's trajectory. This platform is my commitment to democratizing that quality.
              </p>
                <p>
                  Whether you're struggling with Market Failure or refining your Balance of Payments evaluations, I'm here to provide the structure and clarity you need.
                </p>
            </div>
          </div>
          <Button asChild size="lg" variant="outline" className="h-16 px-12 text-lg rounded-full border-2 border-white/10 bg-white/5 hover:bg-white/10 transition-all font-bold">
            <Link href="/about">Read the Full Story</Link>
          </Button>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative rounded-[3rem] p-12 sm:p-20 md:p-24 text-center overflow-hidden shadow-2xl"
          >
            <div className="absolute inset-0 bg-primary" />
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-white/20 rounded-full blur-[100px] group-hover:scale-110 transition-transform duration-1000" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-black/20 rounded-full blur-[100px]" />
            
            <div className="relative z-10 space-y-10">
              <h2 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] text-white">
                Ready to Ace <br /> Your Exams?
              </h2>
              <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto font-medium">
                Join hundreds of students using EconStack to master the syllabus and achieve their dream grades.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Button asChild size="lg" className="w-full sm:w-auto h-16 px-12 text-lg font-black rounded-full bg-white text-primary hover:bg-white/90 shadow-2xl transition-all hover:-translate-y-1">
                  <Link href="/notes">Get Started Free</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="w-full sm:w-auto h-16 px-12 text-lg font-black rounded-full border-2 border-white text-white hover:bg-white hover:text-primary transition-all">
                  <Link href="/flashcards">Try Flashcards</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 md:px-6 border-t border-white/5 text-center text-white/30">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-primary" />
          </div>
          <span className="font-black tracking-tighter text-white/60">ECONSTACK</span>
        </div>
        <p className="text-sm font-medium">© {new Date().getFullYear()} EconStack. Built with passion for Economics education.</p>
      </footer>
    </div>
  );
}
