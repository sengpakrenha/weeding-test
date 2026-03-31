import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "69c906cda9fb0ef7c01361fe.imgix.net", pathname: "/**" },
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "demo-03.memora-shine.shop", pathname: "/**" },
    ],
  },
};

export default nextConfig;
