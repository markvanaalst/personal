import { getCategories } from '@/lib/categories'

import { Card, CardContent, CardHeader } from '../ui/card/card'

const Categories = () => {
  const categories = getCategories()

  return (
    <Card>
      <CardHeader>Categories</CardHeader>
      <CardContent className="grid ">
        {categories.map((category, i) => (
          <div
            className="-mx-2 flex space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground"
            key={i}
          >
            <a
              href={`/blog/category/${category.slug}`}
              className="text-sm font-medium py-2 leading-none text-foreground hover:text-accent-foreground w-full transition-all"
            >
              <div className="flex items-center justify-between space-x-4">
                <span>{category.name}</span>
                <span className="text-accent-foreground font-normal">
                  {category.count} articles
                </span>
              </div>
            </a>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default Categories
