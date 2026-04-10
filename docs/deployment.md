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
- `RESEND_API_KEY`
- `CONTACT_FORM_FROM_EMAIL`
- `CONTACT_FORM_FROM_NAME`
- `CONTACT_FORM_DEMO_RECIPIENT`
- `CONTACT_FORM_DEMO_RECIPIENTS`
- `CONTACT_FORM_TOUCH_RECIPIENT`
- `CONTACT_FORM_TOUCH_RECIPIENTS`
- `CONTACT_FORM_PRODUCT_ENQUIRY_RECIPIENT`
- `CONTACT_FORM_PRODUCT_ENQUIRY_RECIPIENTS`
- `CONTACT_FORM_SUPPORT_RECIPIENT`
- `CONTACT_FORM_SUPPORT_RECIPIENTS`
- `CONTACT_FORM_PARTNERSHIP_RECIPIENT`
- `CONTACT_FORM_PARTNERSHIP_RECIPIENTS`
- `CONTACT_FORM_CAREERS_RECIPIENT`
- `CONTACT_FORM_CAREERS_RECIPIENTS`
- `CONTACT_FORM_OTHER_RECIPIENT`
- `CONTACT_FORM_OTHER_RECIPIENTS`
- `ERROR_TRACKING_DSN`

### Contact Form Email Setup

The contact forms now send mail through a server-side Resend integration instead of posting directly to a browser-side form service.

Before deploying:

1. Create a Resend API key.
2. Verify the sending domain you want to use.
3. Set `CONTACT_FORM_FROM_EMAIL` to a verified sender address on that domain.
4. Set the recipient inboxes. You can use a single email address or a comma-separated list in each variable.
5. Route each flow as needed:
   - `CONTACT_FORM_DEMO_RECIPIENT` or `CONTACT_FORM_DEMO_RECIPIENTS` for demo requests
   - `CONTACT_FORM_TOUCH_RECIPIENT` or `CONTACT_FORM_TOUCH_RECIPIENTS` for general touch submissions
   - `CONTACT_FORM_PRODUCT_ENQUIRY_RECIPIENT(S)`, `CONTACT_FORM_SUPPORT_RECIPIENT(S)`, `CONTACT_FORM_PARTNERSHIP_RECIPIENT(S)`, `CONTACT_FORM_CAREERS_RECIPIENT(S)`, and `CONTACT_FORM_OTHER_RECIPIENT(S)` for enquiry-type-specific routing

If no touch enquiry override is set, product, support, partnership, and other submissions fall back to `CONTACT_FORM_TOUCH_RECIPIENT` and then `enquiry@clinrtglobal.com`. Careers submissions fall back to `hr@clinrtglobal.com`.

If `RESEND_API_KEY` or `CONTACT_FORM_FROM_EMAIL` is missing, the forms will stay visible but submissions will fail safely and the user will be asked to email the team directly.

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
