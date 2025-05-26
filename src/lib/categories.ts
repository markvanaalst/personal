import { getAllPosts } from './blog'
import categories from '@content/blog/categories.json'

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

export async function getCategories(): Promise<Category[]> {
  const _posts = await getAllPosts();
  const results: Category[] = [];

  categoryList.map((category: categoryListItem) => {
    const cat: Category = {
      name: category.name,
      slug: category.slug,
      image: category.image,
      count: _posts.filter((post) => post.frontmatter.categories.includes(category.slug))
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