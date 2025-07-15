// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@':       path.resolve(__dirname, 'src'),
      '@apis':   path.resolve(__dirname, 'src/apis'),
      '@routes': path.resolve(__dirname, 'src/routes'),
      '@pages':  path.resolve(__dirname, 'src/pages'),
      '@layout': path.resolve(__dirname, 'src/layout'),
      '@components': path.resolve(__dirname, 'src/components'),
    },
  },
})
