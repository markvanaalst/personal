import { ImageResponse } from 'next/og';
import { LogoWhite } from '@/components/shared/logo';
import { typedResumeData } from '@/lib/types';
import { authorName } from '@/lib/site';

// Site-wide default social preview image for pages without their own.
export async function GET() {
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
        }}
      >
        <div style={{ display: 'flex' }}>
          <LogoWhite width="338" height="80" style={{ position: 'absolute', top: 0, left: 0 }} />
        </div>

        <div style={{ display: 'flex', fontSize: 84, fontWeight: 700, lineHeight: 1.1 }}>
          {authorName}
        </div>

        <div style={{ display: 'flex', fontSize: 32, opacity: 0.8, maxWidth: '90%' }}>
          {typedResumeData.description}
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
