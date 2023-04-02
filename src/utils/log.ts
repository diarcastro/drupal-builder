// eslint-disable-next-line import/no-extraneous-dependencies
import 'colors';

const SEPARATOR = '⩥';
const log = console.log;
const drupalBuilderStyled = ` Drupal Builder ${SEPARATOR} `.inverse.bold;

export const logBlue = (message: string, prefix: string = '') => {
  const prefixStyled = prefix && ` ${prefix} ${SEPARATOR}`.white.bgBlue.bold;
  const messageStyled = ` ${message}`.white.bgBlue;
  log(`${drupalBuilderStyled}${prefixStyled}${messageStyled}`);
};

export const logError = (message: string) => {
  log(`${drupalBuilderStyled} ${message}`.red);
};

export const logWarning = (message: string) => {
  log(`${drupalBuilderStyled} ${message}`.yellow.bold);
};

export const logSuccess = (message: string) => {
  log(`${drupalBuilderStyled} ${message}`.green.bold);
};
