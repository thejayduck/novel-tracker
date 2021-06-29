module.exports = {
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
                        if (resource.includes("pg")) {
                            return true;
                        }
                        return false;
                    },
                }),
            );
        }

        return config;
    },
}