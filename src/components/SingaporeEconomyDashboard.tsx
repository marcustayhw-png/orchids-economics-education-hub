"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus, Info, RefreshCw, DollarSign, Building2, Briefcase, ShoppingCart } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { motion } from "framer-motion";

interface EconData {
  label: string;
  value: string;
  trend: "up" | "down" | "neutral";
  description: string;
  source: string;
  period: string;
  icon?: React.ReactNode;
  color?: string;
}

export function SingaporeEconomyDashboard() {
  const data: EconData[] = [
    {
      label: "S$NEER Policy Stance",
      value: "Appreciating",
      trend: "up",
      description: "Modest & gradual appreciation. MAS uses exchange rate policy to manage imported inflation.",
      source: "MAS Oct 2024",
      period: "Active",
      icon: <DollarSign className="w-4 h-4" />,
      color: "emerald"
    },
    {
      label: "Core Inflation",
      value: "1.8%",
      trend: "down",
      description: "Excludes accommodation and private transport costs. Key metric for MAS monetary policy decisions.",
      source: "SingStat Nov 2024",
      period: "YoY",
      icon: <ShoppingCart className="w-4 h-4" />,
      color: "amber"
    },
    {
      label: "GDP Growth Rate",
      value: "4.1%",
      trend: "up",
      description: "Year-on-year real GDP expansion. Indicates overall economic health and potential output gap.",
      source: "MTI Q3 2024",
      period: "Q3 2024",
      icon: <TrendingUp className="w-4 h-4" />,
      color: "blue"
    },
    {
      label: "Headline Inflation",
      value: "1.4%",
      trend: "down",
      description: "All-items CPI. Reflects overall cost of living changes for Singapore households.",
      source: "SingStat Nov 2024",
      period: "YoY",
      icon: <ShoppingCart className="w-4 h-4" />,
      color: "orange"
    },
    {
      label: "Unemployment Rate",
      value: "2.0%",
      trend: "neutral",
      description: "Resident unemployment rate. Near full employment indicates strong labor market conditions.",
      source: "MOM Q3 2024",
      period: "Q3 2024",
      icon: <Briefcase className="w-4 h-4" />,
      color: "purple"
    },
    {
      label: "Budget Balance",
      value: "Surplus",
      trend: "up",
      description: "Government fiscal position. Singapore maintains prudent fiscal policy with reserves.",
      source: "MOF FY2024",
      period: "FY2024",
      icon: <Building2 className="w-4 h-4" />,
      color: "green"
    }
  ];

  const getColorClasses = (color: string, type: "bg" | "text" | "border") => {
    const colors: Record<string, Record<string, string>> = {
      emerald: { bg: "bg-emerald-500/10", text: "text-emerald-500", border: "border-emerald-500/20" },
      amber: { bg: "bg-amber-500/10", text: "text-amber-500", border: "border-amber-500/20" },
      blue: { bg: "bg-blue-500/10", text: "text-blue-500", border: "border-blue-500/20" },
      orange: { bg: "bg-orange-500/10", text: "text-orange-500", border: "border-orange-500/20" },
      purple: { bg: "bg-purple-500/10", text: "text-purple-500", border: "border-purple-500/20" },
      green: { bg: "bg-green-500/10", text: "text-green-500", border: "border-green-500/20" },
    };
    return colors[color]?.[type] || "";
  };

  return (
    <Card className="border-none shadow-xl bg-card/50 backdrop-blur-xl text-foreground overflow-hidden relative group rounded-[2rem] border border-border/50">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-50" />
      
      <CardHeader className="pb-4 border-b border-border/50 bg-muted/20 backdrop-blur-md relative z-10 px-6 pt-6">
        <div className="flex items-center justify-between">
          <CardTitle className="text-[10px] sm:text-xs font-black flex items-center gap-2 uppercase tracking-[0.15em] text-foreground/80">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            Singapore Economic Pulse
          </CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="cursor-help p-1.5 hover:bg-primary/10 rounded-full transition-colors">
                  <Info className="h-4 w-4 text-muted-foreground/60" />
                </div>
              </TooltipTrigger>
              <TooltipContent className="max-w-[250px] text-[10px] bg-popover border-border text-popover-foreground p-3 rounded-xl shadow-2xl backdrop-blur-xl font-medium">
                Key Singapore economic indicators for H2 Economics essays. Use these for real-world evaluation and policy analysis.
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex items-center justify-between mt-2">
          <CardDescription className="text-[9px] flex items-center gap-1.5 text-muted-foreground/60 font-bold uppercase tracking-[0.15em]">
            <RefreshCw className="h-2.5 w-2.5" /> Updated Q4 2024
          </CardDescription>
          <span className="text-[9px] font-black text-primary/60 uppercase tracking-widest bg-primary/5 px-2 py-0.5 rounded-full">Official Data</span>
        </div>
      </CardHeader>
      
      <CardContent className="pt-5 px-5 pb-5 space-y-4 relative z-10">
        {data.map((item, index) => (
          <motion.div 
            key={index} 
            className={`p-4 rounded-xl border ${getColorClasses(item.color || "blue", "border")} ${getColorClasses(item.color || "blue", "bg")} hover:shadow-md transition-all cursor-default group/item`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.08 }}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`${getColorClasses(item.color || "blue", "text")}`}>
                    {item.icon}
                  </span>
                  <span className="text-[10px] font-black text-muted-foreground uppercase tracking-wider truncate">{item.label}</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl sm:text-2xl font-black tracking-tight tabular-nums leading-none">{item.value}</span>
                  <div className={`flex items-center px-1.5 py-0.5 rounded text-[8px] font-black tracking-widest uppercase ${
                    item.trend === "up" ? "bg-emerald-500/10 text-emerald-600" : 
                    item.trend === "down" ? "bg-red-500/10 text-red-500" : "bg-amber-500/10 text-amber-600"
                  }`}>
                    {item.trend === "up" ? "▲" : item.trend === "down" ? "▼" : "—"}
                  </div>
                </div>
                <p className="text-[10px] text-muted-foreground/70 leading-relaxed line-clamp-2">
                  {item.description}
                </p>
              </div>
              <div className="flex-shrink-0 opacity-30 group-hover/item:opacity-60 transition-opacity">
                {item.trend === "up" && <TrendingUp className="h-5 w-5 text-emerald-500" />}
                {item.trend === "down" && <TrendingDown className="h-5 w-5 text-red-500" />}
                {item.trend === "neutral" && <Minus className="h-5 w-5 text-amber-500" />}
              </div>
            </div>
            <div className="mt-2 pt-2 border-t border-border/30 flex items-center justify-between">
              <span className="text-[8px] font-bold text-muted-foreground/40 uppercase tracking-wider">{item.source}</span>
              <span className="text-[8px] font-bold text-muted-foreground/40 uppercase tracking-wider">{item.period}</span>
            </div>
          </motion.div>
        ))}

        <div className="pt-4 mt-2 border-t border-border/50">
          <p className="text-[9px] text-muted-foreground/50 text-center font-medium">
            Data sourced from MAS, SingStat, MTI, MOM & MOF
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
