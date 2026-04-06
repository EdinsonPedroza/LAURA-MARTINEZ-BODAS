/** @type {import('next').NextConfig} */
import path from "path";
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [375, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 64, 128, 256],
  },
  turbopack: {
    root: path.resolve(process.cwd()),
  }
}

export default nextConfig
