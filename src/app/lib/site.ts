// Datos públicos del sitio, usados por metadatos, sitemap, robots y JSON-LD.
// Todo sale del contenido que ya muestra la web (Footer, Contact, About).

export const SITE_URL = 'https://www.bioprotece3d.com';
export const SITE_NAME = 'Bioprotece3D';

export const LOCALES = ['es', 'en'] as const;
export const DEFAULT_LOCALE = 'es';

export const OG_LOCALE: Record<string, string> = {
  es: 'es_AR',
  en: 'en_US'
};

export const CONTACT = {
  email: 'impresion3d@bioprotece.com',
  phone: '+54 9 11 3364 7947',
  phoneE164: '+5491133647947',
  streetAddress: 'Vicente López 4334',
  locality: 'Villa Ballester',
  region: 'Buenos Aires',
  country: 'AR',
  openingHours: { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '07:00', closes: '16:00' }
} as const;

export const SAME_AS = [
  'https://www.instagram.com/bioprotece3d/',
  'https://www.linkedin.com/showcase/bioprotece-3d/'
];

export const PARENT_ORG = {
  name: 'Bioprotece S.A.',
  url: 'https://www.bioprotece.com.ar'
};

/** URL absoluta de la home de un idioma, p. ej. https://www.bioprotece3d.com/es */
export function localeUrl(locale: string) {
  return `${SITE_URL}/${locale}`;
}
