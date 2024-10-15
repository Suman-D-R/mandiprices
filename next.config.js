/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable React Strict Mode in development
  reactStrictMode: false,
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
