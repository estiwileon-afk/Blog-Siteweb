import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
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