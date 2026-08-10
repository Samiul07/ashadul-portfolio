import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Phone/LAN preview hits the PC via its local IP. Without this, Next blocks
  // /_next/webpack-hmr as a cross-origin request and the client keeps retrying
  // (looks like the page is endlessly reloading/re-rendering on mobile).
  allowedDevOrigins: ["192.168.0.242"],
  images: {
    // These candidates match the fixed artwork slots used by the navbar,
    // portrait cards, and desktop hero. Without them, the browser jumps from
    // 384px to 640/750px for elements that are only ~440/697px wide.
    deviceSizes: [640, 704, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [32, 48, 64, 96, 128, 132, 192, 256, 264, 320, 384, 448, 480],
    qualities: [60, 75],
  },
};

export default nextConfig;
