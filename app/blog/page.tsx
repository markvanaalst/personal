import { Metadata } from 'next';
import { getAllBlogPosts, } from '@/lib/blog';
import { BlogList } from '@/components/blog/blog-list';
import { Pagination } from '@/components/blog/blog-pagination';
import {
  getCurrentPage,
  getPaginationInfo,
  getPaginatedItems,
  POSTS_PER_PAGE,
} from '@/lib/pagination';
import { BlogCategoryList } from '@/components/blog/blog-category-list';
import { contentColumn } from '@/lib/site';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Blog | Personal IT Website',
  description: 'Thoughts and insights about technology, development, and IT',
};

interface BlogPageProps {
  searchParams: Promise<{
    page?: string | string[];
  }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { page } = await searchParams;
  const currentPage = getCurrentPage(Array.isArray(page) ? page[0] : page);
  const allPosts = await getAllBlogPosts();

  const paginationInfo = getPaginationInfo(
    allPosts.length,
    currentPage,
    POSTS_PER_PAGE
  );

  const paginatedPosts = getPaginatedItems(
    allPosts,
    currentPage,
    POSTS_PER_PAGE
  );

  return (
    <main className={cn(contentColumn, 'flex flex-col gap-6 pt-16 lg:pt-24')}>
      <BlogCategoryList />

      <div className="w-full">
        <BlogList posts={paginatedPosts} />

        <Pagination
          currentPage={paginationInfo.currentPage}
          totalPages={paginationInfo.totalPages}
          baseUrl="/blog"
        />
      </div>
    </main>
  );
}
