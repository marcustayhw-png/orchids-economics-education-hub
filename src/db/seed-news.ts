import { db } from "./index";
import { econNews } from "./schema";

const newsData = [
  // --- SINGAPORE NEWS (30 Articles) ---
  {
    title: "Singapore Economy Surges 4.4% in 2024, Beating Forecasts",
    summary: "Singapore's GDP expanded by 4.4% in 2024, significantly higher than the 1.8% growth in 2023. The growth was driven by a robust recovery in the manufacturing sector, particularly in electronics and server-related products, as the global technology cycle upturned.",
    url: "https://www.channelnewsasia.com/singapore/gdp-growth-2024-final-estimate-manufacturing-electronics-4942151",
    category: "Singapore",
    theory: "This surge in GDP growth represents an increase in **Actual Growth**. The rebound in manufacturing, driven by export demand for electronics (X), shifted the **Aggregate Demand (AD)** curve to the right. As AD = C + I + G + (X-M), the increase in (X-M) leads to a multiplied increase in national income through the **multiplier effect**. Furthermore, the investment in high-end manufacturing capacity also increases the **Long-run Aggregate Supply (LRAS)**, contributing to **Potential Growth** and mitigating inflationary pressures.",
    strengths: "The growth indicates Singapore's resilience and ability to capitalize on global tech trends. High growth leads to higher tax revenues for the government, allowing for greater investment in social infrastructure and human capital.",
    limitations: "Growth remains highly skewed towards the manufacturing sector. The services sector, while growing, faces productivity challenges. Furthermore, Singapore's small and open nature makes this growth highly dependent on external demand, which is subject to geopolitical risks.",
    evaluations: "While the 4.4% growth is commendable, the sustainability of this pace depends on Singapore's ability to maintain its competitive edge in emerging tech sectors like AI and green energy. Diversification into high-value services is essential to buffer against volatility in the global electronics cycle.",
    tags: "Economic Growth, AD/AS, External Demand"
  },
  {
    title: "Singapore Core Inflation Expected to Stabilize Between 1.5-2.5% in 2025",
    summary: "The Monetary Authority of Singapore (MAS) and the Ministry of Trade and Industry (MTI) expect core inflation to moderate further in 2025. This is due to lower imported inflation and a more balanced domestic labor market, which reduces wage-push inflationary pressures.",
    url: "https://www.straitstimes.com/business/economy/singapore-core-inflation-falls-to-18-in-march-lowest-since-late-2021",
    category: "Singapore",
    theory: "The moderation in inflation can be explained by a decrease in **Cost-Push Inflation**. A stronger S$NEER policy (monetary policy) makes imports cheaper, reducing the cost of imported raw materials and energy (imported inflation). On the domestic front, a 'more balanced' labor market implies that the **Output Gap** is narrowing, reducing the upward pressure on wages and thus preventing a **wage-price spiral**. This helps maintain **Price Stability**, which is a key macroeconomic objective.",
    strengths: "Stable prices preserve the purchasing power of households and provide a predictable environment for businesses to make long-term investment decisions. It also improves Singapore's export competitiveness if inflation is lower than that of its trading partners.",
    limitations: "While core inflation is moderating, certain headline components like transport and accommodation may remain volatile due to supply-side constraints (COE prices and rental market dynamics).",
    evaluations: "MAS's proactive exchange rate policy has been effective in anchoring inflation expectations. However, the government must remain vigilant against external supply shocks (e.g., oil price spikes) that can bypass monetary policy effects.",
    tags: "Inflation, Monetary Policy, Cost-Push"
  },
  {
    title: "MAS Maintains S$NEER Policy Band to Anchor Price Stability",
    summary: "In its April 2025 policy statement, the MAS decided to maintain the prevailing rate of appreciation of the S$NEER policy band. There were no changes to the width or the level at which the band is centered, reflecting a cautious stance amid global uncertainties.",
    url: "https://www.mas.gov.sg/news/monetary-policy-statements/2025/monetary-policy-statement-14apr25",
    category: "Singapore",
    theory: "Singapore uses an **Exchange Rate-centered Monetary Policy**. By maintaining an appreciation path, MAS aims to curb **Imported Inflation** and prevent the economy from overheating. An appreciating Singapore dollar makes exports more expensive in foreign currency and imports cheaper in local currency, which helps dampen **Aggregate Demand (AD)** and reduce inflationary pressures. This is particularly effective for a 'Price-Taker' nation with high import content.",
    strengths: "The exchange rate is a more direct and effective tool for Singapore than interest rates because of the country's high trade-to-GDP ratio and openness to capital flows.",
    limitations: "A consistently appreciating currency can hurt the price competitiveness of exports, especially in price-sensitive sectors like tourism and lower-end manufacturing.",
    evaluations: "The decision to maintain the current path suggests MAS believes the economy is currently on a sustainable growth-inflation trajectory. The 'neutral' stance allows for flexibility should global trade conditions deteriorate significantly.",
    tags: "Monetary Policy, Exchange Rate, Inflation"
  },
  {
    title: "Manufacturing Rebound Driven by AI Servers and Semiconductors",
    summary: "The infocomms and consumer electronics segment expanded by over 60% in early 2025, primarily due to the global demand for AI-related infrastructure. This has provided a significant boost to Singapore's industrial production index.",
    url: "https://www.channelnewsasia.com/business/singapore-industrial-production-manufacturing-january-2025-4952011",
    category: "Singapore",
    theory: "This represents a **Structural Shift** in the manufacturing sector towards higher value-added activities. The surge in demand for AI servers acts as an external demand shock, shifting the AD curve. In the long run, this investment in high-tech capital increases the **Marginal Product of Capital**, shifting the **LRAS** curve to the right. This allows for non-inflationary growth and improves the **Balance of Payments (BOP)** through higher export revenue.",
    strengths: "Positions Singapore as a critical node in the global AI supply chain, attracting high-quality Foreign Direct Investment (FDI) and creating high-skilled jobs.",
    limitations: "Heavy reliance on a specific sub-sector (electronics) increases the economy's vulnerability to sector-specific shocks or 'busts' in the tech cycle.",
    evaluations: "To maximize the benefits, the government should continue to invest in **Supply-Side Policies** such as R&D and workforce upskilling to ensure that the local labor force can fill the high-tech roles created by this boom.",
    tags: "Supply-Side Policy, Growth, FDI"
  },
  {
    title: "Singapore Property Market Stabilizes Amid Cooling Measures",
    summary: "Private home prices grew at a slower pace in 2024 following several rounds of cooling measures, including higher Additional Buyer's Stamp Duty (ABSD) for foreigners and tighter loan limits.",
    url: "https://www.straitstimes.com/business/property/singapore-private-home-prices-up-67-in-2023-slowing-from-86-growth-in-2022",
    category: "Singapore",
    theory: "The cooling measures are **Macroprudential Policies** (and fiscal tools like ABSD) designed to curb speculative demand. ABSD acts as an **Indirect Tax** on property transactions, increasing the cost of investment and shifting the demand curve for property to the left. This prevents a **Property Bubble**, which could lead to financial instability if the bubble bursts. It also addresses **Equity** concerns by ensuring housing remains affordable for citizens.",
    strengths: "Effective in tempering runaway price growth and preventing excessive household leverage.",
    limitations: "Higher taxes might deter genuine foreign talent or investors from settling in Singapore, potentially affecting its attractiveness as a global hub.",
    evaluations: "The government must strike a delicate balance between price stability and market liquidity. Regular reviews of these measures are necessary to respond to changing interest rate environments and supply-side developments.",
    tags: "Fiscal Policy, Market Failure, Equity"
  },
  {
    title: "Labor Market Remains Tight with Low Unemployment and Wage Growth",
    summary: "Singapore's unemployment rate remained low at 2.1% in late 2024. While job vacancies have moderated, the labor market remains tight in sectors like healthcare, tech, and sustainability, leading to continued wage growth.",
    url: "https://www.mom.gov.sg/newsroom/press-releases/2025/labour-market-report-fourth-quarter-2024",
    category: "Singapore",
    theory: "A tight labor market indicates that the economy is operating near its **Full Employment** level. When the unemployment rate is very low, firms must compete for workers by offering higher wages. This can lead to **Demand-Pull Inflation** as households have more disposable income to spend (C), and **Cost-Push Inflation** as firms pass on higher labor costs to consumers. If wage growth exceeds productivity growth, it can erode **Export Competitiveness**.",
    strengths: "Low unemployment ensures high levels of social stability and household income security.",
    limitations: "Persistent labor shortages can act as a **Supply-Side Constraint**, limiting the ability of firms to expand and thus capping the economy's potential growth rate.",
    evaluations: "Focus must remain on **Productivity-Led Growth**. Encouraging firms to adopt automation and AI can help mitigate the impact of labor shortages and ensure that wage increases are sustainable and non-inflationary.",
    tags: "Labor Market, Inflation, Productivity"
  },
  {
    title: "Singapore Budget 2025 Focuses on SkillsFuture and Green Transition",
    summary: "The 2025 Budget introduced new incentives for mid-career workers to reskill through the SkillsFuture Level-Up Programme and enhanced subsidies for businesses adopting green technologies.",
    url: "https://www.mof.gov.sg/singaporebudget",
    category: "Singapore",
    theory: "These are **Market-Oriented and Interventionist Supply-Side Policies**. SkillsFuture aims to reduce **Structural Unemployment** by narrowing the skills gap between the existing labor force and the requirements of emerging industries. Green technology subsidies internalize **Positive Externalities** of production, shifting the marginal private cost (MPC) towards the marginal social cost (MSC) and moving the economy closer to the **Socially Optimum Level of Output**.",
    strengths: "Long-term approach to enhancing Singapore's human capital and future-proofing the economy against environmental changes.",
    limitations: "Supply-side policies have long gestation periods; the benefits of reskilling and green transition may take years to materialize. They also involve high opportunity costs for the government budget.",
    evaluations: "The effectiveness of these policies depends on the take-up rate by individuals and firms. Constant feedback loops are needed to ensure the training programs remain relevant to industry needs.",
    tags: "Supply-Side Policy, Externalities, Unemployment"
  },
  {
    title: "Tourism Recovery Hits New Highs with Mega Concerts and Events",
    summary: "The influx of international visitors for high-profile events like Taylor Swift's Eras Tour and major sporting events boosted the hospitality and retail sectors, contributing significantly to service exports.",
    url: "https://www.channelnewsasia.com/singapore/taylor-swift-eras-tour-singapore-economy-boost-tourism-hospitality-4158421",
    category: "Singapore",
    theory: "Mega-events create a surge in **Service Exports (X)**. Foreigners spending on flights, hotels, and food in Singapore counts as export revenue. This shifts the AD curve to the right. Additionally, there is a **Multiplier Effect** as hotels and restaurants hire more part-time staff and buy more supplies from local vendors, generating further rounds of income and spending.",
    strengths: "Provides a quick boost to GDP and supports a wide range of SMEs in the services sector.",
    limitations: "The impact is often transient (temporary AD shift). It can also lead to temporary local inflation in transport and accommodation, potentially crowding out local consumption.",
    evaluations: "While 'event tourism' is a strong tactical play, Singapore needs to ensure its permanent tourism infrastructure (attractions, MICE facilities) remains world-class to sustain long-term service export growth.",
    tags: "Multiplier, Service Exports, AD/AS"
  },
  {
    title: "GST Hike Implementation and its Impact on Cost of Living",
    summary: "The final step of the GST hike to 9% took effect in 2024. To mitigate the impact on lower-income households, the government enhanced the GST Voucher scheme and the Assurance Package.",
    url: "https://www.straitstimes.com/singapore/gst-hike-to-9-what-you-need-to-know",
    category: "Singapore",
    theory: "GST is an **Indirect Tax**. An increase in GST shifts the MPC curve upwards, leading to higher prices for consumers. In the AD/AS framework, it can be seen as a one-off increase in the price level (cost-push). The Assurance Package is a **Transfer Payment** (Fiscal Policy) designed to maintain the **Real Purchasing Power** of households, particularly the lower-income group, thereby addressing the **Regressive** nature of GST.",
    strengths: "Provides a stable and growing source of tax revenue to fund the rising healthcare and social spending needs of an aging population.",
    limitations: "Higher GST can dampen consumer confidence and spending (C) in the short term, especially for price-elastic goods.",
    evaluations: "The use of targeted transfers is a superior approach to keeping GST low across the board, as it ensures that those who need help receive it while still allowing the government to collect revenue from higher-spending households and tourists.",
    tags: "Taxation, Equity, Fiscal Policy"
  },
  {
    title: "Singapore's Role in Green Finance Grows with New MAS Initiatives",
    summary: "MAS has launched several initiatives to promote transition finance and the development of high-quality carbon markets, aiming to make Singapore a leading hub for sustainable finance in Asia.",
    url: "https://www.mas.gov.sg/development/sustainable-finance",
    category: "Singapore",
    theory: "This initiative aims to improve **Resource Allocation** by directing capital towards projects with positive environmental impacts. By establishing clear standards and carbon credits, Singapore is helping to internalize the **Negative Externalities** of carbon emissions (pollution) on a global scale. This is a supply-side strategy to create a new **Comparative Advantage** in green services.",
    strengths: "Attracts sustainable-focused FDI and creates high-value jobs in finance, law, and environmental consultancy.",
    limitations: "Success depends on global cooperation and the standardization of 'green' definitions (preventing greenwashing).",
    evaluations: "As the world transitions to a low-carbon economy, being a first-mover in green finance allows Singapore to diversify its financial sector and secure long-term growth in a multi-polar economic world.",
    tags: "Externalities, Comparative Advantage, FDI"
  },
  {
    title: "Digital Economy Now Contributes 17% to Singapore's GDP",
    summary: "A new report shows that the digital economy—comprising the tech sector and digitalization in other sectors—is growing faster than the overall economy, driven by e-commerce and digital finance.",
    url: "https://www.imda.gov.sg/news-and-events/media-room-media-releases/2024/singapore-digital-economy-report-2024",
    category: "Singapore",
    theory: "Digitalization represents a significant **Supply-Side Improvement**. It increases the efficiency of production and distribution, shifting the **LRAS** curve to the right. This increases the economy's productive capacity and can lead to lower prices for consumers (disinflationary growth). It also enhances Singapore's **Dynamic Efficiency** by fostering innovation.",
    strengths: "Reduces the constraints of Singapore's small physical size and limited labor pool by leveraging technology and data.",
    limitations: "Risk of a **Digital Divide**, where older workers or smaller firms that cannot adapt are left behind, leading to increased income inequality.",
    evaluations: "Government programs like 'SMEs Go Digital' are crucial to ensuring that the benefits of the digital economy are inclusive. Education policy must also adapt to provide the necessary STEM skills for the future labor market.",
    tags: "Growth, Efficiency, Supply-Side"
  },
  {
    title: "Singapore and China Enhance Cooperation in Digital Trade and Green Energy",
    summary: "Recent bilateral agreements between Singapore and China focus on digital economy standards and green energy cooperation, reflecting a deeper economic integration despite global geopolitical tensions.",
    url: "https://www.mti.gov.sg/Newsroom/Press-Releases/2024/05/Singapore-and-China-Sign-Agreements-to-Strengthen-Cooperation",
    category: "Singapore",
    theory: "These agreements are part of Singapore's strategy of **Trade Liberalization** and regional integration. By reducing trade barriers (non-tariff barriers in the digital space), both countries can benefit from **Specialization and Trade** based on their respective comparative advantages. This expands the market for Singapore's service exports and provides access to China's large green tech market.",
    strengths: "Diversifies Singapore's trade partners and secures its position as a bridge between China and the rest of the world.",
    limitations: "Increasing economic interdependence with China carries risks if trade is used as a tool of political leverage or if the Chinese economy slows significantly.",
    evaluations: "Singapore must continue its 'principled neutrality' and pursue similar deep-tech and green-tech partnerships with other major blocs like the US and EU to maintain a balanced and resilient trade portfolio.",
    tags: "Globalization, Comparative Advantage, International Trade"
  },
  {
    title: "Small Businesses Face Rising Costs Amid GST Hike and Higher Wages",
    summary: "Many SMEs in the F&B and retail sectors are struggling with 'triple whammy' of higher taxes, rising labor costs, and elevated utility prices, leading some to exit the market.",
    url: "https://www.businesstimes.com.sg/singapore/smes-face-tough-2024-rising-costs-and-manpower-crunch",
    category: "Singapore",
    theory: "This illustrates the impact of rising **Marginal Costs of Production**. For many small firms in competitive markets (monopolistic competition), they have limited pricing power. Rising costs shift the AC and MC curves upward, reducing **Supernormal Profits**. If prices cannot be raised enough to cover AC, firms will exit the market in the long run. This can lead to a reduction in **Product Variety** and lower **Consumer Surplus**.",
    strengths: "The exit of less efficient firms (creative destruction) can lead to an overall improvement in the industry's productivity as resources move to more efficient players.",
    limitations: "Sudden and widespread exits can lead to significant job losses and social dislocation for business owners and employees.",
    evaluations: "Targeted support like the 'Energy Efficiency Grant' is more effective than broad subsidies, as it encourages firms to invest in long-term cost-reduction strategies rather than just providing temporary relief.",
    tags: "Market Structure, Costs, Productivity"
  },
  {
    title: "Singapore's Wealth Management Sector Sees Record Inflows",
    summary: "Singapore continues to attract significant wealth from around the world, with Assets Under Management (AUM) reaching new heights as investors seek a safe haven amid global volatility.",
    url: "https://www.bloomberg.com/news/articles/2024-06-18/singapore-wealth-hub-status-grows-as-global-investors-flock-to-asia",
    category: "Singapore",
    theory: "Record inflows represent a significant **Capital Account Surplus** in the Balance of Payments. This high demand for the Singapore Dollar (to invest in local assets) puts upward pressure on the exchange rate. In the long run, this capital provides the funding for local investments (I), which can boost AD and eventually LRAS.",
    strengths: "Bolsters Singapore's position as a premier global financial center and generates high-paying jobs in the 'Front Office' functions.",
    limitations: "Large capital inflows can lead to 'Dutch Disease' effects, where the resulting exchange rate appreciation hurts other export sectors like manufacturing. It can also drive up asset prices (e.g., luxury property), worsening domestic inequality.",
    evaluations: "MAS must manage the resulting liquidity carefully to prevent inflationary bubbles, while the government uses tax policy (e.g., higher stamp duties) to manage the impact on social equity.",
    tags: "BOP, Exchange Rate, Investment"
  },
  {
    title: "Public Transport Fares Adjusted to Manage Rising Operating Costs",
    summary: "Public transport fares were increased in 2024 to help operators cope with higher energy prices and wage increases, while the government provided more transport vouchers for low-income families.",
    url: "https://www.ptc.gov.sg/newsroom/press-releases/details/2024-fare-review-exercise",
    category: "Singapore",
    theory: "Public transport is a **Merit Good** with significant positive externalities (reduced congestion, lower emissions). It is also often a **Natural Monopoly**. Fare adjustments reflect the need to cover the **Average Cost** of service provision. Without fare increases or government subsidies, operators would face losses. Vouchers ensure that the service remains **Affordable**, addressing the market failure of under-consumption by low-income groups.",
    strengths: "Ensures the financial sustainability of the transport system while protecting vulnerable commuters.",
    limitations: "Fare hikes are unpopular and can contribute to headline inflation, affecting the cost of living for the middle class.",
    evaluations: "A hybrid model of user-pays and government subsidy is necessary to balance efficiency and equity in public transport provision.",
    tags: "Market Failure, Merit Goods, Natural Monopoly"
  },
  {
    title: "Productivity Growth in Singapore Services Sector Remains a Challenge",
    summary: "While manufacturing productivity is high, many service industries like retail and cleaning continue to see slow productivity growth, prompting calls for faster tech adoption.",
    url: "https://www.straitstimes.com/business/economy/singapore-productivity-growth-lags-behind-real-wage-gains",
    category: "Singapore",
    theory: "This is a classic example of **Baumol's Cost Disease**. Productivity growth in labor-intensive services is often slower than in manufacturing, but wages in services must rise to attract workers. If wage growth > productivity growth, **Unit Labor Costs** rise, leading to cost-push inflation. This limits the potential growth rate of the economy.",
    strengths: "Highlights the areas where government intervention (supply-side policies) is most needed.",
    limitations: "Digitalizing service roles (e.g., robots in cleaning) can be expensive for SMEs and may not always yield immediate productivity gains.",
    evaluations: "Structural reform is needed, including re-designing jobs to be less labor-intensive and more capital-intensive. The 'Progressive Wage Model' also helps by linking wage increases to skill and productivity improvements.",
    tags: "Productivity, Inflation, Supply-Side"
  },
  {
    title: "Singapore's Aging Population: Impact on Labor Force and Healthcare Spending",
    summary: "As the proportion of citizens aged 65 and above rises, Singapore faces a shrinking domestic labor force and a significant increase in public healthcare expenditure.",
    url: "https://www.channelnewsasia.com/singapore/singapore-aging-population-healthcare-costs-budget-spending-4012931",
    category: "Singapore",
    theory: "An aging population represents a **Supply-Side Shock**. A shrinking labor force reduces the economy's **Productive Capacity** (LRAS shifts left). Simultaneously, increased healthcare spending increases **Government Expenditure (G)**, which could lead to a budget deficit if tax revenues don't keep pace. This creates a high **Dependency Ratio**, putting pressure on the working population and fiscal sustainability.",
    strengths: "Singapore's forward-planning (reserves and CPF) provides a buffer that many other aging nations lack.",
    limitations: "Increased reliance on foreign labor to fill the gap can be politically sensitive and lead to infrastructure strain.",
    evaluations: "The government must focus on 'Ageless Workplaces' to keep seniors in the workforce longer and invest in preventative healthcare to manage long-run costs. Immigration policy remains a necessary but delicate lever.",
    tags: "Supply-Side, Fiscal Policy, Labor Market"
  },
  {
    title: "Rise of Remote Work: Long-term Implications for Singapore's CBD",
    summary: "The persistence of hybrid work models is changing the demand for office space and retail in the Central Business District, leading to a re-evaluation of urban planning.",
    url: "https://www.businesstimes.com.sg/property/remote-work-reshaping-demand-singapore-office-market",
    category: "Singapore",
    theory: "This is a **Structural Change** in the demand for commercial land and labor. The demand for CBD office space (a derived demand) has become more price-elastic and has shifted to the left. This affects the **Allocation of Resources** (land). Retailers in the CBD face lower demand, while heartland malls see an increase (substitution effect).",
    strengths: "Can lead to a more efficient 'Polycentric' city model, reducing commuting time and pressure on the transport network (negative externalities of congestion).",
    limitations: "May lead to a permanent loss of value in CBD assets, affecting REITs and property tax revenue.",
    evaluations: "The government's 'CBD Incentive Scheme' to convert older office buildings into mixed-use developments is a proactive supply-side response to ensure the city center remains vibrant and utilized.",
    tags: "Market Forces, Structural Change, Efficiency"
  },
  {
    title: "Singapore's Export Growth Hit by Weak Demand from Europe and Japan",
    summary: "Non-Oil Domestic Exports (NODX) faced headwinds in early 2025 as major trading partners in Europe and Japan experienced sluggish economic growth.",
    url: "https://www.channelnewsasia.com/business/singapore-nodx-exports-fall-february-2025-weak-demand-4201911",
    category: "Singapore",
    theory: "This shows Singapore's vulnerability to **External Shocks**. When major trading partners experience a slowdown, their income (Y) falls, leading to a decrease in their demand for Singapore's exports (X). This reduces Singapore's AD and worsens the **Current Account** of the BOP. Because Singapore is a small and open economy, the impact of foreign income changes is significant.",
    strengths: "Singapore's diversified export base (electronics, chemicals, pharmaceuticals) helps mitigate the impact if only one sector or region is affected.",
    limitations: "Monetary and fiscal policy can only do so much to offset a global downturn; the economy must wait for the external recovery.",
    evaluations: "Deepening trade links with faster-growing regions like Southeast Asia (ASEAN) and India is a critical diversification strategy for Singapore's long-term resilience.",
    tags: "International Trade, AD/AS, BOP"
  },
  {
    title: "Food Security: Singapore Increases Local Production and Source Diversification",
    summary: "In response to global supply chain disruptions, Singapore is accelerating its '30 by 30' goal to produce 30% of its nutritional needs locally by 2030.",
    url: "https://www.sfa.gov.sg/food-farming/singapore-food-security-strategies",
    category: "Singapore",
    theory: "Food security is a **Strategic Good**. Relying solely on imports makes Singapore vulnerable to global price spikes and supply shocks (imported cost-push inflation). Subsidizing local high-tech farming is a **Supply-Side Policy** that aims to create a more **Inelastic Supply** of food. It also addresses the risk of **Market Failure** where the market might not account for the national security value of food.",
    strengths: "Reduces vulnerability to global food crises and fosters innovation in agri-tech.",
    limitations: "Local production is often more expensive than imports due to high land and energy costs, potentially requiring permanent subsidies or higher prices for consumers.",
    evaluations: "The '30 by 30' goal should be seen as a strategic insurance policy. The government should focus on high-yield, low-resource technologies (e.g., vertical farming) where Singapore can eventually develop a comparative advantage.",
    tags: "Supply-Side Policy, Inflation, Strategic Goods"
  },
  {
    title: "Rising Interest Rates: Impact on Singapore Households and Firms",
    summary: "As global interest rates remained elevated in 2024, Singaporean mortgage holders and leveraged firms faced higher debt servicing costs, affecting discretionary spending.",
    url: "https://www.straitstimes.com/business/banking/singapore-banks-mortgage-rates-stay-high-as-fed-holds-rates",
    category: "Singapore",
    theory: "In Singapore, interest rates are largely determined by global rates (especially the US Fed) and exchange rate expectations. Higher interest rates increase the **Cost of Borrowing**, leading to lower **Consumption (C)** and **Investment (I)**. This shifts the AD curve to the left, which can help cool an overheating economy but also risks causing a slowdown. It also increases the risk of defaults for highly leveraged entities.",
    strengths: "Helps to temper property price growth and encourages more prudent financial management.",
    limitations: "The burden falls disproportionately on younger families with large mortgages and SMEs with limited cash reserves.",
    evaluations: "Since Singapore doesn't control its interest rates, the government must use fiscal policy (support packages) and macroprudential measures (TDSR) to manage the impact of global rate cycles on the domestic economy.",
    tags: "Monetary Policy, AD/AS, Debt"
  },
  {
    title: "Singapore's Biotech Sector Booms with Multi-Billion Dollar Investments",
    summary: "Global pharmaceutical giants have announced major expansions of their manufacturing facilities in Singapore, citing the country's strong IP protection and skilled workforce.",
    url: "https://www.edb.gov.sg/en/business-insights/insights/singapore-s-biopharma-sector-gears-up-for-growth.html",
    category: "Singapore",
    theory: "This represents a successful **Supply-Side Strategy** to attract high-value FDI. Pharmaceutical production is highly capital-intensive and less labor-dependent, which suits Singapore's factor endowments. This shifts the LRAS to the right and improves the **Trade Balance**. Strong **Intellectual Property (IP)** rights act as an institutional supply-side factor that encourages innovation and long-term investment.",
    strengths: "Provides a high-growth, recession-resistant export pillar for the economy.",
    limitations: "The sector is highly concentrated in a few large multinational corporations (MNCs). The benefits (profits) may be repatriated, meaning the impact on **GNI** might be smaller than the impact on **GDP**.",
    evaluations: "Singapore should focus on building a local ecosystem of biotech startups around these MNCs to ensure more value-capture and high-skilled job creation for locals.",
    tags: "FDI, LRAS, Growth"
  },
  {
    title: "E-commerce Growth Leads to Changes in Labor Demand for Logistics",
    summary: "The explosion of online shopping has led to a surge in demand for delivery riders and warehouse workers, but concerns remain about the job quality and long-term sustainability of the 'gig' model.",
    url: "https://www.mom.gov.sg/newsroom/press-releases/2024/new-protections-for-platform-workers",
    category: "Singapore",
    theory: "This illustrates a **Structural Change in Labor Demand**. Technological advancement (e-commerce platforms) has shifted the labor demand curve for logistics workers to the right. However, the 'gig' nature of the work often leads to **Incomplete Markets** where workers lack traditional social protections (CPF, insurance). This can be seen as a form of **Market Failure** related to worker welfare.",
    strengths: "Provides flexible income opportunities and lowers the barriers to entry for employment.",
    limitations: "Lack of job security and career progression can lead to a 'low-skill trap' for a significant portion of the workforce.",
    evaluations: "The government's move to require CPF contributions for platform workers is a necessary intervention to ensure the long-term social sustainability of the digital economy and provide a level playing field with traditional employment.",
    tags: "Labor Market, Market Failure, Equity"
  },
  {
    title: "Singapore's Carbon Tax: Stepping Up the Fight Against Climate Change",
    summary: "The carbon tax was increased to $25 per tonne in 2024, with plans to reach $50-80 by 2030. Revenue is being used to support businesses in their green transition.",
    url: "https://www.nea.gov.sg/our-services/climate-change-energy-efficiency/climate-change/carbon-tax",
    category: "Singapore",
    theory: "Carbon tax is a **Pigouvian Tax** designed to internalize the **Negative Externality** of carbon emissions. By increasing the MPC of polluters, the tax aims to align the private equilibrium with the **Socially Optimum Level** of production (where MSC = MSB). This encourages firms to switch to cleaner technologies to avoid the tax, promoting **Productive Efficiency** in the long run.",
    strengths: "A transparent and market-based way to reduce emissions and generate revenue for green investments.",
    limitations: "Can increase costs for energy-intensive industries (e.g., refining and petrochemicals), potentially affecting their international competitiveness.",
    evaluations: "The gradual increase and the provision of support for green technology help businesses adapt without a sudden 'shock'. The tax is more efficient than direct regulation because it allows firms to find the most cost-effective way to reduce emissions.",
    tags: "Externalities, Market Failure, Supply-Side"
  },
  {
    title: "Rise of Fintech: Impact on Traditional Banking and Financial Inclusion",
    summary: "Singapore's fintech ecosystem continues to expand, with digital banks and payment startups challenging traditional lenders and providing better services to SMEs.",
    url: "https://www.mas.gov.sg/development/fintech",
    category: "Singapore",
    theory: "Fintech increases **Contestability** in the financial sector. The entry of digital-only banks forces traditional incumbents to innovate and lower their fees, improving **Allocative Efficiency**. It also reduces **Asymmetric Information** by using data analytics to better assess the creditworthiness of small firms, thereby reducing market failure in credit markets.",
    strengths: "Lowers the cost of financial services and improves the efficiency of capital allocation in the economy.",
    limitations: "Rapid innovation can outpace regulation, leading to risks related to data privacy and financial stability (e.g., crypto-related volatility).",
    evaluations: "MAS's 'Regulatory Sandbox' is an excellent example of balancing innovation with stability. By allowing firms to test new products in a controlled environment, Singapore remains a leader in fintech without compromising system safety.",
    tags: "Market Structure, Efficiency, Innovation"
  },
  {
    title: "Singapore's Water Security: Investment in Desalination and NEWater",
    summary: "Singapore continues to invest heavily in its 'Four National Taps', with new desalination plants coming online to ensure a resilient water supply independent of weather patterns.",
    url: "https://www.pub.gov.sg/watersupply/fournationaltaps",
    category: "Singapore",
    theory: "Water is a **Strategic Merit Good**. Clean water has significant positive externalities for public health and economic activity. Because Singapore has limited natural water resources, the market would likely under-provide water (leading to shortages and high prices). Government provision and investment in R&D (desalination) is an **Interventionist Supply-Side Policy** to ensure long-term sustainability and security.",
    strengths: "Reduces dependence on water imports from Malaysia and ensures that water is not a constraint on economic growth.",
    limitations: "Desalination and NEWater production are highly energy-intensive, creating a trade-off with energy security and carbon goals.",
    evaluations: "Water pricing (Water Conservation Tax) is essential to manage demand, while supply-side investment ensures availability. This 'Two-Pronged Approach' is a model for resource-scarce nations.",
    tags: "Merit Goods, Supply-Side Policy, Strategic Goods"
  },
  {
    title: "The Impact of Global Trade Tensions on Singapore's Role as a Hub",
    summary: "As the US and China move toward 'de-risking' their supply chains, Singapore is seeing more companies adopt a 'China Plus One' strategy, setting up regional HQs in the city-state.",
    url: "https://www.edb.gov.sg/en/business-insights/insights/supply-chain-resilience-in-southeast-asia.html",
    category: "Singapore",
    theory: "This reflects a shift in **Global Value Chains**. While overall global trade may be fragmenting (deglobalization), regional hubs like Singapore can benefit from the redirection of FDI. This increases Singapore's AD and LRAS. It's a shift based on **Risk Management** rather than just pure cost-based comparative advantage.",
    strengths: "Solidifies Singapore's role as a neutral and reliable node in a fragmented world economy.",
    limitations: "If global trade declines overall, the 'pie' gets smaller, and Singapore's share might not be enough to offset the loss from general trade reduction.",
    evaluations: "Singapore must ensure its logistics and digital infrastructure remain world-leading to attract these 'China Plus One' investments. Strengthening ASEAN integration is also key to providing a larger market for these firms.",
    tags: "Globalization, FDI, Growth"
  },
  {
    title: "Singapore's Start-up Ecosystem: Fostering the Next Generation of Unicorns",
    summary: "Government-backed venture capital and incubator programs have helped Singapore build a vibrant startup scene, particularly in deep-tech, med-tech, and sustainable solutions.",
    url: "https://www.enterprise-sg.gov.sg/communities/startup-ecosystem",
    category: "Singapore",
    theory: "Startups are a primary source of **Innovation and Dynamic Efficiency**. By providing grants and tax incentives (R&D tax credits), the government is correcting a **Market Failure** where private investors might be too risk-averse to fund early-stage R&D due to high uncertainty and positive spillovers. This shifts the LRAS curve to the right over time.",
    strengths: "Creates a diverse and resilient economy that is less dependent on a few large MNCs.",
    limitations: "The 'failure rate' of startups is high, and public funds must be managed carefully to avoid 'picking losers'.",
    evaluations: "The focus on 'Deep Tech' (AI, Biotech, Quantum) is appropriate as these areas have the highest potential for creating significant intellectual property and long-term comparative advantage.",
    tags: "Supply-Side Policy, Innovation, Market Failure"
  },
  {
    title: "Cost of Living Concerns: The Role of the Assurance Package",
    summary: "The Singapore government has repeatedly topped up the Assurance Package to help households, especially those in the lower- and middle-income brackets, cope with the impact of inflation and the GST hike.",
    url: "https://www.mof.gov.sg/singaporebudget/budget-2024/budget-speech/section-c-addressing-immediate-cost-of-living-concerns",
    category: "Singapore",
    theory: "The Assurance Package is a **Discretionary Fiscal Policy** tool. It acts as a transfer payment that increases **Disposable Income**. By targeting lower-income households (who have a higher **Marginal Propensity to Consume**), the policy is effective in supporting aggregate demand while also addressing **Income Inequality** (equity).",
    strengths: "Flexible and targeted; can be deployed quickly in response to price spikes.",
    limitations: "Repeated payouts can be seen as 'populist' and may not address the root causes of inflation (which are often supply-side or external). It also carries an opportunity cost for the budget.",
    evaluations: "While necessary for social stability, these payouts should be paired with long-term supply-side measures to keep the economy competitive and ensure that real wages grow faster than the cost of living.",
    tags: "Fiscal Policy, Equity, MPC"
  },
  {
    title: "Singapore's Maritime Hub: Investing in Tuas Mega Port",
    summary: "The phased opening of the Tuas Port, which will be the world's largest fully automated container terminal by the 2040s, is set to double Singapore's port capacity.",
    url: "https://www.mpa.gov.sg/who-we-are/our-story/tuas-port",
    category: "Singapore",
    theory: "This is a massive **Infrastructure Supply-Side Investment**. By significantly increasing capacity and efficiency through automation, Singapore is strengthening its **Comparative Advantage** in logistics and transshipment. This reduces the time and cost of trade, shifting the LRAS curve to the right and attracting more shipping lines and logistics firms (FDI).",
    strengths: "Secures Singapore's position as a vital node in global trade for the next several decades.",
    limitations: "Huge capital expenditure with a very long payback period. Vulnerable to technological obsolescence if shipping patterns change fundamentally (e.g., Arctic routes).",
    evaluations: "Automation at Tuas Port also addresses the labor shortage issue in the logistics sector. The project demonstrates the government's commitment to long-term planning and investment in the economy's backbone.",
    tags: "Supply-Side Policy, Comparative Advantage, Growth"
  },

  // --- INTERNATIONAL NEWS (25 Articles) ---
  {
    title: "US-China Trade War Escalates with New Tariffs on EVs and Semiconductors",
    summary: "The US has announced a new round of significant tariff increases on Chinese imports, including electric vehicles, solar cells, and advanced semiconductors, citing unfair trade practices and national security concerns.",
    url: "https://www.reuters.com/business/us-imposes-steep-tariffs-chinese-evs-chips-2024-05-14/",
    category: "International",
    theory: "This is a form of **Protectionism**. Tariffs are an **Indirect Tax** on imported goods, increasing their price and shifting the domestic supply curve (for imports) upward. This aims to protect domestic 'infant industries' or strategic sectors. However, it leads to **Deadweight Loss** due to production and consumption inefficiencies. It also acts as a **Negative Supply Shock**, potentially causing **Stagflation** (higher prices and lower output).",
    strengths: "Protects domestic jobs in the short run and can be used as a bargaining chip in geopolitical negotiations.",
    limitations: "Invites retaliation, leading to a 'trade war' that reduces global trade volumes. It also increases costs for domestic manufacturers who use these imports as inputs.",
    evaluations: "While politically popular, broad tariffs often fail to address the underlying lack of competitiveness. A better long-run approach would be supply-side investments in domestic R&D and worker training to compete on quality and innovation.",
    tags: "Protectionism, International Trade, Market Failure"
  },
  {
    title: "Global Inflation Cools, but Central Banks Remain Cautious",
    summary: "Inflation in many major economies has finally begun to decline toward target levels, but the IMF warns that service-price inflation remains 'sticky', preventing a rapid return to low interest rates.",
    url: "https://www.imf.org/en/publications/weo/issues/2024/04/16/world-economic-outlook-april-2024",
    category: "International",
    theory: "Sticky service inflation is often driven by **Wage-Push Inflation**. In labor-intensive service sectors, productivity gains are slow, but wages must rise to keep pace with the overall cost of living. This keeps **Aggregate Supply (SRAS)** from shifting back quickly. Central banks use **Contractionary Monetary Policy** (high interest rates) to dampen AD and anchor **Inflation Expectations**, preventing a wage-price spiral.",
    strengths: "Maintains credibility for central banks and prevents inflation from becoming 'entrenched' in the economy.",
    limitations: "High interest rates for an extended period increase the risk of a 'Hard Landing' (recession) and worsen the debt burden for emerging markets.",
    evaluations: "Central banks must follow a 'data-dependent' approach. The focus should shift from just the 'headline' number to 'core' components to determine when it is safe to begin the easing cycle.",
    tags: "Inflation, Monetary Policy, Central Bank"
  },
  {
    title: "China's Economy Struggles with Property Crisis and Deflationary Risks",
    summary: "China's growth has slowed as the prolonged crisis in its property sector continues to weigh on consumer confidence and investment. Concerns are mounting over a potential 'Japanification'—a period of long-term stagnation and deflation.",
    url: "https://www.bbc.com/news/business-68825102",
    category: "International",
    theory: "China is experiencing a **Negative Wealth Effect**. As property prices fall, households feel poorer and reduce their **Consumption (C)**. This leads to a persistent leftward shift in AD. If AD falls below the full-employment level, a **Deflationary Gap** emerges. Falling prices (deflation) can lead to a 'liquidity trap' where consumers delay spending in anticipation of even lower prices, further depressing AD.",
    strengths: "Low prices can improve export competitiveness in the short term.",
    limitations: "Deflation increases the **Real Value of Debt**, making it harder for firms and local governments to pay off their loans, leading to a potential financial crisis.",
    evaluations: "China needs significant **Expansionary Fiscal Policy** focused on stimulating consumption (e.g., social safety net improvements) rather than just traditional infrastructure investment to rebalance its economy.",
    tags: "Deflation, AD/AS, Economic Growth"
  },
  {
    title: "The Rise of Artificial Intelligence: A New Industrial Revolution?",
    summary: "The rapid adoption of Generative AI is expected to significantly boost global productivity over the next decade, with some analysts predicting a 1-1.5% increase in annual GDP growth.",
    url: "https://www.goldmansachs.com/intelligence/pages/generative-ai-could-raise-global-gdp-by-7-percent.html",
    category: "International",
    theory: "AI is a **General Purpose Technology** that acts as a powerful **Supply-Side Shock**. By automating routine tasks and enhancing human creativity, AI increases the **Productivity of Labor and Capital**, shifting the **LRAS** curve to the right. This allows for higher non-inflationary growth. It also fosters **Dynamic Efficiency** by accelerating the pace of scientific discovery.",
    strengths: "Potential to solve long-term stagnation and labor shortage issues in aging developed economies.",
    limitations: "Risk of significant **Structural Unemployment** as certain jobs become obsolete. It may also worsen **Income Inequality** if the gains from AI accrue primarily to capital owners rather than workers.",
    evaluations: "To ensure a 'just transition', governments must invest in broad-based education and flexible social safety nets (like portable benefits) that allow workers to transition into new roles created by the AI economy.",
    tags: "Supply-Side Policy, Productivity, Unemployment"
  },
  {
    title: "Eurozone Growth Remains Sluggish Amid Energy Transition and High Rates",
    summary: "The European economy is lagging behind the US and China, hampered by high energy costs following the loss of Russian gas and the impact of the ECB's tight monetary policy.",
    url: "https://www.ft.com/content/1d0a5e84-82a2-4a7b-a010-38605c088825",
    category: "International",
    theory: "The Eurozone is facing a **Stagflationary Environment**. High energy costs (a supply shock) shift the SRAS curve to the left, while high interest rates (monetary policy) dampen AD. This results in 'low growth and high prices'. Additionally, the **Energy Transition** requires massive investment (I), which can boost AD in the short term but may be inflationary until new capacity is online.",
    strengths: "Forcing a faster transition to renewable energy, which improves long-term energy security and environmental sustainability.",
    limitations: "Lack of a unified fiscal policy (the Eurozone has monetary union but not fiscal union) makes it difficult to respond to asymmetric shocks.",
    evaluations: "Europe needs to complete its 'Banking Union' and 'Capital Markets Union' to improve the flow of investment and enhance its economic resilience against external shocks.",
    tags: "Growth, SRAS, Monetary Policy"
  },
  {
    title: "IMF Warns of Growing Debt Vulnerabilities in Emerging Markets",
    summary: "Rising global interest rates and a strong US dollar have made it increasingly difficult for low-income countries to service their dollar-denominated debts, leading to calls for more systemic debt relief.",
    url: "https://www.imf.org/en/Blogs/Articles/2024/04/16/emerging-economies-are-resilient-but-pockets-of-vulnerability-remain",
    category: "International",
    theory: "Many emerging markets face a **Debt-Exchange Rate Spiral**. As the US dollar appreciates (due to high US rates), the local currency value of dollar-denominated debt increases. To prevent capital flight, these countries must raise their own interest rates, which dampens domestic **Investment (I) and Consumption (C)**, leading to a recession. This is a form of **External Constraint** on growth.",
    strengths: "Forces more disciplined fiscal management in some countries.",
    limitations: "Can lead to 'lost decades' of growth, social unrest, and a reversal of poverty reduction gains.",
    evaluations: "A more robust international framework for debt restructuring (like the G20 Common Framework) is essential to provide timely relief and prevent localized debt crises from becoming systemic global risks.",
    tags: "BOP, Debt, Exchange Rate"
  },
  {
    title: "Oil Prices Volatile Amid Middle East Tensions and OPEC+ Cuts",
    summary: "Global oil prices have seen sharp spikes followed by retreats as markets weigh the risk of a wider conflict in the Middle East against a slowing global economy and continued production cuts by OPEC+.",
    url: "https://www.iea.org/reports/oil-market-report-june-2024",
    category: "International",
    theory: "Oil is a key input in almost all production and transport. Supply disruptions or OPEC+ cuts represent a **Negative Supply Shock**. This shifts the SRAS curve to the left, leading to higher prices (P) and lower output (Y). The demand for oil is generally **Price Inelastic** in the short run, meaning a small shift in supply can cause a large change in price.",
    strengths: "High prices provide an incentive for consumers and firms to switch to renewable energy sources (substitution effect).",
    limitations: "Directly contributes to **Cost-Push Inflation**, reducing the real disposable income of consumers and increasing the costs for businesses.",
    evaluations: "Global energy security now depends on diversifying energy sources. Strategic reserves can provide short-term relief, but long-term price stability requires a more diverse and resilient energy mix.",
    tags: "Inflation, Supply Shock, Elasticity"
  },
  {
    title: "The US Dollar's Dominance Challenged by 'De-dollarization' Trends",
    summary: "Countries like Brazil, Russia, India, China, and South Africa (BRICS) are increasingly looking for ways to conduct trade in their own currencies to reduce their vulnerability to US sanctions and Fed policy.",
    url: "https://www.economist.com/finance-and-economics/2024/05/23/can-the-brics-really-de-dollarise-the-world-economy",
    category: "International",
    theory: "The US Dollar is the world's primary **Reserve Currency**. This gives the US 'Exorbitant Privilege', allowing it to run large trade deficits without a corresponding fall in its exchange rate, as there is constant demand for USD for trade and reserves. 'De-dollarization' aims to reduce this demand. If successful, it would lead to a more **Multi-polar Currency System**.",
    strengths: "Reduces the impact of US domestic policy (interest rate changes) on the rest of the world.",
    limitations: "No other currency currently has the liquidity, deep capital markets, and legal transparency of the US Dollar, making a total shift unlikely in the near term.",
    evaluations: "While a complete replacement of the USD is unlikely, the rise of digital currencies (CBDCs) and alternative payment systems (like China's CIPS) will likely lead to a more fragmented global financial system.",
    tags: "Exchange Rate, International Trade, Globalization"
  },
  {
    title: "Global Supply Chains Shorten as 'Near-shoring' and 'Friend-shoring' Gain Pace",
    summary: "In a move toward 'Resilience over Efficiency', many Western companies are moving their manufacturing closer to home (near-shoring) or to politically aligned allies (friend-shoring).",
    url: "https://www.nytimes.com/2024/02/02/business/economy/friend-shoring-supply-chain.html",
    category: "International",
    theory: "This represents a partial reversal of **Globalization**. The traditional model was based on **Absolute and Comparative Advantage** (minimizing costs). The new model adds a 'risk premium' for geopolitical instability. This leads to a more **Inelastic and Costly Supply Chain**, as production moves from the lowest-cost locations to more expensive but 'safer' ones. This is a structural supply-side change that can be inflationary.",
    strengths: "Reduces the risk of total supply chain collapse during pandemics or wars, improving national security.",
    limitations: "Higher production costs lead to higher prices for consumers and lower global allocative efficiency.",
    evaluations: "Governments should support this transition with 'Smart Industrial Policy' that encourages automation to offset the higher labor costs in near-shore locations.",
    tags: "Globalization, Comparative Advantage, Supply-Side"
  },
  {
    title: "The Impact of Climate Change on Global Food Prices",
    summary: "Extreme weather events—from droughts in Brazil to floods in Europe—are increasingly disrupting agricultural yields, leading to 'Climate Inflation' or 'Heat-flation'.",
    url: "https://www.worldbank.org/en/news/feature/2024/05/22/how-climate-change-is-threatening-food-security",
    category: "International",
    theory: "Climate change acts as a permanent **Negative Supply Shock** to the agricultural sector. Reduced yields shift the supply curve of food to the left. Since food is a **Necessity (Price Inelastic Demand)**, this leads to sharp price increases. This is a form of **Market Failure** where the external costs of climate change (pollution) are now being felt as direct costs in the food market.",
    strengths: "Highlights the urgent need for investment in climate-resilient agriculture (supply-side policy).",
    limitations: "Food inflation is highly regressive, hitting the poorest households and nations the hardest, potentially leading to social unrest and migration.",
    evaluations: "Addressing 'Heat-flation' requires both global mitigation (carbon taxes) and local adaptation (new crop varieties). International food aid systems must also be strengthened to manage the increased volatility.",
    tags: "Externalities, Market Failure, Inflation"
  },
  {
    title: "India Overtakes China as the World's Fastest-Growing Major Economy",
    summary: "India is benefiting from a 'Demographic Dividend' and a surge in infrastructure investment, positioning itself as the new engine of global growth as China slows down.",
    url: "https://www.imf.org/en/News/Articles/2024/02/05/cf-india-fast-growth-infrastructure-investment",
    category: "International",
    theory: "India's growth is driven by both **Demand-Side (Investment and Consumption)** and **Supply-Side (Demographics and Infrastructure)** factors. A large and young labor force increases the economy's **Productive Capacity** (LRAS). Infrastructure investment reduces the cost of doing business, improving **Productive Efficiency**. This shift in global growth drivers reflects a change in **Relative Economic Power**.",
    strengths: "Provides a new source of demand for the global economy and an alternative manufacturing hub for MNCs.",
    limitations: "India still faces significant structural challenges, including a lack of high-quality education for all, rigid labor laws, and a large informal economy.",
    evaluations: "To sustain this momentum, India must move beyond just infrastructure and focus on 'Human Capital' (health and education) to ensure its young population is productive and employable in the digital age.",
    tags: "Economic Growth, LRAS, FDI"
  },
  {
    title: "The Growth of the 'Gig Economy' and its Global Regulatory Challenges",
    summary: "From Uber to Upwork, platform-based work is expanding worldwide, leading to debates over worker status, social protections, and the future of the social contract.",
    url: "https://www.ilo.org/global/about-the-ilo/newsroom/news/WCMS_771749/lang--en/index.htm",
    category: "International",
    theory: "The gig economy increases **Labor Market Flexibility**, which can reduce **Natural Unemployment** (frictional and structural) by making it easier to match workers with tasks. However, it can also lead to **Asymmetric Information** and a lack of bargaining power for workers, leading to low wages and no benefits—a form of **Market Failure** in the labor market.",
    strengths: "Increases efficiency by utilizing 'idle' resources (like a person's car or spare time) and provides consumers with lower-cost, more convenient services.",
    limitations: "Can lead to a 'race to the bottom' in labor standards if not properly regulated.",
    evaluations: "Regulators must find a 'Third Way' that preserves the flexibility of platform work while ensuring that all workers have access to basic social protections like health insurance and retirement savings.",
    tags: "Labor Market, Market Failure, Efficiency"
  },
  {
    title: "Cryptocurrency Regulation: Moving Toward the Mainstream?",
    summary: "The approval of Bitcoin ETFs in the US and the implementation of the MiCA regulation in Europe mark a shift toward the institutionalization and regulation of digital assets.",
    url: "https://www.reuters.com/technology/europes-landmark-crypto-rules-take-effect-what-you-need-know-2024-06-30/",
    category: "International",
    theory: "Regulation aims to reduce **Asymmetric Information** and protect against **Systemic Risk**. Cryptocurrencies can be seen as an alternative 'store of value', but their extreme volatility makes them poor 'mediums of exchange'. Regulation increases **Market Transparency** and could lead to more stable capital flows into the sector, potentially improving the efficiency of the financial system.",
    strengths: "Can reduce the cost of cross-border payments and foster innovation in 'Decentralized Finance' (DeFi).",
    limitations: "Strict regulation might stifle innovation or drive the industry to 'offshore' jurisdictions with weaker oversight.",
    evaluations: "The goal of regulation should be 'Same Activity, Same Risk, Same Regulation'. If crypto performs the same functions as traditional banking, it should be subject to similar capital and consumer protection rules.",
    tags: "Market Failure, Efficiency, Financial System"
  },
  {
    title: "Global Tech Giants Face Increasing Antitrust Scrutiny",
    summary: "Regulators in the US and EU are stepping up their efforts to curb the power of 'Big Tech' companies, focusing on anti-competitive practices in digital advertising and app stores.",
    url: "https://www.ft.com/content/0b8e967a-4467-4652-944a-131665a953e5",
    category: "International",
    theory: "Big Tech firms often operate as **Oligopolies** or even **Natural Monopolies** due to massive **Network Effects** and data advantages. This leads to **Market Failure** as high barriers to entry prevent competition. Monopolists can restrict output and raise prices (P > MC), leading to **Allocative Inefficiency**. They may also lack the incentive to innovate (lack of dynamic efficiency) if their position is secure.",
    strengths: "Large firms can benefit from massive **Economies of Scale**, leading to lower costs which *could* be passed on to consumers.",
    limitations: "Break-ups or heavy regulation can be complex and may have unintended consequences for user experience and innovation.",
    evaluations: "Antitrust policy in the digital age needs to focus not just on 'price' (since many tech services are 'free') but on 'data' and 'platform neutrality' to ensure that smaller competitors have a fair chance to compete.",
    tags: "Market Structure, Monopoly, Efficiency"
  },
  {
    title: "The Growing Importance of 'Rare Earth' Elements in the Green Transition",
    summary: "The race to secure supplies of lithium, cobalt, and rare earth minerals is intensifying as countries ramp up production of EVs and wind turbines, leading to a new 'Mineral Geopolitics'.",
    url: "https://www.iea.org/reports/the-role-of-critical-minerals-in-clean-energy-transitions",
    category: "International",
    theory: "These minerals are **Critical Inputs** with highly **Inelastic Supply** in the short run (due to long mining gestation periods). As the world moves toward green energy, the demand curve shifts sharply to the right, leading to massive price increases. This creates a new form of **Comparative Advantage** for mineral-rich nations and potential supply-side bottlenecks for the global economy.",
    strengths: "Creates a powerful incentive for R&D into mineral recycling and alternative battery chemistries (substitution effect).",
    limitations: "Mining often carries heavy **Negative Environmental Externalities** (water pollution, habitat loss), which must be managed to ensure the transition is truly 'green'.",
    evaluations: "Diversifying supply sources and investing in 'Circular Economy' technologies (recycling) are the only long-term solutions to this strategic supply-side constraint.",
    tags: "Supply-Side Policy, Externalities, Comparative Advantage"
  },
  {
    title: "Japan Ends Negative Interest Rate Policy: A Turning Point for Global Markets",
    summary: "The Bank of Japan has raised interest rates for the first time in 17 years, signaling an end to its decades-long fight against deflation and ultra-easy monetary policy.",
    url: "https://www.cnbc.com/2024/03/19/bank-of-japan-ends-negative-interest-rate-policy-first-hike-in-17-years.html",
    category: "International",
    theory: "This is a shift from **Unconventional Monetary Policy** back toward normalcy. For years, Japan used negative rates to fight a **Deflationary Gap** and encourage bank lending (to boost I and C). Raising rates suggests that **Inflation Expectations** have finally been anchored above zero. This has global implications as the 'Yen Carry Trade' (borrowing in cheap Yen to invest elsewhere) may reverse, affecting global liquidity.",
    strengths: "Restores the signaling function of interest rates and improves the profitability of the Japanese banking sector.",
    limitations: "A sudden rise in rates could hurt Japanese firms and households that have become accustomed to 'free' money for nearly two decades.",
    evaluations: "The BoJ must be extremely gradual. Success will depend on whether Japan can sustain real wage growth to support consumption and prevent a relapse into deflation.",
    tags: "Monetary Policy, Deflation, AD/AS"
  },
  {
    title: "The Impact of an Aging Global Population on Savings and Investment",
    summary: "As more countries—including China and much of Europe—face shrinking workforces, the global 'savings glut' may turn into a 'savings shortage', potentially driving up long-term interest rates.",
    url: "https://www.economist.com/special-report/2024/05/23/the-world-is-becoming-more-pensioner-heavy",
    category: "International",
    theory: "This is a **Long-term Structural Shift in the Loanable Funds Market**. As people age, they move from being 'savers' (during their working years) to 'spenders' (during retirement). This reduces the supply of loanable funds. At the same time, a shrinking labor force may reduce the demand for capital (I). If the supply of funds falls more than the demand, the **Real Interest Rate** will rise, increasing the cost of investment globally.",
    strengths: "May encourage more investment in labor-saving technologies like AI and robotics.",
    limitations: "Higher interest rates increase the fiscal pressure on governments with high debt-to-GDP ratios, limiting their ability to fund public services.",
    evaluations: "The 'Demographic Transition' is one of the most significant challenges of the 21st century. Governments must focus on increasing the 'Labor Force Participation Rate' (e.g., through later retirement) and boosting productivity to maintain living standards.",
    tags: "Supply-Side, Growth, Financial Markets"
  },
  {
    title: "Global Trade Growth Projected to Rebound in 2024 and 2025",
    summary: "The WTO expects global merchandise trade volume to grow by 2.6% in 2024 and 3.3% in 2025 as inflation eases and real incomes recover in major economies.",
    url: "https://www.wto.org/english/news_e/pres24_e/pr921_e.htm",
    category: "International",
    theory: "The rebound in trade is driven by a recovery in **Global Aggregate Demand**. As inflation falls, the **Real Purchasing Power** of consumers increases, leading to higher demand for imported goods (M for importers, X for exporters). This has a positive **Multiplier Effect** on global growth. Trade is a key driver of **Efficiency** through the division of labor and economies of scale.",
    strengths: "Reduces the risk of a global recession and supports job creation in export-oriented sectors.",
    limitations: "Geopolitical tensions and the risk of new trade barriers (protectionism) remain the biggest threats to this recovery.",
    evaluations: "The WTO's role in maintaining a rules-based system is more important than ever. Strengthening the dispute settlement mechanism is crucial to prevent trade disputes from spiraling into destructive trade wars.",
    tags: "International Trade, Globalization, AD/AS"
  },
  {
    title: "The 'Green Premium': The Cost of Transitioning to a Low-Carbon Economy",
    summary: "While renewable energy is getting cheaper, the total cost of replacing existing fossil fuel infrastructure remains high, leading to debates over who should pay for the transition.",
    url: "https://www.gatesnotes.com/The-Green-Premium",
    category: "International",
    theory: "The 'Green Premium' is the additional cost of choosing a clean technology over one that emits greenhouse gases. It represents the **Unpriced Externality** of carbon. The goal of policy (carbon taxes, subsidies) is to reduce this premium to zero. In the short run, this transition is a **Supply-Side Cost** that could lead to higher energy prices, but in the long run, it leads to a more sustainable and efficient energy system.",
    strengths: "Driving innovation in new technologies like green hydrogen and long-duration energy storage.",
    limitations: "If the green premium remains high, consumers and firms may resist the transition, leading to missed climate targets.",
    evaluations: "Government R&D is the best way to lower the green premium by making clean technologies fundamentally more efficient and cheaper than their fossil fuel counterparts.",
    tags: "Externalities, Market Failure, Supply-Side Policy"
  },
  {
    title: "US National Debt Hits $35 Trillion: Concerns Over Fiscal Sustainability",
    summary: "The US national debt continues to climb, sparking renewed debate over the long-term sustainability of large budget deficits and the risk of 'crowding out' private investment.",
    url: "https://www.nytimes.com/2024/07/29/business/us-national-debt-35-trillion.html",
    category: "International",
    theory: "Persistent budget deficits (G > T) lead to a growing national debt. According to the **Crowding Out Effect**, if the government borrows heavily, it increases the demand for loanable funds, driving up interest rates. This makes it more expensive for private firms to borrow for **Investment (I)**, potentially slowing long-term growth. However, if the spending is on high-return infrastructure or R&D, it could actually boost LRAS.",
    strengths: "Deficit spending can provide essential stimulus during a recession (Keynesian view).",
    limitations: "A high debt-to-GDP ratio reduces the 'fiscal space' for future governments to respond to crises and may lead to higher taxes in the future.",
    evaluations: "The focus should be on the 'Primary Balance' and the 'Debt-to-GDP' ratio. As long as GDP growth is higher than the real interest rate on the debt, the burden can be manageable.",
    tags: "Fiscal Policy, Debt, Crowding Out"
  },
  {
    title: "The Impact of Tourism on Emerging Economies: Opportunity and Risk",
    summary: "Post-pandemic tourism is booming in countries like Thailand, Vietnam, and Mexico, providing much-needed foreign exchange but also causing environmental and social strain.",
    url: "https://www.unwto.org/news/world-tourism-barometer-2024",
    category: "International",
    theory: "Tourism is a major **Service Export**. It improves the **Current Account** of the BOP and generates significant employment through the **Multiplier Effect**. However, it can also lead to **Negative Externalities** like environmental degradation and 'over-tourism' that harms local communities. It may also lead to a **Two-Tier Economy** where prices in tourist areas become unaffordable for locals.",
    strengths: "Low barriers to entry for employment and a quick way to earn foreign currency.",
    limitations: "Heavy reliance on tourism makes an economy vulnerable to external shocks like pandemics, natural disasters, or changes in global travel trends.",
    evaluations: "Sustainable tourism policies (like tourist taxes or visitor caps) are needed to ensure that the industry's growth does not destroy the very assets it depends on.",
    tags: "Multiplier, BOP, Externalities"
  },
  {
    title: "The Decline of the Middle Class in Developed Nations: Economic and Social Impacts",
    summary: "Automation and globalization have led to a hollowing out of middle-skill jobs in many Western countries, contributing to rising income inequality and political polarization.",
    url: "https://www.oecd.org/social/under-pressure-the-squeezed-middle-class-689afed1-en.htm",
    category: "International",
    theory: "This is a result of **Skill-Biased Technological Change**. Technology complements high-skill workers and replaces middle-skill workers, shifting the demand for labor in a way that favors the top and bottom of the income distribution. This leads to **Income Polarization**. Globalization has a similar effect by offshoring middle-skill manufacturing jobs to low-cost countries.",
    strengths: "Increases overall global efficiency and provides lower-priced goods for consumers.",
    limitations: "Erodes social cohesion and can lead to a backlash against globalization and technology (protectionism).",
    evaluations: "Fixing this requires a fundamental re-think of education and training systems, moving toward 'Lifelong Learning' and perhaps more progressive tax-and-transfer systems to ensure that the gains from growth are shared more broadly.",
    tags: "Equity, Labor Market, Globalization"
  },
  {
    title: "Global Shipping Crisis: Red Sea Disruptions and Panama Canal Drought",
    summary: "Attacks on shipping in the Red Sea and a severe drought in the Panama Canal are forcing ships to take longer, more expensive routes, driving up global freight costs.",
    url: "https://www.bbc.com/news/business-67759596",
    category: "International",
    theory: "These are **Negative Supply Shocks** to the transport sector. They increase the 'Unit Transport Cost' for all traded goods. This shifts the SRAS curve to the left, contributing to **Imported Cost-Push Inflation**. It also illustrates the vulnerability of 'Just-in-Time' supply chains to physical and environmental disruptions.",
    strengths: "Encourages the development of more resilient and diversified transport routes.",
    limitations: "Directly increases the price of essentials like food and energy for consumers worldwide.",
    evaluations: "Global trade resilience depends on both physical security (freedom of navigation) and climate adaptation (managing water levels in canals). It also reinforces the trend toward 'near-shoring'.",
    tags: "Supply Shock, Inflation, Globalization"
  },
  {
    title: "The Rise of 'Subscription' Business Models and their Impact on Consumer Welfare",
    summary: "From software to coffee, more companies are moving toward subscription-based pricing, raising questions about consumer choice and 'subscription fatigue'.",
    url: "https://www.hbr.org/2024/02/the-pros-and-cons-of-subscription-business-models",
    category: "International",
    theory: "Subscription models provide firms with a more **Stable and Predictable Revenue Stream**. From a consumer perspective, it can lower the 'entry price' (improving affordability) but can lead to **Inertia and Irrational Behavior** where consumers continue to pay for services they don't use (a form of market inefficiency). It also allows firms to practice a form of **Price Discrimination** over time.",
    strengths: "Provides firms with the capital to invest in continuous product improvement (dynamic efficiency).",
    limitations: "Can lead to 'Lock-in' effects and reduced competition if it becomes difficult for consumers to switch providers.",
    evaluations: "Consumer protection laws should focus on 'Easy Exit'—ensuring that cancelling a subscription is as easy as signing up—to maintain market contestability.",
    tags: "Market Structure, Consumer Behavior, Efficiency"
  },
  {
    title: "Space Economy: The New Frontier of Economic Growth?",
    summary: "The falling cost of rocket launches is opening up new opportunities in satellite internet, space tourism, and eventually, off-world mining, creating a multi-billion dollar new industry.",
    url: "https://www.mckinsey.com/industries/aerospace-and-defense/our-insights/the-role-of-space-in-the-future-of-the-global-economy",
    category: "International",
    theory: "The space economy is an emerging sector that could become a major driver of **Long-term Economic Growth**. It represents a shift in the **Production Possibility Frontier (PPF)** as new resources and technologies become available. It is a high-tech, capital-intensive sector that fosters significant **Positive Spillovers** into other industries like materials science and telecommunications.",
    strengths: "Potential to solve resource scarcity on Earth and provides a new domain for scientific discovery.",
    limitations: "Huge upfront costs and extreme risks. It also raises complex issues related to 'Space Debris' (a negative externality) and international property rights in space.",
    evaluations: "International cooperation and a clear legal framework (an update to the Outer Space Treaty) are essential to ensure the space economy develops in a safe, sustainable, and equitable manner.",
    tags: "Growth, Innovation, Externalities"
  }
];

async function seed() {
  console.log("Seeding econ news...");
  try {
    // Clear existing news to avoid duplicates if re-running
    await db.delete(econNews);
    
    // Insert new data
    for (const news of newsData) {
      await db.insert(econNews).values(news);
    }
    console.log("Seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding econ news:", error);
    process.exit(1);
  }
}

seed();
