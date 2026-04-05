/** @type {import('next').NextConfig} */
import path from "path";
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: path.resolve(process.cwd()),
  }
}

export default nextConfig
