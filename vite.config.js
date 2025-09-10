import { defineConfig } from 'vite'
import { resolve } from 'path';
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        ensayos: resolve(__dirname, 'pages/Ensayos.html'),
        equipo: resolve(__dirname, 'pages/Nuestro Equipo.html'),
        ensayo1: resolve(__dirname, 'ensayos/1.html'),
      }
    }
  },
  plugins: [
    tailwindcss(),
  ],
  server: {
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      '.tunnelmole.net',
      'muoau9-ip-190-43-149-27.tunnelmole.net'
    ]
  }
})