// next.config.js
const { withContentlayer } = require('next-contentlayer')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/feed',
        destination: '/feeds/rss.xml',
      },
      {
        source: '/atom',
        destination: '/feeds/atom.xml',
      },
      {
        source: '/feed.json',
        destination: '/feeds/rss.json',
      },
      {
        source: '/blog/category/:category*/feed',
        destination: '/feeds/rss-:category*.xml',
      },
      {
        source: '/blog/category/:category*/atom',
        destination: '/feeds/atom-:category*.xml',
      },
      {
        source: '/blog/category/:category*/feed.json',
        destination: '/feeds/rss-:category*.json',
      },
    ]
  },
}

module.exports = withContentlayer(nextConfig)
