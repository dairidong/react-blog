import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { PageResolver } from '@inertiajs/core';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { Page } from '@/types';
import Layout from '@/Layouts';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const resolvePage:PageResolver = async (name) => {
  const currentPage = await resolvePageComponent<Page>(
    `../Pages/${name}.tsx`,
    import.meta.glob<Page>('../Pages/**/*.tsx'),
  );
  currentPage.default.layout =
    currentPage.default.layout || ((page: Page) => <Layout page={page} />);
  return currentPage;
};
