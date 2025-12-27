"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, GraduationCap, Lightbulb, FileText, MessageSquare } from "lucide-react";
import Link from "next/link";

interface SidebarProps {
  activeTab?: "essays" | "csq";
}

export function Sidebar({ activeTab = "essays" }: SidebarProps) {
  return (
    <div className="space-y-6">
      
      <Card className="border-2 shadow-sm bg-card/50 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-bold flex items-center gap-2">
            {activeTab === "essays" ? (
              <>
                <FileText className="h-4 w-4 text-amber-500" />
                Question Types
              </>
            ) : (
              <>
                <MessageSquare className="h-4 w-4 text-amber-500" />
                Command Words
              </>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {activeTab === "essays" ? (
            <ul className="text-xs text-muted-foreground leading-relaxed space-y-1.5">
              <li><strong>Discuss</strong> – Present multiple perspectives with evaluation</li>
              <li><strong>Assess</strong> – Weigh evidence to reach a supported conclusion</li>
              <li><strong>To what extent</strong> – Argue degree of agreement with judgment</li>
              <li><strong>Compare</strong> – Examine similarities and differences</li>
            </ul>
          ) : (
            <ul className="text-xs text-muted-foreground leading-relaxed space-y-1.5">
              <li><strong>Define</strong> – State the meaning clearly</li>
              <li><strong>Explain</strong> – Show cause & effect with reasoning</li>
              <li><strong>Analyse</strong> – Break down using economic theory</li>
              <li><strong>Discuss/Evaluate</strong> – Weigh pros vs cons with judgment</li>
            </ul>
          )}
        </CardContent>
      </Card>

      <Card className="border-2 shadow-sm bg-primary/5 text-primary-foreground">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-bold flex items-center gap-2 text-primary">
            <GraduationCap className="h-4 w-4" />
            Exam Prep
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-xs text-muted-foreground">
            Get your essays marked by a professional tutor with detailed feedback.
          </p>
          <Button asChild size="sm" className="w-full text-xs h-8">
            <Link href="/mark-my-work">
              Get Started
            </Link>
          </Button>
        </CardContent>
      </Card>

      <div className="pt-4 px-2">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">Quick Links</h3>
        <div className="space-y-2">
          {[
            { label: "MAS Statistics", href: "https://www.mas.gov.sg/statistics" },
            { label: "SingStat", href: "https://www.singstat.gov.sg/" },
            { label: "MTI Reports", href: "https://www.mti.gov.sg/Resources/Economic-Surveys-of-Singapore" }
          ].map((link, i) => (
            <a 
              key={i}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between text-[11px] text-muted-foreground hover:text-primary transition-colors group"
            >
              {link.label}
              <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
