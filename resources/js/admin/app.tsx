import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import "antd/dist/reset.css";
import "@styles/admin.css";
import { App as AntApp, ConfigProvider } from "antd";
import zhCn from "antd/locale/zh_CN";
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
      <ConfigProvider locale={zhCn}>
        <AntApp>
          <App {...props} />
        </AntApp>
      </ConfigProvider>,
    );
  },
});
