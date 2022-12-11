#! /usr/bin/env node

import { Command } from 'commander';
import { cleanCss, compileSass } from '../tasks/sass.js';

const builder = new Command();

builder
    .name('Glider Builder')
    .description('Build assets for Glider Drupal themes')
    .version('1.0.0')
    .option('-D, --dev', 'Build assets in development mode. This will prevent minify the assets.')
    .option('-P, --prod', 'Build assets in production mode. This is default option.');

builder.command('sass')
    .description('Transpile scss files to css.')
    .action(() => {
      compileSass((err) => {
        console.log({ err });
      });
    });
builder.command('cleanCss')
    .description('Remove transpiled css files')
    .action(() => {
      cleanCss(() => {
      });
    });

builder.parse();
