import { revalidatePath } from "next/cache";
import { timingSafeEqual } from "node:crypto";
import type { NextRequest } from "next/server";

type SanityWebhookPayload = {
  _id?: string;
  _operation?: "create" | "update" | "delete";
  _type?: string;
  slug?: string | { current?: string } | null;
};

function isSecretValid(secret: string) {
  const expected = process.env.SANITY_REVALIDATE_SECRET;
  if (!expected || !secret) return false;

  const provided = Buffer.from(secret);
  const stored = Buffer.from(expected);

  if (provided.length !== stored.length) return false;
  return timingSafeEqual(provided, stored);
}

function extractSlug(payload: SanityWebhookPayload): string | null {
  if (typeof payload.slug === "string") return payload.slug;
  if (typeof payload.slug?.current === "string") return payload.slug.current;
  return null;
}

export async function POST(request: NextRequest) {
  const headerSecret =
    request.headers.get("x-revalidate-secret") ??
    request.headers.get("x-sanity-revalidate-secret");
  const querySecret = request.nextUrl.searchParams.get("secret");
  const secret = headerSecret ?? querySecret;

  if (!secret || !isSecretValid(secret)) {
    return Response.json({ error: "Invalid secret." }, { status: 401 });
  }

  let payload: SanityWebhookPayload;
  try {
    payload = (await request.json()) as SanityWebhookPayload;
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const documentType = payload._type;
  const slug = extractSlug(payload);

  revalidatePath("/");
  revalidatePath("/portfolio");
  revalidatePath("/blog");

  // Safety net: invalidate every matching article page (covers creates,
  // deletes, and slug changes where the incoming slug is unknown/stale).
  revalidatePath("/blog/[slug]", "page");

  if (documentType === "article" && slug) {
    revalidatePath(`/blog/${slug}`);
  }

  return Response.json({
    revalidated: true,
    now: Date.now(),
    documentType,
    slug,
  });
}
