const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const miniCssExtractPlugin = new MiniCssExtractPlugin({
  filename: '[name].min.css',
});

const cleanWebpackPlugin = new CleanWebpackPlugin({
  protectWebpackAssets: false, // Required for removal of extra, unwanted dist/css/*.js files.
  cleanOnceBeforeBuildPatterns: [
    'dist',
  ],
  cleanAfterEveryBuildPatterns: [
    'dist/css/**/*.js', // Remove all unwanted, auto generated JS files from dist/css folder.
    'dist/css/**/*.js.map',
    'patterns/**/dist/css/**/*.js', // Remove all unwanted, auto generated JS files from patterns folder.
    'patterns/**/dist/css/**/*.js.map',
  ],
});

module.exports = {
  MiniCssExtractPlugin: miniCssExtractPlugin,
  CssMinimizerPlugin,
  CleanWebpackPlugin: cleanWebpackPlugin,
};
