const glob = require('glob');
const path = require('path');

const config = require('./config/config');
const { envMode } = require('./config/env');
const loaders = require('./config/loaders');
const plugins = require('./config/plugins');

const currentDirectory = process.cwd();

const {
  css: cssOptions,
} = config || {};

const {
  CSSLoader,
} = loaders;

const {
  CleanWebpackPlugin,
  CssMinimizerPlugin,
  MiniCssExtractPlugin,
} = plugins;

const webpackConfiguration = [];
const defaultCSSWebpackConfig = {
  mode: envMode,
  devtool: 'source-map',
  entry: {},
  output: {
    path: currentDirectory,
  },
  module: {
    rules: [
      CSSLoader,
    ],
  },
};

Object.keys(cssOptions).forEach((cssKey) => {
  const cssEntry = cssOptions[cssKey] || {};
  const {
    base,
    dest,
    src,
  } = cssEntry;

  const configuration = {
    ...defaultCSSWebpackConfig,
    plugins: [
      MiniCssExtractPlugin,
      CleanWebpackPlugin,
    ],
    optimization: {
      minimizer: [
        `...`,
        new CssMinimizerPlugin(),
      ],
    },
  };
  const entry = {};
  glob.sync(src).map((scssFile) => {
    const newFile = scssFile.replace(base, '').replace('.scss', '.css');
    const output = path.join(dest, newFile);

    const bundleName = output
        .replace('.css', '')
        .replace(currentDirectory, '');
    entry[bundleName] = scssFile;
  });
  configuration.entry = entry;
  webpackConfiguration.push(configuration);
});

console.log(`Running Glider builder in ${envMode}...`);
module.exports = webpackConfiguration;
