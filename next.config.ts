import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/login", // URL yang user akses
        destination: "/auth/login", // route internal di app/
      },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000", // sesuaikan port Express kamu
        pathname: "/storage/**",
      },
    ],
  },
};

export default nextConfig;
