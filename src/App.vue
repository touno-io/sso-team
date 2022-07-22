<script lang="ts" setup>
import { useHead } from '@vueuse/head'
import Navigation from './components/navigation.vue'
import MainFooter from './components/main-footer.vue'

useHead({
  titleTemplate: title => title ? `${title} · TOUNO.io` : 'TEAM Touno.io'
})
</script>

<template>
  <Navigation />
  <div class="container main-container">
    <router-view />
  </div>
  <MainFooter />
</template>