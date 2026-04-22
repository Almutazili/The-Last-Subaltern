/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["raw.githubusercontent.com"],
  },
  async redirects() {
    return [
      {
        source: "/admin",
        destination: "/admin/index.html",
        permanent: false,
      },
    ]
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/admin/config.yml",
          destination: "/admin/config.yml",
        },
      ],
    }
  },
}

module.exports = nextConfig
