import { type ClassValue, clsx } from "clsx";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { twMerge } from "tailwind-merge";
import baseSlugify from "slugify";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function stringToDate(date: string) {
  return toTimezonelessDate(new Date(date));
}

export function dateToString(date: Date) {
  return date.toISOString().split("T")[0];
}

export function toTimezonelessDate(date: Date) {
  return new Date(date.valueOf() + date.getTimezoneOffset() * 60 * 1000);
}

export function formatDate(date: Date) {
  // Remove timezone offset
  const dt = toTimezonelessDate(date);

  const weekDay = format(dt, "EEEE", { locale: ptBR }).split("-")[0];
  const capitalizedWeekDay = weekDay.charAt(0).toUpperCase() + weekDay.slice(1);

  const month = format(dt, "MMMM", { locale: ptBR });
  const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);

  const day = format(dt, "d");

  return `${capitalizedWeekDay}, ${day} de ${capitalizedMonth}`;
}

export function slugify(text: string) {
  return baseSlugify(text, { lower: true });
}
