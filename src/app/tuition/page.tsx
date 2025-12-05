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
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <Badge className="text-sm px-4 py-1.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
            <Gift className="w-4 h-4 mr-2" />
            FREE Trial Lesson Available
          </Badge>
          
          {/* Centered Logo */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl" />
              <div className="relative bg-primary/10 rounded-full p-6">
                <GraduationCap className="w-16 h-16 text-primary" />
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
              Private Economics Tuition
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Personalized one-on-one tutoring to help you excel in Economics
            </p>
          </div>
        </div>

        {/* Free Trial Highlight Card */}
        <Card className="border-2 border-green-600 bg-gradient-to-br from-green-50/50 to-emerald-50/50 dark:from-green-950/20 dark:to-emerald-950/20">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 bg-green-600 rounded-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <CardTitle className="text-2xl">Start with a FREE Trial Lesson</CardTitle>
            </div>
            <CardDescription>
              Experience personalized economics tuition risk-free
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground">
              Not sure if private tuition is right for you? Try it out with a <strong className="text-green-700 dark:text-green-400">completely free trial lesson</strong> with no obligations!
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: Target, title: "Meet Your Tutor", desc: "Get to know my teaching style and approach" },
                { icon: BookOpen, title: "Identify Learning Gaps", desc: "Assess understanding and pinpoint areas for improvement" },
                { icon: TrendingUp, title: "Personalized Learning Plan", desc: "Develop a customized roadmap to achieve your goals" },
                { icon: Award, title: "No Commitment", desc: "Decide if tuition is right for you after the trial" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 rounded-lg bg-white/60 dark:bg-background/60 border border-green-200/50 dark:border-green-900/50">
                  <div className="p-2 bg-green-100 dark:bg-green-900/40 rounded-lg flex-shrink-0">
                    <item.icon className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm mb-1">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button 
              size="lg" 
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white" 
              onClick={handleGetStarted}
            >
              <Gift className="w-5 h-5 mr-2" />
              Book Your FREE Trial Now
            </Button>
          </CardContent>
        </Card>

        {/* What's Offered - Two Columns */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Who I Teach */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2.5 bg-primary/10 rounded-lg">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Who I Teach</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { level: "Secondary School", detail: "Sec 3-4 (O-Level Economics)" },
                { level: "Junior College", detail: "JC1-2 / Private Candidates (A-Level)" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-primary/5">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">{item.level}</p>
                    <p className="text-sm text-muted-foreground">{item.detail}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Lesson Format */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2.5 bg-primary/10 rounded-lg">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Lesson Format</CardTitle>
              </div>
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
                  <p className="text-sm font-medium">{item}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* What You'll Get */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 bg-primary/10 rounded-lg">
                <Star className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">What You'll Get</CardTitle>
            </div>
            <CardDescription>Comprehensive support for your economics journey</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { title: "Deep Concept Clarification", desc: "Break down complex theories into simple concepts" },
                { title: "Essay Writing Mastery", desc: "Learn techniques to craft A-grade essays" },
                { title: "CSQ Practice & Techniques", desc: "Master data-response questions with proven strategies" },
                { title: "Smart Exam Strategies", desc: "Time management and marking scheme insights" },
                { title: "Personalized Study Materials", desc: "Custom notes, practice questions, and model answers" },
                { title: "Progress Tracking & Feedback", desc: "Regular assessments with detailed feedback" },
                { title: "24/7 WhatsApp Support", desc: "Get answers anytime, even between lessons" },
                { title: "FREE Trial Lesson", desc: "Experience the teaching approach with no commitment" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm mb-1">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Rates & Pricing */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 bg-primary/10 rounded-lg">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">Rates & Pricing</CardTitle>
            </div>
            <CardDescription>Transparent pricing for quality education</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { level: "Secondary School", exam: "O-Level", rate: "$40", detail: "Sec 3-4 students" },
                { level: "Junior College", exam: "A-Level", rate: "$55", detail: "JC1-2 and private candidates" }
              ].map((item, idx) => (
                <div key={idx} className="p-5 rounded-lg border-2 border-primary/20 bg-primary/5 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-lg">{item.level}</h3>
                    <Badge variant="secondary">{item.exam}</Badge>
                  </div>
                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-primary">{item.rate}</span>
                      <span className="text-muted-foreground">/hour</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-5 bg-primary/5 rounded-lg border border-primary/10 space-y-3">
              <p className="font-semibold">What's Included:</p>
              <div className="grid sm:grid-cols-2 gap-2">
                {[
                  "FREE trial lesson",
                  "Customized lesson materials",
                  "Practice questions & model answers",
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

        {/* Final CTA */}
        <Card className="border-2 border-green-600 bg-gradient-to-br from-green-50/50 to-emerald-50/50 dark:from-green-950/20 dark:to-emerald-950/20">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold mb-2">Ready to Excel in Economics?</CardTitle>
            <CardDescription className="text-base">
              Start with a FREE trial lesson - no payment required, no obligations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-center text-muted-foreground">
              Contact me via WhatsApp to schedule your free trial and discuss your learning goals.
            </p>
            <Button 
              size="lg" 
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white h-14 text-base font-semibold" 
              onClick={handleGetStarted}
            >
              <Gift className="w-5 h-5 mr-2" />
              Claim Your FREE Trial Lesson
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}