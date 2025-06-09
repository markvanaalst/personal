import 'server-only'

import { Feed } from 'feed'
import fs from 'fs'

import { getLatestPosts, getPostsByCategory, getPostUrl } from './blog'
import type { Category } from './categories'
import { getCategories } from './categories'
import { defaultMetadata } from './metadata'
import { getBaseUrl } from './utils'
import { Post } from '@/types/post'

const author = {
  name: defaultMetadata.author.name,
  email: defaultMetadata.author.email,
  link: defaultMetadata.author.url,
}
const siteURL =
  process.env.VERCEL_URL !== undefined
    ? process.env.VERCEL_URL
    : 'http://localhost:3000'
const date = new Date()

export const generateRssFeed = async () => {
  CreateMainFeed()

  const categories = await getCategories()

  categories.forEach((category: Category) => {
    generateRssFeedByCategory(category)
  })
}

async function generateRssFeedByCategory(category: Category): Promise<void> {
  const categoryPosts = await getPostsByCategory(category.slug)
  if (categoryPosts == undefined) return
  const categoryUrl = `${siteURL}/blog/${category.slug}`

  const feed = new Feed({
    title: defaultMetadata.title,
    description: defaultMetadata.description,
    id: getBaseUrl(),
    link: categoryUrl,
    image: `${siteURL}/logo.svg`,
    favicon: `${siteURL}/favicon.png`,
    copyright: `All rights reserved ${date.getFullYear()}, ${author.name}`,
    updated: date,
    generator: 'Feed for Node.js',
    feedLinks: {
      rss2: `${categoryUrl}/feed.xml`,
      json: `${categoryUrl}/feed.json`,
      atom: `${categoryUrl}/atom.xml`,
    },
    author,
  })

  AddPostsToFeed(feed, categoryPosts)

  fs.writeFileSync(`./public/feeds/rss-${category.slug}.xml`, feed.rss2())
  fs.writeFileSync(`./public/feeds/rss-${category.slug}.json`, feed.json1())
  fs.writeFileSync(`./public/feeds/atom-${category.slug}.xml`, feed.atom1())
}

function AddPostsToFeed(feed: Feed, posts: Post[]) {
  posts.forEach(async (post: Post) => {
      const url = await getPostUrl(post);

    feed.addItem({
      title: post.frontmatter.title,
      id: url,
      link: `${siteURL}/${url}`,
      description: post.frontmatter.excerpt,
      date: new Date(post.frontmatter.date),
    })
  })
}

async function CreateMainFeed() {
  const latestPosts = await getLatestPosts()

  const feed = new Feed({
    title: defaultMetadata.title,
    description: defaultMetadata.description,
    id: getBaseUrl(),
    link: siteURL,
    image: `${siteURL}/logo.svg`,
    favicon: `${siteURL}/favicon.png`,
    copyright: `All rights reserved ${date.getFullYear()}, ${author.name}`,
    updated: date,
    generator: 'Feed for Node.js',
    feedLinks: {
      rss2: `${siteURL}/feeds/rss.xml`,
      json: `${siteURL}/feeds/rss.json`,
      atom: `${siteURL}/feeds/atom.xml`,
    },
    author,
  })

  AddPostsToFeed(feed, latestPosts)

  fs.mkdirSync('./public/feeds', { recursive: true })
  fs.writeFileSync('./public/feeds/feed.xml', feed.rss2())
  fs.writeFileSync('./public/feeds/atom.xml', feed.atom1())
  fs.writeFileSync('./public/feeds/feed.json', feed.json1())
}