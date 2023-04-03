import defaultConfig from './default.config';
import { DrupalBuilderConfig } from '../types/types';
export const START_COMMAND = 'start';

const config = (): DrupalBuilderConfig => {
  return defaultConfig;
};

export default config();
