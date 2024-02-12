/** @type {import('next').NextConfig} */
const nextConfig = {
    // Warning: This allows production builds to successfully complete even if your project has ESLint errors.
    // Used for mapping .value for color and sizing info.
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;