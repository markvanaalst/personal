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
    <div className={`w-full py-6 md:py-6 lg:py-12${className}`}>
      <div className="container px-4 md:px-6">
        <h3 className="text-5xl font-light mb-8">My writings</h3>
        <div className='grid md:grid-cols-3 gap-8'>
                
        {posts.slice(skip, limit + skip).map((post, index) => (
          <BlogCard post={post} key={index} />
        ))}
                
          </div>
      </div>
    </div>
  );
}
