import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import "antd/dist/reset.css";
import "@styles/admin.css";
import { App as AntApp } from "antd";
import resolvePage from "./resolvePage";

const appName =
  window.document.getElementsByTagName("title")[0]?.innerText ||
  import.meta.env.VITE_APP_NAME;

createInertiaApp({
  title: (title) => `${title} - ${appName} 后台`,
  resolve: resolvePage,
  setup({ el, App, props }) {
    const root = createRoot(el);

    root.render(
      <AntApp>
        <App {...props} />
      </AntApp>,
    );
  },
});
