const isDev = process.env.NODE_ENV === 'development'

export default {
  ssr: true,
  server: {
    port: 8080,
  },
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    ssoUrl: process.env.SSO_BASE_URL || 'http://localhost:8080',
    ssoRedirectURL:
      process.env.SSO_APP_REDIRECT || 'http://localhost:8080/example',
    ssoAppID: process.env.SSO_APP_ID || '',
  },
  loading: {
    color: '#ee5151',
    height: '3px',
  },
  head: {
    titleTemplate: `%sTEAM TOUNO.io`,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      isDev
        ? ''
        : {
            src: 'https://static.cloudflareinsights.com/beacon.min.js',
            'data-cf-beacon': '{"token": "fb5b3ae4504f483f8a77f9d83d215c9c"}',
            defer: true,
          },
    ],
  },
  // serverMiddleware: ['~/server-middleware/sign-in'],
  css: [
    '~/assets/scss/global.scss',
    '@fortawesome/fontawesome-svg-core/styles.css',
  ],
  components: true,
  buildModules: ['@nuxt/typescript-build', '@nuxtjs/google-fonts'],
  plugins: [
    { src: '~/plugins/vue-notification.server.js', mode: 'server' },
    { src: '~/plugins/vue-notification.client.js', mode: 'client' },
    '~/plugins/vue-fontawesome.js',
    '~/plugins/vue-tabindex.js',
  ],
  modules: [
    ['cookie-universal-nuxt', { alias: 'cookiz' }],
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
  ],
  bootstrapVue: { icons: false },
  axios: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    retry: { retries: 3 },
  },
  googleFonts: {
    prefetch: true,
    display: 'swap',
    families: {
      Roboto: true,
      Poppins: [400, 600],
      Mulish: [400, 700],
    },
  },
  build: {
    babel: { compact: true },
    parallel: true,
    terser: {
      parallel: true,
      cache: true,
      sourceMap: false,
    },
  },
  loaders: {
    scss: {},
  },
}
