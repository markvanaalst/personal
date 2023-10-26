import type { ComputedFields } from 'contentlayer/source-files'
import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import powershell from 'highlight.js/lib/languages/powershell'
import highlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'

/** @type {import('contentlayer/source-files').ComputedFields} */
const siteURL =
  process.env.VERCEL_URL !== undefined
    ? process.env.VERCEL_URL
    : 'http://localhost:3000'

const computedFields: ComputedFields = {
  slugAsParams: {
    type: 'string',
    resolve: (doc) => doc._raw.flattenedPath.split('/').slice(1).join('/'),
  },
  url: {
    type: 'string',
    resolve: (post) => `${siteURL}/blog/${post.slug}`,
  },
  wordCount: {
    type: 'number',
    resolve: (doc) => doc.body.raw.split(/\s+/gu).length,
  },
}

export const Page = defineDocumentType(() => ({
  name: 'Page',
  filePathPattern: `pages/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    published: {
      type: 'boolean',
      required: true,
      default: false,
    },
    slug: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
    },
  },
  computedFields,
}))

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `blog/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    slug: { type: 'string', required: true },
    date: { type: 'date', required: true },
    published: {
      type: 'boolean',
      required: true,
      default: false,
    },
    tags: {
      type: 'list',
      of: { type: 'string' },
    },
    categories: {
      type: 'list',
      of: { type: 'string' },
      required: true,
    },
    excerpt: { type: 'string' },
    image: {
      type: 'string',
      required: false,
      default: '/images/blog/StockSnap_ZTXOFYBPSL-scaled.jpg',
    },
  },
  computedFields,
}))

export default makeSource({
  contentDirPath: './content',
  documentTypes: [Post, Page],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      [highlight, { languages: { powershell } }],
      // @ts-ignore
      //[rehypeImgSize, { dir: 'public' }],
    ],
  },
})
