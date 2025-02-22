import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["s3-alpha-sig.figma.com"], 
  },
};

export default nextConfig;
