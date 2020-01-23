/*eslint-env node */
const path = require('path');
const MQ_SRC =
  './node_modules/@contactlab/ds-tokens/lib/styles/css/media-queries.css';

module.exports = require('@giotramu/postcss-config').expandDefault({
  map: true,
  plugins: {
    'postcss-custom-media': {importFrom: MQ_SRC},
    '@csstools/postcss-sass': {
      includePaths: [path.join(__dirname, 'node_modules')]
    }
  }
});
