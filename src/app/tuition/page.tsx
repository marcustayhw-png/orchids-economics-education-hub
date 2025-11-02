"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, Clock, Users, Star, CheckCircle2, DollarSign } from "lucide-react";

export default function TuitionPage() {
  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Hero Section */}
        <Card className="border-2 border-primary bg-gradient-to-br from-primary/5 to-primary/10">
          <CardHeader className="text-center pb-4">
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
                  <p className="text-sm text-muted-foreground !whitespace-pre-line">JC1-2 / private candidate students preparing for A-Levels</p>
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
                    <p className="font-medium">Free Trial Consultation</p>
                    <p className="text-sm text-muted-foreground">Complimentary first session to assess your needs and learning goals</p>
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
                    <span className="text-3xl font-bold text-primary !whitespace-pre-line">$40</span>
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
                    <span className="text-3xl font-bold text-primary !whitespace-pre-line">$55</span>
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
        <Card className="border-2 border-primary">
          <CardHeader className="text-center">
            <CardTitle>Interested in Private Tuition?</CardTitle>
            <CardDescription>
              Get in touch to discuss your learning goals and schedule a trial lesson
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <p className="text-muted-foreground text-center">
              Limited slots available. Contact me to learn more about rates and availability.
            </p>
            <Button size="lg" className="w-full max-w-xs">
              Get Started
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>);

}