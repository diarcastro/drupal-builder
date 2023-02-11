const { build } = require('gluegun')

/**
 * Create the cli and kick it off
 */
async function run(argv) {
  // create a CLI runtime
  const cli = build()
    .brand('glider-builder')
    .src(__dirname)
    .plugins('./node_modules', { matching: 'glider-builder-*', hidden: true })
    .help() // provides default for help, h, --help, -h
    .version() // provides default for version, v, --version, -v
    .create()

  // and run it
  return cli.run(argv)
}

module.exports = { run }
