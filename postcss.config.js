const autoprefixer = require('autoprefixer');
const colorFunction = require('postcss-color-function');
const cssnano = require('cssnano');
const customProperties = require('postcss-custom-properties');
const easyimport = require('postcss-easy-import');

module.exports = {
  plugins: [
    easyimport,
    customProperties,
    colorFunction(),
    autoprefixer({ browsers: ['last 2 versions'] }),
    cssnano(),
  ],
};
