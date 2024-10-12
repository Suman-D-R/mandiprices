/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Add this configuration
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
    ];
  },
};

module.exports = nextConfig;
