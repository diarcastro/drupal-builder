/* eslint-disable import/no-extraneous-dependencies */
import { series, watch as gWatch } from 'gulp';
import { map } from 'lodash';

import { compileSass }  from './sass';
import config from '../../src/config';
import { SassTaskOptions } from '../types/types';

const sassTasks = series(map(config.sass, (sassConfig, sassConfigKey) => {
  const sassCompilerOptions = {
    isProductionEnv : config.isProductionEnv,
    sourceFiles     : sassConfig.src,
    destFiles       : sassConfig.dest,
    compilerOptions : config.sassOptions.compilerOptions,
    renameFunction  : sassConfig.renameFunction || null,
  };

  const compileSassTask = compileSass.bind({ ...sassCompilerOptions as SassTaskOptions });
  compileSassTask.displayName = `compileSass:${sassConfigKey}`;

  return compileSassTask;
}));

const tasks = {
  sass: sassTasks,
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
