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
  publishedAt: string;
  slug: string;
  thumbnail: SanityThumbnail;
  title: string;
};

export type SanityTestimonial = {
  avatar: SanityThumbnail;
  name: string;
  quote: string;
  role: string;
};
