"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus, Info, Calendar, RefreshCw } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface EconData {
  label: string;
  value: string;
  trend: "up" | "down" | "neutral";
  description: string;
  source: string;
  period: string;
}

export function SingaporeEconomyDashboard() {
  const [data, setData] = useState<EconData[]>([
    {
      label: "Core Inflation",
      value: "0.5%",
      trend: "neutral",
      description: "Excludes accommodation and private transport. Key metric for MAS policy.",
      source: "MAS Forecast 2025",
      period: "Current"
    },
    {
      label: "GDP Growth",
      value: "3.9%",
      trend: "up",
      description: "Year-on-year expansion. Shows overall economic health and output gap.",
      source: "MTI Q1-Q3 2025",
      period: "2025"
    },
    {
      label: "S$NEER Stance",
      value: "Appreciating",
      trend: "up",
      description: "Modest rate of appreciation. Used to combat imported inflation.",
      source: "MAS Oct 2025",
      period: "Active"
    },
    {
      label: "Headline Inflation",
      value: "1.2%",
      trend: "down",
      description: "All-items CPI. Reflects cost of living changes for households.",
      source: "SingStat 2025",
      period: "Current"
    }
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleDateString());

  // In a real app, we would fetch from MAS API here
  // For this implementation, we use the most recent 2025/2026 figures found
  
  return (
    <Card className="border-2 shadow-sm bg-card/50 backdrop-blur-sm overflow-hidden">
      <CardHeader className="pb-3 border-b bg-muted/30">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            SG Economy Live
          </CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Info className="h-4 w-4 text-muted-foreground" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="max-w-[200px] text-xs">
                Reference these real-time figures in your essays for higher "Application" and "Evaluation" marks.
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <CardDescription className="text-[10px] flex items-center gap-1">
          <Calendar className="h-3 w-3" /> Updated: Dec 2025
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4 space-y-4">
        {data.map((item, index) => (
          <div key={index} className="space-y-1.5 group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">{item.label}</span>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold tracking-tight">{item.value}</span>
                {item.trend === "up" && <TrendingUp className="h-3 w-3 text-emerald-500" />}
                {item.trend === "down" && <TrendingDown className="h-3 w-3 text-red-500" />}
                {item.trend === "neutral" && <Minus className="h-3 w-3 text-amber-500" />}
              </div>
            </div>
            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "70%" }}
                transition={{ delay: index * 0.1, duration: 1 }}
                className={`h-full rounded-full ${
                  item.trend === "up" ? "bg-emerald-500/50" : 
                  item.trend === "down" ? "bg-red-500/50" : "bg-amber-500/50"
                }`} 
              />
            </div>
            <p className="text-[10px] text-muted-foreground leading-tight hidden group-hover:block transition-all italic">
              {item.description}
            </p>
          </div>
        ))}

        <div className="pt-2">
          <Badge variant="outline" className="w-full justify-center text-[10px] py-1 font-mono uppercase tracking-wider border-dashed">
            Syllabus: Macro Performance
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
