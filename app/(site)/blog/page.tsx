import type { Metadata } from "next";
import BlogHeroSection from "@/components/blog/blog-hero-section";
import BlogPostsSection from "@/components/blog/blog-posts-section";
import ContactFooterSection from "@/components/sections/contact-footer-section";
import { sanityArticleToNote } from "@/sanity/lib/content";
import { getArticles } from "@/sanity/lib/data";

export const metadata: Metadata = {
  title: "Digital Thinking | Ashadul Islam",
  description:
    "Field notes on product design, conversion thinking, AI-assisted workflows, collaboration, and digital craft by Ashadul Islam.",
};

export default async function BlogPage() {
  const articles = await getArticles();

  return (
    <>
      <BlogHeroSection />
      <BlogPostsSection notes={articles.map(sanityArticleToNote)} />
      <ContactFooterSection workHref="/portfolio" />
    </>
  );
}
