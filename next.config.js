
console.log("Starting next.config.js with NODE_ENV: ", process.env.NODE_ENV);

/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  output: 'standalone',
  images: {
    domains: ['media.valorant-api.com'],
  },
  publicRuntimeConfig: {
    NODE_ENV: process.env.NODE_ENV,
    REDIS_URL: process.env.NODE_ENV === 'production' ? process.env.REDIS_URL : 'redis://localhost:6379',
    BASE_URL: process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_BASE_URL : 'http://localhost:3000',
  }

}

module.exports = nextConfig
