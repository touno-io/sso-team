<script lang="ts" setup>
import Navigation from './components/navigation.vue'
import MainFooter from './components/main-footer.vue'
</script>

<template>
  <Navigation />
  <div class="container main-container">
    <router-view />
  </div>
  <MainFooter />
</template>
