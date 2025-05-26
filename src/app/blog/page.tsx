import PostsList from '@/components/blog/postsList';
import { getAllPosts } from '@/lib/blog';
import type { Post } from '@/types/post';

export default async function Home() {
  const posts = (await getAllPosts()) as Post[];

  return (
    <main>
      <PostsList posts={posts}  />
    </main>
  );
}
