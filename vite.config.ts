import vue from '@vitejs/plugin-vue'
import { UserConfig } from 'vite'

const config: UserConfig = {
  server: {
    port: 8080,
  },
  plugins: [vue()],
  build: {
    ssr: false,
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`
      }
    }
  }
}

export default config
