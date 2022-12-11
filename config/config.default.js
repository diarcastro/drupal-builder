import path from 'path';
import { isProd } from './env.js';

const defaultConfig = {
  name: 'glider-builder',
  sassOptions: {
    files: 'src/sass/**/*.scss',
    destination: 'dist/css/',
    compilerOptions: {
      errLogToConsole: true,
      outputStyle: isProd ? 'compressed' : 'expanded',
      includePaths: [
        path.join(process.cwd(), '/node_modules/'),
        path.join(process.cwd(), '/src/sass/'),
      ],
    }
  }
};

export default defaultConfig;
