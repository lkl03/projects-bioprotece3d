'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { cn } from '@/app/lib/cn';
import { getSectionIds, type Locale } from '@/app/lib/sections';
import { Button } from '../ui/button';

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.32V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.35-1.85 3.58 0 4.24 2.36 4.24 5.43v6.31zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 2A3.75 3.75 0 0 0 4 7.75v8.5A3.75 3.75 0 0 0 7.75 20h8.5A3.75 3.75 0 0 0 20 16.25v-8.5A3.75 3.75 0 0 0 16.25 4h-8.5Zm4.25 3.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Zm0 2a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM17.6 6.8a.8.8 0 1 1 0 1.6.8.8 0 0 1 0-1.6Z" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M12.05 2.02A9.94 9.94 0 0 0 2.1 11.97c0 1.76.46 3.48 1.34 5L2 22l5.2-1.36a9.98 9.98 0 0 0 4.85 1.25h.01A9.94 9.94 0 0 0 22 11.97 9.95 9.95 0 0 0 12.05 2.02Zm0 18.08h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.08.8.82-3.0-.2-.32a8.16 8.16 0 1 1 6.95 3.85Zm4.77-6.14c-.26-.13-1.52-.75-1.76-.84-.23-.09-.4-.13-.57.13-.17.26-.65.84-.8 1.01-.15.17-.29.2-.55.07-.26-.13-1.08-.4-2.06-1.28-.76-.68-1.27-1.52-1.42-1.78-.15-.26-.02-.4.11-.53.12-.12.26-.29.39-.44.13-.15.17-.26.26-.44.09-.17.04-.33-.02-.46-.07-.13-.57-1.37-.78-1.88-.2-.48-.4-.41-.57-.42h-.48c-.17 0-.46.07-.7.33-.24.26-.91.89-.91 2.17 0 1.28.93 2.52 1.06 2.69.13.17 1.83 2.8 4.43 3.92.62.27 1.11.43 1.49.55.63.2 1.2.17 1.65.1.5-.07 1.52-.62 1.74-1.22.22-.6.22-1.11.15-1.22-.07-.11-.24-.17-.5-.3Z" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4.2-8 5.1-8-5.1V6l8 5.1L20 6v2.2Z" />
    </svg>
  );
}

type SendState = 'idle' | 'loading' | 'success' | 'error';

export default function Contact() {
  const t = useTranslations('Contact');
  const locale = useLocale() as Locale;
  const ids = getSectionIds(locale);

  // ✅ fade-in on scroll (1 vez)
  const [entered, setEntered] = useState(false);
  const enterRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = enterRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEntered(true);
          obs.disconnect();
        }
      },
      { threshold: 0.18 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const instagramHref = 'https://www.instagram.com/bioprotece3d/';
  const linkedinHref = 'https://www.linkedin.com/showcase/bioprotece-3d/';

  const whatsappHref =
    'https://wa.me/5491133647947?text=Hola!%20Vengo%20de%20la%20web%20de%20Bioprotece.%20Estoy%20interesado%20en...';

  const emailValue = 'impresion3d@bioprotece.com';
  const emailHref = `mailto:${emailValue}`;

  const mapsSrc =
    'https://www.google.com/maps?output=embed&q=Bioprotece%20SA%20Vicente%20L%C3%B3pez%204334%20Villa%20Ballester%20Buenos%20Aires&z=15';

  const inputBase = cn(
    'w-full rounded-xl border bg-white px-4 py-3 text-sm',
    'border-black/10 text-ink placeholder:text-ink-muted/60',
    'focus:outline-none focus:ring-1 focus:ring-brand-sky/35 focus:border-brand-sky/35'
  );

  const [sendState, setSendState] = useState<SendState>('idle');
  const [sendMsg, setSendMsg] = useState<string>('');
  const formRef = useRef<HTMLFormElement | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sendState === 'loading') return;

    setSendState('loading');
    setSendMsg('');

    const fd = new FormData(e.currentTarget);

    const payload = {
      name: String(fd.get('name') ?? '').trim(),
      email: String(fd.get('email') ?? '').trim(),
      whatsapp: String(fd.get('whatsapp') ?? '').trim(),
      preferred: (String(fd.get('preferred') ?? 'email') === 'whatsapp' ? 'whatsapp' : 'email') as
        | 'email'
        | 'whatsapp',
      message: String(fd.get('message') ?? '').trim(),
      // honeypot (input oculto)
      company: String(fd.get('company') ?? '').trim()
    };

    // validación mínima
    if (!payload.name || !payload.email || !payload.message) {
      setSendState('error');
      setSendMsg(
        (t as any).has?.('sendMissing')
          ? t('sendMissing')
          : locale === 'es'
            ? 'Completá nombre, correo y mensaje.'
            : 'Please fill name, email and message.'
      );
      return;
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };

      if (!res.ok || !json.ok) {
        setSendState('error');
        setSendMsg(
          (t as any).has?.('sendError')
            ? t('sendError')
            : locale === 'es'
              ? 'No pudimos enviar tu consulta. Probá de nuevo en unos minutos.'
              : "We couldn't send your message. Please try again in a few minutes."
        );
        return;
      }

      setSendState('success');
      setSendMsg(
        (t as any).has?.('sendSuccess')
          ? t('sendSuccess')
          : locale === 'es'
            ? '¡Listo! Recibimos tu consulta y te vamos a responder a la brevedad.'
            : "Done! We received your message and we'll get back to you shortly."
      );

      formRef.current?.reset();
    } catch {
      setSendState('error');
      setSendMsg(
        (t as any).has?.('sendError')
          ? t('sendError')
          : locale === 'es'
            ? 'No pudimos enviar tu consulta. Probá de nuevo en unos minutos.'
            : "We couldn't send your message. Please try again in a few minutes."
      );
    }
  }

  return (
    <section id={ids.contact} className="bg-surface-muted">
      <div
        ref={enterRef}
        className={cn(
          entered
            ? 'opacity-100 motion-safe:animate-fade-in motion-safe:animate-duration-700'
            : 'opacity-0'
        )}
      >
        <div className="mx-auto w-full max-w-screen-2xl 3xl:max-w-[1760px] px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
          {/* Intro */}
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs uppercase tracking-[0.22em] text-brand-blue/80">
              {t('kicker')}
            </p>

            <h2 className="mt-4 font-display text-3xl sm:text-4xl font-semibold tracking-tight text-brand-navy">
              {t('title')}
            </h2>

            <p className="mt-5 text-ink-muted leading-relaxed whitespace-pre-line">
              {t('subtitle')}
            </p>
          </div>

          {/* Layout */}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-start">
            {/* Form */}
            <div className="rounded-2xl border border-black/5 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
              <div className="p-6 sm:p-8 text-center sm:text-left">
                <h3 className="font-display text-2xl sm:text-3xl font-semibold text-brand-navy">
                  {t('formTitle')}
                </h3>
                <p className="mt-2 text-sm text-ink-muted">
                  {t('formHint')}
                </p>

                <form ref={formRef} onSubmit={onSubmit} className="mt-6 space-y-5 text-left">
                  {/* honeypot hidden */}
                  <input
                    type="text"
                    name="company"
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden"
                    aria-hidden="true"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label className="space-y-2 text-left">
                      <span className="text-sm font-medium text-brand-navy">
                        {t('name')} <span className="text-brand-blue">*</span>
                      </span>
                      <input
                        type="text"
                        name="name"
                        placeholder={t('namePlaceholder')}
                        className={inputBase}
                        disabled={sendState === 'loading'}
                      />
                    </label>

                    <label className="space-y-2 text-left">
                      <span className="text-sm font-medium text-brand-navy">
                        {t('email')} <span className="text-brand-blue">*</span>
                      </span>
                      <input
                        type="email"
                        name="email"
                        placeholder={t('emailPlaceholder')}
                        className={inputBase}
                        disabled={sendState === 'loading'}
                      />
                    </label>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
                    <label className="space-y-2 text-left">
                      <span className="text-sm font-medium text-brand-navy">
                        {t('whatsapp')}
                      </span>
                      <input
                        type="tel"
                        name="whatsapp"
                        placeholder={t('whatsappPlaceholder')}
                        className={inputBase}
                        disabled={sendState === 'loading'}
                      />
                    </label>

                    <fieldset className="space-y-2 text-left">
                      <legend className="text-sm font-medium text-brand-navy">
                        {t('preferred')}
                      </legend>

                      <div className="flex flex-wrap gap-3">
                        <label className="inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-sm text-ink-muted bg-white cursor-pointer">
                          <input
                            type="radio"
                            name="preferred"
                            value="email"
                            defaultChecked
                            className="accent-brand-blue"
                            disabled={sendState === 'loading'}
                          />
                          {t('preferredEmail')}
                        </label>

                        <label className="inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-sm text-ink-muted bg-white cursor-pointer">
                          <input
                            type="radio"
                            name="preferred"
                            value="whatsapp"
                            className="accent-brand-blue"
                            disabled={sendState === 'loading'}
                          />
                          {t('preferredWhatsapp')}
                        </label>
                      </div>
                    </fieldset>
                  </div>

                  <label className="space-y-2 text-left">
                    <span className="text-sm font-medium text-brand-navy">
                      {t('message')} <span className="text-brand-blue">*</span>
                    </span>
                    <textarea
                      name="message"
                      rows={7}
                      placeholder={t('messagePlaceholder')}
                      className={cn(inputBase, 'resize-none')}
                      disabled={sendState === 'loading'}
                    />
                  </label>

                  <div className="pt-1">
                    <div className="flex justify-center sm:justify-start">
                      <Button
                        type="submit"
                        context="light"
                        variant="primary"
                        className={cn('cursor-pointer', sendState === 'loading' ? 'opacity-90' : '')}
                        disabled={sendState === 'loading'}
                      >
                        {sendState === 'loading'
                          ? ((t as any).has?.('sending')
                              ? t('sending')
                              : locale === 'es'
                                ? 'Enviando...'
                                : 'Sending...')
                          : t('submit')}
                      </Button>
                    </div>

                    {/* feedback */}
                    {sendMsg ? (
                      <p
                        className={cn(
                          'mt-4 text-xs',
                          sendState === 'success' ? 'text-emerald-700' : 'text-rose-700',
                          'text-center sm:text-left'
                        )}
                      >
                        {sendMsg}
                      </p>
                    ) : (
                      <p className="mt-4 text-xs text-ink-muted text-center sm:text-left">
                        {t('privacyNote')}
                      </p>
                    )}
                  </div>
                </form>
              </div>
            </div>

            {/* Info + Map */}
            <div className="rounded-2xl border border-black/5 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)] overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Left info */}
                <div className="p-6 sm:p-8 text-center md:text-left">
                  <h3 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-brand-navy">
                    {t('visitTitle')}
                  </h3>

                  <p className="mt-4 text-sm text-balance text-ink-muted leading-relaxed whitespace-pre-line">
                    {t('visitBody')}
                  </p>

                  <div className="mt-7 space-y-5">
                    <div>
                      <p className="text-sm font-semibold text-brand-navy">
                        {t('addressLabel')}
                      </p>
                      <p className="mt-1 text-sm text-ink-muted">
                        {t('addressValue')}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-brand-navy">
                        {t('hoursLabel')}
                      </p>
                      <p className="mt-1 text-sm text-ink-muted">
                        {t('hoursValue')}
                      </p>
                    </div>

                    {/* CTAs full width */}
                    <div className="flex flex-col gap-3 pt-1">
                      <Button
                        asChild
                        context="light"
                        variant="primary"
                        href={whatsappHref}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full cursor-pointer"
                      >
                        <>
                          <WhatsAppIcon className="h-5 w-5" />
                          <span className="text-center">{t('ctaWhatsapp')}</span>
                        </>
                      </Button>

                      <Button
                        asChild
                        context="light"
                        variant="secondary"
                        href={emailHref}
                        className="w-full cursor-pointer"
                      >
                        <>
                          <MailIcon className="h-5 w-5" />
                          <span className="text-center">{t('ctaEmail')}</span>
                        </>
                      </Button>
                    </div>

                    {/* Social: mismo ancho que CTAs */}
                    <div className="flex flex-col sm:flex-row gap-3 items-center justify-center md:justify-start">
                      <Button
                        asChild
                        context="light"
                        variant="secondary"
                        href={linkedinHref}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full sm:w-1/2 cursor-pointer justify-center"
                      >
                        <>
                          <LinkedInIcon className="h-5 w-5" />
                          <span className="text-center">LinkedIn</span>
                        </>
                      </Button>

                      <Button
                        asChild
                        context="light"
                        variant="secondary"
                        href={instagramHref}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full sm:w-1/2 cursor-pointer justify-center"
                      >
                        <>
                          <InstagramIcon className="h-5 w-5" />
                          <span className="text-center">Instagram</span>
                        </>
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Map */}
                <div className="relative min-h-[320px] md:min-h-[520px] bg-black/5">
                  <iframe
                    title="Google Maps - Bioprotece SA"
                    src={mapsSrc}
                    className="absolute inset-0 h-full w-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


