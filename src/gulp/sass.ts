/* eslint-disable import/no-extraneous-dependencies */
import { src, dest } from 'gulp';
import * as gulpSass from 'gulp-sass';
import * as dartSass from 'sass';
import * as autoprefixer from 'gulp-autoprefixer';
import * as plumber from 'gulp-plumber';
import * as rename from 'gulp-rename';
import * as postcss from 'gulp-postcss';
import * as tailwindcss from 'tailwindcss';
import { isFunction } from 'lodash';

// import { logBlue, logError } from '../utils/log';
import { SassTaskOptions } from '../types/types';

const renameOptions = { suffix: '.min' };
const autoprefixerOptions = { cascade: false };
const sass = gulpSass(dartSass);

export const compileSass = function (done) {
  const {
    isProductionEnv = true,
    sourceFiles = null,
    destFiles = '',
    compilerOptions = {},
    renameFunction,
  } = (this as SassTaskOptions) || {};

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
