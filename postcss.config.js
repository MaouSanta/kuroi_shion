// postcss.config.js
module.exports = {
    plugins: {
        'postcss-preset-env': {
            features: {
                'nesting-rules': true,
            },
        },
        autoprefixer: {},
    },
};