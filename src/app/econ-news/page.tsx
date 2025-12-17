"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Newspaper, TrendingUp } from "lucide-react";

type EconNewsItem = {
  id: number;
  title: string;
  summary: string;
  level: string;
  topics: string[];
  theories: string[];
  publishedDate: string;
  createdAt: string;
  updatedAt: string;
};

export default function EconNewsPage() {
  const [news, setNews] = useState<EconNewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/econ-news?limit=100");
      if (response.ok) {
        const data = await response.json();
        setNews(data);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateStructuredData = () => {
    if (news.length === 0) return null;

    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": news.slice(0, 10).map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Article",
          "headline": item.title,
          "articleBody": item.summary,
          "datePublished": item.publishedDate,
          "about": {
            "@type": "EducationalOccupationalCredential",
            "name": "Economics Current Affairs",
            "educationalLevel": item.level,
            "about": item.topics.join(", ")
          },
          "keywords": [...item.topics, ...item.theories].join(", ")
        }
      }))
    };
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 sm:py-12 px-4 sm:px-6 lg:px-8 overflow-x-hidden">
      {news.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateStructuredData())
          }}
        />
      )}
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-12 sm:mb-16 space-y-4 sm:space-y-5">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Newspaper className="w-10 h-10 sm:w-12 sm:h-12 text-primary" />
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight break-words bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
              Singapore Current Affairs
            </h1>
          </div>
          <p className="text-base sm:text-lg leading-relaxed text-muted-foreground max-w-3xl mx-auto break-words px-2">
            Latest Singapore economic developments connected to key theories and concepts
          </p>
        </div>

        <div className="space-y-6">
          {news.length === 0 ? (
            <Card className="border-2 border-dashed overflow-hidden">
              <CardContent className="py-8 sm:py-12 text-center">
                <p className="text-muted-foreground break-words px-2">No current affairs articles available yet.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 sm:gap-8">
              {news.map((item) => (
                <Card 
                  key={item.id} 
                  className="border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300 overflow-hidden bg-card"
                >
                  <CardHeader className="space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-4">
                          <TrendingUp className="w-5 h-5 text-primary flex-shrink-0" />
                            <Badge variant="outline" className="text-xs font-semibold border-primary/30">
                              {new Date(item.publishedDate).toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}
                            </Badge>
                        </div>
                        <CardTitle className="text-2xl sm:text-3xl font-bold break-words leading-tight tracking-tight mb-5">
                          {item.title}
                        </CardTitle>
                      </div>
                    </div>
                      <div 
                        className="prose prose-sm sm:prose-base max-w-none text-muted-foreground prose-headings:text-foreground prose-strong:text-foreground prose-a:text-primary"
                        dangerouslySetInnerHTML={{ __html: item.summary }}
                      />
                  </CardHeader>
                  <CardContent className="space-y-6 pt-6 border-t border-border/50">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <div className="h-1 w-1 rounded-full bg-primary"></div>
                        <h4 className="text-sm font-bold text-foreground uppercase tracking-wide">
                          Related Topics
                        </h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {item.topics.map((topic, idx) => (
                          <Badge 
                            key={idx} 
                            variant="secondary" 
                            className="text-xs font-medium px-3 py-1.5 bg-primary/10 hover:bg-primary/20 transition-colors shadow-sm"
                          >
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <div className="h-1 w-1 rounded-full bg-primary"></div>
                        <h4 className="text-sm font-bold text-foreground uppercase tracking-wide">
                          Economic Theories Applied
                        </h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {item.theories.map((theory, idx) => (
                          <Badge 
                            key={idx} 
                            className="text-xs font-medium px-3 py-1.5 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all shadow-sm"
                          >
                            {theory}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        <Card className="mt-10 sm:mt-14 bg-gradient-to-br from-muted/30 to-muted/10 border border-border/50 overflow-hidden">
          <CardHeader>
            <CardTitle className="break-words text-xl sm:text-2xl font-bold tracking-tight">
              Why Current Affairs Matter
            </CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Understanding the connection between real-world events and economic theory
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4 text-sm sm:text-base text-muted-foreground/90">
            <div className="flex gap-3 items-start">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">1</div>
              <p className="break-words leading-relaxed">
                Real-world application helps solidify understanding of abstract economic concepts
              </p>
            </div>
            <div className="flex gap-3 items-start">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">2</div>
              <p className="break-words leading-relaxed">
                Current events provide powerful examples for use in essays and exam responses
              </p>
            </div>
            <div className="flex gap-3 items-start">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">3</div>
              <p className="break-words leading-relaxed">
                Staying informed develops critical thinking and analytical skills essential for economics
              </p>
            </div>
            <div className="flex gap-3 items-start">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">4</div>
              <p className="break-words leading-relaxed">
                Demonstrates deeper engagement with the subject beyond textbook learning
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
