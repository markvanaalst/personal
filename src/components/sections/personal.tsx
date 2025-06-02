import Image from 'next/image';
import { ArrowRight, Linkedin, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const Personal = () => {
  return (
    <section className="w-full py-6 md:py-6 lg:py-12">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4 order-2 md:order-1">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Mark van Aalst
              </h1>
              <p className="text-xl text-muted-foreground">Experienced web industry professional</p>
            </div>
            <p className="max-w-[600px] text-muted-foreground md:text-xl font-light">
              Helping businesses build relationships with their audiences by focusing on developer
              relations and experience.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button
                asChild
                className="cursor-pointer"
                effect={'expandIcon'}
                icon={ArrowRight}
                iconPlacement="right"
                variant="default"
              >
                <Link href="/projects">View My Work</Link>
              </Button>
              <Button variant="outline" effect="ringHover" asChild>
                <Link href="/contact">Contact Me</Link>
              </Button>
            </div>
            <div className="flex gap-4">
              <Link
                href="https://linkedin.com"
                className="text-muted-foreground hover:text-foreground"
                >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="https://github.com"
                className="text-muted-foreground hover:text-foreground"
                >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center order-1 md:order-2">
            <Image
              src="/images/mva_profile.webp"
              width={300}
              height={300}
              alt="Mark van Aalst"
              className="aspect-square overflow-hidden rounded-full object-cover border-8 border-background shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
