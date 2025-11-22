import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: '0.0.0.0', // Allow external connections
    port: 5173,
    strictPort: false, // Allow port to change if 5173 is busy
    cors: true,
    proxy: {
      // Optional: proxy API calls to backend if needed
      '/api': {
        target: process.env.VITE_API_URL || 'http://localhost:4004',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  preview: {
    host: '0.0.0.0', // Allow external connections for preview mode
    port: 4173,
    strictPort: false,
    cors: true,
  }
})