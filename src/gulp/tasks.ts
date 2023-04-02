import { series, watch as gWatch } from 'gulp';
import { map } from 'lodash';

import config from '../config';

import { compileSass }  from './sass';

const sassTasks = series(map(config.sass, (sassConfig, sassConfigKey) => {
  const sassCompilerOptions = {
    displayName     : `compileSass:${sassConfigKey}`,
    isProductionEnv : config.isProductionEnv,
    sourceFiles     : sassConfig.src,
    destFiles       : sassConfig.dest,
    compilerOptions : config.sassOptions.compilerOptions,
    renameFunction  : sassConfig.renameFunction || null,
  };

  return compileSass.bind({ ...sassCompilerOptions });
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
