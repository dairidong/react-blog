import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";
import locale_zhCn from "dayjs/locale/zh-cn";
import relativeTime from "dayjs/plugin/relativeTime";
import duration from "dayjs/plugin/duration";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.locale(locale_zhCn);

export const formatTime = (
  date: dayjs.ConfigType,
  template: string = "YYYY-MM-DD",
  human: boolean = true,
) => {
  if (dayjs().isAfter(dayjs(date).add(15, "day"))) {
    return dayjs(date).format(template);
  }
  return human ? dayjs(date).fromNow() : dayjs(date).format(template);
};
