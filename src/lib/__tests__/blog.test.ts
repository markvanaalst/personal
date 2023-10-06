import { describe, expect } from 'vitest'

import {
  getLatestPost,
  getLatestPosts,
  getPost,
  getPostsByCategory,
  getPostUrl,
  sortByNewest,
} from '@/lib/blog'

import type { Post } from '.contentlayer/generated/types'

// Sample data for testing
const samplePosts: Post[] = [
  {
    title: 'Sample post 1',
    slug: 'sample-post-1',
    date: '2023-01-01T00:00:00.000Z',
    tags: ['tag-1', 'tag-2', 'tag-3'],
    categories: ['category-1'],
    excerpt: 'This is a sample post',
    image: '/images/blog/sample-post-1.jpg',
    body: {
      raw: '',
      code: '',
    },
    _id: '',
    _raw: {
      sourceFilePath: '',
      sourceFileName: '',
      sourceFileDir: '',
      contentType: 'mdx',
      flattenedPath: '',
    },
    type: 'Post',
    slugAsParams: '',
    url: '',
    wordCount: 123,
  },
  {
    title: 'Sample post 2',
    slug: 'sample-post-2',
    date: '2023-01-02T00:00:00.000Z',
    tags: ['tag-1', 'tag-2', 'tag-3'],
    categories: ['category-1'],
    excerpt: 'This is a sample post',
    image: '/images/blog/sample-post-2.jpg',
    body: {
      raw: '',
      code: '',
    },
    _id: '',
    _raw: {
      sourceFilePath: '',
      sourceFileName: '',
      sourceFileDir: '',
      contentType: 'mdx',
      flattenedPath: '',
    },
    type: 'Post',
    slugAsParams: '',
    url: '',
    wordCount: 123,
  },
  {
    title: 'Sample post 3',
    slug: 'sample-post-3',
    date: '2023-01-02T00:00:00.000Z',
    tags: ['tag-1', 'tag-2', 'tag-3'],
    categories: [],
    excerpt: 'This is a sample post',
    image: '/images/blog/sample-post-2.jpg',
    body: {
      raw: '',
      code: '',
    },
    _id: '',
    _raw: {
      sourceFilePath: '',
      sourceFileName: '',
      sourceFileDir: '',
      contentType: 'mdx',
      flattenedPath: '',
    },
    type: 'Post',
    slugAsParams: '',
    url: '',
    wordCount: 123,
  },
]

describe('getPost', () => {
  test('should return the correct post', () => {
    const post = getPost('sample-post-1', samplePosts)
    expect(post).toEqual(samplePosts[0])
  })

  test('should return undefined for non-existing post', () => {
    const post = getPost('non-existing-post', samplePosts)
    expect(post).toBeUndefined()
  })
})

describe('getLatestPosts', () => {
  test('should return the latest posts', () => {
    const latestPosts = getLatestPost(samplePosts)
    expect(latestPosts).toEqual(samplePosts[0])
  })

  test('should return the correct number of latest posts', () => {
    const latestPosts = getLatestPosts(2, false, samplePosts)
    expect(latestPosts).toEqual([samplePosts[0], samplePosts[1]])
  })

  test('should return all posts when count is larger than the number of posts', () => {
    const latestPosts = getLatestPosts(10, false, samplePosts)
    expect(latestPosts).toEqual(samplePosts)
  })
})

describe('sortByNewest', () => {
  test('should sort posts by newest date', () => {
    const sortedPosts = sortByNewest(samplePosts)
    expect(sortedPosts).toEqual([
      samplePosts[0],
      samplePosts[1],
      samplePosts[2],
    ])
  })
})

describe('getPostUrl', () => {
  test('should return the correct post URL with category', () => {
    const postUrl = getPostUrl('sample-post-1', samplePosts)
    expect(postUrl).toBe('category-1/sample-post-1')
  })

  test('should return the correct post URL without category', () => {
    const postUrl = getPostUrl('sample-post-3', samplePosts)
    expect(postUrl).toBe('sample-post-3')
  })

  test('should return an empty string for non-existing post', () => {
    const postUrl = getPostUrl('non-existing-post')
    expect(postUrl).toBe('')
  })
})

describe('getPostsByCategory', () => {
  test('should return the correct number of posts by category', () => {
    const posts = getPostsByCategory('category-1', samplePosts)
    expect(posts?.length).toEqual(2)
  })
})
