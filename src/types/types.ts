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

export type DrupalBuilderConfigResource = {
  src: string | Array<string>;
  dest: string | Array<string>;
  filesToWatch?: string | Array<string>;
  renameFunction?: (scssFile: ParsedPath) => void;
};

export type DrupalBuilderConfig = {
  isProductionEnv: boolean;
  name: string;
  sass: {
    [key:string]: DrupalBuilderConfigResource;
  };
  sassOptions: {
    compilerOptions: SassCompilerOptions
  };
  js: {
    [key:string]: DrupalBuilderConfigResource;
  };
  watchOptions?: {
    [key:string]: any;
  };
};

export type GulpTaskOptions = {
  displayName?: string;
  isProductionEnv: boolean;
  sourceFiles: string | string[] | null;
  destFiles: string;
  compilerOptions?: SassCompilerOptions;
  renameFunction?: ParsedPath;
};
