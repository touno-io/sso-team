module.exports = {
  strategies: {
    sso: {
      scheme: '~/auth/sso',
      baseUrl: process.env.SSO_BASE_URL,
      appId: process.env.SSO_APP_ID,
      redirectUrl: process.env.SSO_APP_REDIRECT || 'http://localhost:8080'
    }
  },
  redirect: {
    login: '/example',
    logout: '/example',
    callback: '/example',
    home: '/example'
  },
  localStorage: { prefix: 'sso.' },
  cookie: { prefix: 'sso.' }
}
