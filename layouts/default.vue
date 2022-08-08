<script>
import Vue from 'vue'
import MainNavbar from '~/components/main-navbar.vue'
import MainFooter from '~/components/main-footer.vue'

export default Vue.extend({
    name: "DefaultLayout",
    components: { MainNavbar, MainFooter }
})
</script>

<template>
  <div>
    <MainNavbar />
    <div class="container main-container">
      <Nuxt />
    </div>
    <MainFooter />
  </div>
</template>
