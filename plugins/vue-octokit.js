/* eslint-disable no-console */
import { Octokit } from '@octokit/core'

export default (ctx, inject) => {
  const OctokitDefault = Octokit.defaults({
    baseUrl: ctx.env.baseUrl,
    request: { timeout: 1600 }
  })
  const api = new OctokitDefault()
  // Inject axios to the context as $axios
  ctx.$api = api
  inject('api', api)
}
