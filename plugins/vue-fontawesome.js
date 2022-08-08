import Vue from 'vue'
import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

config.autoAddCss = false
library.add(fas, far)

// eslint-disable-next-line vue/multi-word-component-names
Vue.component('Fa', FontAwesomeIcon)
