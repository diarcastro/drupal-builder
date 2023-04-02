import { build } from 'gluegun';

/**
 * Create the cli and kick it off
 */
export const run = async function run(argv: string) {
  // create a CLI runtime
  const cli = build()
    .brand('drupal-builder')
    .src(__dirname)
    .plugins('./node_modules', { matching: 'drupal-builder-*', hidden: true })
    .help() // provides default for help, h, --help, -h
    .version() // provides default for version, v, --version, -v
    .create();

  // and run it
  return cli.run(argv);
};
