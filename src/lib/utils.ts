import { type ClassValue, clsx } from "clsx";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date) {
  // Remove timezone offset
  const dt = new Date(date.valueOf() + date.getTimezoneOffset() * 60 * 1000);

  const weekDay = format(dt, "EEEE", { locale: ptBR }).split("-")[0];
  const capitalizedWeekDay = weekDay.charAt(0).toUpperCase() + weekDay.slice(1);

  const month = format(dt, "MMMM", { locale: ptBR });
  const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);

  const day = format(dt, "d");

  return `${capitalizedWeekDay}, ${day} de ${capitalizedMonth}`;
}
