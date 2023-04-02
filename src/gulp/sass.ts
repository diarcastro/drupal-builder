import { src, dest } from 'gulp';
import gulpSass from 'gulp-sass';
import dartSass from 'sass';
import autoprefixer from 'gulp-autoprefixer';
import plumber from 'gulp-plumber';
import rename from 'gulp-rename';
import postcss from 'gulp-postcss';
import tailwindcss from 'tailwindcss';
import { isFunction, noop } from 'lodash';

// import { logBlue, logError } from '../utils/log';
import { SassTaskOptions } from '../types/types';

const renameOptions = { suffix: '.min' };
const autoprefixerOptions = { cascade: false };
const sass = gulpSass(dartSass);

export const compileSass = function (done: () => void = noop) {
  const {
    isProductionEnv = true,
    sourceFiles = null,
    destFiles = '',
    compilerOptions = {},
    renameFunction,
    displayName = '',
  } = (this as SassTaskOptions) || {};

  this.displayName = displayName || 'compileSass';

  const postCssPlugins = [
    tailwindcss,
  ];

  if (!sourceFiles) {
    console.log('No source files or destination files found. Exiting.');
    return done();
  }

  console.log(`Compiling sass files from ${sourceFiles} to ${destFiles}`, 'ThemeSass: ');
  const isDevelopmentEnv = !isProductionEnv;
  let task = src(sourceFiles);

  if (isDevelopmentEnv) {
    task = task.pipe(plumber());
  }

  task = task.pipe(sass.sync(compilerOptions).on('error', isDevelopmentEnv ? sass.logError : done))
    .pipe(postcss(postCssPlugins)).on('error', done)
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(rename(renameOptions));

  if (isFunction(renameFunction)) {
    task = task.pipe(rename(renameFunction));
  }

  if (isDevelopmentEnv) {
    task = task.pipe(plumber.stop());
  }

  return task.pipe(dest(destFiles));
};
