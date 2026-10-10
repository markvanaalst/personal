import type { Metadata } from "next";
import Image from "next/image";
import { IconBrandGithub, IconBrandLinkedin, IconExternalLink } from "@tabler/icons-react";
import { ReadMoreLink } from "@/components/shared/read-more-link";
import { typedResumeData } from "@/lib/types";

export const metadata: Metadata = {
    title: `About | ${typedResumeData.firstName} ${typedResumeData.lastName}`,
    description: typedResumeData.description,
};

const socialIcons: Record<string, typeof IconBrandGithub> = {
    github: IconBrandGithub,
    linkedin: IconBrandLinkedin,
};

function SectionTitle({ id, children }: { id: string; children: React.ReactNode }) {
    return (
        <h2 id={id} className="mb-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {children}
        </h2>
    );
}

function Topic({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div>
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            <p className="mt-2">{children}</p>
        </div>
    );
}

export default function Page() {
    const { firstName, lastName, description, contact } = typedResumeData;

    return (
        <main className="mx-auto w-full max-w-2xl px-4 py-10 sm:px-6 lg:py-16">
            <header className="border-b border-border pb-10">
                <div className="flex items-center gap-5">
                    <Image
                        src="/mva_profile.webp"
                        alt={`${firstName} ${lastName}`}
                        width={80}
                        height={80}
                        priority
                        className="size-16 rounded-full sm:size-20"
                    />
                    <div className="min-w-0">
                        <h1 className="text-3xl font-light tracking-tight sm:text-4xl">About me</h1>
                        <p className="mt-1 text-pretty text-muted-foreground">{description}</p>
                    </div>
                </div>

                <p className="mt-8 text-xl leading-relaxed font-light text-pretty text-foreground">
                    I’m {firstName}. I’ve spent more than 20 years in content management, 13 of them at Sitecore,
                    growing from solution architect to leading developer and documentation platforms at a global
                    scale.
                </p>
            </header>

            <div className="text-[17px] leading-8 text-foreground/85 text-pretty">
                <section aria-labelledby="background" className="mt-12 space-y-6">
                    <SectionTitle id="background">Background</SectionTitle>

                    <p>
                        Along the way, I learned that the real impact of technology isn’t just in the systems we build,
                        but in how those systems empower people to work, learn, and create more effectively.
                    </p>

                    <p>
                        Earlier in my career I worked as a software developer, and that still shapes how I approach
                        problems. Having built and maintained systems myself, I value solutions that are practical,
                        debuggable, and grounded in reality. It also means I tend to be direct, and I have little
                        patience for ideas that sound impressive but don’t hold up when you look at how they’d
                        actually work.
                    </p>
                </section>

                <section aria-labelledby="work" className="mt-14">
                    <SectionTitle id="work">What I’m working on</SectionTitle>

                    <div className="space-y-8">
                        <Topic title="AI-enabled platforms and developer experience">
                            I’m interested in how intelligent systems can help people navigate complexity. I’m most
                            drawn to problems where automation, structure, and human judgment work together, especially
                            when the goal is to make everyday work clearer and more effective.
                        </Topic>

                        <Topic title="Bringing products together">
                            I’ve spent much of my career in multi-product environments, helping teams align around
                            shared platforms and practices. During a period of rapid growth and acquisitions at
                            Sitecore, I worked on initiatives that brought fragmented developer-facing channels
                            together: a centralized developer portal, a global changelog, and a public product roadmap
                            connected to internal systems.
                        </Topic>

                        <Topic title="Applied AI">
                            In recent years my focus has shifted toward models and agents embedded directly into real
                            workflows. I’m interested in AI that reduces cognitive load, improves consistency, and gets
                            better through feedback, rather than tools that add another layer of abstraction. I’m
                            skeptical of hype and prefer systems that are understandable, governable, and resilient.
                        </Topic>
                    </div>
                </section>

                <section aria-labelledby="personal" className="mt-14 space-y-6">
                    <SectionTitle id="personal">Outside of work</SectionTitle>

                    <p>
                        I’m a curious tinkerer by nature. I enjoy experimenting with automation, refining systems that
                        are almost good enough, and digging into how technical and human systems behave over time. Home
                        automation is a favorite playground, where small improvements make everyday life a little
                        smoother.
                    </p>

                    <p>
                        I live in the Netherlands with my wife and our three daughters. When I’m not thinking about
                        systems or AI, you’ll usually find me watching or playing soccer, going for a run to clear my
                        head, or quietly tweaking something that could work just a bit better.
                    </p>
                </section>
            </div>

            <footer className="mt-14 border-t border-border pt-8">
                <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
                    {contact.social.map((social) => {
                        const Icon = socialIcons[social.icon] ?? IconExternalLink;
                        return (
                            <li key={social.name}>
                                <a
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-link"
                                >
                                    <Icon aria-hidden className="size-4" />
                                    {social.name}
                                </a>
                            </li>
                        );
                    })}
                </ul>
                <ReadMoreLink text="View my full resume" link="/resume" className="mt-6" />
            </footer>
        </main>
    );
}
