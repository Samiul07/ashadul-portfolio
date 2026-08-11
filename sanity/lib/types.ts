import type { PortableTextBlock } from "@portabletext/react";

export type SanityThumbnail = {
  alt: string;
  url: string;
} | null;

export type SanityProject = {
  category: string;
  figmaUrl: string | null;
  slug: string;
  thumbnail: SanityThumbnail;
  title: string;
};

export type SanityArticle = {
  body: PortableTextBlock[];
  category: string | null;
  excerpt: string | null;
  heroAlt: string | null;
  publishedAt: string;
  slug: string;
  takeaways: string[] | null;
  thumbnail: SanityThumbnail;
  title: string;
};

export type SanityTestimonial = {
  avatar: SanityThumbnail;
  name: string;
  quote: string;
  role: string;
};
