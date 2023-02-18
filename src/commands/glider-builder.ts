import { GluegunToolbox } from 'gluegun';

module.exports = {
  name: 'glider-builder',
  run: async (toolbox: GluegunToolbox) => {
    const { print } = toolbox

    print.info('Drupal Glider Builder');
  },
};
