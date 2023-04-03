import { each } from 'lodash';

/**
 * Inject string or Array<string> into another array
 * @param dest
 * @param source
 */
export const injectIntoArray = (dest: Array<any>, source: Array<any> | string | null ) => {
  if (source) {
    const arrayToIterate = Array.isArray(source) ? source : [source];
    each(arrayToIterate, (fileToWatch) => {
      dest.push(fileToWatch);
    });
  }

  return dest;
};
