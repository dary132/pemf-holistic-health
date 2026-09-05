import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // The old five-route structure is indexed. Keep the link equity.
    return [
      { source: "/what-is-pemf", destination: "/pemf", permanent: true },
      // /benefits pointed at /holistic-health until that page was folded
      // into the home page on 2026-09-04; both now land there.
      { source: "/benefits", destination: "/", permanent: true },
      { source: "/holistic-health", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
