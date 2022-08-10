<!-- eslint-disable no-console -->
<script>
import Vue from 'vue'

const sso = {
  baseSignUrl: 'http://localhost:8080/sign-in',
  baseUserUrl: 'http://localhost:3000/v1/auth/account',
  getUser() {
    return this.$cookiz.get('sso.auth') || ''
  },
  getAccessToken() {
    return this.$cookiz.get('sso.auth') || ''
  },
  signInRedirect(ssoUrl, appId, redirectUrl, once) {
    const uri = `${ssoUrl}/sign-in?&applicationId=${appId}&redirectUrl=${redirectUrl}&once=${once}`
    console.log('redirect:', uri)
    location.href = uri
  },
}

export default Vue.extend({
  name: 'ExamplePage',
  async asyncData({ $cookiz, $api, env }) {
    const token = $cookiz.get('sso.auth')
    const auth = {
      ssoUrl: env.ssoUrl,
      loggedIn: !!token,
      user: null,
      token,
      error: '',
    }
    if (auth.loggedIn) {
      try {
        // const { data } = await $api.get(`${env.baseUrl}/v1/auth/account`, {
        //   headers: { Authorization: `Bearer ${token}` }
        // })
        const { data } = await $api.request(`GET /v1/auth/account`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        auth.user = data
        console.log(`${auth.user.gravatar}?s=220&d=404`)
      } catch (ex) {
        auth.loggedIn = false
        if (ex.response) {
          console.error('ex.res', ex.response.data)
          auth.error = ex.response.data.error
        } else if (ex.request) {
          console.error('ex.req::', ex.request)
        } else {
          console.error('ex.unknow::', ex)
        }
      }
    }
    return { appId: env.ssoAppID, appUrl: env.ssoRedirectURL, auth }
  },
  data: () => ({
    sign: {
      redirected: false,
      approved: false,
      reload: false,
    },
  }),
  head: {
    title: 'SSO Example · ',
  },
  mounted() {
    if (this.$route.hash.replace(/^#/, '')) {
      const param = new URLSearchParams(this.$route.hash.replace(/^#/, ''))
      this.$cookiz.set('sso.auth', param.get('token'))
      this.$router.replace(this.$route.path)
    }
    if (this.auth.error) this.$cookiz.remove('sso.auth')
  },
  methods: {
    getOnceKey() {
      return Buffer.from(new Date().toISOString(), 'utf8').toString('base64')
    },
    onSignIn() {
      this.sign.redirected = true
      sso.signInRedirect(
        this.auth.ssoUrl,
        this.appId,
        this.appUrl,
        this.getOnceKey()
      )
    },
    onSignOutCancel() {
      this.sign.approved = false
    },
    onSignOutConfirm() {
      if (!this.sign.approved) {
        this.sign.approved = true
      } else {
        this.sign.approved = false
        this.sign.reload = true
        this.$cookiz.remove('sso.auth')
        this.$cookiz.remove('sso.id')
        this.$router.go(this.$router.currentRoute)
      }
      // this.$notify({
      //   type: 'error',
      //   group: 'exception',
      //   title: 'Important message',
      //   text: 'Hello user! This is a notification!'
      // })
      // sso.signInRedirect(this.appId, this.appUrl, this.getOnceKey())
    },
  },
})
</script>

<template>
  <div class="row">
    <div class="col-sm-22 col-36 mb-3 mb-sm-1">
      <h5>Example Sign-On</h5>
      <div>
        Single Sign-On (SSO) solutions provide users with an easier way to
        access all of their accounts. Implementing these solutions allows you to
        access all of your accounts, with just one set of credentials.
      </div>
    </div>
    <div v-if="!auth.loggedIn" class="col-sm-14 col-36">
      <h5>Guest User</h5>
      <div>Please click Sign-In Button.</div>
      <button
        type="button"
        class="btn btn-primary mt-3"
        :disabled="sign.redirected"
        @click="onSignIn"
      >
        <fa
          :icon="`fa-solid ${
            sign.redirected ? 'fa-sync' : 'fa-arrow-right-to-bracket'
          }`"
          class="mr-2"
          :class="{ 'fa-spin': sign.redirected }"
        />
        <span v-text="sign.redirected ? 'Redirect...' : 'Sign-In TOUNO.io'" />
      </button>
    </div>
    <div v-else class="col-sm-14 col-36">
      <img
        :src="`${auth.user.gravatar}?s=220&d=404`"
        class="rounded-circle mb-3"
        style="width: 120px"
        :alt="auth.user.name"
      />
      <h5 v-text="`Welcome, ${auth.user.name}`" />
      <p class="text-muted">
        {{ auth.user.job }}
        <span class="badge bg-info text-white" v-text="auth.user.level" />
      </p>
      <button
        type="button"
        class="btn mt-3"
        :class="!sign.approved ? 'btn-warning' : 'btn-danger'"
        :disabled="sign.reload"
        @click="onSignOutConfirm"
      >
        <fa
          :icon="`fa-solid ${
            !sign.approved ? 'fa-arrow-right-from-bracket' : 'fa-circle-check'
          }`"
          class="mr-2"
        />
        <span
          v-text="
            sign.approved ? (sign.reload ? 'Good bye...' : 'Confirm') : 'Logout'
          "
        ></span>
      </button>
      <button
        v-show="sign.approved"
        type="button"
        class="btn btn-secondary ml-1 mt-3"
        @click="onSignOutCancel"
      >
        <span>Cancel</span>
      </button>
    </div>
  </div>
</template>

<style lang="scss"></style>
