/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
    reactStrictMode: true,
  swcMinify: true,
  //configure the images loader
  images: {
    domains: ['cdn-icons-png.flaticon.com'],
  },
}

module.exports = nextConfig
