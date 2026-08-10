import { toPlainText } from "@portabletext/react";
import type { FieldNote } from "@/lib/notes";
import type { Note } from "@/components/sections/notes-section";
import type { SanityArticle } from "./types";

const fallbackImage = "/images/note-ai-judgment.png";

function formatPublishedDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

export function sanityArticleToFieldNote(article: SanityArticle): FieldNote {
  const plainText = toPlainText(article.body ?? []).trim();
  const words = plainText ? plainText.split(/\s+/).length : 0;

  return {
    body: [],
    category: "Article",
    date: formatPublishedDate(article.publishedAt),
    dateISO: article.publishedAt,
    excerpt:
      plainText.length > 180 ? `${plainText.slice(0, 177).trim()}...` : plainText,
    heroAlt: article.thumbnail?.alt || article.title,
    image: article.thumbnail?.url || fallbackImage,
    readTime: `${Math.max(1, Math.ceil(words / 220))} min read`,
    slug: article.slug,
    title: article.title,
    views: "",
    wordCount: words,
  };
}

export function sanityArticleToNote(article: SanityArticle): Note {
  return {
    category: "Article",
    date: formatPublishedDate(article.publishedAt),
    href: `/blog/${article.slug}`,
    image: article.thumbnail?.url || fallbackImage,
    title: article.title,
  };
}
