'use strict';

const path = require('path');
const webpack = require('webpack')

module.exports = {
  entry: './test/index.js',
  output: {
    path: path.join(__dirname, 'test'),
    filename: 'components.js',
  },
  devtool: 'source-map',
  module: {
    rules: [{
      test: /\.html$/,
      use: 'text-loader'
    }, {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader'
      }
    }]
  }
}
