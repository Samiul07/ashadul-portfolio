export type NoteBlock =
  | { type: "p"; text: string; emphasis?: boolean }
  | { type: "h2"; text: string }
  | { type: "image"; src: string; alt: string }
  | { type: "ul"; items: string[] };

export type FieldNote = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  dateISO: string;
  dateModifiedISO?: string;
  readTime: string;
  wordCount?: number;
  tags?: string[];
  views: string;
  image: string;
  heroAlt: string;
  takeaways?: string[];
  body: NoteBlock[];
};

export const fieldNotes: FieldNote[] = [
  {
    slug: "minimalist-branding-for-modern-tech-startups",
    category: "Art Direction",
    title: "Minimalist Branding for Modern Tech Startups",
    excerpt:
      "Why clarity beats loudness — and how restraint builds trust for SaaS, AI, fintech, and B2B products.",
    date: "January 10, 2026",
    dateISO: "2026-01-10",
    readTime: "7 min read",
    views: "1.8k",
    image: "/images/blog/article/figma-article-hero-78d327.png",
    heroAlt: "Minimal workspace with a laptop and clean branding materials",
    takeaways: [
      "Minimalism is about focus and clarity — removing distractions so product value takes center stage.",
      "Clear, restrained typography and whitespace build instant credibility for SaaS and AI startups.",
      "Reducing visual noise directly improves user task completion speed and conversion rates.",
      "Consistent brand decisions across touchpoints create predictable, trustworthy user flows.",
    ],
    body: [
      {
        type: "h2",
        text: "Introduction",
      },
      {
        type: "p",
        text: "In a world where digital products compete for attention every second, many startups assume that stronger branding means louder visuals, more colors, and increasingly complex design systems. The reality is often the opposite. Some of the most recognizable technology companies built their identities around clarity, consistency, and restraint. Minimalist branding is not about removing personality; it is about removing distractions. It allows a product, message, and customer experience to become the center of attention.",
      },
      {
        type: "p",
        text: "For modern startups, especially those operating in SaaS, AI, fintech, and B2B markets, minimalist branding can create stronger trust, improve usability, and establish a more professional market presence.",
      },
      {
        type: "h2",
        text: "What Minimalist Branding Really Means",
      },
      {
        type: "p",
        text: "Minimalist branding is frequently misunderstood as a purely visual trend. Many founders associate it with white backgrounds, simple logos, and limited color palettes. While those elements can be part of the approach, minimalism is fundamentally about focus. A minimalist brand prioritizes the most important message and removes everything that does not contribute to that message.",
      },
      {
        type: "p",
        text: "Instead of overwhelming users with visual noise, minimalist brands guide attention deliberately. Every design decision has a purpose, from typography and spacing to imagery and interactions.",
      },
      {
        type: "p",
        emphasis: true,
        text: "The result is a brand experience that feels clear, confident, and easy to understand.",
      },
      {
        type: "h2",
        text: "Key Characteristics of Minimalist Brands",
      },
      {
        type: "ul",
        items: [
          "Clear messaging and positioning",
          "Consistent visual identity",
          "Limited but intentional color usage",
          "Strong typography hierarchy",
          "Purposeful whitespace",
          "Simple user experiences",
        ],
      },
      {
        type: "image",
        src: "/images/blog/article/figma-article-section-cdd382.png",
        alt: "Clean product interface emphasizing clarity and restraint",
      },
      {
        type: "h2",
        text: "Why Modern Startups Are Moving Toward Simplicity",
      },
      {
        type: "p",
        text: "The startup ecosystem has matured significantly over the last decade. Users are exposed to hundreds of products every month and have become increasingly selective about what earns their attention. Brands that communicate clearly often outperform brands that communicate loudly.",
      },
      {
        type: "p",
        text: "A clean and focused identity creates an immediate sense of professionalism. It helps potential customers understand what a company does without requiring excessive effort. For early-stage startups, this advantage is especially important because trust is often the deciding factor between adoption and abandonment.",
      },
    ],
  },
  {
    slug: "designing-product-flows-that-actually-ship",
    category: "Product Design",
    title: "Designing Product Flows That Actually Ship",
    excerpt:
      "How to turn messy product briefs into shippable flows without losing the edge that makes the interface feel intentional.",
    date: "January 08, 2026",
    dateISO: "2026-01-08",
    readTime: "8 min read",
    views: "1.6k",
    image: "/images/note-product-flows.png",
    heroAlt: "Designer reviewing a product interface on a laptop",
    takeaways: [
      "Write a one-sentence job statement before drawing frames to ensure team alignment.",
      "Map user decision points and edge cases before polishing visual UI screens.",
      "Design the unhappy path first: empty states, permission errors, and failed network syncs.",
      "If a screen doesn't alter user decision or confidence, omit it from the v1 release.",
    ],
    body: [
      {
        type: "h2",
        text: "Start With The Job",
      },
      {
        type: "p",
        text: "Most product flows fail before a single pixel is pushed to production. Not because the UI is ugly — because the team never agreed on what “done” means. A beautiful onboarding that doesn’t reduce time-to-value is just expensive decoration.",
      },
      {
        type: "p",
        text: "Before frames, write a one-sentence job statement: who is trying to finish what, under what constraint. If that sentence needs a comma farm, the product isn’t ready for layout.",
      },
      {
        type: "p",
        emphasis: true,
        text: "If a screen doesn’t change a decision, a state, or a user’s confidence, it doesn’t belong in the first ship.",
      },
      {
        type: "h2",
        text: "Map Decisions, Not Pages",
      },
      {
        type: "ul",
        items: [
          "What do they need to know before they can choose?",
          "What happens if they choose wrong?",
          "What state proves the choice worked?",
          "What is the smallest next action after success?",
        ],
      },
      {
        type: "image",
        src: "/images/blog/article/flows-desk.jpg",
        alt: "Design sketches and interface explorations on a desk",
      },
      {
        type: "h2",
        text: "Design The Unhappy Path First",
      },
      {
        type: "p",
        text: "Happy paths look good in presentations. Products live in the mess: expired sessions, incomplete profiles, permission errors, empty states after a failed sync. Design those first because they reveal missing system thinking.",
      },
    ],
  },
  {
    slug: "where-conversion-thinking-meets-product-design",
    category: "Conversion",
    title: "Where Conversion Thinking Meets Product Design",
    excerpt:
      "Conversion is not a growth hack layer — it is a design decision made at every friction point in the product.",
    date: "January 04, 2026",
    dateISO: "2026-01-04",
    readTime: "6 min read",
    views: "1.4k",
    image: "/images/note-conversion-thinking.png",
    heroAlt: "Analytics and conversion thinking on screen",
    body: [
      {
        type: "h2",
        text: "Friction Is A Design Material",
      },
      {
        type: "p",
        text: "Every extra field, ambiguous label, and unexplained wait is a tax. Some friction is useful — confirmation before a destructive action, for example. Most of it is accidental. The job is to tell the difference.",
      },
      {
        type: "p",
        emphasis: true,
        text: "If you can’t explain why a step exists in one sentence a first-time user would understand, delete it or rewrite it.",
      },
      {
        type: "h2",
        text: "Pair UX Judgment With Evidence",
      },
      {
        type: "ul",
        items: [
          "Instrument the decision points, not just page views.",
          "Change one meaningful variable at a time.",
          "Protect clarity when “winning” variants get louder instead of clearer.",
        ],
      },
    ],
  },
  {
    slug: "using-ai-without-losing-design-judgment",
    category: "AI & Craft",
    title: "Using AI Without Losing Design Judgment",
    excerpt:
      "AI can accelerate exploration. Judgment still decides what survives into production.",
    date: "December 28, 2025",
    dateISO: "2025-12-28",
    readTime: "7 min read",
    views: "2.1k",
    image: "/images/note-ai-judgment.png",
    heroAlt: "Designer working with AI-assisted tools",
    body: [
      {
        type: "h2",
        text: "Use AI For Breadth",
      },
      {
        type: "p",
        text: "AI made it cheap to generate options. That is useful. It also made it cheap to ship mediocre defaults at scale. The designers who win with these tools are not the ones who prompt the most — they’re the ones who reject the most.",
      },
      {
        type: "p",
        emphasis: true,
        text: "Speed without judgment is just a faster way to publish confusion.",
      },
      {
        type: "h2",
        text: "A Practical Workflow",
      },
      {
        type: "ul",
        items: [
          "Write the job and constraints yourself.",
          "Ask AI for alternatives against that brief — not blank inspiration.",
          "Score options against clarity, risk, and ship cost.",
          "Rebuild the winner by hand so the craft stays yours.",
        ],
      },
    ],
  },
  {
    slug: "collaboration-in-digital-design",
    category: "Collaboration",
    title: "Collaboration in Digital Design",
    excerpt:
      "Better handoffs start before Figma — in how designers frame constraints with founders and engineers.",
    date: "December 20, 2025",
    dateISO: "2025-12-20",
    readTime: "5 min read",
    views: "1.1k",
    image: "/images/blog/field-note-04.png",
    heroAlt: "Design and engineering collaboration",
    body: [
      {
        type: "h2",
        text: "Make Constraints Visible",
      },
      {
        type: "p",
        text: "Handoff is not a file format. It’s a shared understanding of what must not break. Open every engagement with must-ship, nice-to-have, and explicitly out.",
      },
      {
        type: "ul",
        items: [
          "Annotate decisions, not just components.",
          "Review flows with engineering before polishing visuals.",
          "Prefer working prototypes for risky interactions.",
        ],
      },
    ],
  },
  {
    slug: "the-power-of-motion-design-in-web-products",
    category: "Motion Design",
    title: "The Power of Motion Design: Bringing Your Brand to Life",
    excerpt:
      "Motion should clarify hierarchy and state — not decorate screens that already fail at clarity.",
    date: "December 14, 2025",
    dateISO: "2025-12-14",
    readTime: "5 min read",
    views: "1.5k",
    image: "/images/blog/field-note-05.png",
    heroAlt: "Motion and interaction design concept",
    body: [
      {
        type: "h2",
        text: "Purpose Before Polish",
      },
      {
        type: "p",
        text: "Motion is communication. It tells users what changed, what matters, and what to do next. Only add motion when it answers a question about state or attention.",
      },
    ],
  },
  {
    slug: "the-future-of-digital-design-trends-to-watch",
    category: "Design Trends",
    title: "The Future of Digital Design: Trends to Watch",
    excerpt:
      "Trends are useful signals. Systems and judgment decide whether they earn a place in your product.",
    date: "December 08, 2025",
    dateISO: "2025-12-08",
    readTime: "5 min read",
    views: "1.4k",
    image: "/images/blog/article/figma-article-next.png",
    heroAlt: "Abstract digital design trends visual",
    body: [
      {
        type: "h2",
        text: "Trends Are Weather",
      },
      {
        type: "p",
        text: "Trends are weather. Systems are climate. Watch trends to stay literate — then ask whether they strengthen clarity, conversion, or craft inside a real product constraint.",
      },
      {
        type: "p",
        emphasis: true,
        text: "The ones worth keeping usually reduce noise: stronger typography, fewer decorative layers, and clearer state design.",
      },
    ],
  },
  {
    slug: "dos-and-donts-of-interaction-design",
    category: "Interaction",
    title: "Dos and Don’ts of Interaction Design: A Complete Guide",
    excerpt:
      "Interaction design fails quietly — until users hesitate, mis-tap, or abandon the path.",
    date: "November 30, 2025",
    dateISO: "2025-11-30",
    readTime: "6 min read",
    views: "1.9k",
    image: "/images/blog/field-note-08.png",
    heroAlt: "Interaction design interface detail",
    body: [
      {
        type: "h2",
        text: "Do",
      },
      {
        type: "ul",
        items: [
          "Make primary actions visually dominant and verbally clear.",
          "Keep hit targets generous on touch.",
          "Show system status before users have to ask.",
        ],
      },
      {
        type: "h2",
        text: "Don’t",
      },
      {
        type: "ul",
        items: [
          "Hide destructive actions behind ambiguous icons.",
          "Animate without purpose.",
          "Assume hover exists on mobile.",
        ],
      },
    ],
  },
];

export function getAllNotes() {
  return fieldNotes;
}

export function getNoteBySlug(slug: string) {
  return fieldNotes.find((note) => note.slug === slug);
}

export function getNextNote(slug: string) {
  const index = fieldNotes.findIndex((note) => note.slug === slug);
  if (index < 0) return fieldNotes[0];
  return fieldNotes[(index + 1) % fieldNotes.length];
}

export function getRelatedNotes(slug: string, limit = 3) {
  const current = getNoteBySlug(slug);
  if (!current) return fieldNotes.slice(0, limit);

  const sameCategory = fieldNotes.filter(
    (note) => note.slug !== slug && note.category === current.category,
  );
  const others = fieldNotes.filter(
    (note) => note.slug !== slug && note.category !== current.category,
  );

  return [...sameCategory, ...others].slice(0, limit);
}

export function noteCardData(note: FieldNote) {
  return {
    category: note.category,
    href: `/blog/${note.slug}`,
    image: note.image,
    title: note.title,
  };
}
