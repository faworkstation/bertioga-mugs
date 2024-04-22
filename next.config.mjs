/** @type {import('next').NextConfig} */
const nextConfig = {
      reactStrictMode: true,
      images: {
            domains: ['bertioga-mugs.s3.sa-east-1.amazonaws.com'],
      },
};

export default nextConfig;
