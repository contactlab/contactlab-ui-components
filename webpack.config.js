const webpack = require('webpack')

module.exports = {
  entry: './_assets/js/index.js',
  output: {
    // Make sure to use [name] or [id] in output.filename
    //  when using multiple entry points
    path: '_components',
    filename: 'bundle.js'
  },
  devtool: 'eval-source-map',
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin()
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
  }
}
