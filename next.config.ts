import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow loading images from Sanity
  images: {
    domains: ["cdn.sanity.io"],
  },
  // Tell Next.js to use src/ as the root
  experimental: {
    typedRoutes: true,
  },
};

export default nextConfig;