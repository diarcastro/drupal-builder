import { join } from 'path';
import { ParsedPath } from 'gulp-rename';
// eslint-disable-next-line import/no-extraneous-dependencies
const resolveConfig = require('tailwindcss/resolveConfig');
import { isProductionEnv } from './env';

import * as tailwindConfig from '../../tailwind.config';

const tailwindConfigResolved = resolveConfig(tailwindConfig);

const { content = [] } = tailwindConfigResolved;
const tailwindContent = (
  content && content.length && content.map((contentItem: string) => join(process.cwd(), contentItem))
) || [];

const DEFAULT_CSS_DEST = 'dist/css/';

const defaultConfig = {
  isProductionEnv,
  name: 'drupal-builder',
  sass: { /* Create an array here ro transpile multiple resources */
    theme: {
      src: join(process.cwd(), 'src/{sass,scss}/**/*.scss'),
      dest: join(process.cwd(), DEFAULT_CSS_DEST),
      filesToWatch: tailwindContent,
      renameFunction: null,
    },
    patterns: {
      src: join(process.cwd(), 'patterns/**/{sass,scss}/**/*.scss'),
      dest: join(process.cwd(), 'patterns'),
      filesToWatch: tailwindContent,
      renameFunction: (scssFile: ParsedPath) => {
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
        join(process.cwd(), 'node_modules/'),
        join(process.cwd(), 'src/scss/'),
        join(process.cwd(), 'src/sass/'),
      ],
    },
  },
};

export default defaultConfig;
