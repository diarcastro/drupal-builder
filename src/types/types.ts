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
