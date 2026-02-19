/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: '*.fbcdn.net',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'lvhoyohlrnxlzhkviwfp.supabase.co',
        pathname: '**',
      }
    ],
  },
  experimental: {
    // turbopack options removed as they are invalid
  },
};

export default nextConfig;
