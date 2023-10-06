import type { Metadata } from 'next'
import { describe, expect, it } from 'vitest'

import { defaultMetadata, getMetadata } from '../metadata'

const title = 'MarkvanAalst.com | blogging about web technologies'
const description =
  'Mark van Aalst is blogging about web development, technology and Sitecore.'

const expectedMetadata: Metadata = {
  applicationName: defaultMetadata.applicationName,
  authors: {
    name: defaultMetadata.author.name,
    url: defaultMetadata.author.url,
  },
  description,
  keywords: defaultMetadata.keywords.join(','),
  metadataBase: new URL('https://mva.vercel.app'),
  title: 'MarkvanAalst.com | blogging about web technologies',
  openGraph: {
    description,
    images: `https://mva.vercel.app/api/og?title=${encodeURIComponent(
      'MarkvanAalst.com',
    )}&description=${encodeURIComponent(description)}`,
    siteName: 'MarkvanAalst.com',
    title: 'MarkvanAalst.com | blogging about web technologies',
    url: 'https://mva.vercel.app/',
  },
  robots: defaultMetadata.robots,
  viewport: {
    initialScale: 1,
    maximumScale: 5,
    minimumScale: 1,
    userScalable: true,
    width: 'device-width',
  },
}

describe('getMetadata', () => {
  it('should return metadata correctly', () => {
    expect(getMetadata()).toEqual(expectedMetadata)
  })

  it('should return metadata without keywords', () => {
    const metadata: Metadata = {
      ...expectedMetadata,
      keywords: '',
    }

    expect(getMetadata({ keywords: null })).toEqual(metadata)
  })

  it('should return metadata with string keywords', () => {
    const metadata: Metadata = {
      ...expectedMetadata,
      keywords: 'template,starter',
    }

    expect(getMetadata({ keywords: 'template,starter' })).toEqual(metadata)
  })
})
