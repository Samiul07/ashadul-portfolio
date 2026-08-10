import { defineQuery } from "next-sanity";

const thumbnailProjection = `{
  "url": asset->url,
  "alt": coalesce(alt, ^.title)
}`;

export const projectsQuery = defineQuery(`
  *[_type == "project"] | order(_createdAt desc) {
    title,
    "slug": slug.current,
    category,
    "thumbnail": thumbnail ${thumbnailProjection},
    figmaUrl
  }
`);

export const articlesQuery = defineQuery(`
  *[_type == "article"] | order(publishedAt desc) {
    title,
    "slug": slug.current,
    publishedAt,
    "thumbnail": thumbnail ${thumbnailProjection},
    body
  }
`);

export const articleBySlugQuery = defineQuery(`
  *[_type == "article" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    publishedAt,
    "thumbnail": thumbnail ${thumbnailProjection},
    body
  }
`);

export const articleSlugsQuery = defineQuery(`
  *[_type == "article" && defined(slug.current)] {
    "slug": slug.current
  }
`);
