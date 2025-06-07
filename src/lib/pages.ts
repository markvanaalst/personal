'use server';

import path from 'path';
import { findMdxFiles, readAndCompileMdx } from './mdx';
import { Page, PageFrontmatter } from '@/types/page';

// Constants
const PAGES_DIR = path.join(process.cwd(), 'content', 'pages');


/**
 * Retrieves a page file by its slug.
 * 
 * @param slug - An array of string segments that make up the page's path
 * @returns A Promise that resolves to a Page object containing frontmatter and content
 * @throws Error if the page is not found at the specified path
 */
export async function getPageFileBySlug(slug: string[]): Promise<Page> {
  const slugPath = slug.join('/');
  
  const filePath = path.join(`${slugPath}.mdx`);
  const result = await readAndCompileMdx<PageFrontmatter>(PAGES_DIR, filePath);
  if (!result) {
    throw new Error(`Page not found: ${slugPath}`);
  }
  return {
    frontmatter: result.frontmatter,
    content: result.content
  };
}

/**
 * Recursively finds all MDX files in the /content/blog directory and its subdirectories
 * @returns Promise containing an array of paths to MDX files relative to the content/blog folder
 */
export async function getAllPagesMdxFiles(): Promise<string[]> {
  try {
    return await findMdxFiles(PAGES_DIR, '');
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
export async function getPageBySlug(slug: string[]): Promise<Page | null> {
  const slugPath = slug.join('/');
  const pages: Page[] = await getAllPages();

  console.log(pages);

  const page = pages.find(p => p.frontmatter.slug === slugPath);
  if (page) {
    return page;
  }

  return null;
}

/**
 * Gets all blog posts, sorted by date (newest first)
 * @returns Promise containing an array of all posts
 */
export async function getAllPages(): Promise<Page[]> {
  try {
    const files = await getAllPagesMdxFiles();
    const mdxFiles = files.filter(f => f.endsWith('.mdx'));
    console.log('MDX Files:', files);
    const pagesPromises = mdxFiles.map(async (file) => {
      const result = await readAndCompileMdx<PageFrontmatter>(PAGES_DIR, file);

      if (!result) return null;
      
      return {
        frontmatter: result.frontmatter,
        content: result.content
      };
    });

      const pages = (await Promise.all(pagesPromises)).filter((post): post is Page => post !== null);
      return pages;

  } catch (error) {
    console.error('Error getting all pages:', error);
    return [];
  }
}
