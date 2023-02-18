import { GluegunToolbox } from 'gluegun';
import {
  kebabCase,
  camelCase,
  // map,
} from 'lodash';

import { fileExists } from '../utils/fs';
import Behavior from '../utils/behaviors'
import UiPatterns, { UIPattern } from '../utils/ui-patterns'

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
      const isBehavior = Behavior.isBehavior(generatorType);
      const isUIPattern = UiPatterns.isUIPattern(generatorType);
      let componentName = camelCase(name);

      if (!componentName) {
        const result = await toolbox.prompt.ask([
          {
            type: 'input',
            name: 'componentName',
            message: isBehavior ? Behavior.componentNameQuestion : `What is the name of the new component?`
          }
        ]);

        componentName = camelCase(result.componentName);
      }

      if (isBehavior) {
        const questionsResult = await toolbox.prompt.ask(Behavior.questions);
        const { behaviorPath = '' } = questionsResult;
        const componentNameKebabCase = kebabCase(componentName);
        const target = `${behaviorPath}${componentNameKebabCase}.behavior.js`;

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
      } else if (isUIPattern) {
        return UIPattern.generate(toolbox, componentName);
      }
    }


    info('Please provide a generator name. e.g. `glider-builder g behavior`');
  },
}
