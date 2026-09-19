import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { vitePrerenderPlugin } from 'vite-prerender-plugin'
import { fileURLToPath, URL } from 'node:url'

const prerenderScript = fileURLToPath(new URL('./src/prerender.jsx', import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    vitePrerenderPlugin({
      renderTarget: '#root',
      prerenderScript,
      additionalPrerenderRoutes: [
        '/',
        '/about',
        '/privacy-policy',
        '/terms-of-service',
        '/service/website-development',
        '/service/app-development',
        '/service/ui-designs',
        '/404',
      ],
      previewMiddlewareFallback: '/404',
    }),
    {
      name: 'copy-static-404',
      closeBundle: {
        sequential: true,
        order: 'post',
        async handler() {
          const { copyFile, access } = await import('node:fs/promises')
          const { resolve } = await import('node:path')
          const from = resolve('dist/404/index.html')
          try {
            await access(from)
            await copyFile(from, resolve('dist/404.html'))
          } catch {
            // prerender output may not exist during incomplete builds
          }
        },
      },
    },
  ],
  resolve: {
    alias: {
      '@/registry/magicui/number-ticker': fileURLToPath(new URL('./src/components/ui/number-ticker.jsx', import.meta.url)),
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    target: 'esnext',
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
    esbuild: {
      drop: ['console', 'debugger'],
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
