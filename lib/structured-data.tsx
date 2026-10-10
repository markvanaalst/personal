import type { BlogPost } from '@/lib/types';
import { typedResumeData } from '@/lib/types';
import {
  absoluteUrl,
  authorImage,
  authorName,
  sameAs,
  siteDescription,
  siteName,
  siteUrl,
  toIsoDate,
} from '@/lib/site';

type JsonLdObject = Record<string, unknown>;

const personId = `${siteUrl}/#person`;
const websiteId = `${siteUrl}/#website`;

/** Renders schema.org JSON-LD. `<` is escaped so content can never close the script tag. */
export function JsonLd({ data }: { data: JsonLdObject | JsonLdObject[] }) {
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: serialized JSON-LD with escaped markup
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}

export function personSchema(): JsonLdObject {
  const current = typedResumeData.work[0];

  return {
    '@type': 'Person',
    '@id': personId,
    name: authorName,
    url: siteUrl,
    image: absoluteUrl(authorImage),
    description: typedResumeData.description,
    jobTitle: current.roles?.[0]?.title ?? current.title,
    worksFor: { '@type': 'Organization', name: current.company, url: current.href },
    address: { '@type': 'PostalAddress', addressLocality: 'Ede', addressCountry: 'NL' },
    knowsAbout: typedResumeData.skillCategories.flatMap((category) =>
      category.skills.map((skill) => skill.name),
    ),
    sameAs,
  };
}

export function websiteSchema(): JsonLdObject {
  return {
    '@type': 'WebSite',
    '@id': websiteId,
    url: siteUrl,
    name: siteName,
    description: siteDescription,
    inLanguage: 'en',
    author: { '@id': personId },
    publisher: { '@id': personId },
  };
}

export function siteGraph(): JsonLdObject {
  return { '@context': 'https://schema.org', '@graph': [personSchema(), websiteSchema()] };
}

export function profilePageSchema(path: string, name: string): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    url: absoluteUrl(path),
    name,
    isPartOf: { '@id': websiteId },
    mainEntity: { '@id': personId },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function blogPostingSchema(post: BlogPost): JsonLdObject {
  const url = absoluteUrl(`/blog/${post.slug}`);

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    mainEntityOfPage: url,
    url,
    headline: post.title,
    description: post.excerpt,
    datePublished: toIsoDate(post.date),
    dateModified: toIsoDate(post.date),
    image: absoluteUrl(`/blog/og/${post.slug}`),
    inLanguage: 'en',
    articleSection: post.categories,
    keywords: post.tags.join(', ') || undefined,
    timeRequired: post.readTime,
    author: { '@id': personId, '@type': 'Person', name: authorName, url: siteUrl },
    publisher: { '@id': personId },
    isPartOf: { '@id': websiteId },
  };
}
