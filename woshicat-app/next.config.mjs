/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: 'cdn.shopify.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'shop.woshicat.com',
        pathname: '/cdn/shop/videos/**'
      },
      {
        protocol: 'https',
        hostname: 'www.facebook.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'connect.facebook.net',
        pathname: '/**'
      }
    ]
  },
  
};

export default nextConfig;