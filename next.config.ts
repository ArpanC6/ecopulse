import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Disable automatic AGENTS.md / CLAUDE.md file creation by Next.js
    agentRules: false,
  } as any,
};

export default nextConfig;
