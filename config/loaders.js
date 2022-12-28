const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = require('./config');
const { sassOptions } = config || {};

const CSSLoader = {
  test: /\.s[ac]ss$/i,
  exclude: /node_modules/,
  use: [
    MiniCssExtractPlugin.loader,
    'css-loader',
    {
      loader: 'sass-loader',
      options: {
        // Prefer `dart-sass`
        implementation: require('sass'),
        sassOptions,
      },
    },
  ],
};


module.exports = {
  CSSLoader,
};
