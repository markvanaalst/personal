import PostsList from "@/components/blog/postsList";
import { Personal } from "@/components/sections/personal";
import { getAllPosts } from "@/lib/blog";
import { Post } from "@/types/post";

export default async function Home() {
  const posts = (await getAllPosts()) as Post[];

  return (
    <div>
      <Personal />
      <PostsList itemsPerPage={3} posts={posts} hidePaging />
    </div>
  );
}
