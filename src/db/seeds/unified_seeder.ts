import { createClient } from '@libsql/client';
import 'dotenv/config';

const client = createClient({
  url: process.env.TURSO_CONNECTION_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

const SECONDARY_CHAPTERS = {
  Micro: [
    "1. The basic economic problem",
    "2. The allocation of resources",
    "3. Microeconomic decision makers"
  ],
  Macro: [
    "4. Government and the macroeconomy",
    "5. Economic development",
    "6. International trade and globalisation"
  ]
};

const JC_CHAPTERS = {
  Micro: [
    "Scarcity as the Central Economic Problem",
    "Demand and Supply",
    "Market Failure",
    "Firms and Decisions (Market Structure)"
  ],
  Macro: [
    "Introduction to Macroeconomics",
    "Macroeconomic Objectives and Policies",
    "Globalisation and the International Economy"
  ]
};

async function seed() {
  try {
    console.log('Starting unified seeding...');
    
    // Clear existing data
    await client.execute('DELETE FROM flashcards');
    await client.execute('DELETE FROM notes');
    
    const now = new Date().toISOString();

    // Secondary Flashcards
    const secondaryFlashcards = [
      {
        question: "What is scarcity?",
        answer: "Scarcity is the fundamental economic problem where human wants are unlimited but resources are finite. It forces individuals and societies to make choices.",
        level: "Secondary",
        category: "Micro",
        topic: "Scarcity",
        difficulty: "Easy",
        economicsType: "Micro",
        chapter: "1. The basic economic problem"
      },
      {
        question: "Define Opportunity Cost.",
        answer: "The benefit forgone from the next best alternative given up when a choice is made.",
        level: "Secondary",
        category: "Micro",
        topic: "Opportunity Cost",
        difficulty: "Easy",
        economicsType: "Micro",
        chapter: "1. The basic economic problem"
      },
      {
        question: "What are the three basic economic questions?",
        answer: "1. What to produce? 2. How to produce? 3. For whom to produce?",
        level: "Secondary",
        category: "Micro",
        topic: "Economic Systems",
        difficulty: "Easy",
        economicsType: "Micro",
        chapter: "1. The basic economic problem"
      },
      {
        question: "What is the Law of Demand?",
        answer: "As price rises, quantity demanded falls, and vice versa, ceteris paribus.",
        level: "Secondary",
        category: "Micro",
        topic: "Demand",
        difficulty: "Easy",
        economicsType: "Micro",
        chapter: "2. The allocation of resources"
      },
      {
        question: "State the Law of Supply.",
        answer: "As price rises, quantity supplied rises, and vice versa, ceteris paribus.",
        level: "Secondary",
        category: "Micro",
        topic: "Supply",
        difficulty: "Easy",
        economicsType: "Micro",
        chapter: "2. The allocation of resources"
      },
      {
        question: "Define Market Equilibrium.",
        answer: "The point where quantity demanded equals quantity supplied (QD = QS). There is no tendency for price to change.",
        level: "Secondary",
        category: "Micro",
        topic: "Equilibrium",
        difficulty: "Medium",
        economicsType: "Micro",
        chapter: "2. The allocation of resources"
      },
      {
        question: "What is Price Elasticity of Demand (PED)?",
        answer: "Measures the responsiveness of quantity demanded to a change in its own price. %ΔQD / %ΔP.",
        level: "Secondary",
        category: "Micro",
        topic: "Elasticity",
        difficulty: "Medium",
        economicsType: "Micro",
        chapter: "2. The allocation of resources"
      },
      {
        question: "What is Market Failure?",
        answer: "When the free market fails to allocate resources efficiently, leading to a loss of social welfare.",
        level: "Secondary",
        category: "Micro",
        topic: "Market Failure",
        difficulty: "Medium",
        economicsType: "Micro",
        chapter: "2. The allocation of resources"
      },
      {
        question: "Define Negative Externalities.",
        answer: "Harmful effects on third parties who are not involved in the transaction (e.g., pollution).",
        level: "Secondary",
        category: "Micro",
        topic: "Externalities",
        difficulty: "Medium",
        economicsType: "Micro",
        chapter: "2. The allocation of resources"
      },
      {
        question: "What are Public Goods?",
        answer: "Goods that are non-excludable (cannot stop people from using) and non-rivalrous (one's use doesn't reduce availability for others).",
        level: "Secondary",
        category: "Micro",
        topic: "Public Goods",
        difficulty: "Medium",
        economicsType: "Micro",
        chapter: "2. The allocation of resources"
      },
      {
        question: "What is an indirect tax?",
        answer: "A tax imposed on goods and services (e.g., GST/VAT) which increases the cost of production for firms.",
        level: "Secondary",
        category: "Micro",
        topic: "Taxes",
        difficulty: "Easy",
        economicsType: "Micro",
        chapter: "2. The allocation of resources"
      },
      {
        question: "Define a subsidy.",
        answer: "A payment from the government to producers to lower production costs and encourage supply.",
        level: "Secondary",
        category: "Micro",
        topic: "Subsidies",
        difficulty: "Easy",
        economicsType: "Micro",
        chapter: "2. The allocation of resources"
      },
      {
        question: "What are the four factors of production?",
        answer: "Land, Labour, Capital, and Enterprise.",
        level: "Secondary",
        category: "Micro",
        topic: "Production",
        difficulty: "Easy",
        economicsType: "Micro",
        chapter: "3. Microeconomic decision makers"
      },
      {
        question: "What is the primary objective of most private firms?",
        answer: "Profit maximization.",
        level: "Secondary",
        category: "Micro",
        topic: "Firms",
        difficulty: "Easy",
        economicsType: "Micro",
        chapter: "3. Microeconomic decision makers"
      },
      {
        question: "Define Monopoly.",
        answer: "A market structure with only one seller, high barriers to entry, and no close substitutes.",
        level: "Secondary",
        category: "Micro",
        topic: "Market Structure",
        difficulty: "Medium",
        economicsType: "Micro",
        chapter: "3. Microeconomic decision makers"
      },
      {
        question: "What are the four macroeconomic objectives?",
        answer: "1. Sustainable economic growth 2. Low inflation 3. Low unemployment 4. Favourable balance of payments.",
        level: "Secondary",
        category: "Macro",
        topic: "Objectives",
        difficulty: "Medium",
        economicsType: "Macro",
        chapter: "4. Government and the macroeconomy"
      },
      {
        question: "Define GDP.",
        answer: "Gross Domestic Product: The total value of all final goods and services produced within a country in a given year.",
        level: "Secondary",
        category: "Macro",
        topic: "Growth",
        difficulty: "Medium",
        economicsType: "Macro",
        chapter: "4. Government and the macroeconomy"
      },
      {
        question: "What is Fiscal Policy?",
        answer: "The use of government spending and taxation to influence aggregate demand in the economy.",
        level: "Secondary",
        category: "Macro",
        topic: "Policy",
        difficulty: "Medium",
        economicsType: "Macro",
        chapter: "4. Government and the macroeconomy"
      },
      {
        question: "Define Inflation.",
        answer: "A sustained increase in the general price level of an economy over a period of time.",
        level: "Secondary",
        category: "Macro",
        topic: "Inflation",
        difficulty: "Medium",
        economicsType: "Macro",
        chapter: "4. Government and the macroeconomy"
      },
      {
        question: "What is the difference between real and nominal GDP?",
        answer: "Nominal GDP is at current prices; Real GDP is adjusted for inflation (constant prices).",
        level: "Secondary",
        category: "Macro",
        topic: "Measurement",
        difficulty: "Hard",
        economicsType: "Macro",
        chapter: "5. Economic development"
      },
      {
        question: "What is the Human Development Index (HDI)?",
        answer: "A composite index measuring development through health (life expectancy), education, and income (GNI per capita).",
        level: "Secondary",
        category: "Macro",
        topic: "Development",
        difficulty: "Medium",
        economicsType: "Macro",
        chapter: "5. Economic development"
      },
      {
        question: "Define Globalization.",
        answer: "The increasing integration and interdependence of national economies through trade, investment, and technology.",
        level: "Secondary",
        category: "Macro",
        topic: "Globalization",
        difficulty: "Medium",
        economicsType: "Macro",
        chapter: "6. International trade and globalisation"
      },
      {
        question: "What is a Protectionist policy?",
        answer: "Government actions to restrict international trade to protect domestic industries (e.g., tariffs, quotas).",
        level: "Secondary",
        category: "Macro",
        topic: "Trade",
        difficulty: "Medium",
        economicsType: "Macro",
        chapter: "6. International trade and globalisation"
      }
    ];

    // Seed Flashcards
    for (const card of secondaryFlashcards) {
      await client.execute({
        sql: 'INSERT INTO flashcards (question, answer, level, category, topic, difficulty, economics_type, chapter, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        args: [card.question, card.answer, card.level, card.category, card.topic, card.difficulty, card.economicsType, card.chapter, now, now]
      });
    }

    // Seed Notes
    const secondaryNotes = [
      {
        title: "The Basic Economic Problem: Scarcity and Choice",
        category: "Theory",
        level: "Secondary",
        topics: JSON.stringify(["Scarcity", "Opportunity Cost", "Factors of Production"]),
        description: "Introduction to the fundamental problem of economics. Explains scarcity, the need for choice, and the concept of opportunity cost in various contexts.",
        economicsType: "Micro",
        chapter: "1. The basic economic problem"
      },
      {
        title: "Market Mechanism: Demand and Supply Analysis",
        category: "Theory",
        level: "Secondary",
        topics: JSON.stringify(["Demand", "Supply", "Equilibrium"]),
        description: "Detailed analysis of how prices are determined in a free market. Covers determinants of demand/supply and shifts in curves.",
        economicsType: "Micro",
        chapter: "2. The allocation of resources"
      },
      {
        title: "Market Failure and Government Intervention",
        category: "Theory",
        level: "Secondary",
        topics: JSON.stringify(["Externalities", "Public Goods", "Taxes", "Subsidies"]),
        description: "Explains why markets fail and how governments intervene using tools like taxes, subsidies, and regulation.",
        economicsType: "Micro",
        chapter: "2. The allocation of resources"
      },
      {
        title: "Fiscal and Monetary Policy in Singapore",
        category: "Policy",
        level: "Secondary",
        topics: JSON.stringify(["Fiscal Policy", "Monetary Policy", "Economic Growth"]),
        description: "How the Singapore government manages the macroeconomy to achieve objectives like low inflation and high growth.",
        economicsType: "Macro",
        chapter: "4. Government and the macroeconomy"
      }
    ];

    for (const note of secondaryNotes) {
      await client.execute({
        sql: 'INSERT INTO notes (title, category, level, topics, description, economics_type, chapter, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        args: [note.title, note.category, note.level, note.topics, note.description, note.economicsType, note.chapter, now, now]
      });
    }

    console.log('Seeding completed successfully');
  } catch (error) {
    console.error('Seeding failed:', error);
  } finally {
    process.exit(0);
  }
}

seed();
