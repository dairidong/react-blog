import { FC, JSX, ReactNode } from 'react';

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

export type PageFC = FC & {
  default: {
    layout: JSX.Element
  }
};

export type PageReactNode = ReactNode & {
  default: {
    layout: JSX.Element
  }
};

export type Page =
    | PageFC
    | PageReactNode;
