import { notFound } from 'next/navigation';
import { getPostsByCategory } from '@/lib/blog';
import PostsList from '@/components/blog/postsList';
import { getCategories } from '@/lib/categories';

export async function generateStaticParams() {
  const categories = await getCategories();

  return categories.map(category => ({
      category: category.slug,
    }));
}

export default async function PostPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const posts = await getPostsByCategory(params.slug);

  if (!posts || posts.length === 0) {
  // If no posts found for the category, return a 404 page
    notFound();
  }

  return (
    <main className="min-h-[calc(100vh-20rem)] flex flex-col items-center py-8 px-6 max-w-7xl mx-auto">
      <PostsList posts={posts} title={`My writings on ${params.slug}`} />
    </main>
  );
}