/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')

const nextConfig = withPWA({
  reactStrictMode: false,
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development'
  },
  swcMinify: true,
  images: {
    domains: ['res.cloudinary.com']
  }
})

module.exports = nextConfig
