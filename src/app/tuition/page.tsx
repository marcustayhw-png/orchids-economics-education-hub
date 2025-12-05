"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Clock, Users, Star, CheckCircle2, DollarSign, Gift, Sparkles } from "lucide-react";

export default function TuitionPage() {
  const handleGetStarted = () => {
    window.open('https://wa.me/6588872996', '_blank');
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Hero Section */}
        <Card className="border-2 border-primary bg-gradient-to-br from-primary/5 to-primary/10 relative overflow-hidden">
          <CardHeader className="text-center pb-4">
            <div className="relative">
              <Badge className="mb-4 text-base px-4 py-2 bg-green-600 hover:bg-green-700 text-white">
                <Gift className="w-4 h-4 mr-2" />
                FREE Trial Lesson Available!
              </Badge>
            </div>
            <GraduationCap className="w-16 h-16 text-primary mx-auto mb-4" />
            <CardTitle className="text-3xl mb-2">Private Economics Tuition</CardTitle>
            <CardDescription className="text-base">
              Personalized one-on-one tutoring to help you excel in Economics
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-center text-muted-foreground">
              Get personalized guidance tailored to your learning style and pace. Whether you're struggling with concepts or aiming for top grades, I'm here to help you succeed.
            </p>
          </CardContent>
        </Card>

        {/* Free Trial Highlight Card */}
        <Card className="border-2 border-green-600 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <Sparkles className="w-8 h-8 text-green-600" />
              <CardTitle className="text-2xl">Start with a FREE Trial Lesson</CardTitle>
            </div>
            <CardDescription className="text-base">
              Experience personalized economics tuition risk-free
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Not sure if private tuition is right for you? Try it out with a <strong className="text-green-700 dark:text-green-400">completely free trial lesson</strong> with no obligations! This gives you the opportunity to:
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Meet Your Tutor</p>
                  <p className="text-sm text-muted-foreground">Get to know my teaching style and approach</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Identify Your Learning Gaps</p>
                  <p className="text-sm text-muted-foreground">We'll assess your current understanding and pinpoint areas for improvement</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Create a Personalized Learning Plan</p>
                  <p className="text-sm text-muted-foreground">Develop a customized roadmap to achieve your academic goals</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">No Commitment Required</p>
                  <p className="text-sm text-muted-foreground">Decide if tuition is right for you after experiencing it firsthand</p>
                </div>
              </div>
            </div>
            <div className="pt-4 flex justify-center">
              <Button size="lg" className="w-full max-w-xs bg-green-600 hover:bg-green-700 text-white" onClick={handleGetStarted}>
                <Gift className="w-4 h-4 mr-2" />
                Book Your FREE Trial Now
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* What's Offered */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <Users className="w-8 h-8 text-primary mb-2" />
              <CardTitle>Who I Teach</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Secondary School Economics</p>
                  <p className="text-sm text-muted-foreground">Sec 3-4 students preparing for O-Levels</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Junior College Economics</p>
                  <p className="text-sm text-muted-foreground">JC1-2 / private candidate students preparing for A-Levels</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Clock className="w-8 h-8 text-primary mb-2" />
              <CardTitle>Lesson Format</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p>Flexible scheduling (weekdays/weekends)</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p>1-on-1 personalized sessions</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p>Online or in-person options</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p>1.5-2 hour sessions</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* What You'll Get */}
        <Card>
          <CardHeader>
            <Star className="w-8 h-8 text-primary mb-2" />
            <CardTitle>What You'll Get</CardTitle>
            <CardDescription>Comprehensive support for your economics journey</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Deep Concept Clarification</p>
                    <p className="text-sm text-muted-foreground">Break down complex economic theories into simple, understandable concepts</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Essay Writing Mastery</p>
                    <p className="text-sm text-muted-foreground">Learn structured analysis techniques to craft A-grade essays</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">CSQ Practice & Techniques</p>
                    <p className="text-sm text-muted-foreground">Master data-response questions with proven strategies</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Smart Exam Strategies</p>
                    <p className="text-sm text-muted-foreground">Time management tips and marking scheme insights to maximize your scores</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Personalized Study Materials</p>
                    <p className="text-sm text-muted-foreground">Custom notes, practice questions, and model answers tailored to you</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Progress Tracking & Feedback</p>
                    <p className="text-sm text-muted-foreground">Regular assessments with detailed feedback to monitor your improvement</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">24/7 WhatsApp Support</p>
                    <p className="text-sm text-muted-foreground">Get answers to your questions anytime, even between lessons</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">FREE Trial Lesson</p>
                    <p className="text-sm text-muted-foreground">Experience the teaching approach with no commitment required</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rates & Pricing */}
        <Card>
          <CardHeader>
            <DollarSign className="w-8 h-8 text-primary mb-2" />
            <CardTitle>Rates & Pricing</CardTitle>
            <CardDescription>Transparent pricing for quality education</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3 p-4 rounded-lg border bg-card">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg">Secondary School</h3>
                  <span className="text-sm text-muted-foreground">O-Level</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-primary">$40</span>
                    <span className="text-muted-foreground">/hour</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Ideal for Sec 3-4 students preparing for O-Level Economics
                  </p>
                </div>
              </div>

              <div className="space-y-3 p-4 rounded-lg border bg-card">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg">Junior College</h3>
                  <span className="text-sm text-muted-foreground">A-Level</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-primary">$55</span>
                    <span className="text-muted-foreground">/hour</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    For JC1-2 and private candidates preparing for A-Level Economics
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-muted/50 rounded-lg space-y-2">
              <p className="text-sm font-medium">What's Included:</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span><strong>FREE trial lesson</strong> to experience the teaching approach</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span>Customized lesson materials and notes</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span>Practice questions and model answers</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span>Continuous support via messaging between lessons</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span>Flexible payment options available</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <Card className="border-2 border-green-600 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20">
          <CardHeader className="text-center">
            <Badge className="mb-4 text-base px-4 py-2 bg-green-600 hover:bg-green-700 text-white mx-auto w-fit">
              <Gift className="w-4 h-4 mr-2" />
              Limited Slots Available
            </Badge>
            <CardTitle className="text-2xl">Ready to Excel in Economics?</CardTitle>
            <CardDescription className="text-base">
              Start with a FREE trial lesson - no payment required, no obligations
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <div className="text-center space-y-2">
              <p className="text-muted-foreground">
                Book your complimentary trial lesson today and experience personalized economics tuition firsthand.
              </p>
              <p className="text-sm text-muted-foreground">
                Contact me via WhatsApp to schedule your free trial and discuss your learning goals.
              </p>
            </div>
            <Button size="lg" className="w-full max-w-xs bg-green-600 hover:bg-green-700 text-white" onClick={handleGetStarted}>
              <Gift className="w-4 h-4 mr-2" />
              Claim Your FREE Trial Lesson
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}