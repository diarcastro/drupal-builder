import { GluegunToolbox } from 'gluegun';
import { series } from 'gulp';

import { build, watch } from '../gulp/tasks';
import { START_COMMAND } from '../config';
import { logSuccess } from '../utils/log';

const runCommand = {
  name: 'drupal-builder',
  run: async (toolbox: GluegunToolbox) => {
    const {
      parameters,
    } = toolbox;

    const {
      first: command = '',
    } = parameters || {};
    const isStart = command === START_COMMAND;

    if (isStart) {
      logSuccess('Start/Watch process');
      // @ts-ignore
      return series(watch)();
    }

    logSuccess('Build process');
    // @ts-ignore
    return series(build)();
  },
};

export default runCommand;
