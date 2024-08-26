import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import pluginChecker from "vite-plugin-checker";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Add this
    pluginChecker({
      typescript: {
        tsconfigPath: "tsconfig.app.json", // If you don't have a tsconfig.app.json file, use tsconfig.json instead
      },
    }),

  ],

  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
      }
    }
  }
});