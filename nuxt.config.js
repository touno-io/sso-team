export default {
  server: {
    host: 'localhost',
    port: 8080,
  },
  head: {
    titleTemplate: `%s · TOUNO.io`,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
    script: [
      { src: 'https://static.cloudflareinsights.com/beacon.min.js?token=42e216b9090ru59384ygu891dce9eecde&spa=false', defer: true }
    ],
  },
  css: [
    '@assets/scss/global.scss'
  ],
  plugins: [],
  components: true,
  buildModules: [
    '@nuxt/typescript-build',
  ],
  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios'
  ],
  axios: {
    baseURL: '/',
  },
  build: {
    terser: {
      parallel: true,
      cache: true,
      sourceMap: false
    }
  },
  loaders: {
    scss: {},
  }
}
