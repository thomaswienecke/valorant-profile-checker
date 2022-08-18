const NodeCache = require('node-cache');

console.log("Starting next.config.js with NODE_ENV: ", process.env.NODE_ENV);

/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  output: 'standalone',
  images: {
    domains: ['media.valorant-api.com'],
  },
  serverRuntimeConfig: {
    cache: new NodeCache({ stdTTL: 86400 })
  },
  publicRuntimeConfig: {
    BASE_URL: process.env.NODE_ENV === 'production' ? 'https://valorant.thomasdissert.com' : 'http://localhost:3000',
  }

}

module.exports = nextConfig
