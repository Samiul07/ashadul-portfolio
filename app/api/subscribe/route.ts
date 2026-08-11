import { Resend } from "resend";

const defaultRecipient = "ashadulislamsamiul@gmail.com";
const defaultFromEmail = "form@ashadul.design";

type SubscribePayload = {
  email?: string;
};

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let payload: SubscribePayload;

  try {
    payload = (await request.json()) as SubscribePayload;
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const email = payload.email?.trim() ?? "";

  if (!isEmail(email) || email.length > 254) {
    return Response.json(
      { error: "Please enter a valid email address." },
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
    subject: "New Newsletter Subscriber 🚀",
    text: `New subscriber email: ${email}`,
    to: [toEmail],
  });

  if (error) {
    return Response.json(
      { error: "Could not subscribe at this moment. Please try again." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
