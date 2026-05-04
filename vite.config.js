import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/furniture-store-test/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main:  'index.html',
        admin: 'admin.html'
      }
    }
  }
})
