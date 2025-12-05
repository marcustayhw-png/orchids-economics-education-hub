"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Clock, Users, Star, CheckCircle2, DollarSign, Gift, Sparkles, Award, Target, TrendingUp, BookOpen } from "lucide-react";

export default function TuitionPage() {
  const handleGetStarted = () => {
    window.open('https://wa.me/6588872996', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl -z-10" />
      
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <Badge className="mb-2 text-base px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg shadow-green-500/30 animate-pulse">
            <Gift className="w-4 h-4 mr-2" />
            FREE Trial Lesson • Limited Slots
          </Badge>
          
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-green-600 opacity-20 blur-2xl" />
            <GraduationCap className="w-20 h-20 text-primary mx-auto relative z-10 drop-shadow-lg" />
          </div>
          
          <div className="space-y-3">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Private Economics Tuition
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Personalized one-on-one tutoring to help you excel in Economics
            </p>
          </div>
        </div>

        {/* Free Trial Highlight Card */}
        <Card className="border-2 border-green-600 bg-gradient-to-br from-green-50 via-emerald-50 to-green-50 dark:from-green-950/30 dark:to-emerald-950/30 shadow-xl shadow-green-500/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-400/10 rounded-full blur-3xl" />
          <CardHeader className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-green-600 rounded-full">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-3xl">Start with a FREE Trial Lesson</CardTitle>
            </div>
            <CardDescription className="text-base text-muted-foreground">
              Experience personalized economics tuition risk-free
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 relative z-10">
            <p className="text-lg text-muted-foreground">
              Not sure if private tuition is right for you? Try it out with a <strong className="text-green-700 dark:text-green-400">completely free trial lesson</strong> with no obligations!
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: Target, title: "Meet Your Tutor", desc: "Get to know my teaching style and approach" },
                { icon: BookOpen, title: "Identify Learning Gaps", desc: "We'll assess your understanding and pinpoint areas for improvement" },
                { icon: TrendingUp, title: "Personalized Learning Plan", desc: "Develop a customized roadmap to achieve your goals" },
                { icon: Award, title: "No Commitment", desc: "Decide if tuition is right for you after experiencing it firsthand" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 rounded-lg bg-white/50 dark:bg-background/50 backdrop-blur-sm border border-green-200 dark:border-green-900">
                  <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-lg">
                    <item.icon className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold mb-1">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-4 flex justify-center">
              <Button size="lg" className="w-full max-w-md bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg shadow-green-500/30 h-14 text-lg" onClick={handleGetStarted}>
                <Gift className="w-5 h-5 mr-2" />
                Book Your FREE Trial Now
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* What's Offered */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50 bg-gradient-to-br from-card to-card/50">
            <CardHeader>
              <div className="p-3 bg-primary/10 rounded-full w-fit mb-3">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Who I Teach</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { level: "Secondary School Economics", detail: "Sec 3-4 students preparing for O-Levels" },
                { level: "Junior College Economics", detail: "JC1-2 / private candidate students preparing for A-Levels" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 rounded-lg bg-primary/5 border border-primary/10">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-lg">{item.level}</p>
                    <p className="text-sm text-muted-foreground mt-1">{item.detail}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50 bg-gradient-to-br from-card to-card/50">
            <CardHeader>
              <div className="p-3 bg-primary/10 rounded-full w-fit mb-3">
                <Clock className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Lesson Format</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                "Flexible scheduling (weekdays/weekends)",
                "1-on-1 personalized sessions",
                "Online or in-person options",
                "1.5-2 hour sessions"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-primary/5">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <p className="font-medium">{item}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* What You'll Get */}
        <Card className="hover:shadow-xl transition-all duration-300 border-2 bg-gradient-to-br from-card via-primary/5 to-card">
          <CardHeader>
            <div className="p-3 bg-primary/10 rounded-full w-fit mb-3">
              <Star className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-3xl">What You'll Get</CardTitle>
            <CardDescription className="text-base">Comprehensive support for your economics journey</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: "Deep Concept Clarification", desc: "Break down complex economic theories into simple, understandable concepts" },
                { title: "Essay Writing Mastery", desc: "Learn structured analysis techniques to craft A-grade essays" },
                { title: "CSQ Practice & Techniques", desc: "Master data-response questions with proven strategies" },
                { title: "Smart Exam Strategies", desc: "Time management tips and marking scheme insights to maximize your scores" },
                { title: "Personalized Study Materials", desc: "Custom notes, practice questions, and model answers tailored to you" },
                { title: "Progress Tracking & Feedback", desc: "Regular assessments with detailed feedback to monitor your improvement" },
                { title: "24/7 WhatsApp Support", desc: "Get answers to your questions anytime, even between lessons" },
                { title: "FREE Trial Lesson", desc: "Experience the teaching approach with no commitment required" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 rounded-lg bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/10 hover:border-primary/30 transition-all">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold mb-1">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Rates & Pricing */}
        <Card className="hover:shadow-xl transition-all duration-300 border-2 bg-gradient-to-br from-card to-primary/5">
          <CardHeader>
            <div className="p-3 bg-primary/10 rounded-full w-fit mb-3">
              <DollarSign className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-3xl">Rates & Pricing</CardTitle>
            <CardDescription className="text-base">Transparent pricing for quality education</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { level: "Secondary School", exam: "O-Level", rate: "$40", detail: "Ideal for Sec 3-4 students" },
                { level: "Junior College", exam: "A-Level", rate: "$55", detail: "For JC1-2 and private candidates" }
              ].map((item, idx) => (
                <div key={idx} className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-green-600/20 rounded-xl blur-xl group-hover:blur-2xl transition-all opacity-0 group-hover:opacity-100" />
                  <div className="relative space-y-4 p-6 rounded-xl border-2 border-primary/20 bg-gradient-to-br from-card to-primary/5 hover:border-primary/40 transition-all">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-xl">{item.level}</h3>
                      <Badge variant="secondary" className="text-sm">{item.exam}</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold bg-gradient-to-r from-primary to-green-600 bg-clip-text text-transparent">{item.rate}</span>
                        <span className="text-muted-foreground text-lg">/hour</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border border-primary/20 space-y-4">
              <p className="font-semibold text-lg">What's Included:</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  "FREE trial lesson",
                  "Customized lesson materials and notes",
                  "Practice questions and model answers",
                  "24/7 messaging support",
                  "Flexible payment options"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <Card className="border-2 border-green-600 bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 dark:from-green-950/30 dark:via-emerald-950/30 dark:to-green-950/40 shadow-2xl shadow-green-500/30 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-green-400/10 to-emerald-400/10 rounded-full blur-3xl" />
          <CardHeader className="text-center relative z-10">
            <Badge className="mb-4 text-base px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white mx-auto w-fit shadow-lg animate-pulse">
              <Gift className="w-5 h-5 mr-2" />
              Limited Slots Available
            </Badge>
            <CardTitle className="text-4xl font-bold mb-3">Ready to Excel in Economics?</CardTitle>
            <CardDescription className="text-lg max-w-2xl mx-auto">
              Start with a FREE trial lesson - no payment required, no obligations
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-6 relative z-10">
            <div className="text-center space-y-3 max-w-2xl">
              <p className="text-muted-foreground text-lg">
                Book your complimentary trial lesson today and experience personalized economics tuition firsthand.
              </p>
              <p className="text-sm text-muted-foreground">
                Contact me via WhatsApp to schedule your free trial and discuss your learning goals.
              </p>
            </div>
            <Button size="lg" className="w-full max-w-md bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-xl shadow-green-500/40 h-16 text-lg font-semibold" onClick={handleGetStarted}>
              <Gift className="w-5 h-5 mr-2" />
              Claim Your FREE Trial Lesson
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}