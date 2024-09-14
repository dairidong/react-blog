import ReactDOMServer from "react-dom/server";
import { createInertiaApp } from "@inertiajs/react";
import createServer from "@inertiajs/react/server";
import { Page } from "@inertiajs/core";
import { RouteList } from "ziggy-js";
import { Ziggy } from "@frontend/ziggy";
import resolvePage from "./resolvePage";

const appName = import.meta.env.VITE_APP_NAME;

createServer((page: Page) =>
  createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    title: (title) => `${title} - ${appName}`,
    resolve: resolvePage,
    setup: ({ App, props }) => {
      global.Ziggy = Ziggy as unknown as RouteList;
      return <App {...props} />;
    },
  }),
);
