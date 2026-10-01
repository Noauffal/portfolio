import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/fr",
        permanent: false,
      },
      {
        source: "/:lang/about",
        destination: "/:lang/experience",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
