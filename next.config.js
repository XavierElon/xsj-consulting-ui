/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {},
  reactStrictMode: false,
  swcMinify: true,
  // concurrentFeatures: true,
  //configure the images loader
  images: {
    domains: ['cdn-icons-png.flaticon.com', 'lh3.googleusercontent.com']
  }
  // serverActions: true
}

module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin-allow-popups' // "same-origin-allow-popups"
          }
        ]
      }
    ]
  }
}

module.exports = nextConfig
