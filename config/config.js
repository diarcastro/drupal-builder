import path from 'path'
import fs from 'fs'
import deepmerge from 'deepmerge'

import defaultConfig from './config.default.js';

let baseOptions = {};
const baseOptionsFile = path.join(process.cwd(), '.glider-builder.js');
const baseOptionsFileExist = fs.existsSync(baseOptionsFile);

if (baseOptionsFileExist) {
  baseOptions = await import(baseOptionsFile);
}

const config = deepmerge(
    defaultConfig,
    { ...baseOptions }.default || {},
);
export default config;
