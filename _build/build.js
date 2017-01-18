'use strict'

const colors = require('colors')
const webpack = require('webpack')
const fs = require('fs-extra')

const WebpackStrip = require('strip-loader')
const Vulcanize = require('vulcanize')

const Build = require('./buildClass')

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

const webpackConf = require('./../webpack.config.js')
// Add strip-loader loader to loaders
const loadersWebpack = {
  test: /\.js$/,
  exclude: ['node_modules', 'app/assets/bower'],
  loader: WebpackStrip.loader('debug', 'console.log')
}

/**
 * Run in: "prebuild:single"
 *
 * Will build the bundle.js again removing all console.log
 * Get the last argument passed to the running script as comma-separated list.
 */
const singleWebpack = (components) => {
	return new Promise((resolve, reject) => {
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
		const compiler = webpack(webpackConf)
		compiler.run((err, stats) => {
			if (err) {
				reject(err)
			}
			console.log(`  WEBPACK: ##### Built! #####  `.finish)
			resolve(stats)
		})
	})

}

/**
 * Run in: "prebuild"
 *
 * Will build the bundle.js again removing all console.log
 */
const fullWebpack = () => {
	return new Promise((resolve, reject) => {
		console.log(`WEBPACK: building all components...`.info)
	  // Reconfigure and run webpack
	  webpackConf.module.loaders = webpackConf.module.loaders.concat(loadersWebpack)
		const compiler = webpack(webpackConf)
		compiler.run((err, stats) => {
			if (err) {
				reject(err)
			}
			console.log(`  WEBPACK: ##### Built! #####  `.finish)
			resolve(stats)
		})
	})
}

module.exports.run = (single, components) => {
	if(components && components.indexOf('bin/node') > -1) {
		throw new Error('Components arg passed not an array.'.error)
	}

	const componentsArr = components ? components.split(',') : []
	const webpackPromise = single ? singleWebpack(componentsArr) : fullWebpack()

	webpackPromise
		.then(() => {
			/**
		   * --- Configuration
		   */
		  const distBundle = `
		  <script src="./bundle.min.js"></script>
		  `
		  const distBundleCustom = `
		  <script src="./bundle-custom.min.js"></script>
		  `
		  let bundle = 'bundle.js'
		  let minBundle = 'bundle.min.js'
		  let group = false
		  let componentsHTMLRows = ''

		  // Check for arg components as comma-separated list
		  if (single) {
		    console.log(`BUILD.js: Make a "group-component" build: ${componentsArr}`.info)
		    bundle = 'bundle-custom.js'
		    minBundle = 'bundle-custom.min.js'
		    group = true
		    componentsHTMLRows = componentsArr.reduce((acc, comp) => {
		      const path = `./${comp}/view.html`
		      if (!fs.existsSync(path)) {
		        throw new Error(`File not present: ${path}`.error)
		      }
		      return acc.concat(`<link rel="import" href="./../${comp}/view.html">`)
		    }, [])
		    componentsHTMLRows = componentsHTMLRows.join(' ')
		  }

			const build = new Build()

		  build.replace(group, componentsHTMLRows, distBundle, distBundleCustom).then(res => {
		    build.compression(bundle, minBundle)
		  }).catch((err) => {
		    console.log(`BUILD.js: ${err}`.error)
		  })
		})
		.catch(err => {
			console.log('err', err)
			throw new Error(err)
		})
}

module.exports.vulcanize = (single) => {
  let excludes = []
  let newFileName = 'clab-ui-components.html'

  /** NOTE The 'excludes' property of Vulcanize simply will not place inline the file indicated. So for our purpose of removing polymer is useless. commented it **/
  // if (process.argv.indexOf('no-polymer') > -1) {
  //   console.log('BUILD.JS: Excluding Polymer from vulcanization...'.info)
  //   excludes = excludes.concat('./../polymer/polymer.html')
  // }

  if(single) {
    newFileName = 'clab-ui-components-custom.html'
  }

  const vulcan = new Vulcanize({
    excludes: excludes,
    inlineScripts: true,
    stripComments: true
  })

  vulcan.process(`workspace/${newFileName}`, (err, inlinedHtml) => {
    if(err) {
      throw new Error(`${err}`.error)
    }
    if(process.argv.indexOf('no-polymer') > -1) {
      newFileName = newFileName.split('.').join('-no-polymer.')
      console.log(`BUILD.js: New file without Polymer -> ${newFileName}`.info)
    }
    fs.writeFileSync(newFileName, inlinedHtml, 'utf8')
    module.exports.end()
  })
}

module.exports.end = () => {
  fs.removeSync('./workspace')
  console.log(`  BUILD.JS: ##### Everithing done! #####  `.finish)
}

require('make-runnable')
