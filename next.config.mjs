/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "moviesapi.ir",
      },
    ],
  },
};

export default nextConfig;
