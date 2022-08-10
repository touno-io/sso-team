<!-- eslint-disable no-console -->
<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'SignInPage',
  middleware: 'sign-on',
  asyncData: async ({ $api, $cookiz, query, redirect }) => {
    const { redirectUrl, applicationId, once, applicationName, errorMessage } = query

    const ssoToken = $cookiz.get('sso.auth')
    if (redirectUrl && applicationId && once && applicationName && ssoToken) redirect(`${redirectUrl}#token=${ssoToken}&once=${once}`)

    if (process.server) {
      if (applicationName || errorMessage) return
      if (!redirectUrl || !applicationId || !once) {
        return redirect('/sign-in', { errorStatus: 404, errorMessage: 'Page not found' })
      }
      try {
        const { data } = await $api.request(`GET /sso/{?redirectUrl}`, { redirectUrl, headers: { 'Application-ID': applicationId, 'Once-Key': once } })
        return redirect('/sign-in', Object.assign(query, data))
      } catch (ex) {
        if (ex.response) {
          return redirect('/sign-in', { errorStatus: ex.response.status, errorMessage: ex.response.data.error })
        } else if (ex.request) {
          console.error('ex.req::', ex.request)
        } else {
          console.error('ex.unknow::', ex)
        }
        return redirect('/sign-in', { errorStatus: 400, errorMessage: 'Server is busy or something is wrong.' })
      }
    }
  },
  data: () => ({
    retry: 0,
    sign: {
      username: '',
      password: '',
    },
    signMessage: '',
    submitted: false,
  }),
  head: {
    title: 'Sign In · ',
  },
  computed: {
    IsError () {
      return !!this.$route.query.errorStatus
    }
  },
  mounted () {
    // console.log('mounted', this.$route.query)
    // const { applicationName } = this.$route.query
    // this.sign.username = localStorage.getItem(`sign.${applicationName}.username`) || ''
  },
  methods: {
    async onLogin () {
      if (!this.sign.username) {
        this.signMessage = 'Username is empty.'
        return
      }
      if (!this.sign.password) {
        this.signMessage = 'Password is empty.'
        return
      }

      try {
        this.$nuxt.$loading.start()
        this.submitted = true
        this.signMessage = ''

        const { data } = await this.$api.request(`POST /v1/auth/sign-in`, {
          headers: { Authorization: `Basic ${Buffer.from(`${this.sign.username}:${this.sign.password}`).toString('base64')}` },
        })
        const { redirectUrl, applicationName, applicationId, once } = this.$route.query
        this.$cookiz.set('sso.auth', data.token)
        this.$cookiz.set('sso.app', applicationName)
        this.$cookiz.set('sso.id', applicationId)
        // localStorage.setItem(`sign.${applicationName}.username`, this.sign.username)

        location.href = `${redirectUrl}#token=${data.token}&once=${once}`
      } catch (ex) {
        if (ex.response) {
          this.signMessage = `${ex.response.data.error} (${ex.response.status})`
          return redirect('/sign-in', { errorStatus: ex.response.status, errorMessage: ex.response.data.error })
        } else if (ex.request) {
          this.signMessage = `Server endpoint is offline. (404)`
          console.error('ex.req::', ex.request)
        } else {
          this.signMessage = `${ex.message} (400)`
          console.error('ex.unknow::', ex)
        }
        this.submitted = false
        this.retry++
      } finally {
        this.$nuxt.$loading.finish()
      }
    }
  },
})
</script>

<template>
  <div class="signin h-100">
    <div v-if="IsError" class="h-100 w-100">
      <Ghost :title="$route.query.errorMessage" />
    </div>
    <div v-else class="d-flex">
      <div class="d-none d-lg-flex col-lg-12 col-xl-16 justify-content-end">
        <img class="ml-auto todos" src="../assets/todos_empty.svg" />
      </div>
      <div class="col-36 col-lg-24 col-xl-20">
        <div class="d-flex justify-content-center">
          <div class="col-32 col-sm-26 col-md-24">
            <div class="login-form pt-3">
              <h2>Sign-In</h2>
              <small>Please sign-in with <strong>{{$route.query.applicationName}}</strong> to proceed. </small>
              <form v-tabindex class="mt-2" @submit.prevent="onLogin">
                <div class="form-group">
                  <input
                    v-model.trim="sign.username"
                    v-focus
                    :disabled="submitted"
                    tabindex="1"
                    type="text"
                    class="form-control username"
                    placeholder="TEAM Account ID (@touno.io)"
                  />
                  <input
                    v-model.trim="sign.password"
                    :disabled="submitted"
                    tabindex="2"
                    type="password"
                    class="form-control password"
                    placeholder="Password"
                  />
                  <small class="help-block text-danger text-bold">
                    <span v-if="signMessage">
                      <fa icon="fa-solid fa-triangle-exclamation" />
                      {{ signMessage }}
                    </span>
                  </small>
                </div>
                <button
                  :disabled="submitted"
                  tabindex="3"
                  type="submit"
                  class="btn btn-block btn-success"
                >
                  <fa :icon="`fa-solid ${submitted?'fa-sync':'fa-arrow-right-to-bracket'}`" class="mr-2" :class="{'fa-spin':submitted}" />
                  <span v-text="submitted?'Please wait...':retry>0?'Retry again, Sign In':'Sign In'"></span>
                </button>
              </form>
              <div class="row forgot-menu">
                <div class="col-36 pt-3">
                  <a href="/forgot-password">
                    <fa
                      icon="fa-solid fa-arrow-up-right-from-square"
                      style="font-size: 0.65rem"
                    />
                    Forgot your password ?
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
img.todos {
  max-width: 450px;
  width: 264px;
}
.login-form {
  > form {
    display: flex;
    flex-direction: column;
    row-gap: 0.6em;
  }

  .btn {
    color: var(--bs-white);
  }

  .custom-control-label {
    font-size: 0.9rem;
  }

  .form-control {
    &.username {
      border-radius: 2px 2px 0 0;
    }
    &.password {
      margin-top: -2px;
      border-radius: 0 0 2px 2px;
    }
    &:hover,
    &:focus,
    &:active {
      box-shadow: none;
    }
  }

  .forgot-menu {
    font-size: 0.8rem;
  }
}
</style>
