import { ImageResponse } from 'next/og';
import { getBlogPostBySlug } from '@/lib/blog';
import { LogoWhite } from '@/components/shared/logo';
import { Geist } from 'next/font/google';

export const runtime = 'nodejs';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export async function GET(
  _: Request,
  { params }: { params: Promise<{ slug: string[] }> },
) {
  const { slug } = await params;


  const slugString = Array.isArray(slug) ? slug.join('/') : slug;
  const post = await getBlogPostBySlug(slugString);

  if (!post) {
    return new Response('Not found', { status: 404 });
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background:
            'linear-gradient(135deg, rgb(9, 9, 11) 0%, rgb(24, 24, 27) 50%, rgb(39, 39, 42) 100%)',
          color: 'white',
          padding: '32px',
          fontFamily: `${geistSans.variable}`,
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 28,
            opacity: 0.85,
            letterSpacing: 1,
          }}
        >
          <LogoWhite
            width="338"
            height="80"
            style={{ position: 'absolute', top: 0, left: 0 }}
          />
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: 68,
            fontWeight: 700,
            lineHeight: 1.15,
            maxWidth: '95%',
          }}
        >
          {post.title}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: 26,
            opacity: 0.8,
          }}
        >
          <span>{post.excerpt}</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
