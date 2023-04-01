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

const defaultConfig = {
  isProductionEnv,
  name: 'drupal-builder',
  sass: { /* Create an array here ro transpile multiple resources */
    theme: {
      src: path.join(process.cwd(), 'src/sass/**/*.scss'),
      dest: path.join(process.cwd(), 'dist/css/'),
      filesToWatch: tailwindContent,
    },
  },
  sassOptions: {
    compilerOptions: {
      errLogToConsole: true,
      outputStyle: isProductionEnv ? 'compressed' : 'expanded',
      sourceMap: !isProductionEnv,
      includePaths: [
        path.join(process.cwd(), '/node_modules/'),
        path.join(process.cwd(), '/src/sass/'),
      ],
    },
  },
};

export default defaultConfig;
