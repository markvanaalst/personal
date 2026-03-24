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
    <main className="max-w-6xl px-4 py-8 mx-auto flex justify-center items-stretch gap-6 lg:py-16 flex-col">

      <div className="hidden w-full lg:flex-1 items-center justify-between">
        
      </div>

      <div className="w-full flex flex-col lg:flex-row items-start gap-6">
        <BlogCategoryList />

        <div className="w-full lg:w-3/4 text-md relative">
          <BlogList posts={paginatedPosts} />

          <Pagination
            currentPage={paginationInfo.currentPage}
            totalPages={paginationInfo.totalPages}
            baseUrl="/blog"
          />
        </div>
      </div>
    </main>
  );
}