/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    // Disable source maps in development to reduce console noise
    productionBrowserSourceMaps: false,
    experimental: {
        esmExternals: 'loose',
    },
    webpack: (config, { isServer }) => {
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
            encoding: require.resolve('encoding'),
        };

        // Handle ESM modules better
        config.module.rules.push({
            test: /\.m?js$/,
            type: 'javascript/auto',
            resolve: {
                fullySpecified: false,
            },
        });

        // Ignore specific warnings about missing optional dependencies
        config.ignoreWarnings = [
            /Critical dependency: the request of a dependency is an expression/,
            /Module not found: Error: Can't resolve 'encoding'/,
        ];

        // Simple solution: exclude Wormhole packages from server-side bundling
        if (isServer) {
            config.externals.push('@wormhole-foundation/wormhole-connect');
        }

        return config;
    },
    // Transpile Wormhole packages
    transpilePackages: [
        '@wormhole-foundation/wormhole-connect',
        '@wormhole-foundation/sdk',
        '@mui/material',
        '@mui/system',
        '@emotion/react',
        '@emotion/styled',
    ],
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
