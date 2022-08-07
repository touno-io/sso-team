/* eslint-disable no-console */
const { Octokit } = require('@octokit/core')
const octokit = new Octokit({ request: { signal: 0, timeout: 1000 } })

export default async function ({ env, query }) {
  console.log('env:', env)
  console.log('query:', query)
  // let ssoOwnerVerify = false
  try {
    const { status, data } = await octokit.request(`POST ${env.baseUrl}/health`)
    console.log('request:', { status, data })
    // ssoOwnerVerify = true
  } catch (ex) {
    if (ex.response) {
      const {
        status,
        data: { error },
      } = ex.response
      console.log('ex.res::', status, error)
    } else if (ex.request) {
      const { method, url } = ex.request
      console.log('ex.req::', method, url)
    }
  }

  // if (!query.redirectUri || !query.applicationId || !query.once) return redirect('/', { error: 'The application parameters are missing.' })

  // const isAuthenticated = !!store.state.auth.user
  // if (!isAuthenticated) {
  //   // eslint-disable-next-line no-console
  //   console.log('!isAuthenticated')
  // }
}
