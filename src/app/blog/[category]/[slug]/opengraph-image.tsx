import { ImageResponse } from '@vercel/og'

import { LogoWhite } from '@/components/ui/icons'
import { getPost } from '@/lib/blog'
import { getBaseUrl } from '@/lib/utils'

export const runtime = 'edge'

export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image({
  params,
}: {
  params: { category: string; slug: string }
}) {
  const post = getPost(params.slug)

  let title = post ? post?.title : params.slug
  let description = post ? post?.excerpt : params.slug

  return new ImageResponse(
    (
      <div
        tw="w-screen h-screen  flex flex-col justify-center"
        style={{
          backgroundImage: `url(${getBaseUrl() + post?.image})`,
        }}
      >
        <div tw="bg-slate-900/90 flex h-full w-full p-8">
          <LogoWhite
            width="338"
            height="80"
            style={{ position: 'absolute', top: 40, right: 40 }}
          />
          <div tw="flex flex-col w-full justify-end	">
            <h1 tw="text-6xl font-bold text-gray-100 leading-tight">{title}</h1>
            {description && (
              <p tw="font-medium text-2xl text-gray-300">{description}</p>
            )}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  )
}
