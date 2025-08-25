/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gerenciador-de-contatos.onrender.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig
