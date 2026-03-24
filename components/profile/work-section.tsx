/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { typedResumeData } from "@/lib/types";
import { IconChevronRight } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

function LogoImage({ src, alt }: { src: string; alt: string }) {
  const [imageError, setImageError] = useState(false);

  if (!src || imageError) {
    return (
      <div className="size-8 md:size-10 p-1 border rounded-full shadow ring-2 ring-border bg-muted flex-none" />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="size-8 md:size-10 p-1 border rounded-full shadow ring-2 ring-border overflow-hidden object-contain flex-none"
      onError={() => setImageError(true)}
    />
  );
}

export default function WorkSection() {
  const currentCompany = typedResumeData.work.find(
    (work) => work.end?.toLowerCase() === "current"
  )?.company;

  return (
    <Accordion
      type="single"
      collapsible
      defaultValue={currentCompany}
      className="w-full grid gap-6"
    >
      {typedResumeData.work.map((work) => {
        const hasRoles = Array.isArray(work.roles) && work.roles.length > 0;
        const primaryTitle = hasRoles ? work.roles[0]?.title : work.title;

        return (
          <AccordionItem
            key={work.company}
            value={work.company}
            className="w-full border-b-0 pb-4 grid gap-2"
          >
            <AccordionTrigger className="hover:no-underline p-0 cursor-pointer transition-colors rounded-none group **:data-[slot=accordion-trigger-icon]:hidden">
              <div className="flex items-center gap-x-3 justify-between w-full text-left">
                <div className="flex items-center gap-x-3 flex-1 min-w-0">
                  <LogoImage src={work.logoUrl} alt={work.company} />
                  <div className="flex-1 min-w-0 gap-0.5 flex flex-col">
                    <div className="font-semibold leading-none flex items-center gap-2">
                      {work.company}
                      <span className="relative inline-flex items-center w-3.5 h-3.5">
                        <IconChevronRight
                          className={cn(
                            "absolute h-3.5 w-3.5 shrink-0 text-muted-foreground stroke-2 transition-all duration-300 ease-out",
                            "translate-x-0 opacity-0",
                            "group-hover:translate-x-1 group-hover:opacity-100",
                            "group-data-[state=open]:rotate-270 group-data-[state=open]:translate-x-0"
                          )}
                        />
                      </span>
                    </div>
                    {primaryTitle ? (
                      <div className="font-sans text-sm text-muted-foreground">
                        {primaryTitle}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs tabular-nums text-muted-foreground text-right flex-none">
                  <span>
                    {work.start} - {work.end ?? "Present"}
                  </span>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="p-0 ml-13 w-11/12">
              {hasRoles ? (
                <div className="grid gap-3 text-xs sm:text-sm">
                  {work.roles.map((role) => (
                    <div key={`${work.company}-${role.title}-${role.start}`}>
                      <div className="flex items-center justify-between gap-2">
                        <div className="font-medium text-foreground">
                          {role.title}
                        </div>
                        <div className="text-xs tabular-nums text-muted-foreground">
                          {role.start} - {role.end ?? "Present"}
                        </div>
                      </div>
                      <div className="text-muted-foreground">
                        {role.description}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-xs sm:text-sm text-muted-foreground">
                  {work.description}
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
