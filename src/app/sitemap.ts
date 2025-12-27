import { MetadataRoute } from 'next';
import { db } from '@/db';
import { essays, csqs, notes, econNews } from '@/db/schema';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://econstack.com';

  let allEssays: any[] = [];
  let allCsqs: any[] = [];

  try {
    [allEssays, allCsqs] = await Promise.all([
      db.select({ essayId: essays.essayId, updatedAt: essays.updatedAt }).from(essays),
      db.select({ csqId: csqs.csqId, updatedAt: csqs.updatedAt }).from(csqs),
    ]);
  } catch (error) {
    console.error('Error fetching data for sitemap:', error);
    // Continue with empty arrays if DB fetch fails during build
  }

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

  const essayRoutes: MetadataRoute.Sitemap = allEssays.map((essay) => ({
    url: `${baseUrl}/essays/${essay.essayId}`,
    lastModified: new Date(essay.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const csqRoutes: MetadataRoute.Sitemap = allCsqs.map((csq) => ({
    url: `${baseUrl}/essays/csq/${csq.csqId}`,
    lastModified: new Date(csq.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...essayRoutes, ...csqRoutes];
}
