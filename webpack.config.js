module.exports = {
  entry: {
    page1: "./_assets/js/index.js"
  },
  output: {
    // Make sure to use [name] or [id] in output.filename
    //  when using multiple entry points
    filename: "bundle.js"
  },
  devtool: 'eval-source-map',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: ['node_modules','./bundle.js'],
        loader: 'babel', // 'babel-loader' is also a legal name to reference
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
};
