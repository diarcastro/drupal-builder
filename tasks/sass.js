import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import dartSass from 'sass';
import autoprefixer from 'gulp-autoprefixer';
import sourcemaps from 'gulp-sourcemaps';
import plumber from 'gulp-plumber';
import rename from 'gulp-rename';
import { deleteSync } from 'del';
import path from 'path';

import { isDev } from '../config/env.js';
import config from '../config/config.js';

const { src, dest } = gulp;
const { sassOptions } = config;
const renameOptions = { suffix: '.min' };
const autoprefixerOptions = { cascade: false };
const sass = gulpSass(dartSass);

const compileSass = (done) => {
  let task = src(sassOptions.files);

  if (isDev) {
    task = task.pipe(plumber());
  }

  task = task.pipe(sourcemaps.init())
      .pipe(sass(sassOptions.compilerOptions).on('error', isDev ? sass.logError : done))
      .pipe(autoprefixer(autoprefixerOptions));

  task = task.pipe(rename(renameOptions))
      .pipe(sourcemaps.write('.'));

  if (isDev) {
    task = task.pipe(plumber.stop());
  }

  return task.pipe(dest(sassOptions.destination));
};

const cleanCss = (done) => {
  deleteSync(path.join(sassOptions.destination, '**/*.*'));
  done();
};

export {
  cleanCss,
  compileSass,
};
