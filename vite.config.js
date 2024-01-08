import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
// https://vitejs.dev/config/

const manifestForPlugIn = {
  manifest: {
    name: "PrayersTimings",
    short_name: "PrayersTimings",
    description: "I am a simple vite app",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose:'favicon'
      },
      {
        src: "/icon-256x256.png",
        sizes: "512x512",
        type: "image/png",
        purpose:'favicon'
      },
      {
        src: "/icon-384x384.png",
        sizes: "180x180",
        type: "image/png",
        purpose:'apple touch icon',
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose:'any maskable',
      }
    ],
    theme_color: '#ffffff',
    background_color: '#ffffff',
    display: "standalone",
    scope: '/',
    start_url: "/",
    orientation: 'portrait'
  }
}
export default defineConfig({
  plugins: [
    react(), VitePWA({srcDir: 'src',
    filename: 'sw.js'},manifestForPlugIn)
  ],
})
