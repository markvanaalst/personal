import { getCategories } from '@/lib/categories'
import cn from '@/lib/cn'

import { Card, CardContent } from '../ui/card/card'

const Categories = () => {
  const categories = getCategories()

  return (
    <Card>
      <CardContent className="w-full max-w-xs p-4 mt-4 mb-8 overflow-hidden bg-theme-bg text-theme-text ">
        <div className="w-full">
          <h4 className={cn('font-normal px-1 mb-4')}>Categories</h4>
          <ul className={cn('text-xs')}>
            {categories.map((category, i) => (
              <li className="px-1 py-2 transition duration-300" key={i}>
                <a
                  href={`/blog/category/${category.slug}`}
                  className="flex items-center cursor-pointer text-theme-text"
                >
                  {category.name}
                  <span className="ml-auto text-gray-500">
                    {category.count} articles
                  </span>
                  <i className="ml-1 text-gray-500 bx bx-right-arrow-alt" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

export default Categories
