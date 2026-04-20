/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dkstatics-public.digikala.com',
        port: '',
        pathname: '/**',
      },
      // اگر از دامنه‌های دیگه‌ای هم عکس داری، اینجا اضافه کن
    ],
  },
};

export default nextConfig;