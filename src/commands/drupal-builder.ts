import { GluegunToolbox } from 'gluegun';
import { series } from 'gulp';

import { build, watch } from '../gulp/tasks';
import { START_COMMAND } from '../config';

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
      console.log('Start/Watch process');
      return series(watch)();
    }

    console.log('Build process');
    return series(build)();
  },
};

export default runCommand;
