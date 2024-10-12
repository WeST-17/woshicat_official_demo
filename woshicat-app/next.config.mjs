/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.shopify.com', 'res.cloudinary.com'], // Add your domain(s) here
    deviceSizes: [320, 420, 768, 1024, 1200], // Add the sizes you need
    imageSizes: [16, 32, 48, 64], // Add the sizes you need
  },
};

export default nextConfig;