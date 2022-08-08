export default function ({ redirect, query }) {
  const { redirectUri, applicationId, once } = query
  if (!redirectUri || !applicationId || !once) return redirect('/sign-in', { errorStatus: 400, errorMessage: 'application not supported' })
}
