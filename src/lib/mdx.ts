import { compileMDX } from 'next-mdx-remote/rsc';

export async function getMDXContent(source: string) {
  const { content, frontmatter } = await compileMDX<{ title: string }>({
    source,
    options: { parseFrontmatter: true },
  });
  return { content, frontmatter };
}
