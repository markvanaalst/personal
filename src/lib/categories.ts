import { allPosts } from 'contentlayer/generated'

import categories from '@/config/blog-categories.json'

const { categoryList } = categories

type categoryListItem = {
  name: string
  description?: string
  slug: string
  image: string
}
export interface Category extends categoryListItem {
  count: number
}

export function getCategories(): Category[] {
  const _posts = allPosts
  let results: Category[] = []

  categoryList.map((category: categoryListItem) => {
    const cat: Category = {
      name: category.name,
      slug: category.slug,
      image: category.image,
      count: _posts.filter((post) => post.categories.includes(category.slug))
        .length,
    }
    results.push(cat)
  })

  return results
}

export function getCategoryBySlug(slug: string): categoryListItem | undefined {
  return categoryList.find(
    (category: categoryListItem) => category.slug === slug,
  )
}

export function getCategorySlug(
  categoryName: string | undefined,
): categoryListItem | undefined {
  return categoryList.find(
    (category: categoryListItem) => category.name === categoryName,
  )
}
