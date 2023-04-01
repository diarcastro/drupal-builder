import * as path from 'path';
// eslint-disable-next-line import/no-extraneous-dependencies
const resolveConfig = require('tailwindcss/resolveConfig');
import { isProductionEnv } from './env';

import * as tailwindConfig from '../../tailwind.config';
const tailwindConfigResolved = resolveConfig(tailwindConfig);

const { content = [] } = tailwindConfigResolved;
const tailwindContent = (
  content && content.length && content.map((contentItem) => path.join(process.cwd(), contentItem))
) || [];

const DEFAULT_CSS_DEST = 'dist/css/';

const defaultConfig = {
  isProductionEnv,
  name: 'drupal-builder',
  sass: { /* Create an array here ro transpile multiple resources */
    theme: {
      src: path.join(process.cwd(), 'src/{sass,scss}/**/*.scss'),
      dest: path.join(process.cwd(), DEFAULT_CSS_DEST),
      filesToWatch: tailwindContent,
      renameFunction: null,
    },
    patterns: {
      src: path.join(process.cwd(), 'patterns/**/{sass,scss}/**/*.scss'),
      dest: path.join(process.cwd(), 'patterns'),
      filesToWatch: tailwindContent,
      renameFunction: (scssFile) => {
        scssFile.dirname = scssFile.dirname.replace(/s[a|c]ss/ig, DEFAULT_CSS_DEST);
      },
    },
  },
  sassOptions: {
    compilerOptions: {
      errLogToConsole: true,
      outputStyle: isProductionEnv ? 'compressed' : 'expanded',
      sourceMap: !isProductionEnv,
      includePaths: [
        path.join(process.cwd(), 'node_modules/'),
        path.join(process.cwd(), 'src/scss/'),
        path.join(process.cwd(), 'src/sass/'),
      ],
    },
  },
};

export default defaultConfig;
