'use client';

import { useState, useEffect } from 'react';
import { Post } from '@/types/post';
import { BlogCard } from './blogCard';
import { PostListPaging } from '@/components/blog/postsListPaging';
import { useSearchParams } from 'next/navigation';

export interface PostsListProps {
  posts: Post[];
  itemsPerPage?: number;
  className?: string;
  title?: string
  hidePaging?: boolean;
}

export default function PostsList({
  posts,
  itemsPerPage = 6,
  className,
  hidePaging = false,
  title = 'My writings',
}: PostsListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const searchParams = useSearchParams();
  
  // Initialize page from URL on component mount
  useEffect(() => {
    const pageParam = searchParams.get('page');
    if (pageParam) {
      const page = parseInt(pageParam, 10);
      if (!isNaN(page) && page >= 1 && page <= Math.ceil(posts.length / itemsPerPage)) {
        setCurrentPage(page);
      }
    }
  }, [itemsPerPage, posts.length, searchParams]);
  
  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Scroll to top of the posts list when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`py-6 w-full md:py-6 lg:py-12 ${className || ''}`}>
      <div className="container px-4 md:px-6">
        <h3 className="mb-8 font-serif text-5xl font-caveat">{title}</h3>
        <div className='grid md:grid-cols-3 gap-8'>
          {currentPosts.map((post, index) => (
            <BlogCard post={post} key={index} />
          ))}
        </div>

        {!hidePaging && (
          <PostListPaging
            totalItems={posts.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            queryParamName="page"
          />
        )}
      </div>
    </div>
  );
}
