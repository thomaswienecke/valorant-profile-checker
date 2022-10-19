
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
    REDIS_URL: process.env.NODE_ENV === 'production' ? 'redis://lab.fritz.box:46379' : 'redis://localhost:6379',
    BASE_URL: process.env.NODE_ENV === 'production' ? 'https://valorant.thomasdissert.com' : 'http://localhost:3000',
  }

}

module.exports = nextConfig
