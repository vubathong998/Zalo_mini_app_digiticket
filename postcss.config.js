const tailwindcss = require('tailwindcss');

module.exports = {
    plugins: [
        require('postcss-nesting'),
        require('postcss-aspect-ratio-polyfill'),
        tailwindcss('./tailwind.config.js'),
        require('autoprefixer'),
    ],
};
