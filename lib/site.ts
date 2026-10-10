import { typedResumeData } from '@/lib/types';

export const siteUrl = typedResumeData.url;
export const authorName = `${typedResumeData.firstName} ${typedResumeData.lastName}`;
export const siteName = authorName;
export const siteTitle = `${authorName} | ${typedResumeData.description}`;
export const siteDescription = typedResumeData.summary;
export const authorImage = '/mva_profile.webp';
export const sameAs = typedResumeData.contact.social.map((social) => social.url);

/** Resolves a site-relative path to an absolute URL on the canonical origin. */
export function absoluteUrl(path = '/'): string {
  return new URL(path, siteUrl).toString();
}

/**
 * Normalizes a frontmatter date (quoted string or YAML-parsed Date) to YYYY-MM-DD.
 */
export function toIsoDate(value: unknown): string {
  const date = value instanceof Date ? value : new Date(String(value));
  return Number.isNaN(date.getTime()) ? String(value) : date.toISOString().slice(0, 10);
}

// Shared content column: every page's left edge lines up with this.
export const contentColumn = 'mx-auto w-full max-w-4xl px-6 sm:px-12 lg:px-16';
