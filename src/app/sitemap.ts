import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://econstack.sg'
  
  const routes = [
    '',
    '/about',
    '/notes',
    '/essays',
    '/flashcards',
    '/tuition',
    '/mark-my-work',
    '/econ-news',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  return routes
}
