/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    FIREBALLS_API_DEVELOPMENT: process.env.FIREBALLS_API,
  },
};

export default nextConfig;
