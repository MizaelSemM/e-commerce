import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.vtexassets.com', // cobre todos os e-commerces VTEX (assets)
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.vteximg.com.br', // cobre todos os e-commerces VTEX (imagens)
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig