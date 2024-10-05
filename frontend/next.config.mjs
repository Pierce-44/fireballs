/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    FIREBALLS_API_DEVELOPMENT: process.env.FIREBALLS_API,
    FIREBALLS_API_PRODUCTION: process.env.FIREBALLS_API_PRODUCTION,
  },
};

export default nextConfig;
