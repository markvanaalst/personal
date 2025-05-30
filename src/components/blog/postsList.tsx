'use client';

import { Post } from '@/types/post';
import { BlogCard } from './blogCard';

export interface PostsListProps {
  posts: Post[];
  limit?: number;
  skip?: number;
  className?: string;
}

export default function PostsList({
  posts,
  limit = posts.length,
  skip = 0,
  className,
}: PostsListProps) {
  return (
    <div className={`py-6 w-full md:py-6 lg:py-12${className}`}>
      <div className="container px-4 md:px-6">
        <h3 className="mb-8 font-serif text-5xl font-caveat">My writings</h3>
        <div className='grid gap-8 md:grid-cols-3'>
                
        {posts.slice(skip, limit + skip).map((post, index) => (
          <BlogCard post={post} key={index} />
        ))}
                
          </div>
      </div>
    </div>
  );
}
