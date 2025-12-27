import { MetadataRoute } from 'next';
import { db } from '@/db';
import { essays, csqs, notes } from '@/db/schema';

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
    // Fetch essays, CSQs and Notes sequentially to handle failures individually and avoid build crashes
    let essayResults: any[] = [];
    try {
      essayResults = await db.select({ 
        essayId: essays.essayId, 
        updatedAt: essays.updatedAt 
      }).from(essays);
    } catch (err) {
      console.error('Sitemap: Failed to fetch essays', err);
    }

    let csqResults: any[] = [];
    try {
      csqResults = await db.select({ 
        csqId: csqs.csqId, 
        updatedAt: csqs.updatedAt 
      }).from(csqs);
    } catch (err) {
      console.error('Sitemap: Failed to fetch CSQs', err);
    }

    let noteResults: any[] = [];
    try {
      noteResults = await db.select({
        id: notes.id,
        updatedAt: notes.updatedAt
      }).from(notes);
    } catch (err) {
      console.error('Sitemap: Failed to fetch notes', err);
    }

    const essayRoutes: MetadataRoute.Sitemap = (essayResults || []).map((essay: any) => ({
      url: `${baseUrl}/essays/${essay.essayId}`,
      lastModified: essay.updatedAt ? new Date(essay.updatedAt) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

    const csqRoutes: MetadataRoute.Sitemap = (csqResults || []).map((csq: any) => ({
      url: `${baseUrl}/essays/csq/${csq.csqId}`,
      lastModified: csq.updatedAt ? new Date(csq.updatedAt) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

    const noteRoutes: MetadataRoute.Sitemap = (noteResults || []).map((note: any) => ({
      url: `${baseUrl}/notes`, // Individual note pages don't exist yet, but we track the last update
      lastModified: note.updatedAt ? new Date(note.updatedAt) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

    return [...staticRoutes, ...essayRoutes, ...csqRoutes, ...noteRoutes];

  } catch (error) {
    console.error('Critical error generating dynamic sitemap routes:', error);
    return staticRoutes;
  }
}
