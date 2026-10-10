import Image from "next/image";
import { IconBrandGithub, IconBrandLinkedin, IconExternalLink } from "@tabler/icons-react";
import { yearsSince } from "@/lib/resume-dates";
import { typedResumeData } from "@/lib/types";

const socialIcons: Record<string, typeof IconBrandGithub> = {
  github: IconBrandGithub,
  linkedin: IconBrandLinkedin,
};

export function ResumeHeader() {
  const { firstName, lastName, description, location, work, contact } =
    typedResumeData;
  const currentRole = work[0].roles?.[0]?.title ?? work[0].title;
  const firstJob = work[work.length - 1];
  const firstStart = firstJob.roles?.at(-1)?.start ?? firstJob.start;

  const facts = [
    { label: "Currently", value: `${currentRole} at ${work[0].company}` },
    { label: "Experience", value: `${yearsSince(firstStart)}+ years in software` },
    { label: "Based in", value: location },
  ];

  return (
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
          <h1 className="text-3xl font-light tracking-tight sm:text-4xl">
            {firstName} {lastName}
          </h1>
          <p className="mt-1 text-pretty text-muted-foreground">{description}</p>
        </div>
      </div>

      <dl className="mt-8 grid gap-4 sm:grid-cols-3">
        {facts.map((fact) => (
          <div key={fact.label}>
            <dt className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              {fact.label}
            </dt>
            <dd className="mt-1 text-sm text-foreground">{fact.value}</dd>
          </div>
        ))}
      </dl>

      <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm">
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
    </header>
  );
}
