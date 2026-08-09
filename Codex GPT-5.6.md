# Codex GPT-5.6 — Pre-deployment Technical Audit

**Audited repository:** `C:\Users\ashad\ashadul-portfolio`  
**Audit date:** 2026-08-10  
**Scope:** Static-export readiness for a Next.js App Router portfolio deployed to cPanel/LiteSpeed via FTP.

## Executive verdict

The application **does successfully produce a static export**, but it is **not deployment-ready** without addressing several release blockers:

1. The Decap CMS setup is incompatible with a pure static cPanel host and is not connected to the live blog.
2. The static output uses extensionless routes in source but emits `.html` files; cPanel/LiteSpeed needs `trailingSlash: true` or explicit rewrites.
3. Git is not a functional repository: `master` has no commits and all source is untracked, while `.git` contains large dangling-object garbage.
4. Lint currently fails with 6 errors.
5. Dependency audit reports four high-severity findings, including the installed Next.js version.

## 1. File-tree and size audit

The workspace contains **179,091 files** and measures **4.08 GiB**.

| Path | Approx. size | Files | Assessment |
| --- | ---: | ---: | --- |
| `.next` | 2.05 GiB | 152,514 | Turbopack/Next build cache. Fully disposable. |
| `.git` | 619 MB | 1,049 | Not usable history: unborn `master`, dangling blobs, and garbage temporary objects. |
| `.tmp.driveupload` | 612 MB | 1,000 | Hidden upload-staging/cache data; not project source. Remove only when uploader/sync is idle. |
| `node_modules` | 428 MB | 23,618 | Reinstallable development dependencies. Never deploy. |
| `out` | 192 MB | 471 | Generated static deployment artifact. Rebuild; do not commit. |
| `public` | 176 MB | 318 | Real source assets, but it contains many unused/duplicated files. |
| `.npm-cache` | 49 MB | 26 | Disposable project-local npm cache. |

### Confirmed unnecessary files

- `.next/`
- `node_modules/`
- `out/`
- `.npm-cache/`
- `.tmp.driveupload/`
- `tsconfig.tsbuildinfo`
- `next-env.d.ts`
- `Switzer_Complete.zip` — fonts are already extracted
- `$(Test-Path` — accidental root file
- Root development logs: `.codex-*.log`, `.next-dev.*.log`, `.not-found-*.log`, `.dev-server*.log`, and `chrome_start.log`

No MP4/MOV/AVI/MKV files were found in the repository.

### Public asset waste

Next copies the entire `public/` directory into `out/`, including unused files.

- `public/images/logo-figma.svg` and `public/images/logo-figma-current.svg` are byte-identical, unreferenced, and consume **46.34 MB** together.
- Unreferenced legacy PNG work exports consume at least **41.82 MB**:
  - `work-solence.png`
  - `work-day-translations.png`
  - `work-metabolix.png`
  - `work-betr.png`
- A literal source-reference scan found **111.29 MB** of large public files not referenced by the active application source. Retain a backup before pruning them.
- `public/fonts/` contains 103 files / **3.69 MB**, but the layout imports only two WOFF2 files. The archive, OTF, EOT, TTF, and duplicate font formats should not be shipped.

## 2. Static-export architecture audit

### Static export: pass

`next.config.ts` correctly contains:

```ts
output: "export",
images: {
  unoptimized: true,
},
```

`npm run build` completed successfully with Next.js 16.2.10. The static output includes:

- `/`
- `/contact`
- `/portfolio`
- `/blog`
- `/404`
- Eight statically generated `/blog/[slug]` pages via `generateStaticParams`

The only build warning is that Next could not generate fallback override metrics for the Big Shoulders font. This is not a build failure.

### SSR/API/image blockers: pass

The audit found:

- No `app/api` directory or route handlers.
- No Server Actions.
- No `cookies()`, `headers()`, Draft Mode, ISR, middleware, rewrites, redirects, or forced dynamic routes.
- `next/image` is safe here because `images.unoptimized: true` is configured.
- Browser APIs (`window`, `document`) are used from client-side components.

The contact form is static-safe because it opens a `mailto:` link. It does not provide server-side form submission or file uploads.

### cPanel/LiteSpeed routing: needs a fix

The build emits files such as:

```text
out/contact.html
out/portfolio.html
out/blog.html
out/blog/<slug>.html
```

The application links to `/contact`, `/portfolio`, and `/blog`. A basic static cPanel host may not resolve those extensionless URLs automatically.

Use one of these approaches before deployment:

1. Add `trailingSlash: true` to `next.config.ts`, rebuild, and deploy `/contact/index.html`-style paths; or
2. Add and test LiteSpeed `.htaccess` rewrites that resolve extensionless paths to `.html`.

`trailingSlash: true` is the safer static-hosting choice.

### Decap CMS: fails the stated architecture

`public/admin/config.yml` currently uses:

```yml
backend:
  name: git-gateway
```

`public/admin/index.html` also loads Netlify Identity and Decap CMS from external CDNs.

This is not a local filesystem CMS. Git Gateway requires a remote Git publishing service and authentication flow. A browser-only static site on cPanel cannot write MDX files to the server filesystem.

There is a second issue: `lib/markdown.ts` can read MDX files but it is not imported anywhere. The live blog uses hard-coded data in `lib/notes.ts`. Therefore Decap-created MDX posts would not appear on the site even if Git Gateway were available.

Choose one architecture:

1. **cPanel static workflow:** remove or unpublish `/admin`; edit content locally, build locally, and FTP the generated `out/` directory.
2. **Decap workflow:** use a remote Git/auth backend and change the blog to consume MDX during static build.
3. **Custom CMS workflow:** requires a server-side backend and is outside the current cPanel-static constraint.

### Production artifacts and quality blockers

- `app/layout.tsx` loads `https://mcp.figma.com/mcp/html-to-design/capture.js`. Remove this Figma capture script before production deployment.
- `npm run lint` reports **6 errors and 7 warnings**.
- `npm audit --omit=dev` reports **4 high-severity findings**. The installed Next.js `16.2.10` is affected; the audit identifies `16.3.0` as the available fix target.
- The current Git repository has no commit history and zero tracked files. Reinitialize it after backing up source.

## 3. Safe cleanup plan — commands not executed

### Back up source first

```powershell
Set-Location "C:\Users\ashad\ashadul-portfolio"

$backup = "C:\Users\ashad\Desktop\ashadul-portfolio-source-backup-20260810"

robocopy . $backup /E `
  /XD ".git" ".next" "node_modules" "out" ".npm-cache" ".tmp.driveupload" `
      ".agents" ".codex" ".commandcode" ".cursor" `
  /XF "*.log" "*.tsbuildinfo"

if ($LASTEXITCODE -ge 8) {
  throw "Backup failed. Do not purge anything."
}
```

### Stop the dev server

```powershell
Get-NetTCPConnection -State Listen -LocalPort 3000 |
  Select-Object LocalAddress, LocalPort, OwningProcess

Stop-Process -Id <PID_FROM_ABOVE>
```

### Purge generated/cache files

```powershell
$generated = @(
  ".next",
  "out",
  "node_modules",
  ".npm-cache",
  ".tmp.driveupload",
  "tsconfig.tsbuildinfo",
  "next-env.d.ts",
  "Switzer_Complete.zip",
  '$(Test-Path',
  ".codex-dev.stderr.log",
  ".codex-dev.stdout.log",
  ".codex-header-preview.stderr.log",
  ".codex-header-preview.stdout.log",
  ".codex-localhost.log",
  ".dev-server-error.log",
  ".dev-server.log",
  ".next-dev.stderr.log",
  ".next-dev.stdout.log",
  ".not-found-preview.stderr.log",
  ".not-found-preview.stdout.log",
  ".not-found-preview-3001.stderr.log",
  ".not-found-preview-3001.stdout.log",
  ".not-found-webpack.stderr.log",
  ".not-found-webpack.stdout.log",
  "chrome_start.log"
)

$generated | ForEach-Object {
  if (Test-Path -LiteralPath $_) {
    Remove-Item -LiteralPath $_ -Recurse -Force
  }
}
```

### Purge verified unused heavy assets

Run this only after confirming the backup and visually checking the remaining pages.

```powershell
$unusedAssets = @(
  "public\images\logo-figma.svg",
  "public\images\logo-figma-current.svg",
  "public\images\work-solence.png",
  "public\images\work-day-translations.png",
  "public\images\work-metabolix.png",
  "public\images\work-betr.png"
)

$unusedAssets | ForEach-Object {
  if (Test-Path -LiteralPath $_) {
    Remove-Item -LiteralPath $_ -Force
  }
}
```

### Recreate Git cleanly

There are no commits to preserve. Do this only after the source backup is confirmed.

```powershell
Remove-Item -LiteralPath ".git" -Recurse -Force

git init --initial-branch=main
git add .
git commit -m "Initial clean static portfolio baseline"
```

Add these entries to `.gitignore` before the initial commit:

```gitignore
.npm-cache/
.tmp.driveupload/
*.log
.codex-*.png
.not-found-*.log
.dev-server*.log
.next-dev.*.log
```

### Rebuild before deployment

```powershell
npm ci
npm run lint
npm audit --omit=dev
npm run build
```

Upload the **contents of `out/` only** to cPanel. Do not upload the project root, `.next`, `node_modules`, source code, or local caches.
