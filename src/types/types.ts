import { ParsedPath } from 'gulp-rename';

export type TemplateItem = {
  template: string;
  target: string;
};

export type UIPatternTemplateProps = {
  js: boolean;
  scss: boolean;
  componentName: string;
  label: string;
  componentNameSnakeCase: string;
  componentNameFilename: string;
  variantNameSnakeCase: string;
  variantLabel: string;
};

export type SassCompilerOptions = {
  errLogToConsole: boolean;
  outputStyle: string;
  sourceMap: boolean;
  includePaths?: Array<string>;
};

export type GulpTask = {};


export type SassTaskOptions = {
  displayName?: string;
  isProductionEnv: boolean;
  sourceFiles: string | string[] | null;
  destFiles: string;
  compilerOptions?: SassCompilerOptions;
  renameFunction?: ParsedPath;
};
