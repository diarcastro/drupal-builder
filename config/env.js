import yargs from 'yargs'
import { hideBin } from 'yargs/helpers';

export const args = yargs(hideBin(process.argv)).argv;
export const isDev = !!args.dev;
export const isProd = !isDev;
