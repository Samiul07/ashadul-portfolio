import { sanityClient } from "./client";
import {
  articleBySlugQuery,
  articleSlugsQuery,
  articlesQuery,
  projectsQuery,
  recentArticlesQuery,
  testimonialsQuery,
} from "./queries";
import type { SanityArticle, SanityProject, SanityTestimonial } from "./types";

const queryOptions = { next: { revalidate: 60 } } as const;

export function getProjects() {
  return sanityClient.fetch<SanityProject[]>(projectsQuery, {}, queryOptions);
}

export function getArticles() {
  return sanityClient.fetch<SanityArticle[]>(articlesQuery, {}, queryOptions);
}

export function getRecentArticles(limit: number) {
  return sanityClient.fetch<SanityArticle[]>(
    recentArticlesQuery,
    { limit },
    queryOptions,
  );
}

export function getArticleBySlug(slug: string) {
  return sanityClient.fetch<SanityArticle | null>(
    articleBySlugQuery,
    { slug },
    queryOptions,
  );
}

export function getArticleSlugs() {
  return sanityClient.fetch<{ slug: string }[]>(
    articleSlugsQuery,
    {},
    queryOptions,
  );
}

export function getTestimonials() {
  return sanityClient.fetch<SanityTestimonial[]>(testimonialsQuery, {}, queryOptions);
}
