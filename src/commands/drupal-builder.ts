import { GluegunToolbox } from 'gluegun';
import * as execa from 'execa';

import { isProductionEnv } from '../config/env'
import { START_COMMAND } from '../config'

module.exports = {
  name: 'drupal-builder',
  run: async (toolbox: GluegunToolbox) => {
    const {
      parameters,
    } = toolbox;

    const {
      first: command = '',
    } = parameters || {};
    const isStart = command === START_COMMAND;

    const commandArguments = ['run', 'gulp'];
    if (isStart) {
      commandArguments.push('watch');
    }
    if (!isProductionEnv) {
      commandArguments.push('--');
      commandArguments.push('--env=dev');
    }
    // @ts-ignore
    return execa('npm', commandArguments, { stdio: 'inherit', shell: true });
  },
};
