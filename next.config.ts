import type { NextConfig } from "next";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kdwpecddwtaczhoorylb.supabase.co',
        pathname: '/storage/v1/object/sign/**',
      },
    ],
  },
};

module.exports = nextConfig;