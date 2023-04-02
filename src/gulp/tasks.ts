import { series, watch as gWatch } from 'gulp';
import { map, last } from 'lodash';

import config from '../config';

import { compileSass }  from './sass';
import { logSuccess } from '../utils/log';

const timing: Array<number> = [];

const startTiming = () => {
  timing.push(Date.now());
  return Promise.resolve();
};

const doneTask = () => {
  const now = Date.now();
  const lastTiming = last(timing) || Date.now();
  const diff = (now - lastTiming) / 1000;
  logSuccess(`[${diff}s] Completed!`);
  return Promise.resolve();
};

const sassTasks = map(config.sass, (sassConfig, sassConfigKey) => {
  const sassCompilerOptions = {
    displayName     : `sass:${sassConfigKey}`,
    isProductionEnv : config.isProductionEnv,
    sourceFiles     : sassConfig.src,
    destFiles       : sassConfig.dest,
    compilerOptions : config.sassOptions.compilerOptions,
    renameFunction  : sassConfig.renameFunction || null,
  };

  return compileSass.bind({ ...sassCompilerOptions });
});

sassTasks.unshift(startTiming);
sassTasks.push(doneTask);

const tasks = {
  sass: series(sassTasks),
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
