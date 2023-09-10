import { PageResolver } from "@inertiajs/core";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { ReactElement } from "react";
import { Page } from "@/types";
import AdminLayout from "@/admin/layouts";

const resolvePage: PageResolver = async (name) => {
  const currentPage = await resolvePageComponent<Page>(
    `./pages/${name}.tsx`,
    import.meta.glob<Page>("./pages/**/*.tsx"),
  );
  if (!name.includes("Login")) {
    currentPage.default.layout ??= (page: ReactElement) => (
      <AdminLayout children={page} />
    );
  }
  return currentPage;
};

export default resolvePage;
