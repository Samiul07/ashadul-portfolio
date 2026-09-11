import type { Metadata } from "next";

export const SITE_URL = new URL("https://www.ashadul.design");
export const SITE_ORIGIN = SITE_URL.origin;

export const SOCIAL_TITLE =
  "Ashadul | Design, Vibe Code & Deploy Products \u{1F525}";
export const SOCIAL_DESCRIPTION =
  "Looking for your next senior product builder? I bring 12+ years of UI/UX experience to design, vibe code, and successfully deploy your next big idea.";

const SOCIAL_IMAGE = {
  url: new URL("/opengraph-image.jpg", SITE_URL),
  secureUrl: new URL("/opengraph-image.jpg", SITE_URL),
  type: "image/jpeg",
  width: 1024,
  height: 537,
  alt: "Ashadul Islam — products that ship",
};

/**
 * Keeps one intentional social card for evergreen pages while each URL gets
 * its own canonical and Open Graph URL.
 */
export function sharedSocialMetadata(path: string): Metadata {
  const url = new URL(path, SITE_URL);

  return {
    alternates: {
      canonical: path === "/" ? SITE_ORIGIN : url,
    },
    openGraph: {
      title: SOCIAL_TITLE,
      description: SOCIAL_DESCRIPTION,
      url,
      siteName: "Ashadul Islam Portfolio",
      locale: "en_US",
      type: "website",
      images: [SOCIAL_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: SOCIAL_TITLE,
      description: SOCIAL_DESCRIPTION,
      images: [SOCIAL_IMAGE],
    },
  };
}
