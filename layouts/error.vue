<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/require-prop-types -->
<script>
import Vue from 'vue'

export default Vue.extend({
  layout: 'error',
  props: ['error'],
})
</script>

<template>
  <Ghost :error="error" />
</template>
