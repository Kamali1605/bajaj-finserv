import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/bfhl",
        destination: "/api/bfhl",
      },
    ];
  },
};

export default nextConfig;
