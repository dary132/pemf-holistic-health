import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // The old five-route structure is indexed. Keep the link equity.
    return [
      { source: "/what-is-pemf", destination: "/pemf", permanent: true },
      { source: "/benefits", destination: "/holistic-health", permanent: true },
    ];
  },
};

export default nextConfig;
