import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/app/lib/site';

// Todo el sitio es público, incluidos los crawlers de IA (GPTBot, ClaudeBot,
// PerplexityBot, Google-Extended). Solo se excluye la API del formulario.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: '/api/' }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL
  };
}
