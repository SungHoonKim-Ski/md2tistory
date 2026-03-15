/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/md2tistory' : '',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
