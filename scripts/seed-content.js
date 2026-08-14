/**
 * Seed script: replace dummy blog articles with real long-form content.
 *
 * - Reads Sanity projectId/dataset from .env.local (NEXT_PUBLIC_SANITY_*)
 * - Requires SANITY_API_TOKEN env var (a Sanity token with write access)
 * - Deletes all existing _type == "article" documents
 * - Creates 3 fully-formatted articles: markdown -> Portable Text body,
 *   Unsplash covers downloaded + uploaded as Sanity image assets
 *
 * Usage:
 *   $env:SANITY_API_TOKEN="..." ; node scripts/seed-content.js
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { createClient } from "@sanity/client";

// ---- Load .env.local so NEXT_PUBLIC_SANITY_* are available ----------------
const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = join(__dirname, "..", ".env.local");
try {
  const env = readFileSync(envPath, "utf8");
  for (const line of env.split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (match && !(match[1] in process.env)) {
      process.env[match[1]] = match[2].replace(/^["']|["']$/g, "");
    }
  }
} catch {
  console.warn("⚠  .env.local not found — relying on process env.");
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_TOKEN;

if (!projectId) {
  console.error("✖ NEXT_PUBLIC_SANITY_PROJECT_ID is missing.");
  process.exit(1);
}
if (!token) {
  console.error(
    "✖ SANITY_API_TOKEN is missing. Create a write token at " +
      "https://www.sanity.io/manage/<project>/api#tokens and pass it as " +
      "SANITY_API_TOKEN.",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2026-08-10",
  useCdn: false,
});

// ---------------------------------------------------------------------------
// Inline article data (titles, slugs, excerpts, categories, covers, takeaways)
// ---------------------------------------------------------------------------
const articles = [
  {
    title: "Vibe Coding Is Dead. Agentic Engineering Is the Designer's Superpower.",
    slug: "vibe-coding-is-dead-agentic-engineering",
    category: "AI Workflows",
    publishedAt: "2026-08-01T09:00:00Z",
    excerpt:
      "Karpathy's term died in under a year — and the replacement is closer to what designers already do. Here's how to move from prompting to orchestrating agents, with a review gate that actually ships production code.",
    cover:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1920&q=80",
    heroAlt:
      "Abstract code interface glowing on a dark screen, representing agentic engineering and AI-assisted development.",
    takeaways: [
      "Vibe coding was prompting without a bar for quality; agentic engineering replaces it with orchestration and review.",
      "AI coding tools went from a ~$5B to ~$12.8B market in two years, and 45% of generated code fails security tests unreviewed.",
      "Separate planning mode from execution mode — the double diamond, applied to agents.",
      "Your pre-merge review gate (types, auth, RLS, error states, behavior tests, a11y) is the actual product.",
      "Design critique is 80% of agent review — designers are structurally built for this shift.",
    ],
  },
  {
    title: "The Activation Gap: Why Two-Thirds of Signups Never Reach Value",
    slug: "the-activation-gap",
    category: "UX Research",
    publishedAt: "2026-08-05T09:00:00Z",
    excerpt:
      "The median SaaS activates just 37.5% of signups — and the 11x gap between verticals proves the leak is design, not market. A designer-owned audit methodology for closing it, with benchmarks and a six-metric scorecard.",
    cover:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&q=80",
    heroAlt:
      "Analytics dashboard with graphs and growth charts on a screen, representing activation metrics and funnel analysis.",
    takeaways: [
      "Median activation is 37.5% — the average SaaS loses 62% of signups before they reach value.",
      "The AI/ML (54.8%) vs FinTech (5%) activation gap proves onboarding is a design surface, not a market condition.",
      "Activation is the moment the product does its job — define it in the customer's words, then instrument it.",
      "Leaks cluster in three places: signup→first-run, first-run→activation, and activated→retained.",
      "A 25% activation lift is worth a 34% MRR lift in 12 months — use the six-metric scorecard to close it.",
    ],
  },
  {
    title: "Design-to-Production Is an API Problem: Figma MCP, Tokens, and the End of the Handoff",
    slug: "design-to-production-is-an-api-problem",
    category: "Design Systems",
    publishedAt: "2026-08-08T09:00:00Z",
    excerpt:
      "Your agent used to look at screenshots. Now it reads your design system over MCP. Here's the three-path honest comparison, the tokens-as-code pipeline that ends drift, and the judgment calls no tool can make.",
    cover:
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=1920&q=80",
    heroAlt:
      "Designer workspace with interface wireframes and code, representing the design-to-code pipeline and design systems.",
    takeaways: [
      "The agent's source of truth moved from pixels to a protocol: Figma Dev Mode MCP reads real components, variables, and Code Connect.",
      "Three real paths — plugin conversion, MCP-fed agents, skip Figma — and none ships untouched code.",
      "Design tokens as code (Tokens Studio → Style Dictionary → CI) is the pipeline that ends drift.",
      "Figma Grid generates real CSS, closing the responsive gap for machine-readable design.",
      "The judgment calls — abstraction, edge cases, error states — stay human. The craft of the system is upstream of every tool.",
    ],
  },
  {
    title: "The Solo-Stack SaaS: A Senior Designer's Reference Architecture for Shipping With AI Agents",
    slug: "the-solo-stack-saas",
    category: "Product Development",
    publishedAt: "2026-08-11T09:00:00Z",
    excerpt:
      "A one-person team can now ship a production SaaS with five boring layers and an AI engineer. Here's the reference architecture — and the security discipline that separates shipped products from incidents.",
    cover:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1920&q=80",
    heroAlt:
      "Laptop with code on a desk, representing the solo-stack SaaS architecture and AI-assisted development.",
    takeaways: [
      "The solo stack is five boring layers: AI coding agent, Supabase, n8n, Next.js on Vercel, and Stripe — one job each.",
      "Row-level security is the load-bearing wall; 45% of AI-generated code fails security tests, and access-control failures are the fastest-growing vulnerability class.",
      "The Lovable incident proved security in AI-built products has to be designed into the foundation, not patched on later.",
      "Run the weekly loop: spec on Monday, build with review gates through the week, ship and measure on Friday.",
      "The boring stack wins because the designer's judgment — not the tools — is the actual product.",
    ],
  },
  {
    title: "Your Landing Page Isn't Underperforming — You're Benchmarking It Wrong",
    slug: "your-landing-page-isnt-underperforming",
    category: "Conversion Design",
    publishedAt: "2026-08-12T09:00:00Z",
    excerpt:
      "The 6.6% average is lying to you: the median SaaS converts at 3.8%, and the real benchmark depends on your CTA type and channel. A designer-led CRO loop that segments, audits, and experiments.",
    cover:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1920&q=80",
    heroAlt:
      "Laptop showing a web page with a laptop and notebook, representing landing page conversion and analytics.",
    takeaways: [
      "The all-industry 6.6% average is wrong for SaaS — the median is 3.8%, and top-quartile is ~11.6%.",
      "Benchmark by CTA type: freemium signup 13-16%, opt-in trial 7-9%, demo request 2-5%.",
      "Respect the channel: nurtured email converts 5-20%, broad paid under 1%, and AI-search visitors convert 3-4x organic.",
      "Run the six-step CRO loop: segment, audit, rewrite the promise, one experiment, statistical discipline, re-benchmark.",
      "A healthy front door only matters if activation is healthy too — a 25% activation lift beats most landing page experiments.",
    ],
  },
  {
    title: "When AI Code Is Bad: A Design-Led Code Review Checklist for Production",
    slug: "when-ai-code-is-bad",
    category: "AI Workflows",
    publishedAt: "2026-08-13T09:00:00Z",
    excerpt:
      "45% of AI-generated code fails security tests — which means nobody can ship unreviewed output. Here's the five-check review gate that turns design critique into production safety.",
    cover:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1920&q=80",
    heroAlt:
      "Magnifying glass over a computer screen, representing code review and security inspection.",
    takeaways: [
      "45% of AI-generated code samples fail security tests; newer models are no more secure — review is the only gate.",
      "A code review is 80% the same muscle as a design review: happy path, unhappy paths, scale, and trust details.",
      "The five checks: authorization on every path, invisible data, designed error paths, performance at scale, human-sized diffs.",
      "Run review as a protocol: make the agent prove it, review the review, time-box it, and escalate unknowns.",
      "The security crisis isn't a reason to stay out of code — it's the market proving review is where quality is decided.",
    ],
  },
  {
    title: "Pricing Page Design Is a Design Problem, Not a Business Problem",
    slug: "pricing-page-design-is-a-design-problem",
    category: "Conversion Design",
    publishedAt: "2026-08-14T09:00:00Z",
    excerpt:
      "The pricing page is the highest-leverage surface in your product — a decision moment, not a feature list. Here's the anchor-decoy-hero anatomy that converts, and the three mistakes that leak revenue.",
    cover:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&q=80",
    heroAlt:
      "Dashboard with charts and graphs on a screen, representing pricing tiers and revenue analytics.",
    takeaways: [
      "The pricing moment is four questions: afford, fair, which option, what if I'm wrong — design for that layer, not the feature table.",
      "Three plans beat two or four: the anchor sets the ceiling, the decoy makes the hero the obvious choice.",
      "Risk reversal — trials, guarantees, no credit card — is a layout decision that moves commitment.",
      "The page anatomy: frame, anchor, hero plan, decoy, risk reversal, justification layer, FAQ.",
      "Pricing is a design instrument that shapes your customer base and churn curve — not a spreadsheet.",
    ],
  },
  {
    title: "Onboarding Is the Product: Compressing the Distance From Signup to Value",
    slug: "onboarding-is-the-product",
    category: "UX Research",
    publishedAt: "2026-08-15T09:00:00Z",
    excerpt:
      "The median product activates 37.5% of signups and takes a day and a half to deliver value. The fix is subtraction: value before setup, one job per screen, and empty states that onboard.",
    cover:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1920&q=80",
    heroAlt:
      "Person working at a laptop with notebooks, representing the onboarding flow and first-time user experience.",
    takeaways: [
      "Onboarding is the distance from signup to first value — and the whole discipline is compressing it.",
      "Show value before setup: every setup step is a conversion tax, and the median checklist is under 20% complete.",
      "Six mechanics: one job per screen, the 30-second rule, sacred critical path, progressive disclosure, designed completion, empty states as onboarding.",
      "For heavy products, use a sandbox onboarding — a pre-populated rehearsal of the real job.",
      "Scorecard: activation, time-to-value, checklist completion, step drop-off, retention, and support load.",
    ],
  },
  {
    title: "Designing AI-Native Interfaces: Propose, Don't Interrogate",
    slug: "designing-ai-native-interfaces",
    category: "AI Workflows",
    publishedAt: "2026-08-16T09:00:00Z",
    excerpt:
      "The form asked the user to specify everything. The AI-native interface shows up with a draft and asks 'is this right?' Five patterns that separate inevitable-feeling AI products from demos.",
    cover:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1920&q=80",
    heroAlt:
      "Abstract representation of artificial intelligence and machine learning, representing AI-native interfaces.",
    takeaways: [
      "The machine took the routine cognition; the interface now proposes and the human disposes.",
      "Five patterns: propose don't interrogate, artifact as interface, confidence as a first-class citizen, undo as trust anchor, human sets the standard.",
      "The trust moment has three surfaces: legibility, editability, reversibility — all three make delegation possible.",
      "The design system needs new components: confidence indicators, edit affordances, AI-generated badges, undo and history.",
      "The interface didn't get simpler; it got more human — and that's the designer's job.",
    ],
  },
  {
    title: "From Figma Files to Deployment Pipelines: What 'Design Engineer' Means in 2026",
    slug: "what-design-engineer-means-in-2026",
    category: "Product Development",
    publishedAt: "2026-08-17T09:00:00Z",
    excerpt:
      "The handoff is dead — the designers who ship own the system, deploy the build, and direct the AI workforce. The skill map, the 90-minute pipeline, and why this is the strongest position in the market.",
    cover:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1920&q=80",
    heroAlt:
      "Modern workspace with computer showing code, representing the design engineer role and deployment pipelines.",
    takeaways: [
      "The relay race is dying: the handoff is now optional, and the designers who treat it as optional define the role.",
      "The job is three things: own the system as code, ship the build, and direct the AI workforce.",
      "The skill map: front-end literacy, TypeScript, tokens-as-code, the review gate, and deployment literacy — all learnable in months.",
      "The 90-minute pipeline — tokens in git, Style Dictionary in CI, agent in the loop, review gate, deploy — replaces the 3-day handoff.",
      "Designers who own the path from idea to deployed product are worth more than either specialist alone.",
    ],
  },
];

// ---------------------------------------------------------------------------
// Markdown -> Portable Text (blocks: h2/h3, bullet/number lists, blockquote,
// paragraphs, inline code, bold, italic, links)
// ---------------------------------------------------------------------------
const INLINE_CODE_RE = /`([^`]+)`/g;
const BOLD_RE = /\*\*([^*]+)\*\*/g;
const ITALIC_RE = /\*([^*]+)\*/g;
const LINK_RE = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;

function renderInline(text) {
  const children = [];
  const pattern = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\(https?:\/\/[^\s)]+\))/g;
  let lastIndex = 0;
  let match;
  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      children.push({ _type: "span", text: text.slice(lastIndex, match.index) });
    }
    const token = match[0];
    if (token.startsWith("**")) {
      children.push({
        _type: "span",
        marks: ["strong"],
        text: token.slice(2, -2),
      });
    } else if (token.startsWith("*") && !token.startsWith("**")) {
      children.push({ _type: "span", marks: ["em"], text: token.slice(1, -1) });
    } else if (token.startsWith("`")) {
      children.push({ _type: "span", marks: ["code"], text: token.slice(1, -1) });
    } else {
      const link = token.match(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/);
      if (link) {
        children.push({
          _type: "span",
          marks: ["link"],
          text: link[1],
        });
        links.add(link[2]);
      }
    }
    lastIndex = match.index + token.length;
  }
  if (lastIndex < text.length) {
    children.push({ _type: "span", text: text.slice(lastIndex) });
  }
  return children;
}

const links = new Set();

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function markdownToPortableText(markdown) {
  links.clear();
  const blocks = [];
  const lines = markdown.split(/\r?\n/);

  let paraLines = [];
  const flushPara = () => {
    const text = paraLines.join(" ").trim();
    if (text) {
      blocks.push({
        _type: "block",
        style: "normal",
        markDefs: [],
        children: renderInline(text),
      });
    }
    paraLines = [];
  };

  let listType = null;
  let listItems = [];

  const flushList = () => {
    if (listItems.length) {
      blocks.push({
        _type: "block",
        style: "normal",
        level: 1,
        listItem: listType,
        markDefs: [],
        children: renderInline(listItems.join(" ")),
      });
      listItems = [];
      listType = null;
    }
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) {
      flushPara();
      flushList();
      continue;
    }

    if (/^##\s/.test(line)) {
      flushPara();
      flushList();
      blocks.push({
        _type: "block",
        style: "h2",
        markDefs: [],
        children: renderInline(line.replace(/^##\s/, "")),
      });
    } else if (/^###\s/.test(line)) {
      flushPara();
      flushList();
      blocks.push({
        _type: "block",
        style: "h3",
        markDefs: [],
        children: renderInline(line.replace(/^###\s/, "")),
      });
    } else if (/^>\s?/.test(line)) {
      flushPara();
      flushList();
      blocks.push({
        _type: "block",
        style: "blockquote",
        markDefs: [],
        children: renderInline(line.replace(/^>\s?/, "")),
      });
    } else if (/^[-*]\s/.test(line)) {
      flushPara();
      if (listType !== "bullet") {
        flushList();
        listType = "bullet";
      }
      listItems.push(line.replace(/^[-*]\s/, ""));
    } else if (/^\d+\.\s/.test(line)) {
      flushPara();
      if (listType !== "number") {
        flushList();
        listType = "number";
      }
      listItems.push(line.replace(/^\d+\.\s/, ""));
    } else {
      flushList();
      paraLines.push(line);
    }
  }

  flushPara();
  flushList();

  // attach link mark definitions
  const markDefKeys = Array.from(links);
  for (const block of blocks) {
    if (!markDefKeys.length) break;
    const used = new Set();
    for (const child of block.children) {
      if (child.marks && child.marks.includes("link")) {
        const idx = used.size;
        child.marks = ["link", `link-${idx}`];
        used.add(idx);
      }
    }
    if (used.size) {
      block.markDefs = Array.from(used).map((idx) => ({
        _key: `link-${idx}`,
        _type: "link",
        href: markDefKeys[idx],
      }));
    }
  }

  return blocks;
}

// ---------------------------------------------------------------------------
// Sanity image upload from a remote Unsplash URL
// ---------------------------------------------------------------------------
async function uploadImageFromUrl(url, label) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to download ${label}: HTTP ${res.status}`);
  }
  const buffer = Buffer.from(await res.arrayBuffer());
  const ext = (url.split("?")[0].match(/\.(jpe?g|png|webp)$/i) || [])[1] ?? "jpg";
  const asset = await client.assets.upload("image", buffer, {
    filename: `${label}.${ext}`,
    contentType:
      ext === "png" ? "image/png" : ext === "webp" ? "image/webp" : "image/jpeg",
  });
  console.log(`   ↑ uploaded image asset: ${asset._id} (${asset.assetId})`);
  return asset;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  console.log(`Connecting to Sanity project ${projectId} / dataset ${dataset}…`);

  // 1) Fetch existing articles
  const existing = await client.fetch('*[_type == "article"]{_id, title}');
  console.log(`Found ${existing.length} existing article(s).`);

  // 2) Delete them
  if (existing.length) {
    console.log("Deleting dummy articles…");
    const tx = client.transaction();
    for (const doc of existing) {
      tx.delete(doc._id);
    }
    await tx.commit();
    console.log(`   Deleted ${existing.length} article(s).`);
  }

  // 3) Create the new articles
  for (const [i, article] of articles.entries()) {
    console.log(`\n[${i + 1}/${articles.length}] Creating “${article.title}”`);

    const cover = await uploadImageFromUrl(article.cover, `cover-${article.slug}`);
    const body = markdownToPortableText(
      readFileSync(
        join(__dirname, "content", `${article.slug}.md`),
        "utf8",
      ),
    );

    const doc = {
      _type: "article",
      title: article.title,
      slug: { _type: "slug", current: article.slug },
      category: article.category,
      publishedAt: article.publishedAt,
      excerpt: article.excerpt,
      thumbnail: {
        _type: "image",
        asset: { _type: "reference", _ref: cover._id },
      },
      heroAlt: article.heroAlt,
      takeaways: article.takeaways,
      body,
    };

    const created = await client.create(doc);
    console.log(`   ✓ Created article ${created._id} (${article.slug})`);
  }

  console.log(`\n✅ Seed complete. ${articles.length} articles live in Sanity.`);
}

main().catch((err) => {
  console.error("\n✖ Seed failed:", err.message || err);
  process.exit(1);
});
