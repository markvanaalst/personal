import { describe, expect } from 'vitest'

import { getPostUrl, sortByNewest } from '../blog'

// Mock the Post type
type Post = {
  slug: string
  date: string
  categories?: string[]
}

// Sample data for testing
const samplePosts: Post[] = [
  {
    slug: 'post-1',
    date: '2023-07-30',
    categories: ['category-1', 'category-2'],
  },
  {
    slug: 'post-2',
    date: '2023-07-29',
    categories: ['category-2'],
  },
  {
    slug: 'post-3',
    date: '2023-07-28',
  },
]

//describe('getPost', () => {
//  test('should return the correct post', () => {
//    const post = getPost('post-1')
//    expect(post).toEqual(samplePosts[0])
//  })
//
//  test('should return undefined for non-existing post', () => {
//    const post = getPost('non-existing-post')
//    expect(post).toBeUndefined()
//  })
//})
//
//describe('getLatestPosts', () => {
//  test('should return the correct number of latest posts', () => {
//    const latestPosts = getLatestPosts(2)
//    expect(latestPosts).toEqual([samplePosts[0], samplePosts[1]])
//  })
//
//  test('should return all posts when count is larger than the number of posts', () => {
//    const latestPosts = getLatestPosts(10)
//    expect(latestPosts).toEqual(samplePosts)
//  })
//})

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
    const postUrl = getPostUrl('post-1')
    expect(postUrl).toBe('category-1/post-1')
  })
})
//
//  test('should return the correct post URL without category', () => {
//    const postUrl = getPostUrl('post-3')
//    expect(postUrl).toBe('post-3')
//  })
//
//  test('should return an empty string for non-existing post', () => {
//    const postUrl = getPostUrl('non-existing-post')
//    expect(postUrl).toBe('')
//  })
//})
