import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Phone/LAN preview hits the PC via its local IP. Without this, Next blocks
  // /_next/webpack-hmr as a cross-origin request and the client keeps retrying
  // (looks like the page is endlessly reloading/re-rendering on mobile).
  allowedDevOrigins: ["192.168.0.242"],
};

export default nextConfig;
