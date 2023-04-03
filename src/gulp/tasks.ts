import { series, watch as gWatch } from 'gulp';
import { map, last } from 'lodash';

import config from '../config';

import { compileSass }  from './sass';
import { compileJS }  from './js';
import { logSuccess } from '../utils/log';
import { injectIntoArray } from '../utils/array';

const {
  isProductionEnv,
  watchOptions,
  sassOptions: { compilerOptions: sassCompilerOptions },
} = config;
const timing: Array<number> = [];

const startTimingTask = () => {
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

const scssFilesToWatch: Array<string> = [];
const sassTasks = map(config.sass, (sassConfig, sassConfigKey) => {
  const taskCompilerOptions = {
    displayName     : `sass:${sassConfigKey}`,
    isProductionEnv,
    sourceFiles     : sassConfig.src,
    destFiles       : sassConfig.dest,
    compilerOptions : sassCompilerOptions,
    renameFunction  : sassConfig.renameFunction || null,
  };

  const { filesToWatch } = sassConfig;

  injectIntoArray(scssFilesToWatch, sassConfig.src);
  injectIntoArray(scssFilesToWatch, filesToWatch || null);
  return compileSass.bind({ ...taskCompilerOptions });
});

const jsFilesToWatch: Array<string> = [];
const jsTasks = map(config.js, (jsConfig, jsConfigKey) => {
  const taskCompilerOptions = {
    displayName     : `JS:${jsConfigKey}`,
    isProductionEnv,
    sourceFiles     : jsConfig.src,
    destFiles       : jsConfig.dest,
    renameFunction  : jsConfig.renameFunction || null,
  };
  const { filesToWatch } = jsConfig;

  injectIntoArray(jsFilesToWatch, jsConfig.src);
  injectIntoArray(jsFilesToWatch, filesToWatch || null);
  return compileJS.bind({ ...taskCompilerOptions });
});

const tasks = {
  sass: series(sassTasks),
  js: series(jsTasks),
};

const watchSass = () => gWatch(
  scssFilesToWatch,
  watchOptions,
  tasks.sass,
);

const watchJs = () => gWatch(
  jsFilesToWatch,
  watchOptions,
  tasks.js,
);

export const watchTasks = () => {
  watchSass();
  watchJs();
};

export const build = series(
  startTimingTask,
  tasks.sass,
  tasks.js,
  doneTask,
);
export const watch = series(
  startTimingTask,
  watchTasks,
  watchJs,
  doneTask,
);
