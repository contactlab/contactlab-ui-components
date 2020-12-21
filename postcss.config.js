const {join, resolve} = require('path');
const configExt = require('@giotramu/postcss-config/extends');

const NODE_MODULE = resolve(__dirname, 'node_modules');
const MEDIA_QUERIES = join(
  NODE_MODULE,
  '@contactlab',
  'ds-tokens',
  'styles',
  'custom-media.css'
);

module.exports = configExt([
  ['postcss-custom-media', {importFrom: MEDIA_QUERIES}],
  ['@csstools/postcss-sass', {includePaths: [NODE_MODULE]}]
]);
