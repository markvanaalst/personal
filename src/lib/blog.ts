import { allPosts, type Post } from 'contentlayer/generated'

//import { getCategoryBySlug } from './categories'

export function getPost(slug: string, posts?: Post[]): Post | undefined {
  const _posts = posts || allPosts

  return _posts.find((post) => post.slug === slug)
}

export function getPostsByCategory(
  categorySlug: string,
  posts?: Post[],
): Post[] | undefined {
  const _posts = posts || allPosts

  return _posts.filter((post) => post.categories.includes(categorySlug))
}

export function getLatestPost(posts?: Post[]) {
  const _posts = posts || allPosts

  return getLatestPosts(1, false, _posts)[0]
}

export function getLatestPosts(
  count: number = 10,
  skipFirst?: boolean,
  posts?: Post[],
) {
  const _posts = posts || allPosts

  return sortByNewest(_posts).slice(skipFirst ? 1 : 0, count)
}

export function sortByNewest<T extends { date: string }>(posts: T[]): T[] {
  return posts.sort(
    (objA, objB) =>
      new Date(objB.date).getTime() - new Date(objA.date).getTime(),
  )
}

export function getPostUrl(slug: string, posts?: Post[]): string {
  const _posts = posts || allPosts
  const _post = _posts.find((post) => post.slug === slug)

  if (_post == undefined) return ''

  if (_post.categories.length > 0) {
    return `${_post.categories[0].replace(' ', '-')}/${_post.slug}`
  }
  return _post.slug
}
