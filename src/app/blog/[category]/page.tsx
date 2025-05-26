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

export default async function PostPage(props: { params: Promise<{ category: string }> }) {
  const params = await props.params;
  const posts = await getPostsByCategory(params.category);

  if (!posts || posts.length === 0) {
  // If no posts found for the category, return a 404 page
    notFound();
  }

  return (
    <main>
      <h1>Blog Posts by category</h1>
      <PostsList posts={posts} />
    </main>
  );
}
