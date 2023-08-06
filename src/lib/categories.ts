import type { Post } from 'contentlayer/generated'
import { allPosts } from 'contentlayer/generated'

type category = {
  name: string
  count: number
}

export function getCategories(): category[] {
  const _posts = allPosts
  let categories: category[] = []

  _posts.map((post: Post) => {
    post.categories.map((singleCategory) => {
      const object = categories.find((x) => x.name == singleCategory)

      if (!object) {
        const cat: category = {
          name: singleCategory,
          count: _posts.filter((post) =>
            post.categories.includes(singleCategory),
          ).length,
        }
        categories.push(cat)
      }
    })
  })

  return categories
}
