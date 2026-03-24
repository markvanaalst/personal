import { ProfileCard } from "@/components/profile/profile-card";
import { Skills } from "@/components/profile/skills";
import WorkSection from "@/components/profile/work-section";
import { SectionHeader } from "@/components/shared/section-header";

export default function Page() {
    return (
        <main className="max-w-6xl px-4 py-8 mx-auto flex justify-center items-stretch gap-6 lg:py-16 flex-col lg:flex-row">
            <ProfileCard />
            <div className="w-full lg:w-3/4 text-md px-8 py-6 relative">

                <SectionHeader 
                    title="Experience"
                    description="A summary of my professional background and roles"
                 />

                <WorkSection />
                <Skills />
        
            </div>
        </main>
    );
}