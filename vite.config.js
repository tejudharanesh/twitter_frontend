import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "https://twitter-j89n.onrender.com",
        changeOrigin: true,
        secure: false, // Set to false if you're using HTTP on the backend (adjust as needed)
      },
    },
  },
});
