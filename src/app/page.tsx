import PostsList from "@/components/blog/postsList";
import { Personal } from "@/components/sections/personal";
import { getAllPosts } from "@/lib/blog";
import { Post } from "@/types/post";

export default async function Home() {
  const posts = (await getAllPosts()) as Post[];

  return (
    <main className="min-h-[calc(100vh-20rem)] flex flex-col items-center py-8 px-6 max-w-7xl mx-auto">
      <Personal />
      <PostsList itemsPerPage={3} posts={posts} hidePaging />
    </main>
  );
}
