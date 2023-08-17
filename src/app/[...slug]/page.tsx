import type { Page } from 'contentlayer/generated'
import { allPages } from 'contentlayer/generated'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { useMDXComponent } from 'next-contentlayer/hooks'

import { PageHeader } from '@/components/common/pageHeader'
import { components } from '@/components/mdx-components'
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
      <article className={cn('max-w-5xl mx-auto')}>
        <div
          className={cn(
            'prose max-w-4xl border-gray-500 dark:prose-invert prose-img:rounded-md prose-img:border-1 prose-img:shadow-xl prose-img:my-8 prose-table:-mx-20 prose-table:w-fit',
          )}
        >
          <MDXContent components={components} />
        </div>
      </article>
    </div>
  )
}
