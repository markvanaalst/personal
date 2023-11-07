import { ImageResponse } from '@vercel/og'

import { LogoWhite } from '@/components/ui/icons'
import { defaultMetadata } from '@/lib/metadata'

export const runtime = 'edge'

export const alt = 'About Acme'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        tw="w-screen h-screen p-32 flex flex-col justify-center"
        style={{
          backgroundImage: 'linear-gradient(to top, #0f172A, #334155)',
        }}
      >
        <div tw="flex flex-col w-full items-center text-center">
          <h1 tw="text-6xl font-bold text-gray-300 leading-tight">
            {defaultMetadata.title}
          </h1>
          <p tw="font-medium text-2xl text-gray-500">
            {defaultMetadata.description}
          </p>
        </div>
        <LogoWhite
          width="338"
          height="80"
          style={{ position: 'absolute', bottom: 40, left: 40 }}
        />
      </div>
    ),
    {
      ...size,
    },
  )
}
