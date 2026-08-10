const resendEndpoint = "https://api.resend.com/emails";
const defaultRecipient = "ashadulislamsamiul@gmail.com";

type ContactPayload = {
  company?: string;
  email?: string;
  message?: string;
  name?: string;
};

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
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
  const fromEmail = process.env.CONTACT_FROM_EMAIL;
  const toEmail = process.env.CONTACT_TO_EMAIL || defaultRecipient;

  if (!apiKey || !fromEmail) {
    return Response.json(
      { error: "Email delivery is not configured yet." },
      { status: 503 },
    );
  }

  const resendResponse = await fetch(resendEndpoint, {
    body: JSON.stringify({
      from: `Ashadul Portfolio <${fromEmail}>`,
      reply_to: email,
      subject: `Portfolio message from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Company: ${company}`,
        "",
        "Message:",
        message,
      ].join("\n"),
      to: [toEmail],
    }),
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  if (!resendResponse.ok) {
    return Response.json(
      { error: "The message could not be sent. Please try again." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
