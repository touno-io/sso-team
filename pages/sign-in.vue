<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'SignInPage',
  head: {
    title: 'Sign In'
  }
})

// import { ref } from 'vue'
// // import { useRoute, useRouter } from 'vue-router'
// // import { useHead } from '@vueuse/head'

// // useHead({ title: 'Sign In · TOUNO.io' })

// // const router = useRouter()
// // const route = useRoute()

// // const { redirectUri, applicationId, once } = route.query
// // if (!redirectUri || !applicationId || !once) router.replace('/')

// // console.log('query:', { redirectUri, applicationId, once })

// let retry = ref(0)
// let submitted = ref(false)
// let errorMessage = ref('')

// let username = ref('')
// let password = ref('')
// let remember = ref(false)

// const onLogin = async () => {
//   try {
//     if (!username.value) throw new Error('Username is empty')
//     if (!password.value) throw new Error('Password is empty.')
//     console.log(`${username.value}:${password.value}`)
//     console.log(`Basic ${window.btoa(`${username.value}:${password.value}`)}`)

//     submitted.value = true
//     // const hash = bcrypt.hashSync(password, 4)

//     // await this.$auth.loginWith('local', {
//     //   headers: { Authorization: `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}` }
//     // })

//     // if (!this.$auth.loggedIn) throw new Error('Username or Password worng.')
//     // submitted = false


//     // this.$auth.$storage.setLocalStorage('signin-remember', {
//     //   username: username,
//     //   password: hash,
//     //   remember: remember
//     // }, true)

//     // $router.push({ path: '/', query: JSON.parse(JSON.stringify($route.query)) })
//   } catch (ex) {
//     console.log(ex)
//     errorMessage.value = !ex.response ? ex.message : ex.response.status > 400 ? 'Username or Password worng.' : 'Server endpoint is offline.'
//     submitted.value = false
//     retry.value++
//     console.log(ex)
//   }
// }

// export default {
//   data: () => ({
//     username: '',
//     password: '',
//     remember: false,
//     submitted: false,
//     retry: 0,
//     errorMessage: null
//   }),
//   created () {
//     // let signin = this.$auth.$storage.getLocalStorage('signin-remember', true)
//     // if (!signin) return

//     // if (signin.username) this.username = signin.username
//     // if (signin.remember) {
//     //   this.password = signin.password
//     //   this.remember = signin.remember
//     // }
//     // if (this.$auth.loggedIn) this.$router.replace('/')
//   },
//   methods: {
//     async onLogin () {
//       if (!this.username.trim()) return this.errorMessage = 'Username is empty.'
//       if (!this.password) return this.errorMessage = 'Password is empty.'
//       try {
//         this.submitted = true
//         const hash = bcrypt.hashSync(this.password, 4)

//         await this.$auth.loginWith('local', {
//           headers: { Authorization: `Basic ${Buffer.from(`${this.username.trim()}:${hash}`).toString('base64')}` },
//           data: { expired: !this.remember }
//         })
//         console.log('$auth', this.$auth)

//         if (!this.$auth.loggedIn) throw new Error('Username or Password worng.')
//         this.submitted = false


//         this.$auth.$storage.setLocalStorage('signin-remember', {
//           username: this.username.trim(),
//           password: hash,
//           remember: this.remember
//         }, true)

//         this.$router.push({ path: '/', query: JSON.parse(JSON.stringify(this.$route.query)) })
//       } catch (ex) {
//         this.errorMessage = !ex.response ? ex.message : ex.response.status > 400 ? 'Username or Password worng.' : 'Server endpoint is offline.'
//         this.submitted = false
//         this.retry++
//       }
//     }
//   }
// }
</script>

<template>
<div class="signin h-100">
  <div class="d-flex">
    <div class="d-none d-lg-flex col-lg-12 col-xl-16 justify-content-end">
      <img class="ml-auto todos" src="../assets/todos_empty.svg">
    </div>
    <div class="col-36 col-lg-24 col-xl-20">
      <div class="d-flex justify-content-center">
        <div class="col-32 col-sm-26 col-md-20">
          <h2>Sign-In</h2>
          <small>Please sign-in with TOUNO.io ID to proceed.</small>
          <div class="login-form pt-3">
            <form v-tabindex @submit.prevent="onLogin">
              <div class="form-group">
                <input v-model="username" tabindex="1" type="text" class="form-control username" placeholder="TEAM Account ID (@touno.io)">
                <input v-model="password" tabindex="2" type="password" class="form-control password" placeholder="Password">
                <small class="help-block text-danger text-bold">
                  <span v-if="errorMessage">
                    <fa icon="fa-solid fa-triangle-exclamation" />
                    {{ errorMessage }}
                  </span>
                </small>
              </div>
              <div class="form-group d-flex align-items-center" style="column-gap: 0.3em;">
                <input id="remember" v-model="remember" type="checkbox" />
                <label class="form-check-label" for="remember">Remember Me</label>
              </div>
              <button
                :disabled="submitted" tabindex="3" type="submit" class="btn btn-block btn-success"
                v-text="submitted ? 'Please wait...' : retry > 0 ? 'Retry again, Sign In' : 'Sign In'"
              />
            </form>
            <div class="row forgot-menu">
              <div class="col-36 pt-3">
                <a href="/forgot-password">
                  <fa icon="fa-solid fa-arrow-up-right-from-square" style="font-size:0.65rem;" /> Forgot your password ?
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
    color: var(--bs-white)
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
    &:hover, &:focus, &:active {
      box-shadow: none;
    }
  }


  .forgot-menu {
    font-size: 0.8rem;
  }
}
</style>