import { db } from '@/db';
import { notes } from '@/db/schema';

async function main() {
    const sampleNotes = [
        {
            title: 'Understanding Market Failure and Government Intervention',
            category: 'Theory',
            level: 'JC',
            topics: JSON.stringify(['Market Failure', 'Externalities', 'Public Goods', 'Government Intervention']),
            description: 'Comprehensive notes covering types of market failure including externalities, public goods, and merit/demerit goods. Includes detailed analysis of government policies to address market failures such as taxation, subsidies, and regulation.',
            pdfUrl: '/uploads/market-failure-notes.pdf',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
        {
            title: 'Introduction to Demand and Supply',
            category: 'Fundamentals',
            level: 'Secondary',
            topics: JSON.stringify(['Demand and Supply', 'Market Equilibrium', 'Price Mechanism']),
            description: 'Foundational notes on demand and supply analysis, covering determinants of demand and supply, shifts vs movements, and market equilibrium determination. Includes practice diagrams and examples.',
            pdfUrl: null,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
        {
            title: 'Case Study Analysis: Singapore\'s Economic Policies',
            category: 'Case Studies',
            level: 'JC',
            topics: JSON.stringify(['Fiscal Policy', 'Monetary Policy', 'Economic Growth']),
            description: 'Detailed case study examining Singapore\'s policy responses to economic challenges. Covers fiscal stimulus measures, MAS monetary policy tools, and supply-side policies for long-term growth.',
            pdfUrl: '/uploads/singapore-case-study.pdf',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }
    ];

    await db.insert(notes).values(sampleNotes);
    
    console.log('✅ Notes seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});