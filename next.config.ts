import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // static HTML+JS into ./out — the deck is 100% client-side
  images: { unoptimized: true }, // required for static export if next/image is ever added
  trailingSlash: true, // directory-style URLs, robust on any static host
};

export default nextConfig;
