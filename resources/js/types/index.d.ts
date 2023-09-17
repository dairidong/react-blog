import { FC, ReactElement, ReactNode } from "react";
import { JointContent, NoticeType } from "antd/es/message/interface";
import { Method, VisitOptions } from "@inertiajs/core";
import { ColProps, FormInstance, FormProps } from "antd";
import { Authenticatable, User } from "@/types/models";

export type PageProps<
  T extends Record<string, unknown> = Record<string, unknown>,
  E extends Authenticatable = User,
> = T & {
  auth: {
    user: E;
  };
};

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

export interface LaravelPagination<T> extends BasePagination<T> {
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

export interface Message {
  type: NoticeType;
  text: string;
}

export interface FormHookProps<T> {
  method?: Method;
  url?: string;
  defaultValues?: T;
  form?: FormInstance;
  errorMessage?: JointContent;
  submitOptions?: VisitOptions;
}

export type FormComponentProps<T> = Omit<
  FormProps,
  "method" | "children" | "onValuesChange"
> &
  FormHookProps<T> & {
    title: ReactNode;
    submitBtn?: false | ReactNode;
    submitBtnText?: ReactNode;
    children?: ReactNode;
    formCol?: ColProps;
  };

export interface OrderBy {
  order?: string;
  dir?: "desc" | "asc";
}
