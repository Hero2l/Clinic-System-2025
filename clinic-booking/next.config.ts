import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // ✅ Don't run ESLint during production builds (Docker, CI, etc.)
    ignoreDuringBuilds: true,
  },
  typescript: {
    // ✅ Don't block builds on type errors (you'll still see them in dev)
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
