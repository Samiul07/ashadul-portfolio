import type { MetadataRoute } from "next";
import { SITE_ORIGIN } from "@/lib/social-metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_ORIGIN;

  // Static routes
  const staticPaths = ["", "/portfolio", "/blog", "/contact"];
  const staticUrls = staticPaths.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: path === "" ? 1.0 : 0.8,
  }));

  return staticUrls;
}

