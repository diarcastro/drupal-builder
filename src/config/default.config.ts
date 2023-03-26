import * as path from 'path';
import { isProductionEnv } from './env';

import * as tailwindConfig from '../../tailwind.config';

const { content = [] } = tailwindConfig;
const tailwindContent = (
  content && content.length && content.map((contentItem) => path.join(process.cwd(), contentItem))
) || [];

const defaultConfig = {
  isProductionEnv,
  name: 'drupal-builder',
  scss: { /* Create an array here ro transpile multiple resources */
    theme: {
      src: path.join(process.cwd(), 'src/scss/**/*.scss'),
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
        path.join(process.cwd(), '/src/scss/'),
      ],
    }
  }
};

export default defaultConfig;
