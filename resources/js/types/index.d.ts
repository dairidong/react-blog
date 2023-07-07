import { FC, ReactElement } from 'react';

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
  auth: {
    user: User;
  };
};

export type LayoutFunc = (page: ReactElement) => ReactElement;

export type PageFC = FC & {
  default: {
    layout?: LayoutFunc | LayoutFunc[]
  }
};

export type Page = PageFC;
