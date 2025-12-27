"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, Newspaper, TrendingUp, Globe, Building2, BookOpen, Layers, Target, ShieldCheck, AlertTriangle, Scale, Zap, RefreshCw, Calendar, ArrowRight } from "lucide-react";
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
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      );
    }

    const renderNewsCard = (item: EconNewsItem, index: number) => (
      <motion.div
        key={item.id}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: index % 5 * 0.1 }}
      >
        <Card 
          className="border-none shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden bg-card/40 backdrop-blur-xl group border border-white/5 rounded-[2rem] sm:rounded-[3rem]"
        >
          <div className="p-0">
            <CardHeader className="space-y-4 sm:space-y-6 pb-2 px-8 sm:px-12 pt-10 sm:pt-14 relative z-10">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-none text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full">
                    {item.newsCategory}
                  </Badge>
                  <div className="h-1.5 w-1.5 rounded-full bg-primary/20" />
                  <div className="flex items-center gap-1.5 text-[10px] font-black text-muted-foreground uppercase tracking-widest bg-muted/30 px-3 py-1.5 rounded-full">
                    <Calendar className="w-3 h-3" />
                    {new Date(item.publishedDate).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>
                </div>
              </div>
              
              <CardTitle className="text-2xl sm:text-5xl font-black tracking-tighter text-foreground group-hover:text-primary transition-colors duration-500 leading-[1] sm:leading-[1]">
                {item.title}
              </CardTitle>

              <div className="flex flex-wrap gap-3">
                {item.theories.slice(0, 4).map((theory, idx) => (
                  <span key={idx} className="text-[10px] sm:text-[11px] font-black text-primary/40 uppercase tracking-[0.15em] hover:text-primary/100 transition-colors cursor-default">
                    #{theory.replace(/\s+/g, '')}
                  </span>
                ))}
              </div>
            </CardHeader>

            <CardContent className="pt-6 px-8 sm:px-12 pb-10 sm:pb-14 space-y-8 relative z-10">
              <div 
                className="prose prose-sm sm:prose-base lg:prose-lg max-w-none text-foreground/70 leading-relaxed font-medium selection:bg-primary/20"
                dangerouslySetInnerHTML={{ __html: item.content }}
              />

              <div className="flex flex-wrap gap-2 pt-6 border-t border-border/20">
                {item.topics.map((topic, idx) => (
                  <Badge 
                    key={idx} 
                    variant="outline" 
                    className="text-[10px] font-black px-4 py-1.5 rounded-full border-border/50 bg-muted/20 text-muted-foreground/60 hover:bg-primary/10 hover:text-primary hover:border-primary/20 transition-all cursor-default"
                  >
                    {topic}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </div>
        </Card>
      </motion.div>
    );

    return (
      <div className="min-h-screen bg-background selection:bg-primary/30 py-16 px-4 sm:px-6 lg:px-8 overflow-x-hidden">
        <div className="max-w-7xl mx-auto w-full">
          {/* Hero Section */}
          <div className="text-center mb-16 space-y-6 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10" />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border-primary/20 text-primary font-black uppercase tracking-[0.25em] text-[10px] mb-2 bg-primary/5 backdrop-blur-sm"
            >
              <Zap className="w-3.5 h-3.5 fill-primary" /> Economic Terminal
            </motion.div>
            <h1 className="text-5xl sm:text-8xl lg:text-9xl font-black tracking-tighter bg-gradient-to-br from-foreground via-foreground to-foreground/40 bg-clip-text text-transparent leading-[0.85] py-2">
              ECONOMICS <br /> <span className="text-primary drop-shadow-2xl">IN ACTION</span>
            </h1>
            <p className="text-base sm:text-xl leading-relaxed text-muted-foreground max-w-2xl mx-auto font-medium opacity-70">
              Bridging the gap between the classroom and the real world through real-time economic intelligence.
            </p>
          </div>

          {/* Improved Navigation - Sticky & Minimalist */}
          <div className="mb-20 flex justify-center sticky top-8 z-50 py-2 -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="p-1.5 bg-background/40 backdrop-blur-2xl rounded-[2rem] border border-white/5 shadow-2xl shadow-black/10 w-full max-w-lg">
              <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
                <TabsList className="h-14 bg-transparent w-full grid grid-cols-3 gap-1">
                  <TabsTrigger value="all" className="rounded-2xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg font-black transition-all text-[11px] uppercase tracking-widest">
                    Live Feed
                    <span className="ml-2 opacity-40 font-black text-[9px]">{news.length}</span>
                  </TabsTrigger>
                  <TabsTrigger value="Singapore" className="rounded-2xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg font-black transition-all text-[11px] uppercase tracking-widest">
                    Singapore
                    <span className="ml-2 opacity-40 font-black text-[9px]">{singaporeCount}</span>
                  </TabsTrigger>
                  <TabsTrigger value="International" className="rounded-2xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg font-black transition-all text-[11px] uppercase tracking-widest">
                    Global
                    <span className="ml-2 opacity-40 font-black text-[9px]">{internationalCount}</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-10">
            {/* News Grid */}
            <div className="space-y-10">
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
              {activeCategory === "Singapore" && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-2 mb-4 px-2">
                    <Zap className="w-5 h-5 text-red-500 animate-pulse" />
                    <h3 className="text-xl font-black tracking-tight uppercase">Live Indicators</h3>
                  </div>
                  <SingaporeEconomyDashboard />
                </motion.div>
              )}

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
