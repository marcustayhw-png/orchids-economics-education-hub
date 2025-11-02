import { db } from '@/db';
import { csqs, csqParts } from '@/db/schema';

async function main() {
    const sampleCsqs = [
        {
            csqId: 'c1',
            title: "Case Study: Singapore's Economic Response to COVID-19",
            level: 'JC',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
        {
            csqId: 'c2',
            title: 'Case Study: Market Failure in Healthcare',
            level: 'Secondary',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }
    ];

    const insertedCsqs = await db.insert(csqs).values(sampleCsqs).returning();

    const sampleCsqParts = [
        {
            csqId: insertedCsqs[0].id,
            part: 'a',
            question: "With reference to Extract 1, explain the causes of the recession in Singapore during 2020.",
            marks: '4',
            extract: "Extract 1: Singapore's Economy During COVID-19\n\nIn 2020, Singapore experienced its worst recession since independence, with GDP contracting by 5.4%. The aviation and tourism sectors were particularly hard hit as international travel came to a standstill. Singapore Airlines reported record losses as passenger numbers plummeted by 98% during the circuit breaker period. The manufacturing sector also faced significant challenges, with exports falling by 4.8% as global supply chains were disrupted and demand from major trading partners weakened. Domestically, consumer spending declined sharply as unemployment rose to 4.1% and businesses closed temporarily during the lockdown.",
            markingScheme: [
                "Fall in export demand due to global lockdowns (1 mark for identification + 1 mark for explanation)",
                "Decline in domestic consumption due to job losses and uncertainty (1 mark for identification + 1 mark for explanation)"
            ],
            modelAnswer: "The recession was caused by a significant fall in aggregate demand. Firstly, export revenue declined sharply as Singapore's trading partners implemented lockdowns, reducing demand for Singapore's exports (DD falls). Secondly, domestic consumption fell due to rising unemployment and consumer uncertainty, as households became more cautious with spending (C falls). These factors combined to shift AD leftwards, resulting in negative economic growth.",
            orderIndex: 0,
        },
        {
            csqId: insertedCsqs[0].id,
            part: 'b',
            question: "Using an AD-AS diagram, explain how the fiscal measures mentioned in Extract 2 would help the economy recover.",
            marks: '6',
            extract: "Extract 2: Government's Fiscal Response\n\nThe Singapore government introduced a series of unprecedented fiscal stimulus packages totaling S$100 billion, approximately 20% of GDP. These measures included direct cash transfers to households, wage subsidies through the Jobs Support Scheme to help businesses retain workers, and rental rebates for businesses. The government also increased spending on infrastructure projects and enhanced support for training and skills upgrading programs to prepare workers for the post-pandemic economy.",
            markingScheme: [
                "Correctly labeled AD-AS diagram (1 mark)",
                "Show rightward shift of AD (1 mark)",
                "Explain increase in government spending (G) component (2 marks)",
                "Explain multiplier effect (2 marks)"
            ],
            modelAnswer: "The government's fiscal stimulus packages, including cash handouts and wage subsidies, increase government expenditure (G), which is a component of AD. This causes AD to shift rightwards from AD1 to AD2. The increase in G leads to a multiplier effect as the initial injection of spending generates further rounds of income and consumption. For example, wage subsidies help firms retain workers, who continue to spend, creating more income for businesses. This multiplied increase in national income helps the economy recover towards full employment equilibrium.",
            orderIndex: 1,
        },
        {
            csqId: insertedCsqs[0].id,
            part: 'c',
            question: "Discuss whether supply-side policies would be more effective than demand-side policies in ensuring Singapore's long-term economic growth.",
            marks: '10',
            extract: "Extract 3: Singapore's Economic Strategy\n\nBeyond immediate fiscal stimulus, Singapore has focused on long-term structural transformation. The government has invested heavily in research and development, particularly in emerging sectors like artificial intelligence, biotechnology, and green technology. Initiatives to upgrade workforce skills through SkillsFuture programs have been expanded, recognizing that technological disruption requires continuous learning. However, some economists argue that with weak global demand and uncertainty persisting, demand-side measures remain crucial to support businesses and maintain employment in the near term.",
            markingScheme: [
                "Explanation of demand-side policies with examples (3 marks)",
                "Explanation of supply-side policies with examples (3 marks)",
                "Evaluation and comparison (4 marks)"
            ],
            modelAnswer: "[Comprehensive answer would follow discussing both policy types, their mechanisms, advantages, limitations, and contextual evaluation specific to Singapore's economy]",
            orderIndex: 2,
        },
        {
            csqId: insertedCsqs[1].id,
            part: 'a',
            question: "Explain why healthcare is considered a merit good.",
            marks: '4',
            extract: "Extract 1: Healthcare Consumption Patterns\n\nMany people avoid regular medical check-ups and preventive care despite their importance. A survey found that 40% of adults have not visited a doctor in over two years, primarily citing costs and the belief that they don't need healthcare when feeling well. Public health experts warn that this under-consumption of healthcare leads to delayed diagnoses and more severe health complications later, which are costlier to treat. Moreover, infectious diseases can spread more easily when people don't seek timely treatment, affecting the wider community.",
            markingScheme: [
                "Definition of merit good (1 mark)",
                "Explanation of positive externalities (1.5 marks)",
                "Explanation of information failure (1.5 marks)"
            ],
            modelAnswer: "Healthcare is a merit good because it generates positive externalities and consumers tend to under-consume it due to imperfect information. When people receive healthcare, society benefits through reduced disease transmission and a healthier, more productive workforce (positive externalities). However, individuals may not fully appreciate these benefits or may undervalue preventive care, leading to under-consumption from society's perspective. Therefore, the free market would provide less than the socially optimal quantity of healthcare.",
            orderIndex: 0,
        },
        {
            csqId: insertedCsqs[1].id,
            part: 'b',
            question: "Using a diagram, explain how government subsidies can increase consumption of healthcare.",
            marks: '6',
            extract: "Extract 2: Government Healthcare Subsidies\n\nTo address the under-consumption of healthcare, the government has introduced subsidies covering 60-80% of costs for basic healthcare services at public clinics and hospitals. The subsidies are designed to make healthcare more affordable, particularly for lower-income families. Since implementation, the number of people seeking preventive care has increased by 35%, and vaccination rates have improved significantly.",
            markingScheme: [
                "Correctly labeled demand and supply diagram (2 marks)",
                "Show downward shift of supply curve (1 mark)",
                "Explain reduction in price and increase in quantity (3 marks)"
            ],
            modelAnswer: "Government subsidies reduce the cost of providing healthcare, causing the supply curve to shift rightward from S1 to S2. This is because healthcare providers can afford to supply more at each price level with the subsidy. As a result, the equilibrium price falls from P1 to P2, making healthcare more affordable, while the equilibrium quantity rises from Q1 to Q2. This encourages more people to consume healthcare services, moving towards the socially optimal level of consumption.",
            orderIndex: 1,
        }
    ];

    await db.insert(csqParts).values(sampleCsqParts);

    console.log('✅ CSQs and CSQ Parts seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});