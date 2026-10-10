import type { MetadataRoute } from 'next';
import { blogCategories, getAllBlogPosts } from '@/lib/blog';
import { absoluteUrl } from '@/lib/site';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllBlogPosts();
  const latestPostDate = posts[0]?.date;

  const staticPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl('/'), lastModified: latestPostDate, changeFrequency: 'monthly', priority: 1 },
    { url: absoluteUrl('/about'), changeFrequency: 'yearly', priority: 0.8 },
    { url: absoluteUrl('/resume'), changeFrequency: 'monthly', priority: 0.8 },
    { url: absoluteUrl('/blog'), lastModified: latestPostDate, changeFrequency: 'weekly', priority: 0.9 },
    { url: absoluteUrl('/blog/category'), changeFrequency: 'monthly', priority: 0.4 },
  ];

  const categoryPages: MetadataRoute.Sitemap = blogCategories.map((category) => ({
    url: absoluteUrl(`/blog/category/${category.slug}`),
    lastModified: posts.find((post) => post.categories.includes(category.slug))?.date,
    changeFrequency: 'monthly',
    priority: 0.5,
  }));

  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: post.date,
    changeFrequency: 'yearly',
    priority: 0.7,
  }));

  return [...staticPages, ...categoryPages, ...postPages];
}
