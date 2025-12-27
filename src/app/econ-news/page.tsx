"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, Newspaper, TrendingUp, Globe, Building2, BookOpen, Layers, Target, ShieldCheck, AlertTriangle, Scale, Zap, RefreshCw, Calendar } from "lucide-react";
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

  const renderNewsCard = (item: EconNewsItem, index: number) => (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index % 5 * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      <Card 
        className="border-none shadow-2xl hover:shadow-[0_32px_64px_-15px_rgba(0,0,0,0.2)] transition-all duration-700 overflow-hidden bg-card/40 backdrop-blur-xl group relative border border-white/5"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        
        <div className="p-1">
          <CardHeader className="space-y-8 pb-10 pt-10 px-8 sm:px-12 bg-gradient-to-b from-muted/20 to-transparent relative z-10">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl ${item.newsCategory === "Singapore" ? "bg-red-500/10 text-red-500" : "bg-blue-500/10 text-blue-500"} backdrop-blur-md border border-current/20`}>
                  {item.newsCategory === "Singapore" ? <Building2 className="w-5 h-5" /> : <Globe className="w-5 h-5" />}
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 block">Category</span>
                  <span className="text-xs font-bold uppercase tracking-wider">{item.newsCategory}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3 bg-background/40 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/5">
                <Calendar className="w-4 h-4 text-primary" />
                <span className="text-[10px] font-black uppercase tracking-widest">
                  {new Date(item.publishedDate).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
              </div>
            </div>
            
            <CardTitle className="text-3xl sm:text-5xl lg:text-6xl font-black break-words leading-[0.95] tracking-tighter text-foreground group-hover:text-primary transition-colors duration-500">
              {item.title}
            </CardTitle>

            <div className="flex flex-wrap gap-2.5">
              {item.theories.map((theory, idx) => (
                <Badge key={idx} variant="outline" className="bg-primary/5 text-primary border-primary/20 text-[10px] py-1.5 px-4 rounded-full font-bold uppercase tracking-wider">
                  {theory}
                </Badge>
              ))}
            </div>
          </CardHeader>

          <CardContent className="pt-2 px-8 sm:px-12 pb-12 space-y-12 relative z-10">
            {/* Main Summary */}
            <div className="relative">
              <div className="absolute -left-4 sm:-left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/50 to-transparent rounded-full opacity-50" />
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
                  <Newspaper className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-black uppercase tracking-tight">The Lowdown</h3>
              </div>
              <div 
                className="prose prose-base sm:prose-xl max-w-none text-foreground/80 leading-relaxed font-medium selection:bg-primary/20"
                dangerouslySetInnerHTML={{ __html: item.content }}
              />
            </div>

            {/* Detailed Explanation and Context Sections */}
            <div className="grid gap-10 pt-12 border-t border-border/10">
              {item.context && (
                <div className="space-y-4 col-span-full">
                   <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500 border border-blue-500/20">
                      <Target className="w-5 h-5" />
                    </div>
                    <h4 className="text-lg font-black uppercase tracking-tight">Real-World Context</h4>
                  </div>
                  <div 
                    className="prose prose-base max-w-none text-muted-foreground bg-blue-500/[0.02] p-8 rounded-[2rem] border border-blue-500/10 leading-relaxed italic shadow-inner"
                    dangerouslySetInnerHTML={{ __html: item.context }}
                  />
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-8">
                {item.explanation && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-orange-500/10 text-orange-500 border border-orange-500/20">
                        <Zap className="w-5 h-5" />
                      </div>
                      <h4 className="text-lg font-black uppercase tracking-tight text-orange-500/90">The Logic</h4>
                    </div>
                    <div 
                      className="prose prose-sm sm:prose-base max-w-none text-muted-foreground bg-orange-500/[0.02] p-6 rounded-3xl border border-orange-500/10 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: item.explanation }}
                    />
                  </div>
                )}

                {item.theoryConnection && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-green-500/10 text-green-500 border border-green-500/20">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <h4 className="text-lg font-black uppercase tracking-tight text-green-500/90">Syllabus Link</h4>
                    </div>
                    <div 
                      className="prose prose-sm sm:prose-base max-w-none text-muted-foreground bg-green-500/[0.02] p-6 rounded-3xl border border-green-500/10 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: item.theoryConnection }}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Topics Footer */}
            <div className="pt-10 border-t border-border/10">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2 bg-muted/30 px-4 py-2 rounded-xl border border-border/50">
                  <Layers className="w-4 h-4 text-primary" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Syllabus Tags</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {item.topics.map((topic, idx) => (
                    <Badge 
                      key={idx} 
                      variant="secondary" 
                      className="text-[10px] font-bold px-5 py-2 rounded-full bg-background/50 hover:bg-primary hover:text-primary-foreground transition-all duration-300 border border-border/50 uppercase tracking-widest"
                    >
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </motion.div>
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
