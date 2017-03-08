const sass = require('node-sass');
const chokidar = require('chokidar');
const fs = require('fs');
const log = console.log.bind(console);

// Initialize watcher.
const watcher = chokidar.watch('./_assets/scss/**/*.scss', {
  persistent: true,
  awaitWriteFinish: {
    stabilityThreshold: 1000,
    pollInterval: 100
  }
})

const render = () => {

  sass.render({
    file: './_assets/scss/contactlab-pattern.scss'
  }, (err, result) => {
    if (err) {
      return console.error(err);
    }

    fs.writeFile('./_assets/css/contactlab-pattern.css', result.css, err => {
      if (err) {
        return console.error(err);
      }

      console.log(`>> SASS build endend. Destination file: ./_assets/css/contactlab-pattern.css`);
    });
  });
}

watcher
  .on('add', sourcePath => log(`File ${sourcePath} has been added`))
  .on('change', sourcePath => render(sourcePath))