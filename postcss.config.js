module.exports = {
    plugins: {
        'postcss-smart-import': {},
        'postcss-mixins': {},
        'postcss-simple-vars': {},
        'postcss-nested': {},
        'postcss-custom-media': {},
        'postcss-responsive-type': {},
        'postcss-color-function': {},
        'postcss-inline-svg': {},
        'postcss-svgo': {},
        'postcss-calc': {},
        'autoprefixer': {
            browserlist: [
                '>1%',
                'last 4 versions',
                'Firefox ESR',
                'not ie < 9', // React doesn't support IE8 anyway
            ],
            flexbox: 'no-2009',
        }
    }
}