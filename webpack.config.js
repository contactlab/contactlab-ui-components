'use strict';

const path = require('path');
const webpack = require('webpack')
const WebpackNotifierPlugin = require('webpack-notifier')

module.exports = {
  entry: './demo/demo.js',
  output: {
    path: path.join(__dirname, 'demo'),
    filename: 'components.js',
  },
  devtool: 'source-map',
  plugins: [
    new WebpackNotifierPlugin({
			title: 'UI Components',
			alwaysNotify: true
		}),
  ],
  module: {
    rules: [{
      test: /\.html$/,
      loaders: ['wc-loader?minify=true']
    }]
  }
}
