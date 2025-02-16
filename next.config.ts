import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // If you have this, keep it
  images: {
    domains: ["s3-alpha-sig.figma.com"], // Add your domain here
  },
};

export default nextConfig;
