const months = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

export function isCurrent(value?: string) {
  return !value || value.toLowerCase() === "current";
}

/** Parses "March 2025", "2012" or "current" into a month index (year * 12 + month). */
function toMonthIndex(value: string | undefined, isEnd: boolean) {
  if (isCurrent(value)) {
    const now = new Date();
    return now.getFullYear() * 12 + now.getMonth();
  }

  const [first, second] = (value as string).trim().split(/\s+/);
  if (second) {
    return Number(second) * 12 + Math.max(months.indexOf(first.toLowerCase()), 0);
  }

  return Number(first) * 12 + (isEnd ? 11 : 0);
}

/** Formats a date like "March 2025" as "Mar 2025", and "current" as "Present". */
export function formatDate(value?: string) {
  if (isCurrent(value)) {
    return "Present";
  }

  const [first, second] = (value as string).trim().split(/\s+/);
  return second ? `${first.slice(0, 3)} ${second}` : first;
}

export function formatRange(start: string, end?: string) {
  const from = formatDate(start);
  const to = formatDate(end);
  return from === to ? from : `${from} – ${to}`;
}

/** Human-readable duration between two resume dates, e.g. "3 yrs 1 mo". */
export function formatDuration(start: string, end?: string) {
  const total = toMonthIndex(end, true) - toMonthIndex(start, false) + 1;
  const years = Math.floor(total / 12);
  const rest = total % 12;
  const parts: string[] = [];

  if (years > 0) {
    parts.push(`${years} yr${years === 1 ? "" : "s"}`);
  }
  if (rest > 0) {
    parts.push(`${rest} mo${rest === 1 ? "" : "s"}`);
  }

  return parts.join(" ") || "1 mo";
}

/** Total years between the earliest start and today. */
export function yearsSince(start: string) {
  return new Date().getFullYear() - Math.floor(toMonthIndex(start, false) / 12);
}
