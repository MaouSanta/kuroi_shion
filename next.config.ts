import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  assetPrefix: '/kuroi_shion/', // 替换为您的仓库名
  basePath: '/kuroi_shion', // 替换为您的仓库名
  images: {
    unoptimized: true // GitHub Pages 不支持 Next.js Image Optimization API
  },
  /* config options here */
};

export default nextConfig;
