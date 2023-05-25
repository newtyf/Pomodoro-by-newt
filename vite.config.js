import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
//import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [vue()],
    server: {
      // if you want to enable the host for network, you should create a ".env.local" file and the copy all of ".env.exmaple" into the file.
      host: env.VITE_HOST || false
    }
  }
})
