import { db } from '@/db';
import { essays } from '@/db/schema';

async function main() {
    const sampleEssays = [
        {
            essayId: 'e1',
            question: 'Discuss whether fiscal policy is more effective than monetary policy in achieving economic growth.',
            level: 'JC',
            marks: '15',
            preamble: 'Economic growth is a key macroeconomic objective for most governments. To achieve this, policymakers can employ various demand-side policies, with fiscal and monetary policy being the two main tools. The effectiveness of these policies in promoting sustained economic growth has been widely debated among economists.',
            examinerComments: [
                'Strong introduction defining key terms and setting context',
                'Excellent use of AD-AS diagrams to illustrate points',
                'Well-balanced discussion of both policies with real-world examples',
                'Clear evaluation with well-justified conclusion'
            ],
            structureNotes: 'Introduction → Define policies → Explain fiscal policy effectiveness → Explain monetary policy effectiveness → Evaluation comparing contexts → Conclusion',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
        {
            essayId: 'e2',
            question: 'Assess the view that free trade is always beneficial to an economy.',
            level: 'JC',
            marks: '25',
            preamble: 'International trade has grown significantly over the past few decades, driven by globalization and trade liberalization. Proponents argue that free trade brings numerous benefits to economies, while critics point to potential costs and challenges, particularly for developing countries and specific industries.',
            examinerComments: [
                'Thorough analysis of comparative advantage theory',
                'Good discussion of both static and dynamic gains from trade',
                'Balanced consideration of potential costs and limitations',
                'Strong use of examples from developed and developing economies'
            ],
            structureNotes: 'Introduction → Theory of comparative advantage → Benefits of free trade → Limitations and costs → Evaluation based on country characteristics → Conclusion',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
        {
            essayId: 'e3',
            question: 'Explain how market forces determine prices and discuss whether governments should intervene when prices are too high.',
            level: 'Secondary',
            marks: '12',
            preamble: 'In a market economy, prices play a crucial role in allocating scarce resources. They are determined by the interaction of demand and supply forces. However, when prices become too high, concerns arise about affordability and access, leading to debates about the need for government intervention.',
            examinerComments: [
                'Clear explanation of demand and supply interaction',
                'Good use of diagrams showing equilibrium',
                'Balanced discussion of price control pros and cons',
                'Appropriate real-world examples'
            ],
            structureNotes: 'Introduction → Explain demand and supply → Show equilibrium determination → Discuss government intervention (price ceiling) → Evaluate effectiveness → Conclusion',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }
    ];

    await db.insert(essays).values(sampleEssays);
    
    console.log('✅ Essays seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});