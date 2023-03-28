const { system, filesystem } = require('gluegun');

const src = filesystem.path(__dirname, '..');

const cli = async (cmd) =>
  system.run('node ' + filesystem.path(src, 'bin', 'drupal-builder') + ` ${cmd}`);

test('outputs version', async () => {
  const output = await cli('--version');
  expect(output).toContain('0.0.1');
});

test('outputs help', async () => {
  const output = await cli('--help');
  expect(output).toContain('0.0.1');
});

test('generate behavior', async () => {
  const output = await cli('generate behavior foo');

  expect(output).toContain('The Behavior was generated at foo.behavior.js');
  const foomodel = filesystem.read('foo.behavior.js');

  expect(foomodel).toContain(`Drupal.behaviors.foo`);

  // cleanup artifact
  filesystem.remove('foo.behavior.js');
});
