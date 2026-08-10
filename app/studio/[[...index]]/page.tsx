import { NextStudio } from 'next-sanity/studio'

import config from '../../../sanity.config'

export const dynamic = 'force-static'

export { metadata, viewport } from 'next-sanity/studio'

export default function StudioPage() {
  return (
    <div className="h-full min-h-0 w-full">
      <NextStudio config={config} />
    </div>
  )
}
