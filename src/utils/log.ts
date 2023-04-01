// eslint-disable-next-line import/no-extraneous-dependencies
import chalk from 'chalk';

const log = console.log;
export const errorStyle = chalk.bold.red;
export const cssStyle = chalk.bold.blue.bgBlue;
export const defaultStyle = chalk.white;

export const logBlue = (message: string, prefix: string) => {
  log(`${cssStyle(prefix)}${defaultStyle(message)}`);
};

export const logError = (message: string) => {
  log(`${errorStyle(message)}`);
};
