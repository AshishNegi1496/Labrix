# Deployment Guide

This app is configured for a standalone Next.js deployment.

Build the app on the same operating system and CPU architecture as the target server. For example, if you deploy to Ubuntu on EC2, run `npm ci` and `npm run build:deploy` on Linux, not on a Windows machine.

## Requirements

- Node.js 20 or newer
- `NEXT_PUBLIC_SITE_URL` set to the final public URL
- `NEXT_PUBLIC_APP_ENV` set to `production` for production deploys

Optional environment variables:

- `NEXT_PUBLIC_ENABLE_CURSOR`
- `NEXT_PUBLIC_ENABLE_ANIMATIONS`
- `NEXT_PUBLIC_ANALYTICS_ID`
- `FORM_SUBMIT_TOKEN`
- `ERROR_TRACKING_DSN`

## Build

Install dependencies and create the standalone bundle:

```bash
npm ci
npm run build:deploy
```

This produces a self-contained server in `build/standalone/`.

## Run

Start the production server:

```bash
PORT=3000 HOSTNAME=0.0.0.0 node build/standalone/server.js
```

## EC2 / Linux VM

Recommended flow:

1. Install Node.js 20.
2. Copy the project to the server.
3. Add a `.env.production` file.
4. Run `npm ci`.
5. Run `npm run build:deploy`.
6. Start `node build/standalone/server.js` behind Nginx or another reverse proxy.

## Reverse Proxy

Proxy public traffic to the app on port `3000`.

Example Nginx target:

```nginx
location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```
