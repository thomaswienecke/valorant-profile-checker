
console.log("Starting next.config.js with NODE_ENV: ", process.env.NODE_ENV);

/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  output: 'standalone',
  images: {
    domains: ['media.valorant-api.com'],
  },
  serverRuntimeConfig: {
    NODE_ENV: process.env.NODE_ENV,
    REDIS_URL: process.env.REDIS_URL,
    BASE_URL: process.env.BASE_URL,
  },

}

module.exports = nextConfig
