import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  async redirects() {
    return [];
  },
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production"
  },
  experimental: {

    serverActions: {
      bodySizeLimit: "10mb",
    },
    turbo: {},
  },
  images: {
 // Allowed image domains
  },
  /* config options here */
};

export default nextConfig;
