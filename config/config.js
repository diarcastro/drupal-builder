const path = require('path');
const fs = require('fs');
const deepmerge = require('deepmerge');

const defaultConfig = require('./config.default.js');

let baseOptions = {};
const baseOptionsFile = path.join(process.cwd(), '.glider-builder.js');
const baseOptionsFileExist = fs.existsSync(baseOptionsFile);

if (baseOptionsFileExist) {
  baseOptions = require(baseOptionsFile);
}

const config = deepmerge(
    defaultConfig,
    { ...baseOptions }.default || {},
);

module.exports = config;
