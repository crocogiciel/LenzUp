import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    DEVELOPMENT_MODE_ON: process.env.DEVELOPMENT_MODE_ON,
  }
};

export default nextConfig;
