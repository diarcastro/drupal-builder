import { toLower } from 'lodash';
import { PromptOptions } from 'gluegun/build/types/toolbox/prompt-enquirer-types';

/**
 * Alias for the behavior generator
 */
const BEHAVIOR_KEYS = [
  'behavior',
  'b',
];

const componentNameQuestion = 'What is the name of the new Behavior?';

/**
 * Prompt questions for the behavior generator
 */
const questions: PromptOptions[] = [
  {
    type: 'select',
    name: 'behaviorPath',
    message: 'What is the path of the new Behavior?',
    choices: [
      'src/js/behaviors/',
      'src/js/',
      './',
    ],
  },
];

/**
 * Check it the generator type is a behavior
 * @param generatorType
 */
const isBehavior = (generatorType: string): boolean => {
  return BEHAVIOR_KEYS.includes(toLower(generatorType));
};


export const Behavior = {
  isBehavior,
  componentNameQuestion,
  questions,
};
