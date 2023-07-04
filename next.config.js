// /** @type {import('next').NextConfig} */
// const nextConfig = {}

// module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["mongoose"],
  },
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };
    config.resolve.fallback = {
      fs: false,
      net: false,
      tls: false,
      path: false,
    };
    return config;
  },
};

module.exports = nextConfig;
