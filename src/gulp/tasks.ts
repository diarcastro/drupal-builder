/* eslint-disable import/no-extraneous-dependencies */
import { series, watch as gWatch } from 'gulp';
import { compileSass }  from './sass';
import config from '../../src/config';
import { SassTaskOptions } from '../types/types';

const themeSassCompilerOptions = {
  isProductionEnv: config.isProductionEnv,
  sourceFiles: config.scss.theme.src,
  destFiles: config.scss.theme.dest,
  compilerOptions: config.sassOptions.compilerOptions,
};

const compileSassTask = compileSass.bind({ ...themeSassCompilerOptions as SassTaskOptions });
compileSassTask.displayName = 'compileSass';

const tasks = {
  sass: series(compileSassTask),
};

const watchSass = () => gWatch(
  [
    config.scss.theme.src,
    ...config.scss.theme.filesToWatch,
  ],
  { ignoreInitial: false },
  tasks.sass,
);

export const watch = () => {
  watchSass();
};
export const build = series(tasks.sass);
