'use strict';

const path = require('path');
const webpack = require('webpack')
const WebpackNotifierPlugin = require('webpack-notifier')

module.exports = {
  entry: './_demo/demo.js',
  output: {
    path: path.join(__dirname, '_demo'),
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
    loaders: [{
      test: /\.js?$/,
      exclude: ['node_modules', '_demo/bundle.js'],
      loader: 'babel-loader',
      query: {
        presets: ['es2015']
      }
    }]
  }
}
