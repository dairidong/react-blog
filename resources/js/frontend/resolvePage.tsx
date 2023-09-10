import { PageResolver } from "@inertiajs/core";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { ReactElement } from "react";
import { Page } from "@/types";
import Layout from "@/frontend/layouts";

const resolvePage: PageResolver = async (name) => {
  const currentPage = await resolvePageComponent<Page>(
    `./pages/${name}.tsx`,
    import.meta.glob<Page>("./pages/**/*.tsx"),
  );
  currentPage.default.layout ??= (page: ReactElement) => (
    <Layout children={page} />
  );
  return currentPage;
};

export default resolvePage;
