/*eslint-env node */
const path = require('path');

module.exports = require('@giotramu/postcss-config').expandDefault({
  map: true,
  plugins: {
    'postcss-import': false,
    '@csstools/postcss-sass': {
      includePaths: [path.join(__dirname, 'node_modules')],
    },
  },
});
