"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Heart, Target, Users, BookOpen, Award, Sparkles, ArrowRight, Quote } from "lucide-react";
import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } }
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <section className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-primary/2 to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] -z-10" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[100px] -z-10" />
        
        <motion.div 
          className="max-w-5xl mx-auto text-center space-y-8 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="relative inline-block"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="w-28 h-28 sm:w-36 sm:h-36 mx-auto bg-gradient-to-br from-primary/20 via-primary/10 to-transparent rounded-full flex items-center justify-center mb-8 relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-transparent animate-pulse" />
              <GraduationCap className="w-14 h-14 sm:w-18 sm:h-18 text-primary relative z-10" />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Badge variant="secondary" className="mb-6 text-xs font-bold tracking-widest uppercase px-4 py-2 bg-primary/10 text-primary border-none">
              <Sparkles className="w-3 h-3 mr-2" />
              Passion Project
            </Badge>
          </motion.div>
          
          <motion.h1 
            className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter bg-gradient-to-br from-foreground via-foreground to-foreground/50 bg-clip-text text-transparent leading-[0.9]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            About This
            <br />
            <span className="text-primary">Journey</span>
          </motion.h1>
          
          <motion.p 
            className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            A passion project demonstrating my commitment to economics education and my aspiration
            to become an inspiring educator who makes a meaningful difference in students' lives.
          </motion.p>
        </motion.div>
      </section>

      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="max-w-6xl mx-auto space-y-16"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <motion.div variants={fadeInUp}>
            <Card className="border-none shadow-2xl bg-gradient-to-br from-card via-card to-primary/5 overflow-hidden rounded-[2.5rem] relative group">
              <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -z-10 group-hover:bg-primary/10 transition-all duration-700" />
              <CardHeader className="pb-6 pt-10 px-8 sm:px-12">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500/20 to-red-500/5 flex items-center justify-center">
                    <Heart className="w-7 h-7 text-red-500" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl sm:text-3xl font-black tracking-tight">My Teaching Journey</CardTitle>
                    <p className="text-sm text-muted-foreground font-medium mt-1">The spark that ignited my passion</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 text-muted-foreground leading-relaxed px-8 sm:px-12 pb-10">
                <div className="relative pl-6 border-l-2 border-primary/20">
                  <Quote className="absolute -left-3 -top-1 w-6 h-6 text-primary/40 bg-card" />
                  <p className="text-lg italic text-foreground/80">
                    "I remember struggling with abstract economic concepts until a dedicated teacher took the time to explain them
                    through real-world examples and patient guidance."
                  </p>
                </div>
                <p>
                  That moment sparked my love for the subject and
                  inspired me to help others experience the same clarity and excitement. Throughout my academic journey, I've consistently sought opportunities to share my knowledge with
                  peers through informal tutoring and study groups.
                </p>
                <p>
                  Witnessing the "lightbulb moment" when a concept
                  finally clicks for a student is incredibly rewarding and reinforces my desire to pursue teaching as a
                  career. I believe economics is more than just graphs and theories - it's a lens through which we understand the
                  world around us.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Card className="border-none shadow-2xl bg-gradient-to-br from-card via-card to-blue-500/5 overflow-hidden rounded-[2.5rem] relative group">
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] -z-10 group-hover:bg-blue-500/10 transition-all duration-700" />
              <CardHeader className="pb-6 pt-10 px-8 sm:px-12">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-500/5 flex items-center justify-center">
                    <Target className="w-7 h-7 text-blue-500" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl sm:text-3xl font-black tracking-tight">Why I Built EconStack</CardTitle>
                    <p className="text-sm text-muted-foreground font-medium mt-1">Bridging the gap in economics education</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 text-muted-foreground leading-relaxed px-8 sm:px-12 pb-10">
                <p>
                  I created EconStack to address a gap I observed: while there are many economics resources available, few
                  provide a comprehensive, well-organized collection specifically tailored to the <span className="text-foreground font-semibold">Singapore syllabus</span> for
                  both secondary and JC levels.
                </p>
                
                <div className="grid sm:grid-cols-3 gap-4 py-4">
                  {[
                    { num: "100+", label: "Hours of Research" },
                    { num: "50+", label: "Model Essays" },
                    { num: "200+", label: "Flashcards" }
                  ].map((stat, i) => (
                    <motion.div 
                      key={i}
                      className="text-center p-6 rounded-2xl bg-gradient-to-br from-muted/50 to-muted/20 border border-border/50"
                      whileHover={{ scale: 1.02, y: -2 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <div className="text-3xl sm:text-4xl font-black text-primary">{stat.num}</div>
                      <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mt-1">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
                
                <p>
                  Each note, essay, and question has been carefully designed to help students not just memorize, but truly understand
                  economic concepts and apply them to real-world scenarios.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div variants={fadeInUp}>
              <Card className="border-none shadow-xl bg-card overflow-hidden rounded-[2rem] h-full group hover:shadow-2xl transition-all duration-500">
                <CardHeader className="pb-4 pt-8 px-8">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-emerald-500" />
                    </div>
                    <CardTitle className="text-xl font-bold">Subject Expertise</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-5 px-8 pb-8">
                  {[
                    { badge: "Microeconomics", desc: "Deep understanding of market mechanisms, elasticity, and market failures" },
                    { badge: "Macroeconomics", desc: "Comprehensive knowledge of national income, policies, and international trade" },
                    { badge: "Exam Techniques", desc: "Understanding of assessment requirements and how to help students excel" }
                  ].map((item, i) => (
                    <motion.div 
                      key={i} 
                      className="space-y-2 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors group/item"
                      whileHover={{ x: 4 }}
                    >
                      <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 border-none font-bold">
                        {item.badge}
                      </Badge>
                      <p className="text-sm text-muted-foreground">
                        {item.desc}
                      </p>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="border-none shadow-xl bg-card overflow-hidden rounded-[2rem] h-full group hover:shadow-2xl transition-all duration-500">
                <CardHeader className="pb-4 pt-8 px-8">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-500/5 flex items-center justify-center">
                      <Users className="w-6 h-6 text-purple-500" />
                    </div>
                    <CardTitle className="text-xl font-bold">Teaching Qualities</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-5 px-8 pb-8">
                  {[
                    { badge: "Patient & Empathetic", desc: "Understanding that every student learns at their own pace" },
                    { badge: "Clear Communicator", desc: "Ability to break down complex concepts into understandable parts" },
                    { badge: "Innovative", desc: "Creating resources and using technology to enhance learning" }
                  ].map((item, i) => (
                    <motion.div 
                      key={i} 
                      className="space-y-2 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors group/item"
                      whileHover={{ x: 4 }}
                    >
                      <Badge variant="secondary" className="bg-purple-500/10 text-purple-600 border-none font-bold">
                        {item.badge}
                      </Badge>
                      <p className="text-sm text-muted-foreground">
                        {item.desc}
                      </p>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div variants={fadeInUp}>
            <Card className="border-none shadow-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-card overflow-hidden rounded-[2.5rem] relative">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
              <CardHeader className="pb-6 pt-10 px-8 sm:px-12 relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-500/5 flex items-center justify-center">
                    <Award className="w-7 h-7 text-amber-500" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl sm:text-3xl font-black tracking-tight">My Vision as an Educator</CardTitle>
                    <p className="text-sm text-muted-foreground font-medium mt-1">Creating impact through education</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 text-muted-foreground leading-relaxed px-8 sm:px-12 pb-10 relative z-10">
                <p className="text-lg">
                  As an economics teacher in Singapore's education system, I envision creating a classroom environment where students feel <span className="text-foreground font-semibold">empowered to ask questions</span>, challenge assumptions, and apply economic thinking to real-world issues.
                </p>
                <p>
                  I want to be the teacher who makes economics come alive - not through dry textbook definitions, but through engaging discussions, current events, and relatable examples.
                </p>
                
                <div className="flex flex-wrap gap-3 pt-4">
                  {["Continuous Learning", "Student-Centered", "Innovation-Driven", "Lifelong Impact"].map((tag, i) => (
                    <motion.span 
                      key={i}
                      className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold border border-primary/20"
                      whileHover={{ scale: 1.05 }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
                
                <p className="pt-4 text-lg font-medium text-foreground/80">
                  Most importantly, I want to inspire in my students the same passion for economics that was inspired in
                  me. Great teachers don't just teach content - they ignite curiosity, build confidence, and
                  prepare students to be lifelong learners and contributors to society.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
