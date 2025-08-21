import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tran-thuy-land.oneentry.cloud",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
