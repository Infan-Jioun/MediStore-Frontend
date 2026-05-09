import type { NextConfig } from "next";
import './env'

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: `http://medi-server:5000/api/auth/:path*`,
      },
      {
        source: "/api/:path*",
        destination: "http://medi-server:5000/api/:path*",
      },
    ];
  },

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.ibb.co.com", port: "", pathname: "/**" },
      { protocol: "https", hostname: "i.ibb.co", port: "", pathname: "/**" },
      { protocol: "https", hostname: "images.unsplash.com", port: "", pathname: "/**" },
    ]
  },
};

export default nextConfig;