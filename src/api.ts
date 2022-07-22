const { Octokit } = require('@octokit/core')

export default new Octokit({
  baseUrl: 'https://www.touno.io/',
})
