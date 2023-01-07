const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');

const args = yargs(hideBin(process.argv)).argv;
const isDev = !!args.dev;
const isProd = !isDev;
const envMode = isProd ? 'production' : 'development';

module.exports = {
  args,
  isDev,
  isProd,
  envMode,
};
