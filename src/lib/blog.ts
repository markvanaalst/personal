'use server';

import path from 'path';
import { Post, PostFrontmatter } from '@/types/post';
import { findMdxFiles, readAndCompileMdx } from './mdx';
import { parsePostDate } from './date';

// Constants
const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

/**
 * Recursively finds all MDX files in the /content/blog directory and its subdirectories
 * @returns Promise containing an array of paths to MDX files relative to the content/blog folder
 */
export async function getAllBlogMdxFiles(): Promise<string[]> {
  try {
    return await findMdxFiles(BLOG_DIR, '');
  } catch (error) {
    console.error('Error getting MDX files:', error);
    return [];
  }
}


/**
 * Gets a single post by its slug (filepath without extension)
 * @param slug An array of strings representing the filepath components without extension
 * @returns Promise containing the post data or null if not found
 */
export async function getPostBySlug(slug: string[]): Promise<Post | null> {
  const slugPath = slug.join('/');
  const posts: Post[] = await getAllPosts();

  const post = posts.find(p => p.frontmatter.slug === slugPath);
  if (post) {
    return post;
  }

  return null;
}

/**
 * Retrieves a blog post by its category and slug.
 * @param category - The category to search for
 * @param slug - The unique slug identifier of the post
 * @returns Promise that resolves to the found Post object, or null if not found or if an error occurs
 */
export async function getPostByCategoryAndSlug(category: string, slug: string): Promise<Post | null> {
  try {
    const posts = await getAllPosts();
    const post = posts.find(p => p.frontmatter.slug === slug && p.frontmatter.categories.includes(category));
    return post || null;
  }
  catch (error) {
    console.error(`Error getting post by category and slug (${category}/${slug}):`, error);
    return null;
  }
}


/**
 * Retrieves a blog post by its category and slug.
 * @param category - The category to search for
 * @returns Promise that resolves to the found Post object, or null if not found or if an error occurs
 */
export async function getPostsByCategory(category: string): Promise<Post[] | null> {
  try {
    const posts = await getAllPosts();
    const filteredPosts = posts.filter(p => p.frontmatter.categories.includes(category));
    return filteredPosts.length > 0 ? filteredPosts : null;
  }
  catch (error) {
    console.error(`Error getting posts by category (${category}):`, error);
    return null;
  }
}


/**
 * Gets all blog posts, sorted by date (newest first)
 * @returns Promise containing an array of all posts
 */
export async function getAllPosts(): Promise<Post[]> {
  try {
    const files = await getAllBlogMdxFiles();
    const mdxFiles = files.filter(f => f.endsWith('.mdx'));
    
    const postsPromises = mdxFiles.map(async (file) => {
      const result = await readAndCompileMdx<PostFrontmatter>(BLOG_DIR, file);
      
      if (!result) return null;
      
      return {
        frontmatter: result.frontmatter,
        content: result.content
      };
    });
    
    const posts = (await Promise.all(postsPromises)).filter((post): post is Post => post !== null);
    
    // Sort by date (DD-MM-YYYY) descending
    return posts.sort((a, b) => {
      const dateA = parsePostDate(a.frontmatter.date);
      const dateB = parsePostDate(b.frontmatter.date);
      return dateB.getTime() - dateA.getTime();
    });
  } catch (error) {
    console.error('Error getting all posts:', error);
    return [];
  }
}
