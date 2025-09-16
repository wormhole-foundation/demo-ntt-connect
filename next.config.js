/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  serverExternalPackages: [
    "@wormhole-foundation/wormhole-connect",
    // Add any other specific Wormhole packages you are using
  ],
  // Disable source maps in development to reduce console noise
  productionBrowserSourceMaps: false,
  experimental: {
    esmExternals: 'loose',
  },
  webpack: (config) => {
    // Essential fallbacks for Wormhole Connect
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      crypto: false,
      stream: false,
      url: false,
      zlib: false,
      http: false,
      https: false,
      assert: false,
      os: false,
      path: false,
    };

    return config;
  },
  // Transpile Wormhole packages
  transpilePackages: ['@wormhole-foundation/wormhole-connect'],
  // Reduce console output
  logging: {
    fetches: {
      fullUrl: false,
    },
  },
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
};

module.exports = nextConfig; 