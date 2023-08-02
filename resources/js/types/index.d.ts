import { FC, ReactElement } from "react";

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
}

export type PageProps<
  T extends Record<string, unknown> = Record<string, unknown>,
> = T & {};

export type LayoutFunc = (page: ReactElement) => ReactElement;

export type PageFC = FC & {
  default: {
    layout?: LayoutFunc | LayoutFunc[];
  };
};

export type Page = PageFC;

export interface BasePagination<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
}

export interface SimplePagination<T> extends BasePagination<T> {}

export interface LaravelPagination extends BasePagination {
  last_page: number;
  last_page_url: string;
  total: number;
  links: {
    url: string | null;
    /**
     * 分页项标识，页数字符串或前后页标识
     */
    label: string | "pagination.previous" | "pagination.next";
    /**
     * 当前页时为 true
     */
    active: boolean;
  }[];
}
