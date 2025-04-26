import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "s3-alpha-sig.figma.com",
      "avatar.iran.liara.run",
      "demos.creative-tim.com",
    ],
  },
};

export default nextConfig;
