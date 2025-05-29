'use client';

import { Post } from '@/types/post';
import Link from 'next/link';

export interface PostsListProps {
  posts: Post[];
  limit?: number
  skip?: number;
  className?: string;
}

export default function PostsList({ posts, limit = posts.length, skip = 0, className }: PostsListProps) {
  return (
    <ul className={`list-disc pl-5 space-y-2 ${className}`}>
      {posts.slice(skip, limit + skip).map(({ frontmatter: { title, date, slug, categories }}, index) => (
        <li key={`${slug}-${index}`}>
          <Link href={`/blog/${categories[0]}/${slug}`}>
            <>{title} <span className="text-sm text-gray-500">({date})</span></>
          </Link>
        </li>
      ))}
    </ul>
  );
}
