import PostsList from "@/components/blog/postsList";
import TextGenerateEffect from "@/components/text/typewriter";
import { getAllPosts } from "@/lib/blog";
import { Post } from "@/types/post";

export default async function Home() {
  const posts = (await getAllPosts()) as Post[];

  return (
    <div>
      <TextGenerateEffect
        words="MarkvanAalst.com"
        className="text-4xl font-semibold text-center mt-10 animate-fade-in"
      />
      <PostsList limit={5} posts={posts} skip={0} />
    </div>
  );
}
