import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        // iTunes/Apple CDN — album art from the Last.fm widget
        protocol: "https",
        hostname: "**.mzstatic.com",
      },
    ],
  },
  devIndicators: false
};

export default nextConfig;
