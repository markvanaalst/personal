import { allPages } from 'contentlayer/generated'

export function getPageBySlug(slug: string) {
  return allPages.find((page) => page.slug.trim() === slug)
}

export function getPagesSlugs() {
  return allPages.map((page) => page.slug)
}
