import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Makes the server accessible externally
    host: true,
    // Allows requests from your Render host
    allowedHosts: [process.env.VITE_RENDER_HOST],
  },
});
