// proxy.ts
import { NextResponse, type NextRequest } from "next/server";

const csp = `
  default-src 'self';
  script-src 'self' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: blob: https://images.unsplash.com https://picsum.photos https://tiles.stadiamaps.com https://*.tile.openstreetmap.org;
  font-src 'self' data:;
  connect-src 'self' https://formsubmit.co https://*.tile.openstreetmap.org;
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self' https://formsubmit.co;
  object-src 'none';
  upgrade-insecure-requests;
`
  .replace(/\s{2,}/g, " ")
  .trim();

export function proxy(_: NextRequest) {
  const response = NextResponse.next();

  response.headers.set("Content-Security-Policy", csp);
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload",
  );
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()",
  );
  response.headers.set("X-DNS-Prefetch-Control", "on");

  return response;
}

// ✅ Config remains the same
export const config = {
  matcher: "/:path*",
};
