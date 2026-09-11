'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'

import { schemaTypes } from './sanity/schema'

export default defineConfig({
  basePath: '/studio',
  // The Studio route shows a setup screen until real values are provided.
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  plugins: [
    structureTool({
      structure: (S, context) =>
        S.list()
          .title('Content')
          .items([
            orderableDocumentListDeskItem({
              type: 'project',
              title: 'Project',
              S,
              context,
            }),
            ...S.documentTypeListItems().filter(
              (item) => item.getId() !== 'project',
            ),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
  },
})
