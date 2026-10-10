import { Badge } from "@/components/ui/badge";
import { typedResumeData } from "@/lib/types";

export function Skills() {
  return (
    <dl className="divide-y divide-border border-y border-border">
      {typedResumeData.skillCategories.map((category) => (
        <div
          key={category.title}
          className="grid gap-3 py-5 sm:grid-cols-[10rem_1fr] sm:items-baseline sm:gap-6"
        >
          <dt className="text-sm font-semibold text-foreground">{category.title}</dt>
          <dd>
            <ul className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <li key={skill.name}>
                  <Badge variant="outline" className="h-7 px-3 text-sm font-normal">
                    {skill.name}
                  </Badge>
                </li>
              ))}
            </ul>
          </dd>
        </div>
      ))}
    </dl>
  );
}

export default Skills;
