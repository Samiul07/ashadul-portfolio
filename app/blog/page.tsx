import type { Metadata } from "next";
import BlogHeroSection from "@/components/blog/blog-hero-section";
import BlogPostsSection from "@/components/blog/blog-posts-section";
import ContactFooterSection from "@/components/sections/contact-footer-section";

export const metadata: Metadata = {
  title: "Digital Thinking | Ashadul Islam",
  description:
    "Field notes on product design, conversion thinking, AI-assisted workflows, collaboration, and digital craft by Ashadul Islam.",
};

export default function BlogPage() {
  return (
    <>
      <BlogHeroSection />
      <BlogPostsSection />
      <ContactFooterSection workHref="/portfolio" />
    </>
  );
}
