// vite.config.js
import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  plugins: [
    vue(), // ← defineModel больше не нужно включать отдельно
    vueDevTools(),
    tailwindcss(),
  ],
  server : {
    port: 3000,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@types': fileURLToPath(new URL('./src/types', import.meta.url)),
      '@app': fileURLToPath(new URL('./src/app', import.meta.url)),
      '@processes': fileURLToPath(new URL('./src/processes', import.meta.url)),
      '@layouts': fileURLToPath(new URL('./src/layouts', import.meta.url)),
      '@pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
      '@widgets': fileURLToPath(new URL('./src/widgets', import.meta.url)),
      '@features': fileURLToPath(new URL('./src/features', import.meta.url)),
      '@entities': fileURLToPath(new URL('./src/entities', import.meta.url)),
      '@shared': fileURLToPath(new URL('./src/shared', import.meta.url)),
    },
  },
  // build: {
  //   rollupOptions: {
  //     input: {
  //       main: '/src/app/main.ts'
  //     }
  //   }
  // }
})
