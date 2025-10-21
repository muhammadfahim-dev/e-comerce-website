import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": "https://ecomerce-backend-teal.vercel.app/",
      "/images": "https://ecomerce-backend-teal.vercel.app/"
    }
  },
  plugins: [react(), tailwindcss(),],
})
