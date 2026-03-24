import { ProfileCard } from "@/components/profile/profile-card";
import { SectionHeader } from "@/components/shared/section-header";

export default function Page() {
    return (
        <main className="max-w-6xl w-full px-4 py-8 mx-auto flex justify-center items-stretch gap-6 lg:py-16 flex-col lg:flex-row">
            <ProfileCard />
            <div className="w-full lg:w-3/4 text-md px-8 py-6 relative">

                <SectionHeader 
                    title="About Me"
                    description="A brief introduction to who I am, my background, and what I do"
                 />

                <p>I’ve spent more than 20 years in the content management industry, with over 13 of those at Sitecore. During that time, I grew from a solution architect into leading developer and documentation platforms at a global scale. Along the way, I learned that the real impact of technology isn’t just in the systems we build, but in how those systems empower people to work, learn, and create more effectively.</p>

                <p>Outside of work, I’m a curious tinkerer by nature. I enjoy experimenting with automation, both at work and at home, refining systems that are almost good enough, and digging into how technical and human systems behave over time. Home automation is a favorite playground of mine, where small improvements can make everyday life just a little smoother.</p>

                <p>I live in the Netherlands with my wife and our three daughters. When I’m not thinking about systems or AI, you’ll usually find me watching or playing soccer, going out for a run to clear my head, or quietly tweaking something that could work just a bit better.</p>

                <SectionHeader 
                    title="What am I doing?" 
                    description="A brief overview of my current work and interests"
                    className="mt-12"
                 />

                <p>I work on AI-enabled platforms and developer experience, with a long-standing interest in how intelligent systems can help people navigate complexity. I’m most drawn to problems where automation, structure, and human judgment work together, especially when the goal is to make everyday work clearer and more effective.</p>

                <p>Earlier in my career, I worked as a software developer, and that background still strongly shapes how I approach problems today. Having built and maintained systems myself, I value solutions that are practical, debuggable, and grounded in reality. It also means I tend to be direct and to the point, and I have little patience for ideas that sound impressive but don’t hold up when you look at how they’d actually work.</p>

                <p>I’ve spent much of my career in multi-product environments, helping teams align around shared platforms and practices. During a period of rapid growth and acquisitions at Sitecore, I worked on cross-product initiatives that brought fragmented developer-facing channels together, including a centralized developer portal, a global changelog, and a public product roadmap connected to internal systems.</p>

                <p>In recent years, my focus has shifted toward applied AI: models and agents embedded directly into real workflows. I’m interested in AI systems that reduce cognitive load, improve consistency, and improve over time through feedback, rather than tools that simply add another layer of abstraction. I’m skeptical of hype-driven narratives and prefer systems that are understandable, governable, and resilient.</p>

            </div>
        </main>
    );
}