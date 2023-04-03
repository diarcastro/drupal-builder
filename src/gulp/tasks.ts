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
  sassOptions: {
    compilerOptions: sassCompilerOptions = {},
  } = {},
} = config || {};
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

const tasksBindingFactory = (configItems: { [key:string]: any }, task: Function, prefix: string = '') => {
  const filesToWatch: Array<string> = [];
  const tasks = map(configItems, (configItem, configItemKey) => {
    const taskCompilerOptions = {
      displayName     : `${prefix}:${configItemKey}`,
      isProductionEnv,
      sourceFiles     : configItem.src,
      destFiles       : configItem.dest,
      renameFunction  : configItem.renameFunction || null,
      compilerOptions : sassCompilerOptions, // This is only for SASS
    };

    injectIntoArray(filesToWatch, configItem.src);
    injectIntoArray(filesToWatch, configItem.filesToWatch);
    return task.bind({ ...taskCompilerOptions });
  });

  return {
    tasks,
    filesToWatch,
  };
};

const { tasks: sassTasks, filesToWatch: scssFilesToWatch } = tasksBindingFactory(config.sass, compileSass, 'SASS');
const { tasks: jsTasks, filesToWatch: jsFilesToWatch } = tasksBindingFactory(config.js, compileJS, 'JS');

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
