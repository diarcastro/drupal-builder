const path = require('path');
const { isProd } = require('./env.js');

const defaultConfig = {
  name: 'glider-builder',
  css: {
    theme: {
      base: path.join(process.cwd(), 'src/sass/'),
      src: path.join(process.cwd(), 'src/sass/**/!(_*).scss'),
      dest: path.join(process.cwd(), 'dist/css/'),
    },
    // patterns: {
    //   src: path.join(process.cwd(), 'patterns/**/!(_*).scss'),
    //   dest: '../dist/css/',
    // },
  },
  sassOptions: {
    compilerOptions: {
      errLogToConsole: true,
      outputStyle: isProd ? 'compressed' : 'expanded',
      sourceMap: !isProd,
      includePaths: [
        path.join(process.cwd(), '/node_modules/'),
        path.join(process.cwd(), '/src/sass/'),
      ],
    }
  }
};

module.exports = defaultConfig;
