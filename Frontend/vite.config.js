import path from "path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { config } from 'dotenv';
config();

export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE,
  define: {
    'process.env': process.env
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
