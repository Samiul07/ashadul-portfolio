# Repository Audit — ashadul-portfolio

**Audit model:** deepseek/deepseek-v4-flash
**Date:** 2026-08-09
**Repo:** C:\Users\ashad\ashadul-portfolio (Next.js 16 / App Router / Tailwind 4 / Framer Motion)

---

## Part 1 — The 4GB Weight Loss (File Tree Audit)

### What is eating the 4.17 GB

**Root cause = one junk folder + three massive build/install artifacts:**

| Path | Verdict | Why |
|---|---|---|
| `.tmp.driveupload/` | **DELETE** | 1,000+ files (confirmed). Numeric temp-chunk IDs — a Drive/OneDrive sync staging folder leaked into the repo. Not referenced by any code, build, or script. |
| `node_modules/` | DELETE + reinstall | 400+ package dirs. Recreatable via `npm ci`. |
| `.next/` | DELETE | Next.js dev/build cache. Recreatable via `next build`. |
| `out/` | DELETE | Static export output. Recreatable via `next build`. Already git-ignored. |

**Secondary junk (delete all):**

| Path | Type | Verdict |
|---|---|---|
| `Switzer_Complete.zip` | font archive | DELETE — already extracted into `public/fonts/switzer/` via `next/font/local`. |
| `.npm-cache/` | npm cache (`_cacache/` blobs) | DELETE + `npm cache clean --force` — biggest hidden weight. |
| 15 root `.log` files | dev/codex/not-found logs | DELETE. |
| `components/_archive/` | 6 unused TSX components | DELETE — zero imports. |
| `scripts/` | 3 one-off Node scripts | DELETE — `save-portrait.js` hard-codes an absolute path to `C:\Users\ashad\.gemini\...` on YOUR machine. |
| `.codex/`, `.agents/` | empty dirs | DELETE. |
| `tsconfig.tsbuildinfo` | TS cache | DELETE — recreates on build. |
| `Project Gallary Graident.svg` | stray root file | DELETE or move to `public/` if used. |

**NOT present anymore (verified):** `Random Store/`, `.mp4` — already gone. Do NOT re-delete.

**Keep:** `.cursor/`, `.commandcode/`, `public/images/` (still used).

---

## Part 2 — Architectural Verification

### 2.1 Static export: ✅ WORKS
- `next.config.ts`: `output: "export"` + `images: { unoptimized: true }`.
- Routes `/`, `/blog`, `/blog/[slug]` (SSG via `generateStaticParams`), `/contact`, `/portfolio` all prerender. `out/` contains a successful export. **No `app/api/` routes.**

### 2.2 SSR / image / API landmines: ✅ CLEAN
- No API routes. No SSR (metadata/params run at build time only).
- Image optimization disabled (`unoptimized: true`) — correct for static hosting.
- No `remotePatterns`. All images local.
- `next-mdx-remote` is dead weight (see below).

### 2.3 Decap CMS: ❌ BROKEN on cPanel — the real architectural break
- `public/admin/config.yml` uses `backend: git-gateway` + Netlify Identity widget — **requires Netlify server-side auth/commit API**. A plain cPanel/LiteSpeed host has no such backend, so the CMS cannot authenticate or commit.
- The MDX path is disconnected dead infrastructure: the blog renders **hardcoded data** from `lib/notes.ts`; `lib/markdown.ts` (reads `content/field-notes/*.mdx`) is **never imported by any page**; `content/field-notes/first-field-note.mdx` is orphaned; `public/images/uploads/` (the CMS `media_folder`) **does not exist**.
- Decision needed (not acted on): (A) remove CMS, or (B) keep it as a local-only authoring tool.

---

## Part 3 — The Purge & Prep Plan

### Step 0 — Safety backup (source only)
```
tar -czf ~/portfolio-source-backup.tar.gz app components lib public content next.config.ts package.json tsconfig.json postcss.config.mjs eslint.config.mjs
```

### Step 1 — Junk dirs + files
```bash
rm -rf .tmp.driveupload Switzer_Complete.zip .npm-cache .codex .agents components/_archive scripts tsconfig.tsbuildinfo
rm -f .codex-dev.stderr.log .codex-dev.stdout.log .codex-gap-verification.png \
      .codex-header-preview.stderr.log .codex-header-preview.stdout.log \
      .codex-localhost.log .dev-server-error.log .dev-server.log \
      .next-dev.stderr.log .next-dev.stdout.log chrome_start.log \
      .not-found-preview.stderr.log .not-found-preview.stdout.log \
      .not-found-preview-3001.stderr.log .not-found-preview-3001.stdout.log \
      .not-found-webpack.stderr.log .not-found-webpack.stdout.log \
      "Project Gallary Graident.svg"
```

### Step 2 — Clear caches
```bash
rm -rf .next out
npm cache clean --force
```

### Step 3 — CMS decision gate (only if you choose A)
```bash
rm -rf public/admin content lib/markdown.ts
npm uninstall next-mdx-remote
```

### Step 4 — Rebuild & verify
```bash
npm install && npm run build
# confirm /out contains index.html, contact/, portfolio/, blog/, blog/<slug>/index.html, 404.html
```

### Step 5 — Ship only `/out` to `public_html/` via FTP
Never upload node_modules/.next/source.

### Optional hygiene
- Add `.tmp.driveupload/`, `*.log`, `.npm-cache/`, `Switzer_Complete.zip`, `tsconfig.tsbuildinfo` to `.gitignore`.
- Make the first real commit (repo currently has zero commits).

---

## Verification
1. `npm run build` completes static, no SSR/API errors.
2. `out/` regenerates; grep shows no `/_next/image`.
3. File count drops ~179,000 → <2,000 (source only); FTP payload (`out/`) well under 100 MB.
4. `npx serve out` and click through all routes incl. blog slugs.

**Summary:** The static export is healthy and deployable today. The 4.17 GB is almost entirely cache/junk (`.tmp.driveupload`, `.npm-cache`, `.next`, `node_modules`, `out`). The one true architectural defect is the Decap CMS being configured for Netlify, which cannot run on cPanel — and it's currently dead weight anyway since the blog uses hardcoded data.
