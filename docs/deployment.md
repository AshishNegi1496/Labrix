# Deployment Guide

This app is now safe to deploy directly on Vercel with the default Next.js flow.

## Vercel

1. Push the repository to GitHub, GitLab, or Bitbucket.
2. Import the repo into Vercel.
3. Keep the framework preset as `Next.js`.
4. Leave the build command as `next build`.
5. Deploy.

### What is automatic on Vercel

- `NEXT_PUBLIC_SITE_URL` is optional.
- `NEXT_PUBLIC_APP_ENV` is optional.
- The app automatically uses Vercel system environment variables to detect:
  - the public site URL
  - whether the deploy is `development`, `preview`, or `production`
- Next.js image optimization stays enabled on Vercel.

### Optional Vercel environment variables

Set these only if you want to override the defaults:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_APP_ENV`
- `NEXT_PUBLIC_ENABLE_CURSOR`
- `NEXT_PUBLIC_ENABLE_ANIMATIONS`
- `NEXT_PUBLIC_ANALYTICS_ID`
- `FORM_SUBMIT_TOKEN`
- `ERROR_TRACKING_DSN`

## Local Development

```bash
npm install
npm run dev
```

If `NEXT_PUBLIC_SITE_URL` is not set locally, the app falls back to `http://localhost:3000`.

## Self-Hosting

Outside Vercel, the app keeps the standalone build output:

```bash
npm install
npm run build
```

For non-Vercel production deploys, set:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_APP_ENV=production`
