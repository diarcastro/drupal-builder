import * as process from 'process';
import * as parser from 'yargs-parser';

const args = parser(process.argv);

const DEV_ENV_NAME = 'dev';
export const isProductionEnv = args.env !== DEV_ENV_NAME;
export const isDevEnv = !isProductionEnv;
