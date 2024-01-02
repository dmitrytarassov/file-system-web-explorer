module.exports = {
    webpack: {
        configure: (webpackConfig, { env, paths }) => {
            webpackConfig.resolve = {
                ...(webpackConfig.resolve || {})
            };

            webpackConfig.resolve.fallback = {
                ...webpackConfig.resolve.fallback,
                "timers": require.resolve('timers-browserify')
            }

            return webpackConfig;
        },
    }
}