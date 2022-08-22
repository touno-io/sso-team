<!-- eslint-disable no-console -->
<script>
import Vue from 'vue'

const sso = {
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
  async asyncData({ $cookiz, $axios, env }) {
    const token = $cookiz.get('sso.auth')
    const auth = {
      ssoUrl: env.ssoUrl,
      loggedIn: !!token,
      user: null,
      token,
      appId: $cookiz.get('sso.id'),
      appName: $cookiz.get('sso.app'),
      error: '',
    }
    if (auth.loggedIn) {
      try {
        // const { data } = await $api.get(`${env.baseUrl}/v1/auth/account`, {
        //   headers: { Authorization: `Bearer ${token}` }
        // })
        const { headers, data } = await $axios.get('/v1/auth/account', {
          headers: { Authorization: `Bearer ${token}` },
        })

        if (headers['sso-token']) {
          auth.token = headers['sso-token']
          $cookiz.set('sso.auth', token)
        }

        auth.user = data
      } catch (ex) {
        auth.loggedIn = false
        if (ex.response) {
          const { method, path, headers } = ex.request._options
          console.error('ex.req::', { method, path, headers })
          console.error('ex.res::', ex.response.data)
          auth.error = ex.response.data.error
        } else if (ex.request) {
          const { method, path, headers } = ex.request._options
          console.error('ex.req::', { method, path, headers })
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
  <div class="row example">
    <div class="col-sm-22 col-36 mb-3 mb-sm-1 project">
      <div v-if="!auth.loggedIn" class="mt-4">
        <h5>Example Sign-On</h5>
        Single Sign-On (SSO) solutions provide users with an easier way to
        access all of their accounts. Implementing these solutions allows you to
        access all of your accounts, with just one set of credentials.
      </div>
      <h5 class="mt-3 mb-2">Sitemap</h5>
      <ul>
        <li>
          <strong>Projects</strong>
          <ul>
            <h6>Golive</h6>
            <li>
              <a href="https://notice.touno.io" target="_blank"
                >Notice Manager</a
              >
            </li>
            <li>
              <a
                href="https://github.com/touno-io/hentai-downloader"
                target="_blank"
                >Hentai Downloader (Windows App)</a
              >
            </li>
            <li>
              <a
                href="https://github.com/touno-io/psp-library-win"
                target="_blank"
                >PSP Library (Windows App)</a
              >
            </li>
            <li>
              <a href="https://github.com/touno-io/node-debuger" target="_blank"
                >Debugger (node_modules)</a
              >
            </li>
            <h6>Implement</h6>
            <li>
              <a href="https://github.com/touno-io/gokub-bot" target="_blank"
                >GoKub Bot</a
              >
            </li>
            <li>
              <a
                href="https://github.com/touno-io/team-tasklist"
                target="_blank"
                >TEAM Tasklist</a
              >
            </li>
          </ul>
        </li>
        <li>
          <a href="https://docs.touno.io/" target="_blank">Documentation</a>
        </li>
        <li>
          <strong>Terms & Conditions</strong>
          <ul>
            <li>
              <a href="https://legal.touno.io/terms-use"
                >Terms and Conditions</a
              >
            </li>
            <li><a href="https://legal.touno.io/privacy">Privacy Policy</a></li>
            <li><a href="https://legal.touno.io/cookies">Cookies Policy</a></li>
          </ul>
        </li>
        <li>
          <a href="https://mr.touno.io" target="_blank">About Us</a>
        </li>
        <li>
          <a href="https://health.touno.io/" target="_blank">Uptime Stats</a>
        </li>
      </ul>
      <div v-if="auth.loggedIn" class="mt-2">
        <strong
          >After you login
          <span class="badge bg-secondary" v-text="auth.appName" /> you will see
          these information:</strong
        >
        <div class="mt-4">
          <h5>
            JWT Encoded
            <fa
              icon="fa-solid fa-arrow-up-right-from-square"
              class="ml-3"
              style="font-size: 0.85rem"
            />
            <a :href="`https://jwt.io/?token=${auth.token}`" target="_blank"
              >jwt.io</a
            >
          </h5>
          <div class="jwt">
            <span
              v-for="(jwt, i) in auth.token.split('.')"
              :key="i"
              :class="`token_${i}`"
              v-text="`${jwt}${i < 2 ? '.' : ''}`"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-if="!auth.loggedIn" class="col-sm-14 col-36 logined">
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
    <div v-else class="col-sm-14 col-36 logined">
      <img
        :src="`${auth.user.gravatar}?s=220&d=404`"
        class="rounded-circle mb-3"
        width="120"
        height="120"
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

<style lang="scss">
@media screen and (max-width: 450px) {
  .example {
    display: flex;
    flex-direction: row;
    .logined {
      order: 1;
      text-align: center;
    }
    .project {
      order: 2;
    }
  }
}
.example {
  ul {
    padding-left: 1.5em;

    h6 {
      margin: 0.5em 0 0.2em 0;
    }
  }
}

.jwt {
  border: #363d5a solid 1px;
  display: block;
  padding: 1.25em;
  border-radius: 0.3em;
  word-wrap: break-word;
  word-break: break-all;

  > span {
    display: inline;

    // &:not(:last-child)::after {
    //   content: '.';
    //   color: var(--text-color);
    //   margin: 0 .25em;
    // }

    &.token_0 {
      color: #41b883;
    }
    &.token_1 {
      color: #dc3545;
    }
    &.token_2 {
      color: #4a8cd2;
    }
  }
}
</style>
