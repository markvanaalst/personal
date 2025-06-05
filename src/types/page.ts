import React from 'react';

export interface PageFrontmatter {
  title: string;
  published: boolean;
  slug: string;
  description: string;
  readingTime?: string;
  path?: string[];
  [key: string]: unknown; // Allow additional properties
}

export type Page = {
  frontmatter: PageFrontmatter;
  content: React.ReactNode;
};
