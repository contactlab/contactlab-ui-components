const path = require('path');
const webpack = require('webpack')
const WebpackNotifierPlugin = require('webpack-notifier')

module.exports = {
  entry: './_assets/js/index.js',
  output: {
    path: path.join(__dirname, '_components'),
    filename: 'bundle.js',
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
      exclude: ['node_modules', 'src/assets/bower', 'src/bundle.js'],
      loader: 'babel-loader',
      query: {
        presets: ['es2015']
      }
    }]
  },
  devServer: {
    contentBase: './../'
  },
  resolve: {
    mainFields: ['browserify', 'browser', 'module', 'main']
  }
}
