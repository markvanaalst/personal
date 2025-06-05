/**
 * Parses a date string in DD-MM-YYYY format to a Date object
 * @param dateStr Date string in DD-MM-YYYY format
 * @returns Date object
 */
export function parsePostDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day);
}
