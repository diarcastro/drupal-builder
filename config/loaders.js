const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = require('./config');
const { sassOptions } = config || {};

const CSSLoader = {
  test: /\.s[ac]ss$/i,
  exclude: /node_modules/,
  use: [
    MiniCssExtractPlugin.loader,
    {
      loader: "css-loader",
      options: {
        modules: false,
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: true,
      },
    },
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
