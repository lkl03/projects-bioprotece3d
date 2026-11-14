import { getTranslations } from 'next-intl/server';
import {
  CONTACT,
  PARENT_ORG,
  SAME_AS,
  SITE_NAME,
  SITE_URL,
  localeUrl
} from '@/app/lib/site';

type Card = { title: string; body: string };

// Datos estructurados (schema.org) de la organización, el sitio y los servicios.
// Todo el texto sale de messages/*.json, el mismo que se ve en la página.
export default async function JsonLd({ locale }: { locale: string }) {
  const meta = await getTranslations({ locale, namespace: 'Metadata' });
  const services = await getTranslations({ locale, namespace: 'Services' });

  const url = localeUrl(locale);
  const orgId = `${SITE_URL}/#organization`;
  const processCards = services.raw('processCards') as Card[];
  const needsCards = services.raw('needsCards') as Card[];
  const sectors = services.raw('sectors') as Card[];
  const clean = (s: string) => s.replace(/\s*\n\s*/g, ' ').trim();

  const graph = [
    {
      '@type': 'LocalBusiness',
      '@id': orgId,
      name: SITE_NAME,
      alternateName: 'Bioprotece 3D',
      description: meta('orgDescription'),
      url,
      logo: `${SITE_URL}/logo-color.png`,
      image: `${SITE_URL}/og-image.jpg`,
      email: CONTACT.email,
      telephone: CONTACT.phoneE164,
      address: {
        '@type': 'PostalAddress',
        streetAddress: CONTACT.streetAddress,
        addressLocality: CONTACT.locality,
        addressRegion: CONTACT.region,
        addressCountry: CONTACT.country
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: CONTACT.openingHours.days,
          opens: CONTACT.openingHours.opens,
          closes: CONTACT.openingHours.closes
        }
      ],
      areaServed: ['AR', 'Latin America'],
      knowsAbout: sectors.map((s) => s.title),
      sameAs: SAME_AS,
      parentOrganization: {
        '@type': 'Organization',
        name: PARENT_ORG.name,
        url: PARENT_ORG.url
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: services('title'),
        itemListElement: [...processCards, ...needsCards].map((c) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: c.title,
            description: clean(c.body),
            provider: { '@id': orgId }
          }
        }))
      }
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      inLanguage: ['es', 'en'],
      publisher: { '@id': orgId }
    },
    {
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: meta('title'),
      description: meta('description'),
      inLanguage: locale,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': orgId }
    }
  ];

  const json = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(
    /</g,
    '\\u003c'
  );

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
