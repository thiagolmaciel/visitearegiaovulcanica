// next.config.js
/** @type {import('next').NextConfig} */
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
};

module.exports = nextConfig;
