import { allPosts, type Post } from 'contentlayer/generated'

export function getPost(slug: string): Post | undefined {
  return allPosts.find((post) => post.slug === slug)
}

export function getPostsByCategory(category: string): Post[] | undefined {
  return allPosts.filter((post) => post.categories.includes(category))
}

export function getLatestPost() {
  return getLatestPosts(1)[0]
}

export function getLatestPosts(count: number = 10, skipFirst?: boolean) {
  return sortByNewest(allPosts).slice(skipFirst ? 1 : 0, count)
}

export function sortByNewest<T extends { date: string }>(posts: T[]): T[] {
  return posts.sort(
    (objA, objB) =>
      new Date(objB.date).getTime() - new Date(objA.date).getTime(),
  )
}

export function getPostUrl(slug: string): string {
  const _post = allPosts.find((post) => post.slug === slug)

  if (_post == undefined) return ''

  if (_post.categories) {
    return `${_post.categories[0].replace(' ', '-')}/${_post.slug}`
  }
  return _post.slug
}
