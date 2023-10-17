/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "s3.amazonaws.com",
      "cdn.discordapp.com",
      "lh3.googleusercontent.com",
      "api.dicebear.com",
      "ik.imagekit.io",
    ],
  },
}

module.exports = nextConfig
