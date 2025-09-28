import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, parseISO } from "date-fns";

/**
 * Merge Tailwind + conditional classes
 */
export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a date string (yyyy-MM-dd) to human readable (Oct 5, 2025)
 */
export function formatDate(dateString: string): string {
  try {
    const date = parseISO(dateString);
    return format(date, "MMM d, yyyy");
  } catch {
    return dateString;
  }
}

/**
 * Format time to a cleaner display (12h with AM/PM)
 */
export function formatTime(time: string): string {
  try {
    const [hourStr, minuteStr] = time.split(":");
    let hour = parseInt(hourStr, 10);
    const minutes = minuteStr || "00";
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    return `${hour}:${minutes} ${ampm}`;
  } catch {
    return time;
  }
}
