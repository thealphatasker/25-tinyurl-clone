import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/save": "http://localhost:5050",
      "/urls": "http://localhost:5050",
      "/urls/.*": "http://localhost:5050",
    },
  },
});
