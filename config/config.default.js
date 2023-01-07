const path = require('path');
const { isProd } = require('./env.js');

const defaultConfig = {
  name: 'glider-builder',
  css: {
    theme: {
      base: path.join(process.cwd(), 'src/scss/'),
      src: path.join(process.cwd(), 'src/scss/**/!(_*).scss'),
      dest: path.join(process.cwd(), 'dist/css/'),
    },
    patterns: {
      src: path.join(process.cwd(), 'patterns/**/!(_*).scss'),
      dest: 'dist/css/',
      relative: true, /* Generate the base path based on the scss file path */
    },
  },
  sassOptions: {
    compilerOptions: {
      errLogToConsole: true,
      outputStyle: isProd ? 'compressed' : 'expanded',
      sourceMap: !isProd,
      includePaths: [
        path.join(process.cwd(), '/node_modules/'),
        path.join(process.cwd(), '/src/scss/'),
      ],
    }
  }
};

module.exports = defaultConfig;
