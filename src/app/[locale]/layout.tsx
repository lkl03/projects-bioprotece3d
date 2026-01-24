import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import '@/app/globals.css';
import Header from '../components/site/Header';
import WhatsAppFloating from '../components/site/WhatsappFloating';

const inter = Inter({ subsets: ['latin'], variable: '--font-display' });
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-body' });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('title'),
    description: t('description')
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
        <NextIntlClientProvider messages={messages}>
          <Header />
          {children}
          <WhatsAppFloating />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

