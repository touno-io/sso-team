<script lang="ts" setup>
import navigation from './components/navigation.vue'
import mainFooter from './components/main-footer.vue'
</script>

<template>
  <navigation />
  <div class="container main-container">
    <router-view />
  </div>
  <main-footer :popup="false" />
</template>
