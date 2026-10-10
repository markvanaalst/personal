import type { Metadata } from 'next';
import { siteName } from '@/lib/site';

export const defaultOgImage = { url: '/og', width: 1200, height: 630, alt: siteName };

interface PageMetadataOptions {
  title: string;
  description: string;
  /** Site-relative canonical path, e.g. `/blog`. */
  path: string;
  /** Use the title verbatim instead of applying the root title template. */
  absoluteTitle?: boolean;
  image?: { url: string; width: number; height: number; alt: string };
  openGraph?: Metadata['openGraph'];
}

/**
 * Builds complete per-page metadata. Next.js merges `openGraph`, `twitter` and `alternates`
 * shallowly, so each page needs the full set rather than relying on the root layout.
 */
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
  image = defaultOgImage,
  openGraph,
}: PageMetadataOptions): Metadata {
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      siteName,
      url: path,
      title,
      description,
      images: [image],
      ...openGraph,
    } as Metadata['openGraph'],
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image.url],
    },
  };
}
