import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HeroGradient from "@/components/background/desktop-hero-gradient";
import BlogArticleSection from "@/components/blog/blog-article-section";
import CalloutNotesSection from "@/components/sections/callout-notes-section";
import ContactFooterSection from "@/components/sections/contact-footer-section";
import { getAllNotes, getRelatedNotes, getNoteBySlug } from "@/lib/notes";
import { sanityArticleToFieldNote } from "@/sanity/lib/content";
import {
  getArticleBySlug,
  getArticleSlugs,
  getArticles,
  getTestimonials,
} from "@/sanity/lib/data";

type BlogArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const sanitySlugs = await getArticleSlugs();
  const slugs = new Set([
    ...getAllNotes().map((note) => note.slug),
    ...sanitySlugs.map((article) => article.slug),
  ]);

  return Array.from(slugs, (slug) => ({ slug }));
}

const siteUrl = "https://www.ashadul.design";

export async function generateMetadata({
  params,
}: BlogArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const sanityArticle = await getArticleBySlug(slug);
  const note = sanityArticle
    ? sanityArticleToFieldNote(sanityArticle)
    : getNoteBySlug(slug);

  if (!note) {
    return { title: "Note not found | Ashadul Islam" };
  }

  const canonicalUrl = `${siteUrl}/blog/${note.slug}`;
  const imageUrl = note.image.startsWith("http")
    ? note.image
    : `${siteUrl}${note.image}`;

  return {
    title: `${note.title} | Ashadul Islam — Lead Product Designer`,
    description: note.excerpt,
    keywords: note.tags || [note.category, "Product Design", "UX Design", "SaaS Design"],
    authors: [{ name: "Ashadul Islam", url: `${siteUrl}/#about` }],
    publisher: "Ashadul Islam",
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: note.title,
      description: note.excerpt,
      url: canonicalUrl,
      siteName: "Ashadul Islam Portfolio",
      locale: "en_US",
      type: "article",
      publishedTime: note.dateISO,
      modifiedTime: note.dateModifiedISO || note.dateISO,
      authors: ["Ashadul Islam"],
      tags: note.tags || [note.category],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: note.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: note.title,
      description: note.excerpt,
      creator: "@ashadul_ux",
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function BlogArticlePage({ params }: BlogArticlePageProps) {
  const { slug } = await params;
  const sanityArticle = await getArticleBySlug(slug);
  const note = sanityArticle
    ? sanityArticleToFieldNote(sanityArticle)
    : getNoteBySlug(slug);

  if (!note) notFound();

  const sanityArticles = sanityArticle ? await getArticles() : [];
  const testimonials = await getTestimonials();
  const moreNotes = sanityArticle
    ? sanityArticles
        .filter((article) => article.slug !== slug)
        .slice(0, 3)
        .map(sanityArticleToFieldNote)
    : getRelatedNotes(slug, 4).slice(0, 3);

  const canonicalUrl = `${siteUrl}/blog/${note.slug}`;
  const imageUrl = note.image.startsWith("http")
    ? note.image
    : `${siteUrl}${note.image}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${canonicalUrl}#article`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    headline: note.title,
    description: note.excerpt,
    image: [imageUrl],
    datePublished: note.dateISO,
    dateModified: note.dateModifiedISO || note.dateISO,
    inLanguage: "en-US",
    wordCount: note.wordCount || 1200,
    timeRequired: `PT${parseInt(note.readTime) || 7}M`,
    articleSection: note.category,
    keywords: note.tags || [note.category, "Product Design", "UX Design"],
    author: {
      "@type": "Person",
      name: "Ashadul Islam",
      jobTitle: "Lead Product Designer & Design Engineer",
      url: `${siteUrl}/#about`,
      sameAs: [
        "https://github.com/ashadul",
        "https://www.linkedin.com/in/ashadul07/",
        "https://x.com/Ashadulislamsam",
      ],
    },
    publisher: {
      "@type": "Organization",
      name: "Ashadul Design Studio",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/images/cta-profile-ashadul-wide.png`,
        width: 600,
        height: 60,
      },
    },
  };

  return (
    <div className="relative w-full overflow-x-clip bg-black">
      {/* Google SEO JSON-LD Structured Data */}
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
        type="application/ld+json"
      />

      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[1100px] overflow-hidden max-[640px]:hidden">
        <HeroGradient />
      </div>

      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 top-0 z-0 h-[1100px] overflow-hidden max-[640px]:hidden`}
      >
        <HeroGradient />
      </div>

      {/* Mobile atmosphere gradients — the hero glow sits high behind the title,
          sized to the 1100px hero band (not the homepage's oversized offsets). */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-0 overflow-hidden min-[640px]:hidden"
        style={{ height: "1100px", inset: "0 auto auto 0" }}
      >
        <div
          className="absolute top-[60px] left-1/2 h-[820px] w-[1200px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_50%_42%,rgba(255,30,0,0.40),transparent_60%)]"
        />
        <div
          className="absolute top-[140px] left-1/2 h-[680px] w-[860px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_50%_38%,rgba(255,30,0,0.22),transparent_58%)]"
        />
      </div>

      <div className="relative z-10">
        <BlogArticleSection
          moreNotes={moreNotes}
          note={note}
          portableBody={sanityArticle?.body}
        />
        <CalloutNotesSection hideTopCrosshairs testimonials={testimonials} />
        <ContactFooterSection workHref="/portfolio" />
      </div>
    </div>
  );
}
