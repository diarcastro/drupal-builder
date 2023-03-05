import { GluegunToolbox } from 'gluegun';

module.exports = {
  name: 'drupal-builder',
  run: async (toolbox: GluegunToolbox) => {
    const { print } = toolbox

    print.info('Drupal Builder');
  },
};
