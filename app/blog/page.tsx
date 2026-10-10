import type { Metadata } from 'next';
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
import { pageMetadata } from '@/lib/metadata';
import { JsonLd, breadcrumbSchema } from '@/lib/structured-data';
import { cn } from '@/lib/utils';

const blogDescription =
  'Articles by Mark van Aalst on AI, developer experience, documentation platforms, Sitecore, SXA and software engineering.';

export async function generateMetadata({ searchParams }: BlogPageProps): Promise<Metadata> {
  const { page } = await searchParams;
  const currentPage = getCurrentPage(Array.isArray(page) ? page[0] : page);
  const isFirstPage = currentPage <= 1;

  return pageMetadata({
    title: isFirstPage ? 'Blog' : `Blog – Page ${currentPage}`,
    description: blogDescription,
    path: isFirstPage ? '/blog' : `/blog?page=${currentPage}`,
  });
}

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
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blog' }])} />
      <h1 className="sr-only">Blog</h1>
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
