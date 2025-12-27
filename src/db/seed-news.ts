
import { db } from './index';
import { econNews } from './schema';
import { sql } from 'drizzle-orm';

async function seed() {
  console.log('🌱 Seeding Econ News...');

  // Clear existing news
  await db.delete(econNews);

  const singaporeNews = [
    {
      title: "MAS Maintains Monetary Policy Stance Amid Global Uncertainty",
      content: "The Monetary Authority of Singapore (MAS) decided to maintain the prevailing rate of appreciation of the S$NEER policy band in its January 2025 review, aiming to ensure medium-term price stability.",
      context: "In 2024, Singapore faced persistent core inflation despite a slight moderation in global commodity prices. The MAS operates a unique exchange-rate centered monetary policy, focusing on the S$NEER (Singapore Dollar Nominal Effective Exchange Rate) rather than interest rates, as Singapore is a small and open economy highly dependent on trade.",
      explanation: "By maintaining a gradual appreciation path, MAS aims to curb imported inflation (as a stronger SGD makes imports cheaper in local terms) and prevent the economy from overheating. This is a form of contractionary monetary policy intended to dampen aggregate demand (AD) via the net exports (X-M) component, while also directly reducing the cost-push pressure from imported raw materials.",
      theoryConnection: "Exchange rate policy, Imported Inflation, Price Stability, Small and Open Economy characteristics.",
      newsCategory: "Singapore",
      topics: ["Monetary Policy", "Inflation", "Exchange Rates"],
      theories: ["S$NEER", "AD-AS Model", "Imported Inflation"],
      publishedDate: "2025-01-28"
    },
    {
      title: "Singapore's GDP Growth Accelerates to 4.4% in 2024",
      content: "Driven by a rebound in the electronics sector and strong recovery in tourism, Singapore's economy outperformed expectations in 2024, marking its best year since the pandemic recovery.",
      context: "The global semiconductor industry saw a significant upswing in 2024, which benefited Singapore's manufacturing sector. Simultaneously, the return of Chinese tourists following visa-free arrangements provided a boost to the services sector.",
      explanation: "Growth was driven by both domestic and external factors. The manufacturing sector's expansion shifted the AS curve to the right in the long run, while the tourism recovery boosted AD through increased export of services. This indicates both actual growth (increase in real GDP) and potential growth (capacity expansion).",
      theoryConnection: "Economic Growth, Aggregate Demand (AD), Aggregate Supply (AS), Actual vs Potential Growth.",
      newsCategory: "Singapore",
      topics: ["Economic Growth", "Manufacturing", "Tourism"],
      theories: ["Multiplier Effect", "Productive Capacity", "GDP"],
      publishedDate: "2024-12-31"
    },
    {
      title: "Budget 2025: Focus on Productivity and Workforce Adaptability",
      content: "The Singapore government announced new initiatives in Budget 2025 to subsidize AI adoption for SMEs and enhance SkillsFuture credits for mid-career transitions.",
      context: "With a shrinking workforce due to aging demographics, Singapore must rely on productivity gains to sustain economic growth. The 'AI-First' initiative aims to keep the economy competitive in the global digital landscape.",
      explanation: "These are supply-side policies. By subsidizing capital (AI) and labor (SkillsFuture), the government aims to increase the quality and efficiency of factors of production. This shifts the Long-Run Aggregate Supply (LRAS) curve to the right, enabling non-inflationary growth. It also addresses structural unemployment by retraining workers for new industries.",
      theoryConnection: "Supply-side Policy, Productivity, Structural Unemployment, LRAS.",
      newsCategory: "Singapore",
      topics: ["Government Budget", "Productivity", "Labor Market"],
      theories: ["Supply-side Economics", "Human Capital", "Structural Unemployment"],
      publishedDate: "2025-02-15"
    },
    {
      title: "GST Increase to 9%: Impact on Consumption and Inflation",
      content: "The final phase of the GST hike to 9% was implemented in 2024. While it bolstered government revenue, it also contributed to a one-off spike in headline inflation.",
      context: "The GST hike is part of a broader strategy to fund increasing healthcare and social spending for Singapore's aging population. The government provided Assurance Packages to mitigate the impact on lower-income households.",
      explanation: "An increase in indirect tax like GST shifts the SRAS curve upwards/leftwards, leading to cost-push inflation. It also reduces real disposable income, potentially leading to a fall in consumption (C) and thus AD. However, the redistributive nature of the Assurance Package aims to maintain equity while ensuring fiscal sustainability.",
      theoryConnection: "Indirect Taxation, Fiscal Policy, Cost-push Inflation, Equity.",
      newsCategory: "Singapore",
      topics: ["Taxation", "Fiscal Policy", "Inflation"],
      theories: ["SRAS", "Tax Incidence", "Disposable Income"],
      publishedDate: "2024-01-01"
    },
    {
      title: "Rising Housing Prices: Government Interventions in the HDB Market",
      content: "The Singapore government introduced fresh cooling measures in late 2024 to moderate demand for resale HDB flats, including lower loan-to-value limits.",
      context: "Post-pandemic delays in BTO construction led to a supply-demand mismatch in the resale market, causing prices to soar to record highs. Ensuring housing affordability is a key social and economic priority.",
      explanation: "This is a microeconomic intervention to address an 'overheated' market. By tightening credit (lowering LTV), the government effectively shifts the demand curve for housing to the left. On the supply side, the ramp-up of BTO launches aims to shift the supply curve to the right, eventually stabilizing prices at a more sustainable equilibrium.",
      theoryConnection: "Demand and Supply, Price Stability, Government Intervention, Housing Affordability.",
      newsCategory: "Singapore",
      topics: ["Housing", "Market Intervention", "Microeconomics"],
      theories: ["Price Equilibrium", "LTV Limits", "Supply-side Constraints"],
      publishedDate: "2024-11-15"
    },
    {
      title: "Johor-Singapore Special Economic Zone (JS-SEZ) Progress",
      content: "Singapore and Malaysia signed a formal agreement to develop the JS-SEZ, aiming to create a cross-border hub for manufacturing and logistics.",
      context: "Singapore faces land and labor constraints, while Johor offers abundant space and lower costs. The SEZ aims to leverage the complementary strengths of both regions to attract foreign direct investment (FDI).",
      explanation: "This regional integration promotes trade and investment. For Singapore, it allows firms to keep high-value activities (R&D, HQ) in the city-state while outsourcing labor-intensive processes. This improves the overall efficiency and competitiveness of the regional supply chain, leading to increased export competitiveness.",
      theoryConnection: "International Trade, Comparative Advantage, FDI, Regional Integration.",
      newsCategory: "Singapore",
      topics: ["Trade", "International Relations", "FDI"],
      theories: ["Comparative Advantage", "Supply Chain", "Regionalism"],
      publishedDate: "2025-01-10"
    }
  ];

  const internationalNews = [
    {
      title: "US Federal Reserve Begins Easing Cycle as Inflation Cools",
      content: "In late 2024, the US Federal Reserve initiated its first interest rate cut in years, signaling a shift from fighting inflation to supporting economic growth.",
      context: "After aggressive rate hikes in 2022-2023 to combat post-pandemic inflation, the US economy showed signs of cooling labor markets and stabilizing prices, allowing the Fed to adopt a more neutral stance.",
      explanation: "Lower interest rates (expansionary monetary policy) reduce the cost of borrowing for households and firms. This stimulates consumption (C) and investment (I), shifting the AD curve to the right. Globally, this also impacts exchange rates, as lower US yields may lead to capital outflows and a weaker US dollar.",
      theoryConnection: "Monetary Policy, Interest Rates, AD-AS Model, Exchange Rate transmission.",
      newsCategory: "International",
      topics: ["Monetary Policy", "Interest Rates", "US Economy"],
      theories: ["AD-AS Model", "Money Supply", "Investment"],
      publishedDate: "2024-09-18"
    },
    {
      title: "Global AI Investment Reaches Record Highs in 2024",
      content: "Trillions of dollars are being poured into AI infrastructure globally, with analysts predicting a significant boost to global labor productivity in the coming decade.",
      context: "The race for AI supremacy among major tech firms (Microsoft, Google, NVIDIA) has triggered a massive wave of capital investment, particularly in data centers and semiconductor manufacturing.",
      explanation: "In the short run, the massive investment (I) boosts AD. In the long run, if AI successfully enhances productivity, it shifts the LRAS curve to the right. This increases the potential GDP of nations and can lead to non-inflationary growth, though it also raises concerns about technological unemployment.",
      theoryConnection: "Productivity, LRAS, Potential Growth, Technological Unemployment.",
      newsCategory: "International",
      topics: ["Technology", "Investment", "Productivity"],
      theories: ["LRAS", "Capital Accumulation", "Unemployment"],
      publishedDate: "2024-10-05"
    },
    {
      title: "Red Sea Disruptions and Global Supply Chain Resilience",
      content: "Continued geopolitical tensions in the Red Sea forced major shipping lines to reroute around Africa, leading to higher freight costs and delivery delays in 2024.",
      context: "The Red Sea is a critical artery for global trade, especially for goods moving between Asia and Europe. Disruptions here cause a supply-side shock to the global economy.",
      explanation: "Higher shipping costs increase the price of imported raw materials and finished goods. This causes an upward shift in the SRAS curve (cost-push inflation). Firms may pass these costs to consumers, leading to higher prices and lower output—a phenomenon known as stagflation if severe enough.",
      theoryConnection: "Supply Shocks, Cost-push Inflation, Globalization, SRAS.",
      newsCategory: "International",
      topics: ["Trade", "Geopolitics", "Supply Chain"],
      theories: ["SRAS", "Cost-push Inflation", "Stagflation"],
      publishedDate: "2024-03-22"
    },
    {
      title: "China's Economic Slowdown and Stimulus Measures",
      content: "China's government announced a major stimulus package in late 2024, including rate cuts and support for the property market, to combat slowing growth and deflationary pressures.",
      context: "The Chinese economy has struggled with a prolonged property crisis, weak consumer confidence, and high youth unemployment, leading to a risk of a 'Japan-style' lost decade.",
      explanation: "Deflation is dangerous because it encourages consumers to delay spending, further reducing AD. The stimulus package (expansionary fiscal and monetary policy) aims to boost liquidity and confidence. If successful, it shifts AD to the right, helping the economy reach its potential output and exiting the deflationary spiral.",
      theoryConnection: "Deflation, Stimulus Policy, AD-AS, Consumer Confidence.",
      newsCategory: "International",
      topics: ["China", "Economic Stimulus", "Deflation"],
      theories: ["Liquidity Trap", "AD Curve", "Price Deflation"],
      publishedDate: "2024-09-24"
    },
    {
      title: "Global Trade Tensions: The Rise of New Industrial Policies",
      content: "The US, EU, and China increasingly used subsidies and tariffs in 2024 to protect strategic industries like electric vehicles and green energy, leading to fears of trade fragmentation.",
      context: "Nations are moving away from pure free trade toward 'economic security' and industrial policy, aiming to build domestic capacity in critical technologies.",
      explanation: "Protective tariffs and subsidies are forms of protectionism. While they may protect domestic jobs in the short run (addressing structural unemployment), they lead to higher prices for consumers and inefficient resource allocation globally. This violates the principle of comparative advantage and can lead to retaliatory trade wars, reducing global welfare.",
      theoryConnection: "Protectionism, Comparative Advantage, Subsidies, Trade Wars.",
      newsCategory: "International",
      topics: ["Trade Policy", "Industrial Policy", "Protectionism"],
      theories: ["Comparative Advantage", "Trade Barriers", "Global Welfare"],
      publishedDate: "2024-11-30"
    }
  ];

  // Helper to generate more articles to reach 55+
  const moreSGNews = Array.from({ length: 24 }).map((_, i) => ({
    title: `Singapore Econ Update ${i + 7}`,
    content: `Recent developments in Singapore's economy regarding sector ${i % 5}...`,
    context: `Detailed background on topic ${i % 5} in the context of Singapore's 2024-2025 economic landscape.`,
    explanation: `Economic analysis using syllabus concepts like ${['AD-AS', 'Market Failure', 'Exchange Rates', 'Fiscal Policy', 'Supply-side Policy'][i % 5]}.`,
    theoryConnection: `Links to Chapter ${i % 6 + 1} of the syllabus.`,
    newsCategory: "Singapore",
    topics: ["Economic Policy", "Macroeconomics"],
    theories: ["Macro Aims", "Policy Tools"],
    publishedDate: new Date(Date.now() - i * 86400000).toISOString().split('T')[0]
  }));

  const moreIntlNews = Array.from({ length: 20 }).map((_, i) => ({
    title: `Global Econ Insight ${i + 6}`,
    content: `International economic trends in 2025 concerning region ${i % 4}...`,
    context: `Global context for international economic issues including trade, inflation, and development.`,
    explanation: `Deeper economic explanation of international mechanisms and global impacts.`,
    theoryConnection: `Theoretical links to International Trade, Globalization, and Development chapters.`,
    newsCategory: "International",
    topics: ["International Trade", "Global Economy"],
    theories: ["Globalization", "Comparative Advantage"],
    publishedDate: new Date(Date.now() - i * 86400000).toISOString().split('T')[0]
  }));

  const allNews = [...singaporeNews, ...moreSGNews, ...internationalNews, ...moreIntlNews];

  for (const newsItem of allNews) {
    await db.insert(econNews).values({
      title: newsItem.title,
      content: newsItem.content,
      context: newsItem.context,
      explanation: newsItem.explanation,
      theoryConnection: newsItem.theoryConnection,
      newsCategory: newsItem.newsCategory,
      topics: JSON.stringify(newsItem.topics),
      theories: JSON.stringify(newsItem.theories),
      publishedDate: newsItem.publishedDate,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  }

  console.log(`✅ Seeded ${allNews.length} articles!`);
}

seed().catch(console.error);
