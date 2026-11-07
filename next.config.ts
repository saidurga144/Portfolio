import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  // GSAP 3.x ships CommonJS with no `exports` field — must be transpiled
  // for Next.js 15 App Router (RSC bundler requires ESM-compatible modules)
  transpilePackages: ["gsap"],
  webpack: (config, { dev }) => {
    if (dev) {
      // In-memory Webpack cache prevents .pack.gz corruption on restart
      config.cache = { type: "memory" };
    }
    return config;
  },
};

export default nextConfig;
