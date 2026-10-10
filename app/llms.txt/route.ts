import { blogCategories, getAllBlogPosts } from '@/lib/blog';
import { absoluteUrl, authorName, siteDescription } from '@/lib/site';
import { typedResumeData } from '@/lib/types';

export const dynamic = 'force-static';

// Plain-markdown site summary for LLMs and answer engines (https://llmstxt.org).
export async function GET() {
  const posts = await getAllBlogPosts();
  const current = typedResumeData.work[0];
  const currentTitle = current.roles?.[0]?.title ?? current.title;

  const postsByCategory = blogCategories
    .map((category) => {
      const categoryPosts = posts.filter((post) => post.categories[0] === category.slug);
      if (categoryPosts.length === 0) return '';

      const lines = categoryPosts.map((post) => {
        const excerpt = post.excerpt ? `: ${post.excerpt.replace(/\s+/g, ' ').trim()}` : '';
        return `- [${post.title}](${absoluteUrl(`/blog/${post.slug}`)}) (${post.date})${excerpt}`;
      });

      return `## Blog: ${category.name}\n\n${lines.join('\n')}`;
    })
    .filter(Boolean)
    .join('\n\n');

  const social = typedResumeData.contact.social.map((item) => `- [${item.name}](${item.url})`).join('\n');

  const body = `# ${authorName}

> ${typedResumeData.description}. ${siteDescription}

${authorName} is ${currentTitle} at ${current.company}, based in ${typedResumeData.location}, with 20+ years of experience in content management and developer platforms. This site covers applied AI, developer experience, documentation platforms, Sitecore and SXA.

## Pages

- [Home](${absoluteUrl('/')}): Introduction, current work and recent writing
- [About](${absoluteUrl('/about')}): Background, interests and current focus
- [Resume](${absoluteUrl('/resume')}): Work experience, roles and skills
- [Blog](${absoluteUrl('/blog')}): All articles
- [RSS feed](${absoluteUrl('/feed.xml')})

## Elsewhere

${social}

${postsByCategory}
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
