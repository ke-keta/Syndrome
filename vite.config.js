import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) =>({
  base: mode === 'production' ? '/Syndrome/' : '/',  // ここにリポジトリ名を入力（例：'/my-app/'）
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
            src: '/Syndrome/android-02192.png',  // 修正後のパス
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/Syndrome/android-02512.png',  // 修正後のパス
            sizes: '512x512',
            type: 'image/png',
          },
        ],
        
        screenshots: [
          {
            src: 'screenshot03.png',
            sizes: '1280x720',
            type: 'image/png',
          },
          {
            src: 'screenshot03.png',
            sizes: '1280x720',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
}));
