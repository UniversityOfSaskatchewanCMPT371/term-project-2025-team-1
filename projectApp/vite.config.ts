import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), mkcert()
  ],
  server: {
    host: true, // needed for the Docker Container port mapping to work
    port: 5173, // you can replace this port with any port
  },
})
