import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'My App',
        short_name: 'App',
        description: 'My Progressive Web App',
        theme_color: '#000000',
        icons: [
          {
            src: '/android-02192.png', 
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/android-02512.png', 
            sizes: '512x512',
            type: 'image/png',
          },
        ],
        screenshots: [
          {
            src: '/screenshot03.png',  // public内の画像
            sizes: '1280x720',
            type: 'image/png',
            form_factor: 'wide', 
          },
          {
            src: '/screenshot03.png',  // public内の画像
            sizes: '1280x720',
            type: 'image/png',
            form_factor: 'any',  // 'wide'以外
          },
        ],
      },
    }),
  ],
});
