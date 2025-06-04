'use client';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { Logo } from '../common/logo';
import { useState } from 'react';
import Link from 'next/link';
import { mainNavigation } from '@content/config/navigation.json';
import { Separator } from '../ui/separator';

export const NavigationSheet = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" >
          <Menu size={16} />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full p-8">
        <SheetTitle>
          <Logo className="h-12" />
        </SheetTitle>

        <Separator className="my-4" />

        <div className="flex flex-col gap-6 p-4">
          <div className="flex items-center justify-between">

            <nav className="flex flex-col gap-4">
              {mainNavigation.map(item => (
                <div key={item.url}>
                  <Link
                    href={item.url}
                    className="text-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>

                  {item.hasChildren && item.children.length > 0 && (
                    <div className="flex flex-col gap-4 pl-4 mt-4">
                      {item.children.map(child => (
                        <Link
                          key={child.url}
                          href={child.url}
                          className="text-lg w-full block"
                          onClick={() => setIsOpen(false)}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              </nav>
            </div>
          </div>
        </SheetContent>
      </Sheet>
  );
};
