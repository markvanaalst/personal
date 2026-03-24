import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "../ui/button"

type ReadMoreLinkProps = {
    text: string;
    link: string;
    className?: string;
};

export function ReadMoreLink({ text, link, className }: ReadMoreLinkProps) {
    return (
        <Button
            variant="link"
            size="lg"
            asChild
            className='text-white after:bg-primary relative no-underline! after:absolute after:bottom-2 after:h-px after:w-2/3 after:origin-bottom-right after:scale-x-0 after:transition-transform after:duration-300 after:ease-in-out hover:after:origin-bottom-left hover:after:scale-x-100'
        >
            <Link href={link} className={cn("flex items-center gap-2 group", className)}>
                {text}
                <svg
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
            </Link>
        </Button>
    )
}