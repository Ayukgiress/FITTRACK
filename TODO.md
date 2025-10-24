# TODO: Fix Google OAuth Callback URL

## Tasks
- [x] Update `src/Component/GoogleAuth.jsx` to set `callbackUrl` to `${window.location.origin}/auth/callback` instead of `window.location.origin`
- [x] Move Home route to bottom in App.jsx to prevent OAuth callback routes from being overridden
- [x] Add timeout handling in OauthCallback.jsx for backend failures
- [x] Add force navigation fallback in OauthCallback.jsx to prevent getting stuck on callback page
- [ ] Test Google login flow locally to verify callback handling works correctly
- [ ] Check browser console for logs from `OauthCallback.jsx` during authentication
- [ ] Ensure user is redirected to dashboard after successful authentication
