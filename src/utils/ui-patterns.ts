import {
  kebabCase,
  map,
  snakeCase,
  startCase,
  toLower,
} from 'lodash';
import { PromptOptions } from 'gluegun/build/types/toolbox/prompt-enquirer-types';
import { GluegunToolbox } from 'gluegun';

import { TemplateItem, UIPatternTemplateProps } from '../types/types';

/**
 * Alias for the UI Pattern generator
 */
const BEHAVIOR_KEYS = [
  'ui-pattern',
  'ui',
  'pattern',
  'up',
];

const componentNameQuestion = 'What is the name of the new UI Pattern?';

const templates = (props: UIPatternTemplateProps, scss = true, js = true): TemplateItem[] => {
  if (!props) {
    return [];
  }

  const templatesToCreate = [
    {
      template: 'ui-pattern/template.patterns.yml.ejs',
      target: `${props.componentNameSnakeCase}/${props.componentNameSnakeCase}.patterns.yml`,
    },
    {
      template: 'ui-pattern/pattern-template.html.twig.ejs',
      target: `${props.componentNameSnakeCase}/pattern-${props.componentNameFilename}.html.twig`,
    },
  ];

  if (scss) {
    templatesToCreate.push({
      template: 'ui-pattern/scss/template.pattern.scss.ejs',
      target: `${props.componentNameSnakeCase}/scss/${props.componentNameFilename}.pattern.scss`,
    });
  }

  if (js) {
    templatesToCreate.push({
      template: 'behavior.js.ejs',
      target: `${props.componentNameSnakeCase}/js/${props.componentNameFilename}.pattern.js`,
    });
  }

  if (props.variantNameSnakeCase) {
    templatesToCreate.push({
      template: 'ui-pattern/pattern-template--variant-my-variant.html.twig.ejs',
      target: `${props.componentNameSnakeCase}/pattern-${props.componentNameFilename}--variant-${props.variantNameSnakeCase}.html.twig`,
    });
  }

  return templatesToCreate;
};

/**
 * Prompt questions for the behavior generator
 */
const questions: PromptOptions[] = [
  {
    type: 'select',
    name: 'uiPatternPath',
    message: 'What is the path of the new UI Pattern?',
    choices: [
      'patterns/',
      './',
    ],
  },
  {
    type: 'input',
    name: 'variantName',
    message: 'Type the variant name (leave empty if you don\'t want to create a variant)',
  },
];

/**
 * Check it the generator type is a behavior
 * @param generatorType
 */
const isUIPattern = (generatorType: string): boolean => {
  return BEHAVIOR_KEYS.includes(toLower(generatorType));
};


export const UIPattern = {
  componentNameQuestion,
  isUIPattern,
  async generate(toolbox: GluegunToolbox, componentName: string) {
    const questionsResult = await toolbox.prompt.ask(questions);
    const { uiPatternPath = '', variantName = '' } = questionsResult;
    const filesToGenerate:Array<string> = [];

    const componentNameSnakeCase = snakeCase(componentName);
    const componentNameFilename = kebabCase(componentName);
    const variantNameSnakeCase = kebabCase(variantName);

    const props: UIPatternTemplateProps = {
      js: true,
      scss: true,
      componentName,
      label: startCase(componentNameSnakeCase),
      componentNameSnakeCase,
      componentNameFilename,
      variantNameSnakeCase,
      variantLabel: startCase(variantName),
    };

    const renderedTemplates = templates(props);
    const results:Promise<string>[] = map(renderedTemplates, ({ template = '', target = '' }: TemplateItem) => {
      if (!target) {
        return Promise.resolve('');
      }

      const targetPath = `${uiPatternPath}${target}`;
      filesToGenerate.push(targetPath);
      return toolbox.template.generate({
        template,
        target: targetPath,
        props,
      });
    });

    await Promise.all(results);
    toolbox.print.success(`The UI Pattern ${componentName} was created at ${uiPatternPath}`);
    toolbox.print.success(`The following files were created: ${filesToGenerate.join(',\n')}`);
    return true;
  },
};

export default UIPattern;


