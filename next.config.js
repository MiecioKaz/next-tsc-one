/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/bel-sites/**",
      },
    ],
  },
  experimental: {
    typedRoutes: true,
  },
};

module.exports = nextConfig;
