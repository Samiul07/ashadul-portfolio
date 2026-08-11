import { Resend } from "resend";

const defaultRecipient = "ashadulislamsamiul@gmail.com";
const defaultFromEmail = "form@ashadul.design";

const ALLOWED_ORIGINS = new Set([
  "https://ashadul.design",
  "https://www.ashadul.design",
]);

// In-memory IP rate limiter: max 3 submissions per IP per rolling hour.
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX = 3;
const rateLimitStore = new Map<string, number[]>();

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]!.trim();
  }
  return request.headers.get("x-real-ip") ?? "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (rateLimitStore.get(ip) ?? []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS,
  );

  if (timestamps.length >= RATE_LIMIT_MAX) {
    rateLimitStore.set(ip, timestamps);
    return true;
  }

  timestamps.push(now);
  rateLimitStore.set(ip, timestamps);
  return false;
}

type ContactPayload = {
  bot_field?: string;
  company?: string;
  email?: string;
  message?: string;
  name?: string;
};

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const isAllowedOrigin =
    !origin ||
    origin.startsWith("http://localhost:") ||
    origin.startsWith("http://127.0.0.1:") ||
    ALLOWED_ORIGINS.has(origin);

  if (!isAllowedOrigin) {
    return Response.json({ error: "Forbidden." }, { status: 403 });
  }

  const clientIp = getClientIp(request);
  if (isRateLimited(clientIp)) {
    return Response.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: bots that fill the hidden field are silently dropped.
  if (payload.bot_field?.trim()) {
    return Response.json({ ok: true });
  }

  const name = payload.name?.trim() ?? "";
  const email = payload.email?.trim() ?? "";
  const company = payload.company?.trim() || "Not provided";
  const message = payload.message?.trim() ?? "";

  if (
    name.length < 2 ||
    name.length > 120 ||
    !isEmail(email) ||
    email.length > 254 ||
    message.length < 2 ||
    message.length > 5000 ||
    company.length > 160
  ) {
    return Response.json(
      { error: "Please check the form details and try again." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.CONTACT_FROM_EMAIL ?? defaultFromEmail;
  const toEmail = process.env.CONTACT_TO_EMAIL ?? defaultRecipient;

  if (!apiKey) {
    return Response.json(
      { error: "Email delivery is not configured yet." },
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: `Ashadul Portfolio <${fromEmail}>`,
    replyTo: email,
    subject: `New Inquiry from ${name} - ${company}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      `Company: ${company}`,
      "",
      "Message:",
      message,
    ].join("\n"),
    to: [toEmail],
  });

  if (error) {
    return Response.json(
      { error: "The message could not be sent. Please try again." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
