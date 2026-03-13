import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "standalone",
  distDir: "build",
  reactStrictMode: !isProd,
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  productionBrowserSourceMaps: false,
  httpAgentOptions: { 
    keepAlive: true 
  },
  
  // Compiler options
  compiler: {
    removeConsole: isProd, // Simply true/false in Next.js 16+
    reactRemoveProperties: isProd,
  },
  
  // Image configuration
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
    // ✅ REMOVED: 'domains' is deprecated
    // domains: ["picsum.photos", "images.unsplash.com"],
    
    // ✅ Use only remotePatterns (keep these)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "tiles.stadiamaps.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  
  // Optional: Add experimental features if needed
  experimental: {
    optimizeCss: true, // Minifies CSS
  },
};

export default nextConfig;