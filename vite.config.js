import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext',
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/three')) return 'three'
          if (id.includes('node_modules/motion')) return 'motion'
          if (id.includes('node_modules/embla-carousel')) return 'carousel'
          if (id.includes('node_modules/react-icons') || id.includes('node_modules/lucide-react')) return 'icons'
          if (id.includes('node_modules/@emailjs')) return 'email'
        }
      }
    }
  },
  server: {
    port: 3000,
    strictPort: false
  }
})
