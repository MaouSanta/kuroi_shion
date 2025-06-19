// postcss.config.cjs
export default {
    plugins: {
        'postcss-preset-env': {
            features: {
                'nesting-rules': true,
            },
        },
        autoprefixer: {},
    },
  };