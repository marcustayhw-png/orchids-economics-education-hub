import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://econstack.sg' // Assuming this is the domain, otherwise use process.env.NEXT_PUBLIC_SITE_URL

  const routes = [
    '',
    '/about',
    '/notes',
    '/essays',
    '/essays/csq',
    '/flashcards',
    '/tuition',
    '/econ-news',
    '/mark-my-work',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  return routes
}
