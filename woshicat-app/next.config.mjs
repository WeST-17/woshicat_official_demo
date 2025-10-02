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
        hostname: '*.cdn.instagram.com',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'asiatimessquare.com',
        port: ''
      },

    ]
  },
  
};

export default nextConfig;