import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',   // needed for Docker
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://php:80',  // points to your Nette container
        changeOrigin: true,
      }
    }
  }
})
