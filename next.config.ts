import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        // Allow the main domain and any subdomains (e.g. backend.theminermag.com)
        hostname: "**.theminermag.com",
      },
      {
        protocol: "https",
        hostname: "**.blocksbridge.com",
      },
    ],
  },
};

export default nextConfig;
