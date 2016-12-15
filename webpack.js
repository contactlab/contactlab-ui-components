'use strict'

const colors = require('colors')
const webpack = require('webpack')
const WebpackStrip = require('strip-loader')

colors.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  finish: ['white', 'bold', 'bgGreen'],
  prompt: 'grey',
  info: ['green', 'italic'],
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: ['red', 'underline']
})

const webpackConf = require('./webpack.config.js')
// Add strip-loader loader to loaders
const loadersWebpack = {
  test: /\.js$/,
  exclude: ['node_modules', 'app/assets/bower'],
  loader: WebpackStrip.loader('debug', 'console.log')
}

/**
 * UTILS
 */
const callbackWebpack = (err, stats) => {
  if(err) {
    throw new Error(`${err}`.error)
  }
  console.log(`  WEBPACK: ##### Built! #####  `.finish)
}

/**
 * Run in: "prebuild:single"
 *
 * Will build the bundle.js again removing all console.log
 * Get the last argument passed to the running script as comma-separated list.
 */
module.exports.singleWebpack = () => {
  // Get the components from the last arg passed to the npm script
  let components = process.argv[1]
  // Typechecking for components comma-separated list
  if(components && components.indexOf('bin/node') > -1) {
    throw new Error('Components arg passed not an array.'.error)
  }

  components = components.split(',')
  console.log(`WEBPACK: building components: ${components}`.info)
  // Array of all components' path
  let entries = components.reduce((acc, comp) => {
    const path = `./${comp}/script.es6.js`
    if (!fs.existsSync(path)) {
      throw new Error(`File not present: ${path}.`.error)
    }
    return acc.concat(path)
  }, [])

  // Reconfigure and run webpack
  webpackConf.module.loaders = webpackConf.module.loaders.concat(loadersWebpack)
  webpackConf.entry = entries
  webpackConf.output.filename = 'bundle-custom.js'
  webpack(webpackConf, callbackWebpack)
}

/**
 * Run in: "prebuild"
 *
 * Will build the bundle.js again removing all console.log
 */
module.exports.fullWebpack = () => {
  console.log(`WEBPACK: building all components...`.info)
  // Reconfigure and run webpack
  webpackConf.module.loaders = webpackConf.module.loaders.concat(loadersWebpack)
  webpack(webpackConf, callbackWebpack)
}
