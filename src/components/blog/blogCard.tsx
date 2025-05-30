import { Post } from '@/types/post';
import { Card, CardContent, CardFooter, CardTitle } from '../ui/card';

export interface BlogCardProps {
  post: Post;
}

export const BlogCard = ({ post }: BlogCardProps) => {
    return (

    <Card>
      <CardTitle>
        <h2 className="px-4">{post.frontmatter.title}</h2>
      </CardTitle>
      <CardContent className="px-4">{post.frontmatter.excerpt}</CardContent>
      <CardFooter>
        <a
          href={`/blog/${post.frontmatter.slug}`}
          className="text-blue-600 dark:text-blue-400 mt-4 inline-block"
        >
          Read more
        </a>
      </CardFooter>
    </Card>
    
  );
};
