import path from "path";
import { defineConfig, splitVendorChunkPlugin } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [
    laravel({
      input: ["resources/js/frontend/app.tsx", "resources/js/admin/app.tsx"],
      ssr: "resources/js/frontend/ssr.tsx",
      refresh: true,
    }),
    react(),
    splitVendorChunkPlugin(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./resources/js"),
      "@styles": path.resolve(__dirname, "./resources/css"),
      "@frontend": path.resolve(__dirname, "./resources/js/frontend"),
      "@admin": path.resolve(__dirname, "./resources/js/admin"),
      "ziggy-js": path.resolve(__dirname, "vendor/tightenco/ziggy")
    },
  },
  server: {
    hmr: {
      host: "localhost",
    },
  },
});
