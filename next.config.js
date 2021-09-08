const withPWA = require('next-pwa');
const runtimeCaching = require("next-pwa/cache");

module.exports = withPWA({
    pwa: {
        dest: "public",
        register: true,
        skipWaiting: true,
        runtimeCaching,
        disable: process.env.NODE_ENV === 'development',
    },
    i18n: {
        locales: ['en-US'],
        defaultLocale: 'en-US',
    },
    webpack: (config, { isServer, webpack }) => {
        if (!isServer) {
            config.plugins.push(
                new webpack.IgnorePlugin({
                    checkResource(resource, _context) {
                        // ??
                        if (resource.includes("mongoose")) {
                            return true;
                        }
                        return false;
                    },
                }),
            );
        }

        return config;
    },
})