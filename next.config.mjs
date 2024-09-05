/** @type {import('next').NextConfig} */

const nextConfig = {
    webpack(config) {
        config.module.rules.push({
          test: /\.svg$/i,
          issuer: /\.[jt]sx?$/,
          use: ['@svgr/webpack'],
        })
    
        return config
    },
    image: {
      domains: ["https://main--auth-test111.netlify.app/'"],
  },
};

export default nextConfig;
