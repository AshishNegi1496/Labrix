import { NextResponse } from "next/server";

function buildContentSecurityPolicy(isDevelopment: boolean) {
  const scriptSrc = isDevelopment
    ? "'self' 'unsafe-inline' 'unsafe-eval'"
    : "'self' 'unsafe-inline'";
  const connectSrc = [
    "'self'",
    "https://formsubmit.co",
    "https://*.tile.openstreetmap.org",
    ...(isDevelopment ? ["ws:", "wss:"] : []),
  ].join(" ");

  return `
    default-src 'self';
    script-src ${scriptSrc};
    script-src-attr 'none';
    style-src 'self' 'unsafe-inline';
    img-src 'self' data: blob: https://images.unsplash.com https://picsum.photos https://tiles.stadiamaps.com https://*.tile.openstreetmap.org;
    media-src 'self' data: blob:;
    font-src 'self' data:;
    connect-src ${connectSrc};
    worker-src 'self' blob:;
    frame-ancestors 'none';
    base-uri 'self';
    form-action 'self' https://formsubmit.co;
    object-src 'none';
    ${isDevelopment ? "" : "upgrade-insecure-requests;"}
  `
    .replace(/\s{2,}/gu, " ")
    .trim();
}

export function proxy() {
  const isDevelopment = process.env.NODE_ENV !== "production";
  const contentSecurityPolicy = buildContentSecurityPolicy(isDevelopment);
  const response = NextResponse.next();

  response.headers.set("Content-Security-Policy", contentSecurityPolicy);
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");

  if (!isDevelopment) {
    response.headers.set(
      "Strict-Transport-Security",
      "max-age=63072000; includeSubDomains; preload",
    );
  }

  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()",
  );
  response.headers.set("X-DNS-Prefetch-Control", "on");

  return response;
}

export const config = {
  matcher: "/:path*",
};
