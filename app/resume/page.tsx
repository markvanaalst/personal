import { ResumeHeader } from "@/components/profile/resume-header";
import { Skills } from "@/components/profile/skills";
import WorkSection from "@/components/profile/work-section";
import { pageMetadata } from "@/lib/metadata";
import { JsonLd, profilePageSchema } from "@/lib/structured-data";
import { typedResumeData } from "@/lib/types";

const currentWork = typedResumeData.work[0];

export const metadata = pageMetadata({
    title: "Resume",
    description: `Resume of Mark van Aalst, ${currentWork.roles?.[0]?.title ?? currentWork.title} at ${currentWork.company}: experience, roles and skills.`,
    path: "/resume",
});

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
            <JsonLd data={profilePageSchema("/resume", "Resume of Mark van Aalst")} />
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
