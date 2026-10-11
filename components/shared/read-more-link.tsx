import Link from "next/link"
import { IconArrowRight } from "@tabler/icons-react"
import { cn } from "@/lib/utils"

type ReadMoreLinkProps = {
    text: string;
    link: string;
    className?: string;
    transitionTypes?: string[];
};

export function ReadMoreLink({ text, link, className, transitionTypes }: ReadMoreLinkProps) {
    return (
        <Link
            href={link}
            transitionTypes={transitionTypes}
            className={cn(
                "group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground hover:underline underline-offset-4",
                className,
            )}
        >
            {text}
            <IconArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
        </Link>
    )
}
