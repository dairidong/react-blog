import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { PageResolver } from "@inertiajs/core";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { ReactElement } from "react";
import dayjs from "dayjs";
import locale_zhCn from "dayjs/locale/zh-cn";
import relativeTime from "dayjs/plugin/relativeTime";
import duration from "dayjs/plugin/duration";
import { Page } from "@/types";
import Layout from "@/layouts/FrontendLayout";
import AdminLayout from "@/layouts/AdminLayout";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const resolveFrontendPage: PageResolver = async (name) => {
  const currentPage = await resolvePageComponent<Page>(
    `../pages/${name}.tsx`,
    import.meta.glob<Page>("../pages/**/*.tsx"),
  );
  currentPage.default.layout ??= (page: ReactElement) => (
    <Layout children={page} />
  );
  return currentPage;
};

export const resolveAdminPage: PageResolver = async (name) => {
  const currentPage = await resolvePageComponent<Page>(
    `../adminPages/${name}.tsx`,
    import.meta.glob<Page>("../adminPages/**/*.tsx"),
  );
  if (!name.includes("Login")) {
    currentPage.default.layout ??= (page: ReactElement) => (
      <AdminLayout children={page} />
    );
  }
  return currentPage;
};

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
