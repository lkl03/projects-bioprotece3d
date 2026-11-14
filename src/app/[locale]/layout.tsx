import type { Metadata, Viewport } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/next';
import { routing } from '@/i18n/routing';
import '@/app/globals.css';
import Header from '../components/site/Header';
import WhatsAppFloating from '../components/site/WhatsappFloating';
import JsonLd from '../components/site/JsonLd';
import { DEFAULT_LOCALE, LOCALES, OG_LOCALE, SITE_NAME, SITE_URL, localeUrl } from '@/app/lib/site';

const inter = Inter({ subsets: ['latin'], variable: '--font-display' });
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-body' });

const BRAND_BLUE = '#001862';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: BRAND_BLUE },
    { media: '(prefers-color-scheme: dark)', color: BRAND_BLUE }
  ]
};

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  const url = localeUrl(locale);

  return {
    metadataBase: new URL(SITE_URL),
    title: t('title'),
    description: t('description'),
    applicationName: SITE_NAME,
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(LOCALES.map((l) => [l, localeUrl(l)])),
        'x-default': localeUrl(DEFAULT_LOCALE)
      }
    },
    openGraph: {
      type: 'website',
      url,
      siteName: SITE_NAME,
      title: t('title'),
      description: t('description'),
      locale: OG_LOCALE[locale],
      alternateLocale: LOCALES.filter((l) => l !== locale).map((l) => OG_LOCALE[l]),
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: t('ogAlt') }]
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: ['/og-image.jpg']
    },
    robots: { index: true, follow: true },
    verification: {
      google: 'vMsfAe_F9T09gCC1PeDupFwIPo_s94G-1-pM3TLmawY',
      other: { 'msvalidate.01': 'CA775D9BF5B3992D54F4DC95A89DD303' }
    }
  };
}

export default async function LocaleLayout(
  { children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }
) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smooth">
      <body className={`${inter.variable} ${montserrat.variable} font-body antialiased`}>
        {/* Google Tag Manager: afterInteractive (lo recomendado por Next) para que
            no compita con el primer render; la verificación de Search Console
            va por la metaetiqueta de generateMetadata. */}
        <Script id="gtm-init" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-WPMKJ4W8');
          `}
        </Script>

        {/* Google Tag Manager (noscript) - justo abajo de <body> */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WPMKJ4W8"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        {/* Google Ads tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17904799790"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17904799790');
          `}
        </Script>

        <JsonLd locale={locale} />

        <NextIntlClientProvider messages={messages}>
          <Header />
          {children}
          <WhatsAppFloating />
        </NextIntlClientProvider>

        <Analytics />
      </body>
    </html>
  );
}




