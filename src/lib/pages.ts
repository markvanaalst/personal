import { allPages } from 'contentlayer/generated'

export function getPageBySlug(slug: string[]) {
  return allPages.find((page) => page.slugAsParams === slug.join('/'))
}

export function getPagesSlugs() {
  return allPages.map((page) => page.slug)
}
