import ReactDOMServer from "react-dom/server";
import { createInertiaApp } from "@inertiajs/react";
import createServer from "@inertiajs/react/server";
import { Page } from "@inertiajs/core";
import route from "../../vendor/tightenco/ziggy/dist/index.m";
import { resolveFrontendPage } from "@/lib/utils";

const appName = import.meta.env.VITE_APP_NAME;

createServer((page: Page) =>
  createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    title: (title) => `${title} - ${appName}`,
    resolve: resolveFrontendPage,
    setup: ({ App, props }) => {
      global.route = (name, params, absolute) =>
        route(name, params, absolute, {
          // @ts-expect-error
          ...page.props.ziggy,
          // @ts-expect-error
          location: new URL(page.props.ziggy.location),
        });

      return <App {...props} />;
    },
  }),
);
