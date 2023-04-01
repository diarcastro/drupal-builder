export type TemplateItem = {
  template: string;
  target: string;
} | null;

export type UIPatternTemplateProps = {
  js: boolean;
  scss: boolean;
  componentName: string;
  label: string;
  componentNameSnakeCase: string;
  componentNameFilename: string;
  variantNameSnakeCase: string;
  variantLabel: string;
} | null;

export type SassCompilerOptions = {
  errLogToConsole: boolean;
  outputStyle: string;
  sourceMap: boolean;
  includePaths?: Array<string>;
} | null;


export type SassTaskOptions = {
  name?: string;
  isProductionEnv: boolean;
  sourceFiles: string | string[] | null;
  destFiles: string;
  compilerOptions?: SassCompilerOptions;
};
