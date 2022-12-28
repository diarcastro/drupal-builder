const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');

const args = yargs(hideBin(process.argv)).argv;
const isDev = !!args.dev;
const isProd = !isDev;

module.exports = {
  args,
  isDev,
  isProd,
};
