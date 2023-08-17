import "@styles/app.css";
import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolveFrontendPage } from "@/lib/utils";

const appName =
  window.document.getElementsByTagName("title")[0]?.innerText ||
  import.meta.env.VITE_APP_NAME;

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: resolveFrontendPage,
  setup({ el, App, props }) {
    const root = createRoot(el);

    root.render(<App {...props} />);
  },
  progress: {
    color: "hsl(var(--foreground))",
    showSpinner: true,
  },
});
