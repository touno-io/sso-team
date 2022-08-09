export default function ({ $cookiz, query, redirect }) {
  const ssoToken = $cookiz.get('sso.auth')
  if (ssoToken && query.redirectUrl && query.applicationName && query.once) {
    return redirect(`${query.redirectUrl}#token=${ssoToken}&once=${query.once}`)
  }
}
