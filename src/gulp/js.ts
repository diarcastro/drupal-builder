import { src, dest } from 'gulp';
import { isFunction } from 'lodash';
import sourcemaps from 'gulp-sourcemaps';
import plumber from 'gulp-plumber';
import rename from 'gulp-rename';
// eslint-disable-next-line import/no-extraneous-dependencies
import babel from 'gulp-babel';
// eslint-disable-next-line import/no-extraneous-dependencies
import uglify from 'gulp-uglify';

import { GulpTaskOptions } from '../types/types';
import { logWarning, logYellow } from '../utils/log';
import { toSourceFiles } from '../utils/strings';

const renameOptions = { suffix: '.min' };
const uglifyOptions = {
  mangle: {
    reserved: ['Drupal'],
  },
};

export const compileJS = function () {
  const {
    isProductionEnv = true,
    sourceFiles = null,
    destFiles = '',
    renameFunction,
    displayName = '',
  } = (this as GulpTaskOptions) || {};
  const isDevelopmentEnv = !isProductionEnv;
  this.displayName = displayName || 'compileJS';

  if (!sourceFiles || !destFiles) {
    logWarning('No source files or destination files found for JS task!');
    return Promise.resolve();
  }

  const sourceFilesToPrint = toSourceFiles(sourceFiles);
  const destFilesToPrint = toSourceFiles(destFiles);

  logYellow(`from ${sourceFilesToPrint} to ${destFilesToPrint}`, `${this.displayName}:`);

  let task = src(sourceFiles);

  if (isDevelopmentEnv) {
    task = task.pipe(plumber());
  }

  task = task.pipe(sourcemaps.init())
    .pipe(babel());

  if (isProductionEnv) {
    task = task.pipe(uglify(uglifyOptions));
  }

  task = task.pipe(rename(renameOptions));

  if (isFunction(renameFunction)) {
    task = task.pipe(rename(renameFunction));
  }

  task = task.pipe(sourcemaps.write('./maps'));

  if (isDevelopmentEnv) {
    task = task.pipe(plumber.stop());
  }

  return task.pipe(dest(destFiles));
};
