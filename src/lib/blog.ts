'use server';

import { readdir } from 'fs/promises';
import path from 'path';
import fs from 'fs/promises';
import { compileMDX } from 'next-mdx-remote/rsc';
import { Post, PostFrontmatter } from '@/types/post';
import { components } from '@/components/mdx/mdxRenderer';

// Constants
const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');
const MDX_EXTENSIONS = ['.mdx', '.md'];

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
 * Helper function to recursively search for MDX files
 * @param dir The absolute directory path to search in
 * @param relativePath The relative path from the blog directory
 * @returns Promise containing an array of paths to MDX files
 */
async function findMdxFiles(dir: string, relativePath: string): Promise<string[]> {
  try {
    const entries = await readdir(dir, { withFileTypes: true });
    const files: string[] = [];

    await Promise.all(entries.map(async (entry) => {
      const entryPath = path.join(dir, entry.name);
      const entryRelativePath = path.join(relativePath, entry.name);

      if (entry.isDirectory()) {
        const subFiles = await findMdxFiles(entryPath, entryRelativePath);
        files.push(...subFiles);
      } else if (entry.isFile() && MDX_EXTENSIONS.some(ext => entry.name.endsWith(ext))) {
        files.push(entryRelativePath);
      }
    }));

    return files;
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error);
    return [];
  }
}

/**
 * Reads and compiles an MDX file
 * @param filePath Path to the MDX file relative to the blog directory
 * @returns Compiled MDX content and frontmatter
 */
async function readAndCompileMdx(filePath: string): Promise<{ content: React.ReactNode; frontmatter: PostFrontmatter } | null> {
  try {
    const fullPath = path.join(BLOG_DIR, filePath);
    const source = await fs.readFile(fullPath, 'utf8');
    
    const result = await compileMDX<PostFrontmatter>({
      source,
      options: { parseFrontmatter: true },
      components
    });
    
    return {
      content: result.content,
      frontmatter: result.frontmatter
    };
  } catch (error) {
    console.error(`Error reading/compiling MDX file ${filePath}:`, error);
    return null;
  }
}

/**
 * Gets a single post by its slug (filepath without extension)
 * @param slug An array of strings representing the filepath components without extension
 * @returns Promise containing the post data or null if not found
 */
export async function getPostBySlug(slug: string[]): Promise<Post | null> {
  const slugPath = slug.join('/');
  //const filePath = `${slugPath}.mdx`;

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
 * Parses a date string in DD-MM-YYYY format to a Date object
 * @param dateStr Date string in DD-MM-YYYY format
 * @returns Date object
 */
function parsePostDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day);
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
      const result = await readAndCompileMdx(file);
      
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
