const path = require('path');

module.exports = {
  entry: {
    bundle: './scripts/index',
  },
  devtool: 'source-map',
  output: {
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
      },
    ],
  },
};
