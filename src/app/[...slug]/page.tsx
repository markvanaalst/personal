import type { Page } from 'contentlayer/generated'
import { allPages } from 'contentlayer/generated'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { useMDXComponent } from 'next-contentlayer/hooks'

import { components } from '@/components/mdx-components'
import { PageHeader } from '@/components/ui/common/pageHeader'
import cn from '@/lib/cn'
import { getPageBySlug } from '@/lib/pages'

export async function generateStaticParams() {
  return allPages.map((page: Page) => ({
    slug: page.slugAsParams.split('/'),
  }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] }
}): Promise<Metadata> {
  const page = getPageBySlug(params.slug)

  return {
    title: page?.title,
    description: page?.description,
  }
}

export default function Page({ params }: { params: { slug: string[] } }) {
  const page = getPageBySlug(params.slug)
  if (!page) notFound()

  const MDXContent = useMDXComponent(page.body.code)

  return (
    <div className={cn('flex flex-col justify-center min-h-[70vh]')}>
      <PageHeader title={page.title} />
      <div className={cn('flex flex-col items-center')}>
        <div className={cn('flex flex-row flex-wrap py-4')}>
          <div className={cn('w-full sm:w-2/3 md:w-3/4 px-2 max-w-4xl')}>
            <div className="grid gap-4 mt-4 md:grid-cols-1 sm:grid-cols-1">
              <h2>{page?.title}</h2>
              Test
              <MDXContent components={components} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
