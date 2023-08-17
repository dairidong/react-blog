import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolveAdminPage } from "@/lib/utils";
import "@styles/app.css";

const appName =
  window.document.getElementsByTagName("title")[0]?.innerText ||
  import.meta.env.VITE_APP_NAME;

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: resolveAdminPage,
  setup({ el, App, props }) {
    const root = createRoot(el);

    root.render(<App {...props} />);
  },
});
