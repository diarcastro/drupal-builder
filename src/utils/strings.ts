const cwd = process.cwd();

/**
 * Convert source files to string
 * @param sourceFiles
 */
export const toSourceFiles = (sourceFiles: string | Array<string>) => {
  if (Array.isArray(sourceFiles)) {
    return sourceFiles.join(', ').replace(cwd, '');
  }

  return sourceFiles.replace(cwd, '');
};
