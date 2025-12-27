import { db } from './index';
import { econNews } from './schema';
import { sql } from 'drizzle-orm';

async function seed() {
  console.log('🔄 Recreating econ_news table...');
  
  try {
    // Drop and recreate table for SQLite/Turso
    await db.run(sql`DROP TABLE IF EXISTS econ_news`);
    await db.run(sql`
      CREATE TABLE econ_news (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        context TEXT,
        explanation TEXT,
        theory_connection TEXT,
        news_category TEXT NOT NULL DEFAULT 'International',
        topics TEXT NOT NULL,
        theories TEXT NOT NULL,
        published_date TEXT NOT NULL,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      )
    `);
    console.log('✅ Table recreated successfully.');
  } catch (error) {
    console.error('❌ Error recreating table:', error);
    // Continue anyway if drop fails or table exists
  }

  console.log('🌱 Seeding detailed Econ News...');

  const newsData = [
    // --- SINGAPORE NEWS (30) ---
    {
      title: "Singapore's GDP Grows 2.7% in Q1 2024, Beating Estimates",
      content: "Singapore's economy grew faster than expected in the first quarter of 2024, supported by a recovery in the manufacturing sector and robust services growth.",
      context: "After a sluggish 2023 characterized by global electronics downturns, Singapore's trade-dependent economy is seeing a turnaround. The Ministry of Trade and Industry (MTI) noted that the manufacturing sector, particularly electronics, is rebounding as global demand for semiconductors picks up.",
      explanation: "The 2.7% growth reflects an increase in Aggregate Demand (AD), driven by higher export revenue (X). The manufacturing recovery shifts the Short-Run Aggregate Supply (SRAS) curve favorably as unit costs stabilize. This growth is crucial for maintaining employment levels and investor confidence in the region.",
      theoryConnection: "Related to <b>Economic Growth</b> (Actual Growth), <b>Aggregate Demand/Aggregate Supply (AD/AS)</b> model, and the role of the <b>External Sector</b> in a small, open economy like Singapore.",
      newsCategory: "Singapore",
      topics: ["GDP", "Manufacturing", "Economic Growth", "Trade"],
      theories: ["AD-AS Model", "Actual Growth", "Export-led Growth"],
      publishedDate: "2024-05-23T00:00:00Z"
    },
    {
      title: "MAS Maintains Monetary Policy Stance in April 2024",
      content: "The Monetary Authority of Singapore (MAS) kept its prevailing rate of appreciation of the S$NEER policy band to ensure medium-term price stability.",
      context: "Inflation remained sticky in early 2024 due to high service costs and carbon tax hikes. MAS uses the exchange rate as its primary policy tool rather than interest rates, given Singapore's openness to capital flows and trade.",
      explanation: "By maintaining a gradual appreciation of the SGD, MAS aims to reduce <b>Imported Inflation</b>. A stronger SGD makes imports cheaper in local currency terms, dampening cost-push inflation. Simultaneously, it prevents the economy from overheating by slightly moderating the growth of export competitiveness.",
      theoryConnection: "Directly links to <b>Monetary Policy</b> in Singapore (Exchange Rate based), <b>Inflation</b> management (Cost-push vs Demand-pull), and <b>Balance of Payments</b>.",
      newsCategory: "Singapore",
      topics: ["Monetary Policy", "Inflation", "MAS", "Exchange Rate"],
      theories: ["S$NEER", "Imported Inflation", "Policy Transmission Mechanism"],
      publishedDate: "2024-04-12T00:00:00Z"
    },
    {
      title: "Singapore Budget 2024: Focus on SkillsFuture and AI",
      content: "Deputy Prime Minister Lawrence Wong announced a S$1.9 billion boost to the Assurance Package and significant investments in AI and worker retraining.",
      context: "The budget aims to address immediate cost-of-living concerns while positioning Singapore for long-term structural changes in the global economy, particularly the rise of Artificial Intelligence.",
      explanation: "The investment in SkillsFuture represents a <b>Supply-Side Policy</b> (interventionist). By enhancing labor productivity, the Long-Run Aggregate Supply (LRAS) shifts to the right, allowing for non-inflationary growth. The Assurance Package acts as a temporary <b>Fiscal Policy</b> measure to support consumption (C) amidst inflation.",
      theoryConnection: "Covers <b>Supply-Side Policies</b>, <b>Fiscal Policy</b>, <b>Productivity</b>, and <b>Structural Unemployment</b>.",
      newsCategory: "Singapore",
      topics: ["Budget 2024", "AI", "SkillsFuture", "Productivity"],
      theories: ["Supply-Side Policy", "LRAS", "Human Capital Investment"],
      publishedDate: "2024-02-16T00:00:00Z"
    },
    {
      title: "Core Inflation in Singapore Eases to 3.1% in May 2024",
      content: "Singapore's core inflation, which excludes private transport and accommodation, fell to 3.1% in May, the lowest since early 2022.",
      context: "The decline was driven by lower prices for services and food. This follows a period of rapid price increases driven by post-pandemic demand and global supply chain disruptions.",
      explanation: "Lower core inflation indicates a cooling of <b>Demand-Pull Inflation</b>. As global supply chains normalize, the <b>Cost-Push Inflation</b> pressures from imported food and energy also subside. This provides MAS with more flexibility in its future policy reviews.",
      theoryConnection: "Examines <b>Inflation</b> measurements (CPI vs Core), <b>Consumer Price Index</b>, and the impact of inflation on <b>Purchasing Power</b>.",
      newsCategory: "Singapore",
      topics: ["Inflation", "CPI", "Cost of Living"],
      theories: ["Core Inflation", "Purchasing Power", "Price Stability"],
      publishedDate: "2024-06-24T00:00:00Z"
    },
    {
      title: "Singapore to Raise Carbon Tax to $25 per Tonne in 2024",
      content: "As part of its Green Plan 2030, Singapore has implemented a significant hike in the carbon tax to encourage businesses to reduce emissions.",
      context: "Singapore is highly vulnerable to climate change. The tax is intended to internalize the external costs of carbon emissions and drive a transition to a low-carbon economy.",
      explanation: "This is a classic application of a <b>Pigouvian Tax</b> to correct a <b>Negative Externality of Production</b>. By increasing the private cost of production (MPC) to match the social cost (MSC), the tax reduces the over-allocation of resources to carbon-intensive activities, moving the market toward <b>Allocative Efficiency</b>.",
      theoryConnection: "Central to <b>Market Failure</b>, <b>Externalities</b>, and <b>Government Intervention</b> (Taxes).",
      newsCategory: "Singapore",
      topics: ["Green Plan", "Carbon Tax", "Sustainability"],
      theories: ["Negative Externality", "Pigouvian Tax", "Allocative Efficiency"],
      publishedDate: "2024-01-01T00:00:00Z"
    },
    {
        title: "Record High COEs in Singapore: Category B Hits $150k",
        content: "Certificate of Entitlement (COE) prices for larger cars reached unprecedented levels in late 2023 and early 2024, reflecting strong demand and limited quota.",
        context: "The COE system is a key pillar of Singapore's car-lite strategy. The high prices have sparked debates about social equity and the accessibility of private transport.",
        explanation: "The COE system uses a <b>Quotas</b> (quantity restriction) to manage the negative externalities of road congestion and pollution. The high price is a result of a highly <b>Price Inelastic Demand</b> (PED < 1) for prestige and necessity in certain segments, coupled with a fixed supply (perfectly inelastic supply curve).",
        theoryConnection: "Relates to <b>Price Elasticity of Demand (PED)</b>, <b>Market Failure</b> (Congestion), and <b>Quotas</b>.",
        newsCategory: "Singapore",
        topics: ["COE", "Transport", "Market Intervention"],
        theories: ["Price Elasticity", "Quotas", "Negative Externality"],
        publishedDate: "2024-03-20T00:00:00Z"
      },
      {
        title: "Singapore's Electronics Exports Surge by 22% in May 2024",
        content: "The electronics sector led a significant rebound in Non-Oil Domestic Exports (NODX), signaling a robust recovery in global tech demand.",
        context: "Singapore is a key hub in the global semiconductor value chain. The surge is linked to the AI boom and a replacement cycle for consumer electronics.",
        explanation: "The increase in NODX directly boosts <b>Net Exports (X-M)</b>, a component of Aggregate Demand. This leads to a <b>Multiplier Effect</b> where initial export earnings circulate through the economy, creating further income and employment. It also improves the <b>Current Account</b> of the Balance of Payments.",
        theoryConnection: "Focuses on <b>Multiplier Effect</b>, <b>Net Exports</b>, and <b>Balance of Payments</b>.",
        newsCategory: "Singapore",
        topics: ["Trade", "Electronics", "NODX"],
        theories: ["Multiplier Effect", "Circular Flow of Income", "Current Account"],
        publishedDate: "2024-06-17T00:00:00Z"
      },
      {
        title: "Rental Prices in Singapore Start to Moderate in 2024",
        content: "After two years of rapid increases, residential rental prices in Singapore have begun to stabilize as more housing units are completed.",
        context: "High rentals were a major concern for expats and businesses, affecting Singapore's competitiveness as a global talent hub.",
        explanation: "The stabilization is a result of an <b>Increase in Supply</b> shifting the supply curve for housing to the right. As the backlog of construction projects from the pandemic era is cleared, the market is moving toward a new equilibrium with lower price pressures.",
        theoryConnection: "Illustrates <b>Demand and Supply</b> analysis, <b>Market Equilibrium</b>, and <b>Competitiveness</b>.",
        newsCategory: "Singapore",
        topics: ["Housing", "Rentals", "Real Estate"],
        theories: ["Demand and Supply", "Equilibrium Price", "Supply Shocks"],
        publishedDate: "2024-05-10T00:00:00Z"
      },
      {
        title: "Singapore's Unemployment Rate Remains Low at 2.1% in Q1 2024",
        content: "Despite global economic uncertainties, Singapore's labor market remains tight, with low unemployment and steady wage growth.",
        context: "A tight labor market can lead to wage-price spirals if productivity does not keep pace. The government continues to emphasize upskilling to meet new industry needs.",
        explanation: "Low unemployment at 2.1% is close to the <b>Natural Rate of Unemployment</b> (frictional and structural). However, the tightness may cause <b>Cost-Push Inflation</b> as firms raise prices to cover higher wage costs (the wage-price spiral).",
        theoryConnection: "Covers <b>Unemployment</b> (Types and Causes), <b>Wage-Price Spiral</b>, and <b>Full Employment</b>.",
        newsCategory: "Singapore",
        topics: ["Labor Market", "Unemployment", "Wages"],
        theories: ["Natural Rate of Unemployment", "Cost-Push Inflation", "Full Employment"],
        publishedDate: "2024-06-13T00:00:00Z"
      },
      {
        title: "COMPASS Framework for EP Applicants Takes Effect",
        content: "The new Complementarity Assessment Framework (COMPASS) points-based system for Employment Pass (EP) applicants is now fully operational.",
        context: "The system evaluates applicants on criteria like salary, qualifications, and how they contribute to diversity and local employment.",
        explanation: "This is a <b>Supply-Side Policy</b> aimed at ensuring the quality of foreign labor. By selecting high-skilled talent, Singapore aims to enhance its <b>Human Capital</b> and shift the <b>LRAS</b> rightward, fostering long-term potential growth while managing social and physical constraints.",
        theoryConnection: "Relates to <b>Supply-Side Policies</b>, <b>Human Capital</b>, and <b>Labor Productivity</b>.",
        newsCategory: "Singapore",
        topics: ["Immigration", "Labor Quality", "COMPASS"],
        theories: ["LRAS", "Potential Growth", "Human Capital"],
        publishedDate: "2023-09-01T00:00:00Z"
      },
      // ... Adding more to reach 30 SG ...
      {
        title: "Singapore Extends GST Voucher Scheme to Offset Tax Hike",
        content: "The government announced additional support under the GST Voucher scheme to help lower-income households cope with the 9% GST rate.",
        context: "The GST was raised from 8% to 9% in January 2024 to fund rising healthcare and social spending for an aging population.",
        explanation: "While GST is a <b>Regressive Tax</b> (it takes a larger percentage of income from low-earners), the voucher scheme acts as a transfer payment to make the overall system more <b>Progressive</b>. This addresses <b>Equity</b> concerns while the tax itself generates necessary government revenue.",
        theoryConnection: "Examines <b>Taxation</b> (Regressive vs Progressive), <b>Equity</b>, and <b>Government Revenue</b>.",
        newsCategory: "Singapore",
        topics: ["GST", "Taxation", "Equity"],
        theories: ["Regressive Tax", "Transfer Payments", "Fiscal Equity"],
        publishedDate: "2024-01-15T00:00:00Z"
      },
      {
        title: "Singapore's 'Sea-Air' Connectivity Boosts Trade Resilience",
        content: "Investments in Changi Airport and Tuas Port are enhancing Singapore's role as a multi-modal logistics hub amid global supply chain shifts.",
        context: "Geopolitical tensions are leading companies to diversify supply chains. Singapore is positioning itself as a reliable 'safe harbor' for trade.",
        explanation: "Investment in infrastructure is a <b>Supply-Side Policy</b> that reduces business costs and increases <b>Productive Capacity</b>. This enhances Singapore's <b>Dynamic Comparative Advantage</b> in logistics and high-value services.",
        theoryConnection: "Focuses on <b>Infrastructure Investment</b>, <b>Supply-Side Policies</b>, and <b>Comparative Advantage</b>.",
        newsCategory: "Singapore",
        topics: ["Logistics", "Trade", "Infrastructure"],
        theories: ["Productive Capacity", "Dynamic Comparative Advantage", "Supply-Side Policy"],
        publishedDate: "2024-04-05T00:00:00Z"
      },
      {
        title: "Singapore's Tech Sector Sees Hiring Rebound in AI and Cybersecurity",
        content: "After a wave of layoffs in 2023, the tech sector is seeing renewed demand for specialists in emerging fields.",
        context: "The shift reflects a move from general expansion to targeted investment in 'must-have' technologies.",
        explanation: "This highlights <b>Structural Unemployment</b> as workers from declining sectors (e.g., traditional e-commerce) may lack the skills for new AI roles. Government-led retraining (SkillsFuture) is essential to reduce this mismatch.",
        theoryConnection: "Relates to <b>Structural Unemployment</b>, <b>Labor Market Flexibility</b>, and <b>Retraining</b>.",
        newsCategory: "Singapore",
        topics: ["Tech Jobs", "AI", "Employment"],
        theories: ["Structural Unemployment", "Occupational Mobility", "Skills Mismatch"],
        publishedDate: "2024-05-20T00:00:00Z"
      },
      {
        title: "Temasek Reports Portfolio Recovery Amid Global Market Gains",
        content: "Singapore's state investment firm Temasek saw its portfolio value rise in the last fiscal year, driven by strong performance in US and Indian markets.",
        context: "Temasek's returns contribute to the <b>Net Investment Returns Contribution (NIRC)</b>, which is the largest source of government revenue.",
        explanation: "The NIRC allows the government to fund social spending without relying solely on income or consumption taxes. This acts as a <b>Sustainable Fiscal Resource</b>, helping to manage the long-term budget without creating <b>Crowding Out</b> effects.",
        theoryConnection: "Covers <b>Government Finance</b>, <b>NIRC</b>, and <b>Fiscal Sustainability</b>.",
        newsCategory: "Singapore",
        topics: ["Temasek", "Government Revenue", "Investment"],
        theories: ["Fiscal Policy", "NIRC", "Public Finance"],
        publishedDate: "2024-07-09T00:00:00Z"
      },
      {
        title: "Singapore and China Expand Digital and Green Economy Cooperation",
        content: "New agreements signed in early 2024 focus on streamlining digital trade and promoting green finance between the two nations.",
        context: "China remains Singapore's largest trading partner. These 'new economy' areas are seen as future growth drivers.",
        explanation: "Reducing barriers to digital trade lowers <b>Transaction Costs</b> and increases the <b>Volume of Trade</b>. This expands the <b>Consumption Possibility Frontier (CPF)</b> beyond the <b>Production Possibility Frontier (PPF)</b> for both nations, consistent with the <b>Theory of Comparative Advantage</b>.",
        theoryConnection: "Relates to <b>International Trade</b>, <b>Comparative Advantage</b>, and <b>Economic Integration</b>.",
        newsCategory: "Singapore",
        topics: ["China Relations", "Digital Trade", "Green Economy"],
        theories: ["Comparative Advantage", "Gains from Trade", "Globalization"],
        publishedDate: "2024-03-12T00:00:00Z"
      },
      {
        title: "Household Income Grew in 2023, but Inequality Remains a Challenge",
        content: "The latest government report shows that median household income rose, though the Gini coefficient saw a slight uptick before government transfers.",
        context: "The Gini coefficient is a standard measure of income inequality, where 0 represents perfect equality and 1 represents perfect inequality.",
        explanation: "Government transfers and taxes (<b>Fiscal Policy</b>) significantly reduced the Gini coefficient from 0.43 to 0.37. This demonstrates the role of <b>Progressive Taxes</b> and <b>Transfer Payments</b> in achieving <b>Equity</b> and mitigating <b>Market Failure</b> in income distribution.",
        theoryConnection: "Central to <b>Income Inequality</b>, <b>Gini Coefficient</b>, and <b>Redistribution Policies</b>.",
        newsCategory: "Singapore",
        topics: ["Income", "Inequality", "Gini Coefficient"],
        theories: ["Gini Coefficient", "Progressive Taxation", "Equity vs Efficiency"],
        publishedDate: "2024-02-08T00:00:00Z"
      },
      {
        title: "Singapore's Manufacturing Output Falls in April 2024",
        content: "Manufacturing output saw a surprise dip in April, primarily due to a decline in biomedical manufacturing, despite growth in electronics.",
        context: "Biomedical manufacturing is notoriously volatile due to the timing of production batches and maintenance schedules.",
        explanation: "This volatility reflects <b>Structural Weakness</b> in depending on a few large sectors. A dip in manufacturing can lead to a temporary decrease in <b>AD</b> and potential <b>Cyclical Unemployment</b> if the trend persists. It underscores the need for <b>Diversification</b>.",
        theoryConnection: "Covers <b>Economic Stability</b>, <b>Manufacturing</b>, and <b>Structural Vulnerability</b>.",
        newsCategory: "Singapore",
        topics: ["Manufacturing", "Biomedical", "Output"],
        theories: ["Economic Stability", "AD-AS", "Diversification"],
        publishedDate: "2024-05-24T00:00:00Z"
      },
      {
        title: "Major Retailers in Singapore to Charge for Plastic Bags",
        content: "New regulations requiring large supermarkets to charge at least 5 cents per plastic bag took effect in mid-2023.",
        context: "The move aims to reduce plastic waste and encourage more sustainable consumer habits.",
        explanation: "This is a <b>Price-based Intervention</b> to address the <b>Negative Externality of Consumption</b>. By attaching a price to a formerly free good, consumers are forced to internalize some of the external costs (pollution, waste management), leading to a reduction in quantity demanded (Qd).",
        theoryConnection: "Relates to <b>Negative Externality</b>, <b>Market Intervention</b>, and <b>Price Elasticity of Demand</b>.",
        newsCategory: "Singapore",
        topics: ["Environment", "Sustainability", "Consumer Behavior"],
        theories: ["Negative Externality", "Internalizing Externalities", "PED"],
        publishedDate: "2023-07-03T00:00:00Z"
      },
      {
        title: "Singapore's Tourism Sector Expected to Reach Pre-Pandemic Levels in 2024",
        content: "The Singapore Tourism Board (STB) forecasts that visitor arrivals and tourism receipts will fully recover by the end of 2024.",
        context: "Tourism is a key services export. Major events like the Taylor Swift concert series significantly boosted arrivals in early 2024.",
        explanation: "Tourism acts as an <b>Export of Services</b>. Increased visitor spending (X) leads to an autonomous increase in <b>Aggregate Demand</b>. Through the <b>Multiplier Effect</b>, this supports jobs in hospitality, retail, and F&B, boosting overall GDP.",
        theoryConnection: "Focuses on <b>Services Trade</b>, <b>Multiplier Effect</b>, and <b>Aggregate Demand</b>.",
        newsCategory: "Singapore",
        topics: ["Tourism", "Services", "Economic Recovery"],
        theories: ["Multiplier Effect", "Export of Services", "AD"],
        publishedDate: "2024-02-01T00:00:00Z"
      },
      {
        title: "Singapore Launches 'AI Trailblazers' Initiative for SMEs",
        content: "The government is partnering with tech giants to help small and medium-sized enterprises (SMEs) adopt AI solutions to improve productivity.",
        context: "SMEs employ a majority of Singapore's workforce but often lag behind in digital transformation.",
        explanation: "This is a <b>Supply-Side Policy</b> aimed at narrowing the <b>Productivity Gap</b> between large firms and SMEs. By subsidizing technology adoption, the government helps firms lower their <b>Average Costs (AC)</b> and increases the economy's <b>Long-Run Aggregate Supply (LRAS)</b>.",
        theoryConnection: "Relates to <b>Productivity</b>, <b>Supply-Side Policies</b>, and <b>Business Costs</b>.",
        newsCategory: "Singapore",
        topics: ["AI", "SMEs", "Productivity"],
        theories: ["LRAS", "Productivity Gap", "Supply-Side Policy"],
        publishedDate: "2023-11-15T00:00:00Z"
      },
      {
        title: "Singapore's Private Home Prices Rise 1.5% in Q1 2024",
        content: "Private residential property prices continued to climb, though at a slower pace than in previous years, despite cooling measures.",
        context: "The government has introduced several rounds of cooling measures, including higher Additional Buyer's Stamp Duty (ABSD), to ensure a sustainable property market.",
        explanation: "Persistent price growth despite <b>Contractionary Policy</b> (ABSD) indicates strong <b>Investment Demand</b> and <b>Wealth Effects</b>. The <b>PED</b> for property in prime locations may be relatively inelastic, requiring significant tax hikes to curb demand effectively.",
        theoryConnection: "Examines <b>Market Cooling Measures</b>, <b>Taxation</b> (ABSD), and <b>Price Elasticity</b>.",
        newsCategory: "Singapore",
        topics: ["Real Estate", "Property Prices", "Cooling Measures"],
        theories: ["PED", "Taxation", "Market Equilibrium"],
        publishedDate: "2024-04-01T00:00:00Z"
      },
      {
        title: "Singapore and Malaysia Discuss 'Johor-Singapore Special Economic Zone'",
        content: "The two countries signed a MOU to develop a special economic zone (SEZ) to facilitate smoother movement of goods and people across the border.",
        context: "The SEZ aims to leverage the complementary strengths of Singapore (capital, tech) and Johor (land, labor).",
        explanation: "This move enhances <b>Regional Integration</b> and allows for <b>Agglomeration Economies</b>. Firms can split their value chain, performing high-end R&D in Singapore and cost-effective manufacturing in Johor, maximizing <b>Global Value Chain</b> efficiency.",
        theoryConnection: "Relates to <b>Regional Integration</b>, <b>Agglomeration Economies</b>, and <b>Comparative Advantage</b>.",
        newsCategory: "Singapore",
        topics: ["Malaysia", "SEZ", "Regional Trade"],
        theories: ["Comparative Advantage", "Value Chain", "Regionalism"],
        publishedDate: "2024-01-11T00:00:00Z"
      },
      {
        title: "Singapore's Maritime Sector Hit by Red Sea Disruptions",
        content: "Global shipping delays due to tensions in the Red Sea have led to increased costs and longer lead times for Singapore-bound vessels.",
        context: "Vessels are re-routing around the Cape of Good Hope, adding significantly to fuel costs and transit time.",
        explanation: "This is a <b>Negative Supply Shock</b>. Increased shipping costs raise the <b>Marginal Cost</b> of production for imported goods, shifting the <b>SRAS</b> curve to the left. This leads to <b>Cost-Push Inflation</b> and potentially slower growth (stagflationary pressure).",
        theoryConnection: "Covers <b>Supply Shocks</b>, <b>Cost-Push Inflation</b>, and <b>Global Supply Chains</b>.",
        newsCategory: "Singapore",
        topics: ["Shipping", "Red Sea", "Supply Chain"],
        theories: ["SRAS", "Cost-Push Inflation", "Supply Shock"],
        publishedDate: "2024-02-15T00:00:00Z"
      },
      {
        title: "Singapore Ranks as World's Most Expensive City (Again)",
        content: "Singapore shared the top spot with Zurich in the EIU's 2023 Worldwide Cost of Living survey.",
        context: "High costs are driven by expensive car ownership (COE), high utility prices, and rental costs.",
        explanation: "While high prices reflect a <b>Strong Currency</b> and high demand, they can hurt <b>International Competitiveness</b> for talent and investment. If local inflation exceeds that of trading partners, Singapore's exports may become less price-competitive (assuming a fixed or managed exchange rate).",
        theoryConnection: "Relates to <b>Purchasing Power Parity</b>, <b>Inflation</b>, and <b>Competitiveness</b>.",
        newsCategory: "Singapore",
        topics: ["Cost of Living", "Competitiveness", "Inflation"],
        theories: ["Purchasing Power", "Real Exchange Rate", "Competitiveness"],
        publishedDate: "2023-11-30T00:00:00Z"
      },
      {
        title: "Singapore to Launch First Hydrogen-Ready Power Plant by 2026",
        content: "Keppel Sakra Cogen Plant will be the first in Singapore to use hydrogen as a fuel source to generate cleaner electricity.",
        context: "The project is a key step toward Singapore's commitment to net-zero emissions by 2050.",
        explanation: "This is a <b>Supply-Side Investment</b> in green technology. By transitioning away from natural gas, Singapore reduces its <b>External Costs</b> of power generation. It also builds a <b>First-Mover Advantage</b> in the hydrogen economy.",
        theoryConnection: "Focuses on <b>Public Goods/Externalities</b>, <b>Innovation</b>, and <b>Long-term Growth</b>.",
        newsCategory: "Singapore",
        topics: ["Energy", "Hydrogen", "Net Zero"],
        theories: ["Externalities", "Supply-Side Policy", "First-Mover Advantage"],
        publishedDate: "2023-07-19T00:00:00Z"
      },
      {
        title: "Singapore's Sovereign Wealth Fund GIC Cautious on Global Outlook",
        content: "GIC reported a steady long-term return but warned of 'higher for longer' interest rates and geopolitical risks ahead.",
        context: "GIC manages a portion of Singapore's foreign reserves, aiming to preserve and enhance the international purchasing power of the reserves.",
        explanation: "Foreign reserves act as a <b>Buffer</b> against external shocks. They allow MAS to intervene in the foreign exchange market to maintain the <b>S$NEER</b> policy band, ensuring <b>Monetary Stability</b> even during global financial turbulence.",
        theoryConnection: "Relates to <b>Foreign Reserves</b>, <b>Exchange Rate Policy</b>, and <b>Economic Resilience</b>.",
        newsCategory: "Singapore",
        topics: ["GIC", "Investment", "Reserves"],
        theories: ["Exchange Rate Management", "Foreign Reserves", "Stability"],
        publishedDate: "2024-07-24T00:00:00Z"
      },
      {
        title: "Rise of 'Quiet Quitting' and Its Impact on Singapore's Productivity",
        content: "Surveys indicate a trend of disengagement among some workers, posing a challenge to the nation's drive for higher productivity.",
        context: "Productivity growth has been lagging behind wage growth in certain service sectors, leading to unit labor cost increases.",
        explanation: "Falling productivity shifts the <b>SRAS</b> leftward as <b>Unit Labor Costs</b> rise. To maintain growth without inflation, productivity must rise. This highlights the <b>Principal-Agent Problem</b> in labor markets and the need for better incentive structures.",
        theoryConnection: "Examines <b>Productivity</b>, <b>Unit Labor Costs</b>, and <b>Incentives</b>.",
        newsCategory: "Singapore",
        topics: ["Workforce", "Productivity", "Labor Market"],
        theories: ["SRAS", "Productivity", "Incentives"],
        publishedDate: "2024-03-05T00:00:00Z"
      },
      {
        title: "Singapore's Retail Sales Dip in April 2024 Amid Slower Tourism",
        content: "Retail sales (excluding motor vehicles) fell by 1.2%, as spending on department stores and watches/jewelry declined.",
        context: "The dip followed a very strong March which was boosted by major concerts. It highlights the volatility of consumption patterns.",
        explanation: "Consumption (C) is the largest component of AD. A dip in retail sales indicates a potential slowdown in <b>Induced Consumption</b>. It also reflects <b>Consumer Sentiment</b>, which may be dampened by high interest rates and cost-of-living concerns.",
        theoryConnection: "Relates to <b>Consumption</b>, <b>Aggregate Demand</b>, and <b>Consumer Sentiment</b>.",
        newsCategory: "Singapore",
        topics: ["Retail", "Consumption", "Economy"],
        theories: ["Aggregate Demand", "Consumption Function", "Induced Consumption"],
        publishedDate: "2024-06-05T00:00:00Z"
      },
      {
        title: "Singapore Invests in 'Deep Tech' Startups to Drive Future Growth",
        content: "The government has allocated more funds to support startups in fields like quantum computing, space tech, and advanced materials.",
        context: "Deep tech ventures have high R&D costs and long gestation periods but offer the potential for transformative economic impact.",
        explanation: "Deep tech involves <b>Positive Externalities of Research</b>. Because the private return is lower than the social return (due to knowledge spillovers), the market would <b>Under-invest</b> without government support. Subsidies and grants aim to achieve a more <b>Socially Optimal Level of Output</b>.",
        theoryConnection: "Central to <b>Market Failure</b> (Positive Externalities) and <b>Supply-Side Policies</b>.",
        newsCategory: "Singapore",
        topics: ["Deep Tech", "Innovation", "Startups"],
        theories: ["Positive Externality", "Research & Development", "Market Failure"],
        publishedDate: "2024-04-18T00:00:00Z"
      },
      {
        title: "Singapore's Labor Force Participation Rate Reaches Record High",
        content: "More seniors and women are entering the workforce, helping to mitigate the effects of an aging population.",
        context: "The government has promoted flexible work arrangements and age-friendly workplaces to broaden the labor pool.",
        explanation: "An increase in the <b>Labor Force Participation Rate</b> expands the <b>Potential Labor Supply</b>, shifting the <b>LRAS</b> rightward. This helps to counteract the <b>Structural Headwinds</b> of an aging population and reduces dependency ratios.",
        theoryConnection: "Focuses on <b>Labor Supply</b>, <b>LRAS</b>, and <b>Aging Population</b>.",
        newsCategory: "Singapore",
        topics: ["Labor Force", "Demographics", "Employment"],
        theories: ["LRAS", "Labor Supply", "Demographic Change"],
        publishedDate: "2024-01-30T00:00:00Z"
      },

    // --- INTERNATIONAL NEWS (25) ---
    {
      title: "US Federal Reserve Holds Rates Steady in June 2024",
      content: "The Fed kept interest rates at 5.25%-5.50% but signaled that only one rate cut might be expected by the end of 2024.",
      context: "Inflation in the US has cooled but remains above the 2% target. The labor market has shown surprising resilience, allowing the Fed to maintain high rates for longer.",
      explanation: "By keeping interest rates high, the Fed is pursuing a <b>Contractionary Monetary Policy</b>. High rates increase the <b>Cost of Borrowing</b> for consumers and firms, leading to lower Consumption (C) and Investment (I), which shifts <b>Aggregate Demand (AD)</b> to the left to combat <b>Demand-Pull Inflation</b>.",
      theoryConnection: "Directly relates to <b>Monetary Policy</b> (Interest Rate based), <b>Inflation</b> management, and <b>Aggregate Demand</b>.",
      newsCategory: "International",
      topics: ["US Federal Reserve", "Interest Rates", "Inflation"],
      theories: ["Contractionary Monetary Policy", "Interest Rate Transmission", "AD-AS Model"],
      publishedDate: "2024-06-12T00:00:00Z"
    },
    {
      title: "China's Property Sector Crisis Deepens Despite Support Measures",
      content: "Major developers continue to face liquidity issues, and new home prices have seen the sharpest decline in nearly a decade.",
      context: "The property sector once accounted for 25% of China's GDP. Its downturn has hit consumer confidence and local government revenues.",
      explanation: "The property crisis creates a <b>Negative Wealth Effect</b>. As home values fall, household net worth decreases, leading to a fall in <b>Consumption (C)</b>. The resulting drop in <b>AD</b> contributes to deflationary pressures and slower <b>Economic Growth</b>.",
      theoryConnection: "Illustrates the <b>Wealth Effect</b>, <b>Economic Growth</b>, and <b>Systemic Risk</b>.",
      newsCategory: "International",
      topics: ["China", "Property Market", "Real Estate"],
      theories: ["Wealth Effect", "Consumption Function", "Deflationary Gap"],
      publishedDate: "2024-05-17T00:00:00Z"
    },
    {
      title: "Global Oil Prices Volatile Amid Middle East Tensions",
      content: "Brent crude fluctuated between $80 and $90 as markets weighed geopolitical risks against signs of weakening demand in China.",
      context: "Oil is a key input for almost all sectors. Volatility in energy prices can lead to significant supply-side shocks for importing nations.",
      explanation: "Rising oil prices act as a <b>Negative Supply Shock</b>, increasing the <b>Cost of Production</b> for firms. This shifts the <b>Short-Run Aggregate Supply (SRAS)</b> curve to the left, causing <b>Cost-Push Inflation</b> and potentially reduced output (<b>Stagflation</b>).",
      theoryConnection: "Central to <b>Supply-Side Shocks</b>, <b>Cost-Push Inflation</b>, and <b>SRAS</b>.",
      newsCategory: "International",
      topics: ["Oil Prices", "Energy", "Geopolitics"],
      theories: ["Supply Shock", "Cost-Push Inflation", "SRAS"],
      publishedDate: "2024-04-15T00:00:00Z"
    },
    {
      title: "Japan Ends Negative Interest Rate Policy in Historic Shift",
      content: "The Bank of Japan raised its short-term interest rate to 0%-0.1%, ending an era of ultra-loose monetary policy designed to fight deflation.",
      context: "After decades of stagnant prices, Japan is finally seeing sustainable inflation driven by wage increases (shunto).",
      explanation: "This shift signals a move away from <b>Quantitative Easing</b> toward <b>Monetary Normalization</b>. The goal is to prevent the economy from overheating while maintaining a positive <b>Inflation Target</b>. It also impacts the <b>Yen's Exchange Rate</b> and global capital flows.",
      theoryConnection: "Focuses on <b>Monetary Policy</b> (Zero Lower Bound), <b>Deflation</b>, and <b>Inflation Targeting</b>.",
      newsCategory: "International",
      topics: ["Japan", "Bank of Japan", "Interest Rates"],
      theories: ["Deflationary Spiral", "Liquidity Trap", "Monetary Normalization"],
      publishedDate: "2024-03-19T00:00:00Z"
    },
    {
      title: "EU Imposes Provisional Tariffs on Chinese Electric Vehicles",
      content: "The European Commission announced tariffs of up to 38.1% on Chinese EV imports, citing 'unfair subsidies' that threaten EU manufacturers.",
      context: "Chinese EVs are often 20-30% cheaper than European models. The EU is trying to protect its domestic automotive industry, a key source of jobs.",
      explanation: "This is a <b>Protectionist Policy</b> (Tariff). A tariff raises the price of imports, reducing the <b>Consumer Surplus</b> and creating <b>Deadweight Loss</b>. While it protects <b>Domestic Employment</b> (infant industry or strategic industry argument), it risks <b>Retaliation</b> and higher prices for consumers.",
      theoryConnection: "Related to <b>International Trade</b>, <b>Protectionism</b>, and <b>Tariff Analysis</b>.",
      newsCategory: "International",
      topics: ["EU", "China", "Electric Vehicles", "Trade War"],
      theories: ["Tariffs", "Protectionism", "Deadweight Loss"],
      publishedDate: "2024-06-12T00:00:00Z"
    },
    {
      title: "AI Boom Drives Nvidia to World's Most Valuable Company",
      content: "Nvidia's market capitalization briefly surpassed Microsoft and Apple as demand for its AI chips continues to soar.",
      context: "The AI 'arms race' has led to massive capital expenditure by tech giants, shifting the focus of the global economy toward hardware and data centers.",
      explanation: "The AI boom represents a <b>Positive Technology Shock</b>. In the long run, widespread AI adoption can drastically increase <b>Labor Productivity</b>, shifting the <b>Long-Run Aggregate Supply (LRAS)</b> curve to the right and allowing for higher output without inflation.",
      theoryConnection: "Examines <b>Technological Progress</b>, <b>Productivity</b>, and <b>LRAS</b>.",
      newsCategory: "International",
      topics: ["AI", "Nvidia", "Tech Sector"],
      theories: ["Technology Shock", "Productivity", "LRAS"],
      publishedDate: "2024-06-18T00:00:00Z"
    },
    {
      title: "UK Inflation Hits 2% Target for First Time in Three Years",
      content: "Inflation in the United Kingdom fell to the Bank of England's 2% target in May 2024, down from a peak of 11.1% in late 2022.",
      context: "The UK faced a severe cost-of-living crisis driven by high energy prices and post-Brexit labor shortages.",
      explanation: "The return to target reflects the success of <b>Contractionary Monetary Policy</b> (high interest rates) and the easing of <b>Imported Inflation</b>. However, 'sticky' services inflation remains a concern, suggesting that <b>Demand-Pull</b> pressures have not fully subsided.",
      theoryConnection: "Covers <b>Inflation</b>, <b>Monetary Policy</b>, and <b>Cost-of-Living</b>.",
      newsCategory: "International",
      topics: ["UK", "Inflation", "Bank of England"],
      theories: ["Inflation Targeting", "Purchasing Power", "Monetary Policy"],
      publishedDate: "2024-06-19T00:00:00Z"
    },
    {
      title: "IMF Raises Global Growth Forecast for 2024",
      content: "The International Monetary Fund (IMF) now expects global GDP to grow by 3.2%, citing the surprising resilience of the US economy.",
      context: "Despite high interest rates and wars in Ukraine and Gaza, global trade has held up better than expected.",
      explanation: "Higher global growth increases <b>External Demand</b> for exporting nations. This shifts their <b>AD</b> curves to the right. The IMF also noted that <b>Fiscal Consolidation</b> (reducing government debt) is needed as emergency pandemic spending ends.",
      theoryConnection: "Relates to <b>Global Economic Outlook</b>, <b>Interdependence</b>, and <b>Fiscal Policy</b>.",
      newsCategory: "International",
      topics: ["IMF", "Global Economy", "Growth Forecast"],
      theories: ["Economic Growth", "Interdependence", "Global Trade"],
      publishedDate: "2024-04-16T00:00:00Z"
    },
    {
      title: "India's Economy Grows 8.2% in FY 2023-24",
      content: "India remains the world's fastest-growing major economy, driven by strong manufacturing and infrastructure spending.",
      context: "India is benefiting from the 'China Plus One' strategy as companies move manufacturing away from China to diversify supply chains.",
      explanation: "India's growth is driven by both <b>AD</b> (Infrastructure spending) and <b>LRAS</b> (Manufacturing expansion). The move of firms to India represents <b>Foreign Direct Investment (FDI)</b>, which brings in capital and technology, boosting <b>Potential Growth</b>.",
      theoryConnection: "Examines <b>FDI</b>, <b>Potential Growth</b>, and <b>Emerging Markets</b>.",
      newsCategory: "International",
      topics: ["India", "Economic Growth", "Manufacturing"],
      theories: ["FDI", "Potential Growth", "Comparative Advantage"],
      publishedDate: "2024-05-31T00:00:00Z"
    },
    {
      title: "Cocoa Prices Triple in 2024 Due to West Africa Supply Shortages",
      content: "Poor harvests in Ivory Coast and Ghana have sent cocoa prices to record highs, impacting chocolate manufacturers worldwide.",
      context: "Climate change and aging trees have severely reduced yields in the world's top producing region.",
      explanation: "This is a classic <b>Supply-Side Constraint</b>. With a highly <b>Price Inelastic Demand</b> for chocolate (few close substitutes for many consumers), a decrease in supply leads to a sharp increase in price and a rise in <b>Total Revenue</b> for remaining producers, but higher costs for firms using cocoa as an input.",
      theoryConnection: "Relates to <b>Demand and Supply</b>, <b>Price Elasticity of Demand (PED)</b>, and <b>Supply Shocks</b>.",
      newsCategory: "International",
      topics: ["Commodities", "Cocoa", "Agriculture"],
      theories: ["Demand and Supply", "PED", "Supply Shocks"],
      publishedDate: "2024-03-26T00:00:00Z"
    },
    {
      title: "Eurozone Exits Recession with 0.3% Growth in Q1 2024",
      content: "The Euro area returned to growth after two quarters of contraction, led by Germany and Spain.",
      context: "Europe has struggled with high energy costs following Russia's invasion of Ukraine. Lower gas prices and a recovering services sector are helping.",
      explanation: "The recovery indicates a <b>Positive Supply Shock</b> (lower energy costs) shifting <b>SRAS</b> rightward. This helps reduce <b>Cyclical Unemployment</b>. However, the <b>European Central Bank (ECB)</b> must balance growth with its inflation target.",
      theoryConnection: "Covers <b>Recession</b>, <b>Recovery</b>, and <b>Energy Economics</b>.",
      newsCategory: "International",
      topics: ["Eurozone", "ECB", "Recovery"],
      theories: ["Recession", "Business Cycle", "Supply Shock"],
      publishedDate: "2024-04-30T00:00:00Z"
    },
    {
      title: "G7 Agrees to Use Frozen Russian Assets for Ukraine Loan",
      content: "Leaders agreed to provide a $50 billion loan to Ukraine, funded by interest earned on frozen Russian central bank assets.",
      context: "The move is a significant escalation in the use of financial sanctions and has sparked debates about the future of the global financial system.",
      explanation: "This is an example of <b>Geopolitical Risk</b> affecting <b>International Capital Flows</b>. Such measures can lead to <b>De-dollarization</b> as other nations seek to diversify their reserves to avoid similar sanctions, potentially impacting the USD's <b>Exchange Rate</b> in the long term.",
      theoryConnection: "Relates to <b>Sanctions</b>, <b>Reserves</b>, and <b>Exchange Rates</b>.",
      newsCategory: "International",
      topics: ["G7", "Russia", "Ukraine", "Sanctions"],
      theories: ["Capital Flows", "Exchange Rate", "Geopolitical Risk"],
      publishedDate: "2024-06-13T00:00:00Z"
    },
    {
      title: "De-globalization: Trade Barriers Hit Record High in 2023",
      content: "The WTO warned that the increasing number of trade-restrictive measures is fragmenting the global economy.",
      context: "Nations are increasingly prioritizing 'national security' and 'self-sufficiency' over economic efficiency.",
      explanation: "Fragmentation leads to <b>Inallocative Efficiency</b> as production is moved from low-cost to high-cost locations ('friend-shoring'). This reduces the <b>Global Gains from Trade</b> and can lead to <b>Persistent Inflation</b> as supply chains become less efficient.",
      theoryConnection: "Focuses on <b>Globalization</b>, <b>Trade Barriers</b>, and <b>Efficiency</b>.",
      newsCategory: "International",
      topics: ["Trade", "WTO", "Globalization"],
      theories: ["Gains from Trade", "Protectionism", "Allocative Efficiency"],
      publishedDate: "2024-01-10T00:00:00Z"
    },
    {
      title: "Apple Fined €1.8 Billion by EU Over Music Streaming Rules",
      content: "The EU antitrust regulator fined Apple for abusing its dominant position by preventing apps from informing users of cheaper alternatives outside the App Store.",
      context: "The ruling is part of a broader crackdown on 'Big Tech' dominance under the Digital Markets Act (DMA).",
      explanation: "This addresses <b>Market Power</b> and <b>Monopoly Abuse</b>. By restricting information, Apple created a <b>Market Failure</b>. The fine and corrective orders aim to increase <b>Consumer Information</b> and promote <b>Competition</b>, leading to lower prices and more innovation.",
      theoryConnection: "Central to <b>Monopoly</b>, <b>Market Power</b>, and <b>Antitrust Regulation</b>.",
      newsCategory: "International",
      topics: ["Apple", "EU", "Antitrust", "Monopoly"],
      theories: ["Market Power", "Monopoly Abuse", "Market Failure"],
      publishedDate: "2024-03-04T00:00:00Z"
    },
    {
      title: "Argentina's Inflation Hits 211% in 2023, Highest in Decades",
      content: "Under new President Javier Milei, Argentina is undergoing 'shock therapy' to stabilize the economy, including a massive currency devaluation.",
      context: "Years of fiscal deficits and money printing have led to <b>Hyperinflation</b>. The new government is cutting spending drastically to restore confidence.",
      explanation: "Hyperinflation destroys the <b>Store of Value</b> function of money. The 'shock therapy' is an extreme <b>Contractionary Fiscal Policy</b> and <b>Exchange Rate Devaluation</b> aimed at stopping the <b>Inflationary Spiral</b>. It often leads to a deep initial <b>Recession</b>.",
      theoryConnection: "Examines <b>Hyperinflation</b>, <b>Functions of Money</b>, and <b>Fiscal Stabilization</b>.",
      newsCategory: "International",
      topics: ["Argentina", "Inflation", "Hyperinflation"],
      theories: ["Hyperinflation", "Shock Therapy", "Fiscal Deficit"],
      publishedDate: "2024-01-11T00:00:00Z"
    },
    {
      title: "South Africa's Election Results Spark Market Volatility",
      content: "The ANC lost its majority for the first time since 1994, leading to a coalition government and uncertainty over economic policy.",
      context: "South Africa faces high unemployment (33%) and severe energy shortages (load shedding).",
      explanation: "Political uncertainty increases <b>Risk Premiums</b>, leading to <b>Capital Outflow</b> and a <b>Depreciation</b> of the Rand. Higher interest rates may be needed to stabilize the currency, but this can further dampen <b>Domestic Investment (I)</b> and growth.",
      theoryConnection: "Relates to <b>Capital Flows</b>, <b>Exchange Rates</b>, and <b>Political Economy</b>.",
      newsCategory: "International",
      topics: ["South Africa", "Emerging Markets", "Politics"],
      theories: ["Capital Flight", "Exchange Rate Depreciation", "Investment"],
      publishedDate: "2024-06-03T00:00:00Z"
    },
    {
      title: "Global Debt Reaches New Record High of $315 Trillion",
      content: "The Institute of International Finance warned that high interest rates are making debt servicing increasingly difficult for emerging markets.",
      context: "Pandemic-era borrowing and high inflation have pushed debt levels to unprecedented highs across both public and private sectors.",
      explanation: "High public debt can lead to <b>Crowding Out</b>, where government borrowing raises interest rates and reduces <b>Private Investment</b>. It also limits the <b>Fiscal Space</b> available to respond to future recessions.",
      theoryConnection: "Focuses on <b>Fiscal Policy</b>, <b>Crowding Out</b>, and <b>Debt Sustainability</b>.",
      newsCategory: "International",
      topics: ["Global Debt", "Finance", "Interest Rates"],
      theories: ["Crowding Out", "Fiscal Policy", "Debt Sustainability"],
      publishedDate: "2024-05-15T00:00:00Z"
    },
    {
      title: "Shipping Container Rates Surge as Red Sea Crisis Persists",
      content: "Spot rates for containers from Asia to Europe have more than doubled since late 2023 as capacity remains tight.",
      context: "The Suez Canal route is largely avoided, forcing ships on the much longer Cape of Good Hope route.",
      explanation: "This is a <b>Supply-Side Disruption</b>. Higher freight rates increase the <b>CIF (Cost, Insurance, and Freight)</b> value of imports, contributing to <b>Cost-Push Inflation</b> globally. It demonstrates the vulnerability of <b>Just-in-Time</b> supply chains.",
      theoryConnection: "Relates to <b>Supply Chains</b>, <b>Cost-Push Inflation</b>, and <b>Global Trade</b>.",
      newsCategory: "International",
      topics: ["Shipping", "Trade", "Logistics"],
      theories: ["Cost-Push Inflation", "Supply Chain Shocks", "Global Trade"],
      publishedDate: "2024-01-20T00:00:00Z"
    },
    {
      title: "Microsoft and OpenAI Plan $100 Billion Stargate Supercomputer",
      content: "The massive project aims to provide the computing power needed for the next generation of artificial intelligence models.",
      context: "Data center investment has become a major component of national infrastructure planning and private capital expenditure.",
      explanation: "This is a massive <b>Inflow of Investment (I)</b>, which is a component of <b>AD</b>. In the long run, it enhances the <b>Capital Stock</b> of the economy, shifting the <b>LRAS</b> rightward and increasing <b>Potential Growth</b>.",
      theoryConnection: "Examines <b>Investment</b>, <b>Capital Accumulation</b>, and <b>Potential Growth</b>.",
      newsCategory: "International",
      topics: ["AI", "Microsoft", "Investment"],
      theories: ["Investment", "Capital Stock", "Potential Growth"],
      publishedDate: "2024-03-29T00:00:00Z"
    },
    {
      title: "COP28: Global Agreement to 'Transition Away' from Fossil Fuels",
      content: "For the first time in history, nations at the UN climate summit agreed on a framework to move away from coal, oil, and gas.",
      context: "While the agreement is non-binding, it sends a powerful signal to global markets and investors about the future of energy.",
      explanation: "This agreement aims to address the <b>Negative Externality of Carbon Emissions</b> on a global scale. By signaling the end of the fossil fuel era, it encourages <b>Dynamic Efficiency</b> through innovation in renewables and carbon capture.",
      theoryConnection: "Central to <b>Externalities</b>, <b>Public Goods</b>, and <b>Market Failure</b>.",
      newsCategory: "International",
      topics: ["Climate Change", "COP28", "Energy"],
      theories: ["Negative Externality", "Public Goods", "Market Failure"],
      publishedDate: "2023-12-13T00:00:00Z"
    },
    {
        title: "Federal Reserve's 'Higher for Longer' Stance Impacts Mortgage Rates",
        content: "US 30-year fixed mortgage rates remain near 7%, the highest in two decades, cooling the housing market.",
        context: "The high rates have led to a 'lock-in effect' where homeowners are reluctant to sell and lose their existing low-rate mortgages.",
        explanation: "High mortgage rates reduce the <b>Affordability</b> of housing, shifting the demand curve for homes to the left. The 'lock-in effect' reduces the <b>Supply of Homes</b>, preventing a large crash in prices but leading to low <b>Transaction Volume</b>. This is a <b>Monetary Policy Transmission</b> to the real economy.",
        theoryConnection: "Relates to <b>Monetary Policy</b>, <b>Housing Market</b>, and <b>Interest Rate Sensitivity</b>.",
        newsCategory: "International",
        topics: ["Real Estate", "Interest Rates", "Mortgages"],
        theories: ["Monetary Policy", "Demand and Supply", "Interest Rate Transmission"],
        publishedDate: "2024-05-30T00:00:00Z"
      },
      {
        title: "Global Semiconductor Sales Rebound in Early 2024",
        content: "The industry saw double-digit growth in Q1, driven by demand for automotive and industrial chips as well as AI processors.",
        context: "The semiconductor cycle is a key leading indicator for global industrial production.",
        explanation: "Semiconductors are an <b>Intermediate Good</b>. Increased demand reflects an <b>Expansionary Phase</b> of the <b>Business Cycle</b>. For countries like South Korea, Taiwan, and Singapore, this boosts <b>Net Exports (X-M)</b> and GDP.",
        theoryConnection: "Examines <b>Business Cycles</b>, <b>Leading Indicators</b>, and <b>Export-led Growth</b>.",
        newsCategory: "International",
        topics: ["Semiconductors", "Tech", "Manufacturing"],
        theories: ["Business Cycle", "Intermediate Goods", "Export-led Growth"],
        publishedDate: "2024-05-06T00:00:00Z"
      },
      {
        title: "Brazil's Central Bank Slows Pace of Rate Cuts Amid Inflation Risks",
        content: "The Copom reduced the Selic rate by 0.25 percentage points, a smaller cut than previous meetings, citing rising fiscal uncertainty.",
        context: "Brazil has been a leader in the global rate-cutting cycle but is now facing headwinds from a weaker Real and government spending concerns.",
        explanation: "This is a <b>Preemptive Monetary Policy</b> move. If the central bank fears that <b>Fiscal Profligacy</b> will lead to <b>Demand-Pull Inflation</b>, it must maintain higher rates to anchor <b>Inflation Expectations</b>. It also reflects the <b>Policy Mix</b> between fiscal and monetary authorities.",
        theoryConnection: "Covers <b>Inflation Expectations</b>, <b>Policy Mix</b>, and <b>Monetary Policy</b>.",
        newsCategory: "International",
        topics: ["Brazil", "Interest Rates", "Emerging Markets"],
        theories: ["Inflation Expectations", "Policy Mix", "Monetary Policy"],
        publishedDate: "2024-05-08T00:00:00Z"
      },
      {
        title: "Decline of the Petrodollar? Saudi Arabia Explores Multi-Currency Oil Trade",
        content: "Reports suggest Saudi Arabia is considering accepting other currencies besides the USD for oil sales, potentially weakening the dollar's global dominance.",
        context: "The 1974 'petrodollar' agreement solidified the USD's status as the world's reserve currency.",
        explanation: "If oil is traded in other currencies, the <b>Demand for USD</b> in the foreign exchange market would decrease, potentially leading to a <b>Depreciation of the USD</b>. This would increase US <b>Export Competitiveness</b> but also raise the price of <b>Imported Goods</b> for US consumers.",
        theoryConnection: "Relates to <b>Reserve Currencies</b>, <b>Exchange Rates</b>, and <b>International Finance</b>.",
        newsCategory: "International",
        topics: ["USD", "Oil", "Saudi Arabia", "De-dollarization"],
        theories: ["Exchange Rate", "Reserve Currency", "Demand and Supply"],
        publishedDate: "2024-06-14T00:00:00Z"
      },
      {
        title: "Turkey's Central Bank Hikes Rates to 50% to Combat Inflation",
        content: "In a dramatic U-turn from previous unorthodox policies, Turkey has aggressively raised rates to stabilize the Lira and curb soaring prices.",
        context: "Inflation in Turkey had reached over 70%, fueled by low interest rates and a collapsing currency.",
        explanation: "This is a return to <b>Orthodox Monetary Policy</b>. By raising rates to 50%, the central bank aims to make the Lira more attractive (attracting <b>Hot Money Inflows</b>), stabilize the exchange rate, and reduce <b>Cost-Push Inflation</b> from imports, while also dampening <b>AD</b>.",
        theoryConnection: "Examines <b>Hyperinflation</b>, <b>Exchange Rate Stability</b>, and <b>Monetary Orthodoxy</b>.",
        newsCategory: "International",
        topics: ["Turkey", "Inflation", "Interest Rates"],
        theories: ["Monetary Policy", "Hot Money", "Exchange Rate Stability"],
        publishedDate: "2024-03-21T00:00:00Z"
      }
  ];

  try {
    for (const data of newsData) {
      await db.insert(econNews).values({
        ...data,
        topics: JSON.stringify(data.topics),
        theories: JSON.stringify(data.theories),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    }
    console.log(`✅ Successfully seeded ${newsData.length} articles!`);
  } catch (error) {
    console.error('❌ Error seeding news:', error);
  }
}

seed();
