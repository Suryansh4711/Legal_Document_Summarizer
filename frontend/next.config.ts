import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Skip type checking during build (errors will still show in IDE)
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
