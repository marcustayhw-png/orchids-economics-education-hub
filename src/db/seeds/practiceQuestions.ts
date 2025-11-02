import { db } from '@/db';
import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

const practiceQuestions = sqliteTable('practice_questions', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  questionId: text('question_id').notNull().unique(),
  question: text('question').notNull(),
  topic: text('topic').notNull(),
  difficulty: text('difficulty').notNull(),
  level: text('level').notNull(),
  marks: integer('marks').notNull(),
  answer: text('answer').notNull(),
  pdfUrl: text('pdf_url'),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

async function main() {
  const sampleQuestions = [
    {
      questionId: 'pq1',
      question: 'Explain two factors that could cause an increase in the demand for smartphones.',
      topic: 'Demand and Supply',
      difficulty: 'Easy',
      level: 'Secondary',
      marks: 4,
      answer: 'Two factors that could increase demand for smartphones are: (1) Rise in consumer income - As income increases, consumers have more purchasing power and are more willing and able to buy smartphones, shifting the demand curve rightward. (2) Successful advertising campaigns - Effective marketing can increase consumer preference for smartphones, raising their willingness to buy at each price level, thus increasing demand.',
      pdfUrl: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      questionId: 'pq2',
      question: 'Using a diagram, explain how a maximum price (price ceiling) set below equilibrium would affect the market for rental housing.',
      topic: 'Government Intervention',
      difficulty: 'Medium',
      level: 'Secondary',
      marks: 6,
      answer: 'A maximum price set below equilibrium creates a shortage in the rental housing market. At the ceiling price Pmax (below equilibrium Pe), quantity demanded (Qd) exceeds quantity supplied (Qs), resulting in excess demand of Qd-Qs. This shortage means many people seeking rental housing cannot find accommodation. The diagram shows the demand and supply curves intersecting at Pe, Qe, with Pmax drawn below Pe, creating the gap between Qd and Qs at the ceiling price.',
      pdfUrl: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      questionId: 'pq3',
      question: 'Explain how negative externalities lead to market failure in the case of air pollution from factories.',
      topic: 'Market Failure',
      difficulty: 'Medium',
      level: 'JC',
      marks: 8,
      answer: 'Negative externalities occur when production or consumption imposes costs on third parties. Factories producing goods generate air pollution, harming the health of nearby residents and degrading environmental quality - these are external costs not borne by producers or consumers. In a free market, producers only consider private costs (MPC) when deciding output levels, ignoring external costs. The socially optimal output occurs where MSC (MPC + MEC) equals MSB, but the market produces where MPC equals MPB, resulting in overproduction (Qm > Qs). This represents allocative inefficiency and welfare loss, as resources are over-allocated to polluting production. Market failure occurs because the price mechanism fails to account for external costs.',
      pdfUrl: '/uploads/market-failure-diagram.pdf',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      questionId: 'pq4',
      question: 'Discuss whether fiscal policy is more effective than monetary policy in achieving low unemployment during a recession.',
      topic: 'Macroeconomic Policies',
      difficulty: 'Hard',
      level: 'JC',
      marks: 12,
      answer: 'Fiscal policy may be more effective than monetary policy in reducing unemployment during a recession due to several factors. During recessions, monetary policy effectiveness is limited by the liquidity trap - when interest rates are already very low, further reductions have minimal impact on investment and consumption as businesses and consumers remain pessimistic. In contrast, expansionary fiscal policy through increased government spending directly injects demand into the economy (G increases, AD shifts right), creating jobs in public sector projects and generating multiplier effects. However, fiscal policy has limitations including time lags in implementation, potential crowding out effects if financed by borrowing, and constraints on government budgets particularly for heavily indebted nations. The relative effectiveness depends on economic context: fiscal policy is generally more powerful in deep recessions with liquidity traps, while monetary policy may suffice in mild downturns. A combination of both policies is often optimal, with fiscal policy providing immediate demand stimulus while monetary policy maintains accommodative conditions.',
      pdfUrl: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      questionId: 'pq5',
      question: 'Assess the view that free trade is always beneficial to developing countries.',
      topic: 'International Trade',
      difficulty: 'Hard',
      level: 'JC',
      marks: 15,
      answer: 'Free trade offers significant potential benefits to developing countries through comparative advantage, allowing specialization in goods where they have lower opportunity costs. This increases production efficiency and enables access to larger export markets, generating foreign exchange earnings and economic growth. Consumers benefit from lower prices and greater variety of imports. Dynamic gains include technology transfer, efficiency improvements from competition, and economies of scale. However, free trade is not always beneficial for developing countries. Infant industries may be unable to compete with established foreign firms, preventing industrialization and economic diversification - these industries need temporary protection to develop. Developing countries often depend on primary commodities with volatile prices and declining terms of trade, making them vulnerable to external shocks. Free trade can also lead to structural unemployment as import-competing industries decline, while factor immobility prevents workers from easily transitioning to export sectors. Income inequality may worsen if gains are concentrated among skilled workers and capital owners. The benefits of free trade depend on several factors including the stage of development, industrial structure, institutional quality, and complementary policies. Developing countries may benefit more from strategic trade policies combining selective protection for infant industries with gradual liberalization, rather than complete free trade. A nuanced approach considering country-specific circumstances is more appropriate than a blanket endorsement of free trade.',
      pdfUrl: '/uploads/trade-essay-guide.pdf',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  await db.insert(practiceQuestions).values(sampleQuestions);

  console.log('✅ Practice questions seeder completed successfully');
}

main().catch((error) => {
  console.error('❌ Seeder failed:', error);
});