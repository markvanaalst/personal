import { IconMapPin } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import { formatDuration, formatRange, isCurrent } from "@/lib/resume-dates";
import { typedResumeData } from "@/lib/types";
import type { ResumeRole, ResumeWorkItem } from "@/lib/types";
import { cn } from "@/lib/utils";

/** Splits a trailing "Location: X." note off a role description. */
function splitLocation(description: string) {
  const match = description.match(/\s*Location:\s*([^.]+)\.?\s*$/);
  if (!match || match.index === undefined) {
    return { text: description, location: undefined };
  }

  return { text: description.slice(0, match.index), location: match[1] };
}

function RoleItem({ role, isActive }: { role: ResumeRole; isActive: boolean }) {
  const { text, location } = splitLocation(role.description);

  return (
    <li className="relative pl-7">
      <span
        aria-hidden
        className={cn(
          "absolute top-2 -left-[5px] size-2.5 rounded-full ring-4 ring-background",
          isActive ? "bg-primary" : "bg-ring"
        )}
      />
      <div className="flex flex-col gap-x-4 gap-y-0.5 sm:flex-row sm:items-baseline sm:justify-between">
        <h4 className="font-semibold text-foreground">{role.title}</h4>
        <p className="shrink-0 font-mono text-xs text-muted-foreground tabular-nums">
          {formatRange(role.start, role.end)}
          <span className="mx-1.5 opacity-50">·</span>
          {formatDuration(role.start, role.end)}
        </p>
      </div>
      {location ? (
        <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
          <IconMapPin aria-hidden className="size-3.5" />
          {location}
        </p>
      ) : null}
      <p className="mt-2 max-w-prose text-[15px] leading-7 text-foreground/80 text-pretty">
        {text}
      </p>
    </li>
  );
}

function CompanyItem({ work }: { work: ResumeWorkItem }) {
  const roles: ResumeRole[] =
    work.roles?.length > 0
      ? work.roles
      : [{ title: work.title, start: work.start, end: work.end, description: work.description }];
  const start = roles[roles.length - 1].start;
  const end = roles[0].end;
  const current = isCurrent(end);

  return (
    <li>
      <article>
        <header className="flex items-start gap-4">
          <img
            src={work.logoUrl}
            alt=""
            className="size-11 flex-none rounded-lg border bg-card object-contain p-1.5"
          />
          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-semibold leading-tight">
              <a
                href={work.href}
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-4 hover:text-link hover:underline"
              >
                {work.company}
              </a>
              {current ? (
                <Badge variant="outline" className="ml-2 align-middle text-[11px]">
                  Current
                </Badge>
              ) : null}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {work.location}
              <span className="mx-1.5 opacity-50">·</span>
              <span className="tabular-nums">
                {formatRange(start, end)} ({formatDuration(start, end)})
              </span>
            </p>
            {work.badges.length > 0 ? (
              <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Focus areas">
                {work.badges.map((badge) => (
                  <li key={badge}>
                    <Badge variant="secondary">{badge}</Badge>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </header>

        <ol className="mt-6 ml-5 space-y-8 border-l border-border pb-1">
          {roles.map((role, index) => (
            <RoleItem
              key={`${work.company}-${role.title}-${role.start}`}
              role={role}
              isActive={current && index === 0}
            />
          ))}
        </ol>
      </article>
    </li>
  );
}

export default function WorkSection() {
  return (
    <ol className="space-y-14">
      {typedResumeData.work.map((work) => (
        <CompanyItem key={work.company} work={work} />
      ))}
    </ol>
  );
}
