import type { NextConfig } from "next";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kdwpecddwtaczhoorylb.supabase.co',
        pathname: '/storage/v1/object/public/**', // imagens públicas
      },
      {
        protocol: 'https',
        hostname: 'kdwpecddwtaczhoorylb.supabase.co',
        pathname: '/storage/v1/object/sign/**', // (opcional) imagens privadas
      },
    ],
  },
  experimental: {
    webpackMemoryOptimizations: true,
  },
};

export default nextConfig;
