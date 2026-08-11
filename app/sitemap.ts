import type { MetadataRoute } from "next";
import { getProjects, getArticleSlugs } from "@/sanity/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://ashadul.design";

  // Static routes
  const staticPaths = ["", "/work", "/about", "/expertise", "/process", "/blog", "/contact"];
  const staticUrls = staticPaths.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: path === "" ? 1.0 : 0.8,
  }));

  // Dynamic projects from Sanity
  let projectUrls: MetadataRoute.Sitemap = [];
  try {
    const projects = await getProjects();
    projectUrls = (projects ?? []).map((project) => ({
      url: `${baseUrl}/work/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.error("Failed to fetch projects for sitemap:", error);
  }

  // Dynamic articles from Sanity
  let articleUrls: MetadataRoute.Sitemap = [];
  try {
    const articles = await getArticleSlugs();
    articleUrls = (articles ?? []).map((article) => ({
      url: `${baseUrl}/blog/${article.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));
  } catch (error) {
    console.error("Failed to fetch article slugs for sitemap:", error);
  }

  return [...staticUrls, ...projectUrls, ...articleUrls];
}
