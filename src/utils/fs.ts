import {
  existsSync as fsExistsSync,
} from 'fs';

export const fileExists = (path: string): boolean => {
  return fsExistsSync(path);
};
