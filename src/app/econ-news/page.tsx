"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Newspaper, TrendingUp, Globe, Building2, BookOpen, Layers, Target, ShieldCheck, AlertTriangle, Scale, Zap } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SingaporeEconomyDashboard } from "@/components/SingaporeEconomyDashboard";
import { motion } from "framer-motion";

type EconNewsItem = {
  id: number;
  title: string;
  content: string;
  context?: string;
  explanation?: string;
  theoryConnection?: string;
  newsCategory: string;
  topics: string[];
  theories: string[];
  publishedDate: string;
  createdAt: string;
  updatedAt: string;
};

export default function EconNewsPage() {
  const [news, setNews] = useState<EconNewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [displayLimit, setDisplayLimit] = useState(5);

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

  const filteredNews = news.filter((item) => {
    if (activeCategory === "all") return true;
    return item.newsCategory === activeCategory;
  });

  const displayedNews = filteredNews.slice(0, displayLimit);
  const hasMore = filteredNews.length > displayLimit;

  const handleLoadMore = () => {
    setDisplayLimit(prev => prev + 5);
  };

  const singaporeCount = news.filter(n => n.newsCategory === "Singapore").length;
  const internationalCount = news.filter(n => n.newsCategory === "International").length;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  const renderSection = (title: string, content: string | undefined, icon: React.ReactNode, colorClass: string, isFullWidth: boolean = false) => {
    if (!content || content.trim() === "" || content === "<p></p>") return null;
    
    return (
      <div className={`space-y-3 mb-8 animate-in fade-in slide-in-from-bottom-2 duration-500 ${isFullWidth ? 'col-span-full' : ''}`}>
        <div className="flex items-center gap-2 group">
          <div className={`p-2 rounded-lg ${colorClass} transition-transform group-hover:scale-110`}>
            {icon}
          </div>
          <h4 className="text-lg font-bold text-foreground tracking-tight">
            {title}
          </h4>
        </div>
        <div 
          className="prose prose-sm sm:prose-base max-w-none text-muted-foreground bg-muted/30 p-5 rounded-xl border border-border/50 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    );
  };

  const renderNewsCard = (item: EconNewsItem) => (
    <Card 
      key={item.id} 
      className="border border-border/50 hover:border-primary/30 hover:shadow-2xl transition-all duration-500 overflow-hidden bg-card/50 backdrop-blur-sm group"
    >
      <CardHeader className="space-y-6 pb-8 border-b border-border/30 bg-muted/10">
        <div className="flex flex-wrap items-center gap-3">
          <Badge 
            variant={item.newsCategory === "Singapore" ? "default" : "secondary"}
            className="text-xs font-bold px-3 py-1 uppercase tracking-wider"
          >
            {item.newsCategory === "Singapore" ? (
              <span className="flex items-center gap-1.5"><Building2 className="w-3 h-3" /> Singapore</span>
            ) : (
              <span className="flex items-center gap-1.5"><Globe className="w-3 h-3" /> International</span>
            )}
          </Badge>
          <Badge variant="outline" className="text-xs font-semibold border-primary/20 bg-background/50">
            {new Date(item.publishedDate).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </Badge>
        </div>
        
        <CardTitle className="text-2xl sm:text-4xl lg:text-5xl font-extrabold break-words leading-[1.1] tracking-tighter text-foreground group-hover:text-primary transition-colors">
          {item.title}
        </CardTitle>

        <div className="flex flex-wrap gap-2">
          {item.theories.map((theory, idx) => (
            <Badge key={idx} variant="outline" className="bg-primary/5 text-primary border-primary/20">
              {theory}
            </Badge>
          ))}
        </div>
      </CardHeader>

      <CardContent className="pt-8 space-y-2">
        {/* Main Summary */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Newspaper className="w-5 h-5 text-primary" />
            <h3 className="text-xl font-bold">News Summary</h3>
          </div>
          <div 
            className="prose prose-base sm:prose-lg max-w-none text-foreground/90 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: item.content }}
          />
        </div>

        {/* Detailed Explanation and Context Sections */}
        <div className="space-y-4 pt-8 border-t border-border/30">
          {renderSection(
            "Background & Context", 
            item.context, 
            <Globe className="w-5 h-5" />, 
            "bg-blue-500/10 text-blue-500",
            true
          )}

          {renderSection(
            "Economic Explanation", 
            item.explanation, 
            <TrendingUp className="w-5 h-5" />, 
            "bg-orange-500/10 text-orange-500",
            true
          )}

          {renderSection(
            "Theory & Syllabus Connection", 
            item.theoryConnection, 
            <BookOpen className="w-5 h-5" />, 
            "bg-green-500/10 text-green-500",
            true
          )}
        </div>

        {/* Topics Footer */}
        <div className="mt-8 pt-6 border-t border-border/30">
          <div className="flex items-center gap-2 mb-4">
            <Layers className="w-4 h-4 text-primary" />
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Key Topics</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {item.topics.map((topic, idx) => (
              <Badge 
                key={idx} 
                variant="secondary" 
                className="text-xs font-medium px-4 py-1.5 rounded-full hover:bg-primary/20 transition-colors cursor-default"
              >
                {topic}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background selection:bg-primary/30 py-12 px-4 sm:px-6 lg:px-8 overflow-x-hidden">
      <div className="max-w-7xl mx-auto w-full">
        {/* Hero Section */}
        <div className="text-center mb-16 space-y-6 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-primary/10 mb-4 ring-1 ring-primary/20">
            <Newspaper className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight bg-gradient-to-br from-foreground via-foreground to-foreground/60 bg-clip-text text-transparent leading-[1.1]">
            Economics <span className="text-primary">In Action</span>
          </h1>
          <p className="text-base sm:text-xl leading-relaxed text-muted-foreground max-w-2xl mx-auto font-medium">
            Bridging current global events with JC Economics syllabus theories, analysis, and evaluations.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-12">
            {/* Category Tabs */}
            <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
              <div className="flex justify-start sm:justify-center overflow-x-auto pb-4 no-scrollbar">
                <TabsList className="h-12 p-1 bg-muted/50 backdrop-blur-md rounded-xl border border-border/50">
                  <TabsTrigger value="all" className="px-4 sm:px-6 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm font-bold transition-all text-xs sm:text-sm">
                    All
                    <Badge variant="secondary" className="ml-2 bg-muted/80">{news.length}</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="Singapore" className="px-4 sm:px-6 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm font-bold transition-all text-xs sm:text-sm">
                    Singapore
                    <Badge variant="secondary" className="ml-2 bg-muted/80">{singaporeCount}</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="International" className="px-4 sm:px-6 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm font-bold transition-all text-xs sm:text-sm">
                    International
                    <Badge variant="secondary" className="ml-2 bg-muted/80">{internationalCount}</Badge>
                  </TabsTrigger>
                </TabsList>
              </div>
            </Tabs>

            {/* News Grid */}
            <div className="space-y-12">
              {filteredNews.length === 0 ? (
                <Card className="border-2 border-dashed bg-muted/5 rounded-3xl overflow-hidden">
                  <CardContent className="py-24 text-center">
                    <div className="inline-flex items-center justify-center p-4 rounded-full bg-muted mb-4">
                      <TrendingUp className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">No articles found</h3>
                    <p className="text-muted-foreground max-w-xs mx-auto">
                      {activeCategory === "all" 
                        ? "Our economists are currently analyzing the latest news. Check back soon!"
                        : `No ${activeCategory} news articles available yet.`}
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <>
                  <div className="grid gap-8 sm:gap-12">
                    {displayedNews.map(renderNewsCard)}
                  </div>
                  
                  {hasMore && (
                    <div className="flex justify-center pt-8">
                      <Button 
                        variant="outline" 
                        size="lg" 
                        onClick={handleLoadMore}
                        className="rounded-full px-8 font-bold border-2 hover:bg-primary hover:text-primary-foreground transition-all group"
                      >
                        <RefreshCw className="w-4 h-4 mr-2 group-hover:rotate-180 transition-transform duration-500" />
                        Load More Articles
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-24">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2 mb-4 px-2">
                <Zap className="w-5 h-5 text-red-500 animate-pulse" />
                <h3 className="text-xl font-black tracking-tight uppercase">Live Indicators</h3>
              </div>
              <SingaporeEconomyDashboard />
            </motion.div>

            {/* Why Current Affairs Card */}
            <Card className="rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-primary/5 border-primary/10 overflow-hidden relative group">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-black tracking-tight">
                  The <span className="text-primary">Exam Advantage</span>
                </CardTitle>
                <CardDescription className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Linking News to Syllabus
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-0">
                {[
                  { id: 1, color: "bg-blue-500", text: "Deepens conceptual understanding beyond abstract definitions." },
                  { id: 2, color: "bg-orange-500", text: "Provides high-scoring examples for CSQs and Essays." },
                  { id: 3, color: "bg-green-500", text: "Develops the 'Evaluation' (EV) skills needed for A grades." },
                  { id: 4, color: "bg-purple-500", text: "Sharpens analytical thinking for policy debates." }
                ].map((item) => (
                  <div key={item.id} className="flex gap-3 p-3 rounded-xl bg-background/50 border border-border/50 transition-all hover:shadow-md">
                    <div className={`flex-shrink-0 w-6 h-6 rounded-md ${item.color}/10 flex items-center justify-center text-[10px] font-bold text-foreground`}>{item.id}</div>
                    <p className="text-xs font-medium leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
}
