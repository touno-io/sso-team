import { createApp } from 'vue'
import { createHead } from '@vueuse/head'

import App from './App.vue'
import router from './vue-router'
import vueTabIndex from './vue-tabindex'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import './assets/scss/global.scss'
import './vue-fontawesome.ts'

const head = createHead()

createApp(App)
  .use(head)
  .use(router)
  .use(vueTabIndex)
  .component('fa', FontAwesomeIcon)
  .mount('#app')
