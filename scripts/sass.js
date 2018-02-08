/*eslint-env node*/

const util = require('util');
const path = require('path');
const fs   = require('fs');
const sass = require('node-sass');

const sassy = util.promisify(sass.render);

const SRC        = path.resolve('assets', 'scss', 'contactlab-pattern.scss');
const OUTPUT_STD = path.resolve('assets', 'css', 'contactlab-pattern.css');
const OUTPUT_MIN = path.resolve('assets', 'css', 'contactlab-pattern.min.css');

const log = {
  info: msg => console.log('\x1b[36m%s\x1b[0m', msg),
  err: msg => console.error('\x1b[31m%s\x1b[0m', msg)
};

const start = () =>
  Promise.resolve(log.info('\n> Compiling SASS...\n'));

const writer = output => res => new Promise((resolve, reject) => {
  const write$ = fs.createWriteStream(output);

  write$.on('error', err => reject(err));
  write$.on('finish', () => resolve(true));

  write$.end(res.css);
});

const compileStd = () =>
  sassy({file: SRC})
    .then(writer(OUTPUT_STD));

const compileMin = () =>
  sassy({file: SRC, outputStyle: 'compressed'})
    .then(writer(OUTPUT_MIN));

// --- Run
start()
  .then(compileStd)
  .then(compileMin)
  .then(() => {
    log.info('... done!');
    process.exitCode = 0;
  })
  .catch(err => {
    log.err(err.stack);
    process.exitCode = 1;
  });
