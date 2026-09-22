import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { vitePrerenderPlugin } from 'vite-prerender-plugin'
import { fileURLToPath, URL } from 'node:url'
import process from 'node:process'

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
    {
      name: 'cleanup-prerender-handles',
      closeBundle: {
        sequential: true,
        order: 'post',
        handler() {
          // React 19's react-dom/server creates a MessageChannel for internal task scheduling during prerender.
          // In Node.js, the MessagePort keeps an active handle in the event loop, causing `vite build` to hang indefinitely.
          // Closing the dangling MessagePort(s) allows the Node.js process to exit naturally once the build is finished.
          setTimeout(() => {
            if (typeof process !== 'undefined' && typeof process._getActiveHandles === 'function') {
              for (const handle of process._getActiveHandles()) {
                if (handle && handle.constructor && handle.constructor.name === 'MessagePort') {
                  try {
                    handle.close()
                  } catch {
                    // ignore
                  }
                }
              }
            }
          }, 50)
        },
      },
    },
  ],
  resolve: {
    alias: {
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
      onwarn(warning, defaultHandler) {
        if (warning.code === 'SOURCEMAP_BROKEN') return
        defaultHandler(warning)
      },
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
