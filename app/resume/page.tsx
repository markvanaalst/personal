import { ResumeHeader } from "@/components/profile/resume-header";
import { Skills } from "@/components/profile/skills";
import WorkSection from "@/components/profile/work-section";

function SectionTitle({ id, children }: { id: string; children: React.ReactNode }) {
    return (
        <h2 id={id} className="mb-8 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {children}
        </h2>
    );
}

export default function Page() {
    return (
        <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 lg:py-16">
            <ResumeHeader />

            <section aria-labelledby="experience" className="mt-12">
                <SectionTitle id="experience">Experience</SectionTitle>
                <WorkSection />
            </section>

            <section aria-labelledby="skills" className="mt-16">
                <SectionTitle id="skills">Skills</SectionTitle>
                <Skills />
            </section>
        </main>
    );
}
