import { withTailwindCSS } from '@zeit/next-tailwind'

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

// Use the `withTailwindCSS` function to enhance the `nextConfig` object
module.exports = withTailwindCSS({
  tailwindCss: {
    config: './tailwind.config.js',
    jit: true,
  },
  ...nextConfig,
})
