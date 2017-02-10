'use strict'

const colors = require('colors')
const webpack = require('webpack')
const fs = require('fs-extra')
const runnableExports = require('runnable-exports')

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
		const entries = components.reduce((acc, comp) => {
			const path = `./${comp}/script.es6.js`
			if (!fs.existsSync(path)) {
				throw new Error(`File not present: ${path}.`.error)
			}
			return acc.concat(path)
		}, [])

		// Reconfigure and run webpack
		const newWebpackConf = Object.assign(webpackConf, {
			entry: entries,
			output: {
				filename: 'bundle-custom.js'
			},
			module: {
				loaders: webpackConf.module.loaders.concat(loadersWebpack)
			}
		});
		const compiler = webpack(newWebpackConf)

		compiler.run((err, stats) => {
			if (err) {
				console.log(err)
				reject(err)
			}
			console.log(`  WEBPACK: ##### Built js bundle! #####  `.finish)
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
		const newWebpackConf = Object.assign(webpackConf, {
			module: {
				loaders: webpackConf.module.loaders.concat(loadersWebpack)
			}
		});
		const compiler = webpack(newWebpackConf)

		compiler.run((err, stats) => {
			if (err) {
				reject(err)
			}
			console.log(`  WEBPACK: ##### Built js bundle! #####  `.finish)
			resolve(stats)
		})
	})
}

const replaceBuild = (config) => {
	return config.build.replace(config.params.group, config.params.componentsHTMLRows, config.params.distBundle, config.params.distBundleCustom).then(res => {
		config.build.compression(config.params.bundle, config.params.minBundle)
	}).catch((err) => {
		console.log(`BUILD.js: ${err}`.error)
	})
}

const vulcanize = () => {
	const config = setConfig(process.argv);
	let excludes = []
	let newFileName = 'clab-ui-components.html'

	/** NOTE The 'excludes' property of Vulcanize simply will not place inline the file indicated. So for our purpose of removing polymer is useless. commented it **/
	// if (process.argv.indexOf('no-polymer') > -1) {
	//   console.log('BUILD.JS: Excluding Polymer from vulcanization...'.info)
	//   excludes = excludes.concat('./../polymer/polymer.html')
	// }

	if (config.single) {
		newFileName = 'clab-ui-components-custom.html'
	}

	const vulcan = new Vulcanize({
		excludes: excludes,
		inlineScripts: true,
		stripComments: true
	})

	vulcan.process(`workspace/${newFileName}`, (err, inlinedHtml) => {
		if (err) {
			throw new Error(`${err}`.error)
		}
		if (config.noPolymer) {
			newFileName = newFileName.split('.').join('-no-polymer.')
			console.log(`BUILD.js: New file without Polymer -> ${newFileName}`.info)
		}
		fs.writeFileSync(newFileName, inlinedHtml, 'utf8')
		module.exports.end()
	})
}

const setConfig = (args) => {
	const componentsArg = args.find(item => {
		return item.indexOf('g=') > -1;
	});
	const components = componentsArg ? componentsArg.split('g=')[1].split(',') : null;

	return {
		noPolymer: args.indexOf('no-polymer') > -1,
		single: components ? true : false,
		components: components
	}
}


module.exports.run = () => {
	const config = setConfig(process.argv);
	if (config.components && config.components.indexOf('bin/node') > -1) {
		throw new Error('Components arg passed is not an array.'.error)
	}

	const webpackPromise = config.single ? singleWebpack(config.components) : fullWebpack()

	webpackPromise
		.then(() => {
			/**
			 * --- Configuration
			 */
			let buildConfig = {
				distBundle: `
   		  <script src="./bundle.min.js"></script>
   		  `,
				distBundleCustom: `
  		  <script src="./bundle-custom.min.js"></script>
  		  `,
				bundle: 'bundle.js',
				minBundle: 'bundle.min.js',
				group: false,
				componentsHTMLRows: ''
			}

			// Check for arg components as comma-separated list
			if (config.single) {
				console.log(`BUILD.js: Make a "group-component" build: ${config.components}`.info)

				buildConfig.bundle = 'bundle-custom.js'
				buildConfig.minBundle = 'bundle-custom.min.js'
				buildConfig.group = true
				const componentsHTMLRows = config.components.reduce((acc, comp) => {
					const path = `./${comp}/view.html`
					if (!fs.existsSync(path)) {
						throw new Error(`File not present: ${path}`.error)
					}
					return acc.concat(`<link rel="import" href="./../${comp}/view.html">`)
				}, [])
				buildConfig.componentsHTMLRows = componentsHTMLRows.join(' ')
			}

			const build = new Build();

			return {
				build: build,
				params: buildConfig
			};
		})
		.then(replaceBuild)
		.then(vulcanize)
		.catch(err => {
			console.log('err', err)
			throw new Error(err)
		})


}

module.exports.vulcanize = vulcanize

module.exports.end = () => {
	fs.removeSync('./workspace')
	console.log(`  BUILD.JS: ##### Everithing done! #####  `.finish)
}

runnableExports()
