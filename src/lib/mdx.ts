'use server';

import { readdir } from 'fs/promises';
import path from 'path';
import fs from 'fs/promises';
import { compileMDX } from 'next-mdx-remote/rsc';
import { components } from '@/components/mdx/mdxRenderer';

const MDX_EXTENSIONS = ['.mdx', '.md'];

/**
 * Compiles MDX content and extracts frontmatter
 * 
 * This function takes MDX source code as input, compiles it, and returns
 * both the compiled content and the extracted frontmatter.
 * 
 * @param source - The MDX source code as a string
 * @returns An object containing the compiled content and frontmatter
 */
export async function getMDXContent(source: string) {
  const { content, frontmatter } = await compileMDX<{ title: string }>({
    source,
    options: { parseFrontmatter: true },
  });
  return { content, frontmatter };
}

/**
 * Helper function to recursively search for MDX files
 * @param dir The absolute directory path to search in
 * @param relativePath The relative path from the blog directory
 * @returns Promise containing an array of paths to MDX files
 */
export async function findMdxFiles(dir: string, relativePath: string): Promise<string[]> {
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
export async function readAndCompileMdx<T>(root: string, filePath: string): Promise<{ content: React.ReactNode; frontmatter: T } | null> {
  try {
    const fullPath = path.join(root, filePath);
    const source = await fs.readFile(fullPath, 'utf8');
    
    const result = await compileMDX<T>({
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