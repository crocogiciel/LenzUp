import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    DEVELOPMENT_MODE_ON: process.env.DEVELOPMENT_MODE_ON,
    NEXT_PUBLIC_VAPID_PUBLIC_KEY: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
  }
};

export default nextConfig;
