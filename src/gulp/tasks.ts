/* eslint-disable import/no-extraneous-dependencies */
import { series, watch as gWatch } from 'gulp';
import { compileSass }  from './sass';
import config from '../../src/config';
import { SassTaskOptions } from '../types/types';

const themeSassCompilerOptions = {
  isProductionEnv: config.isProductionEnv,
  sourceFiles: config.sass.theme.src,
  destFiles: config.sass.theme.dest,
  compilerOptions: config.sassOptions.compilerOptions,
};

const compileThemeSass = compileSass.bind({ ...themeSassCompilerOptions as SassTaskOptions });
compileThemeSass.displayName = 'compileSass';

const tasks = {
  sass: series(compileThemeSass),
};

const watchSass = () => gWatch(
  [
    config.sass.theme.src,
    ...config.sass.theme.filesToWatch,
  ],
  { ignoreInitial: false },
  tasks.sass,
);

export const watchTasks = () => {
  watchSass();
};

export const build = series(tasks.sass);
export const watch = series(watchTasks);
