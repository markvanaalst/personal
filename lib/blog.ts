import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { BlogPost, BlogCategory, BlogCategoryWithPostCount } from './types';
import categoriesData from '@/content/blog/categories.json';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

export const blogCategories: BlogCategory[] = categoriesData.categories;

export function getBlogCategories(): BlogCategory[] {
  return blogCategories;
}

export async function getBlogCategoriesWithPostCount(): Promise<
  BlogCategoryWithPostCount[]
> {
  try {
    const allPosts = await getAllBlogPosts();

    return blogCategories.map((category) => ({
      ...category,
      postCount: allPosts.filter((post) =>
        post.categories.includes(category.slug)
      ).length,
    }));
  } catch (error) {
    console.error('Error getting blog categories with post count:', error);
    return blogCategories.map((category) => ({ ...category, postCount: 0 }));
  }
}

/**
 * Recursively finds all .mdx files in a directory and its subdirectories
 */
function getAllMdxFiles(dir: string, fileList: string[] = []): string[] {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      getAllMdxFiles(filePath, fileList);
    } else if (file.endsWith('.mdx')) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    const files = getAllMdxFiles(BLOG_DIR);

    const posts = files.map((filePath) => {
      // Get relative path from BLOG_DIR and remove .mdx extension to create slug
      const relativePath = path.relative(BLOG_DIR, filePath);
      const slug = relativePath.replace(/\.mdx$/, '').replace(/\\/g, '/');
      
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title,
        content,
        excerpt: data.excerpt,
        date: data.date,
        readTime: readingTime(content).text,
        categories: data.categories || [],
        published: data.published !== false,
      } as BlogPost;
    });

    // Filter published posts and sort by date descending
    return posts
      .filter(post => post.published)
      .sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
  } catch (error) {
    console.error('Error loading blog posts:', error);
    return [];
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    // Convert slug to file path (handle both forward and backward slashes)
    const normalizedSlug = slug.replace(/\//g, path.sep);
    const filePath = path.join(BLOG_DIR, `${normalizedSlug}.mdx`);

    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title,
      content,
      excerpt: data.excerpt,
      date: data.date,
      readTime: readingTime(content).text,
      categories: data.categories || [],
      published: data.published !== false,
    } as BlogPost;
  } catch (error) {
    console.error(`Error loading blog post ${slug}:`, error);
    return null;
  }
}

export async function getBlogPostBySlugWithMdx(
  slug: string
): Promise<{
  slug: string;
  frontmatter: Record<string, unknown>;
  content: string;
  readTime: string;
} | null> {
  try {
    // Convert slug to file path (handle both forward and backward slashes)
    const normalizedSlug = slug.replace(/\//g, path.sep);
    const filePath = path.join(BLOG_DIR, `${normalizedSlug}.mdx`);

    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    // For RSC, return raw content string - MDXRemote will handle compilation
    return {
      slug,
      frontmatter: data,
      content,
      readTime: readingTime(content).text,
    };
  } catch (error) {
    console.error(`Error loading blog post ${slug}:`, error);
    return null;
  }
}

export async function getAllBlogSlugs(): Promise<string[]> {
  try {
    const files = getAllMdxFiles(BLOG_DIR);
    return files.map((filePath) => {
      const relativePath = path.relative(BLOG_DIR, filePath);
      return relativePath.replace(/\.mdx$/, '').replace(/\\/g, '/');
    });
  } catch (error) {
    console.error('Error getting blog slugs:', error);
    return [];
  }
}

export async function getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
  try {
    const allPosts = await getAllBlogPosts();
    return allPosts.filter(post => post.categories.includes(category));
  } catch (error) {
    console.error(`Error getting blog posts for category ${category}:`, error);
    return [];
  }
}