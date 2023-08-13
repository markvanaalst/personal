import categories from '@config/blog-categories.json'
import { allPosts } from 'contentlayer/generated'

type categoryListItem = {
  name: string
  description?: string
  slug: string
}
type Category = {
  name: string
  description?: string
  slug: string
  count: number
}

export function getCategories(): Category[] {
  const _posts = allPosts
  const { categoryList } = categories
  let results: Category[] = []

  categoryList.map((category: categoryListItem) => {
    const cat: Category = {
      name: category.name,
      slug: category.slug,
      count: _posts.filter((post) => post.categories.includes(category.slug))
        .length,
    }
    results.push(cat)
  })

  return results
}
