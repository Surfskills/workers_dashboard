import { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  webpack(config) {
    config.resolve.alias['@carouselData'] = path.join(__dirname, 'src/lib/carousel/carouselData.ts');
    return config;
  },
  images: {
    domains: ['user-images.strikinglycdn.com'], // Add external domains here
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'user-images.strikinglycdn.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
