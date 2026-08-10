import { NextStudio } from 'next-sanity/studio'

import config from '../../../sanity.config'

export const dynamic = 'force-static'

export { metadata, viewport } from 'next-sanity/studio'

export default function StudioPage() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return (
      <main className="grid min-h-screen place-items-center bg-black px-6 text-white">
        <section className="max-w-lg border border-white/20 bg-white/[0.04] p-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-red-400">
            Sanity Studio setup
          </p>
          <h1 className="text-3xl font-semibold">Connect your Sanity project</h1>
          <p className="mt-4 leading-7 text-white/70">
            Add your project ID and dataset to <code>.env.local</code>, then reload this
            page to open the embedded Studio.
          </p>
        </section>
      </main>
    )
  }

  return <NextStudio config={config} />
}
