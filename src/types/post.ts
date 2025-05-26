import React from "react";

export interface PostFrontmatter {
  title: string;
  date: string;
  excerpt?: string;
  slug: string;
  categories: string[];
  tags?: string[];
  published?: boolean;
  author?: string;
  image?: string;
  readingTime?: string;
  [key: string]: unknown; // Allow additional properties
}

export type Post = {
  frontmatter: PostFrontmatter;
  content: React.ReactNode;
};