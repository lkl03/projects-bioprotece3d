'use client';

import { useEffect, useMemo, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Button } from '../ui/button';
import { getSectionIds, hash, type Locale } from '@/app/lib/sections';

export default function Hero() {
  const t = useTranslations('Hero');
  const locale = useLocale() as Locale;
  const ids = getSectionIds(locale);

  // ✅ Kickers rotativos (array desde messages)
  const kickers = useMemo(() => {
    const raw = t.raw('kickers');
    const list = Array.isArray(raw) ? (raw as string[]) : [];
    return list.length ? list : [t('kicker')];
  }, [t]);

  const [kickerIndex, setKickerIndex] = useState(0);

  // Reset al cambiar locale
  useEffect(() => {
    setKickerIndex(0);
  }, [locale]);

  // Rotación cada 6s
  useEffect(() => {
    if (kickers.length <= 1) return;
    const id = window.setInterval(() => {
      setKickerIndex((i) => (i + 1) % kickers.length);
    }, 4000);

    return () => window.clearInterval(id);
  }, [kickers.length]);

  return (
    <section id={ids.home} className="relative min-h-screen w-full overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/hero-poster.jpg"
      >
        <source src="/hero.webm" type="video/webm" />
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/70" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 sm:px-6">
        <div className="mx-auto max-w-4xl text-center text-white">
          {/* ✅ Kicker con fade suave en cada cambio */}
          <p
            key={kickerIndex}
            className="text-xs sm:text-sm uppercase tracking-[0.22em] text-white/80 min-h-[1.25rem] motion-safe:animate-fade-in motion-safe:animate-duration-500"
          >
            {kickers[kickerIndex]}
          </p>

          <h1 className="mt-4 font-display text-4xl sm:text-5xl 2xl:text-6xl 3xl:text-7xl font-semibold tracking-tight">
            {t('title')}
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base sm:text-lg text-white/85">
            {t('subtitle')}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild variant="primary" href={hash(ids.about)}>
              {t('ctaMore')}
            </Button>
            <Button asChild variant="secondary" href={hash(ids.contact)}>
              {t('ctaContact')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}



