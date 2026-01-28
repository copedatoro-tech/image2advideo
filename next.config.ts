import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    serverActions: true,
  },
  output: 'standalone',
  // 👇 redirect explicit pentru /success
  async redirects() {
    return [
      {
        source: '/success',
        destination: '/(client)/success',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
