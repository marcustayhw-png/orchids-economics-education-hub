import { MetadataRoute } from 'next';
import { db } from '@/db';
import { essays, csqs } from '@/db/schema';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://econstack.com';

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/notes`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/essays`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/essays/csq`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/flashcards`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/econ-news`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tuition`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  try {
    // Fetch essays and CSQs for dynamic routes
    const [essayResults, csqResults] = await Promise.all([
      db.select({ 
        essayId: essays.essayId, 
        updatedAt: essays.updatedAt 
      }).from(essays).catch(err => {
        console.error('Sitemap: Failed to fetch essays', err);
        return [];
      }),
      db.select({ 
        csqId: csqs.csqId, 
        updatedAt: csqs.updatedAt 
      }).from(csqs).catch(err => {
        console.error('Sitemap: Failed to fetch CSQs', err);
        return [];
      })
    ]);

    const essayRoutes: MetadataRoute.Sitemap = (essayResults || []).map((essay) => ({
      url: `${baseUrl}/essays/${essay.essayId}`,
      lastModified: essay.updatedAt ? new Date(essay.updatedAt) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

    const csqRoutes: MetadataRoute.Sitemap = (csqResults || []).map((csq) => ({
      url: `${baseUrl}/essays/csq/${csq.csqId}`,
      lastModified: csq.updatedAt ? new Date(csq.updatedAt) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

    return [...staticRoutes, ...essayRoutes, ...csqRoutes];
  } catch (error) {
    console.error('Error generating dynamic sitemap routes:', error);
    return staticRoutes;
  }
}
