import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  experimental: {
    // Hostinger's builder reports dozens of CPUs and spawned 54 static-generation
    // workers, one of which segfaulted (SIGSEGV); a small fixed pool is enough.
    cpus: 4,
  },
};

export default nextConfig;
