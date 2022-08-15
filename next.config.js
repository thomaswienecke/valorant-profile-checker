/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  output: 'standalone',
  images: {
    domains: ['media.valorant-api.com'],
  },
}

module.exports = nextConfig
