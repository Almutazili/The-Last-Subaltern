/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["raw.githubusercontent.com"],
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/admin",
          destination: "/admin/index.html",
        },
        {
          source: "/admin/config.yml",
          destination: "/admin/config.yml",
        },
      ],
    }
  },
}

module.exports = nextConfig
