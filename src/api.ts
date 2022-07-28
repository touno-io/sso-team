const { Octokit } = require('@octokit/core')

const { VITE_APIS } = import.meta.env

export default new Octokit({
  baseUrl: VITE_APIS,
})
