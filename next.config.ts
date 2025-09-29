import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/login",          // URL yang user akses
        destination: "/auth/login" // route internal di app/
      },
    ]
  },
};

export default nextConfig;
