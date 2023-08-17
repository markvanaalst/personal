import Image from 'next/image'

import { getCategoryBySlug } from '@/lib/categories'
import cn from '@/lib/cn'

type CategoryProps = {
  categorySlug: string
}

const FeaturedCategory = ({ categorySlug }: CategoryProps): JSX.Element => {
  const category = getCategoryBySlug(categorySlug)

  if (!category) return <></>

  return (
    <article className="h-96">
      <div className="absolute w-full overflow-hidden h-96 dark:bg-background">
        <Image
          alt="Featured image"
          src={category.image}
          quality={100}
          placeholder="empty"
          fill
          sizes="(max-width: 768px) 100vw,
								(max-width: 1200px) 50vw,
								33vw"
          className={cn('dark:opacity-30')}
          style={{
            objectFit: 'cover',
          }}
        />
      </div>

      <div className="h-full text-center ">
        <div className="flex items-center justify-center h-full py-12 bg-white">
          <div className="w-7/12 text-theme-text">
            <h2 className="my-4 text-2xl font-medium md:text-4xl drop-shadow-sm">
              {category.name}
            </h2>
            <h3 className={cn('text-theme-text-alt', 'relative')}>
              {category.description}
            </h3>
          </div>
        </div>
      </div>
    </article>
  )
}
export default FeaturedCategory
