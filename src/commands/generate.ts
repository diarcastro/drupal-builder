import { GluegunToolbox } from 'gluegun';
import { kebabCase, toLower, camelCase } from 'lodash';

import { fileExists } from '../utils/fs';

const behaviorKeys = [
  'behavior',
  'b',
];

module.exports = {
  name: 'generate',
  alias: ['g', 'new'],
  run: async (toolbox: GluegunToolbox) => {
    const {
      parameters,
      template: { generate },
      print: {
        error,
        info,
        success,
      },
    } = toolbox;

    const {
      first: generatorType = '',
      second: name = '',
    } = parameters || {};

    if (generatorType) {
      const isBehavior = behaviorKeys.includes(toLower(generatorType));
      let componentName = camelCase(name);

      if (!componentName) {
        let messageComponentType = 'Behavior';
        if (isBehavior) {
          messageComponentType = 'Behavior';
        }
        const result = await toolbox.prompt.ask([
          {
            type: 'input',
            name: 'componentName',
            message: `What is the name of the new ${messageComponentType}?`,
          }
        ]);

        componentName = camelCase(result.componentName);
      }


      if (isBehavior) {
        const componentNameKebabCase = kebabCase(componentName);
        const target = `${componentNameKebabCase}.behavior.js`;

        if (fileExists(target)) {
          error(`The Behavior ${componentName} already exists at ${target}`);
          return;
        }

        await generate({
          template: 'behavior.js.ejs',
          target,
          props: {
            behaviorName: componentName,
            behaviorNameKebab: componentNameKebabCase,
          },
        });

        success(`The Behavior was generated at ${target}`);
        return;
      }
    }


    info('Please provide a generator name. e.g. `glider-builder g behavior`');
  },
}
