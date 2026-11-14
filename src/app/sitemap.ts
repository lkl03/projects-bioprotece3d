import type { MetadataRoute } from 'next';
import { DEFAULT_LOCALE, LOCALES, localeUrl } from '@/app/lib/site';

// Una entrada por idioma, cada una con sus alternativas hreflang.
// "/" no se lista: redirige a /es y no es una URL canónica.
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = {
    ...Object.fromEntries(LOCALES.map((l) => [l, localeUrl(l)])),
    'x-default': localeUrl(DEFAULT_LOCALE)
  };

  return LOCALES.map((locale) => ({
    url: localeUrl(locale),
    lastModified: new Date('2026-11-14'),
    changeFrequency: 'monthly',
    priority: locale === DEFAULT_LOCALE ? 1 : 0.8,
    alternates: { languages }
  }));
}
