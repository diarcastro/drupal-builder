const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const miniCssExtractPlugin = new MiniCssExtractPlugin({
  filename: '[name].min.css',
});

module.exports = {
  MiniCssExtractPlugin: miniCssExtractPlugin,
  CleanWebpackPlugin: new CleanWebpackPlugin({
    protectWebpackAssets: false, // Required for removal of extra, unwanted dist/css/*.js files.
    cleanOnceBeforeBuildPatterns: [
      'dist',
    ],
    cleanAfterEveryBuildPatterns: [
      'dist/css/**/*.js', // Remove all unwanted, auto generated JS files from dist/css folder.
      'dist/css/**/*.js.map',
    ],
  }),
};
