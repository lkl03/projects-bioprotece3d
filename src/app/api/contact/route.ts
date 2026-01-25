// src/app/api/contact/route.ts
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

type Payload = {
  name: string;
  email: string;
  whatsapp?: string;
  preferred?: 'email' | 'whatsapp';
  message: string;
  // honeypot
  company?: string;
};

function isEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

function clamp(s: string, max: number) {
  return (s ?? '').toString().trim().slice(0, max);
}

function escapeHtml(s: string) {
  return s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export async function POST(req: Request) {
  try {
    const data = (await req.json()) as Payload;

    // Honeypot anti-spam (si viene lleno, cortamos sin hacer nada)
    if (data.company && data.company.trim().length > 0) {
      return Response.json({ ok: true }, { status: 200 });
    }

    const name = clamp(data.name, 120);
    const email = clamp(data.email, 160);
    const whatsapp = clamp(data.whatsapp ?? '', 60);
    const preferred = data.preferred === 'whatsapp' ? 'whatsapp' : 'email';
    const message = clamp(data.message, 6000);

    if (!name || !email || !message) {
      return Response.json(
        { ok: false, error: 'missing_fields' },
        { status: 400 }
      );
    }

    if (!isEmail(email)) {
      return Response.json(
        { ok: false, error: 'invalid_email' },
        { status: 400 }
      );
    }

    const SMTP_HOST = process.env.SMTP_HOST!;
    const SMTP_PORT = Number(process.env.SMTP_PORT || '587');
    const SMTP_USER = process.env.SMTP_USER!;
    const SMTP_PASS = process.env.SMTP_PASS!;
    const MAIL_TO = process.env.MAIL_TO || 'impresion3d@bioprotece.com';
    const MAIL_FROM = process.env.MAIL_FROM || SMTP_USER;

    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
      return Response.json(
        { ok: false, error: 'server_not_configured' },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465, // 465 = true, 587 = false (STARTTLS)
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS
      }
    });

    const safeHtml = `
      <div style="font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Arial;line-height:1.45">
        <h2 style="margin:0 0 12px">Nueva consulta desde la web</h2>
        <p style="margin:0 0 8px"><strong>Nombre:</strong> ${escapeHtml(name)}</p>
        <p style="margin:0 0 8px"><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p style="margin:0 0 8px"><strong>WhatsApp:</strong> ${escapeHtml(whatsapp || '-')}</p>
        <p style="margin:0 0 12px"><strong>Preferencia:</strong> ${escapeHtml(preferred)}</p>
        <div style="margin-top:14px;padding:12px;border:1px solid #e5e7eb;border-radius:12px;background:#f9fafb">
          <div style="white-space:pre-line">${escapeHtml(message)}</div>
        </div>
      </div>
    `;

    const subject = `Consulta Web — ${name}`;

    await transporter.sendMail({
      from: MAIL_FROM,
      to: MAIL_TO,
      replyTo: email,
      subject,
      text: [
        `Nueva consulta desde la web`,
        ``,
        `Nombre: ${name}`,
        `Email: ${email}`,
        `WhatsApp: ${whatsapp || '-'}`,
        `Preferencia: ${preferred}`,
        ``,
        `Mensaje:`,
        message
      ].join('\n'),
      html: safeHtml
    });

    return Response.json({ ok: true }, { status: 200 });
  } catch (err) {
    // No filtremos detalle de SMTP al cliente
    return Response.json({ ok: false, error: 'server_error' }, { status: 500 });
  }
}
