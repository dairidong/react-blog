import path from "path";
import { defineConfig, splitVendorChunkPlugin } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [
    laravel({
      input: ["resources/js/app.tsx", "resources/js/admin.tsx"],
      ssr: "resources/js/ssr.tsx",
      refresh: true,
    }),
    react(),
    splitVendorChunkPlugin(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./resources/js"),
      "@styles": path.resolve(__dirname, "./resources/css"),
    },
  },
  server: {
    hmr: {
      host: "localhost",
    },
  },
});
