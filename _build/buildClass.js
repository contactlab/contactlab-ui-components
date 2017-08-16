const fs = require('fs-extra')
const compressor = require('node-minify')
const Replace = require('replace-in-file')

class Build {

	constructor() {
		this._createWorkspace()
	}

	compression(bundle, minBundle) {
		// Using Google Closure
		compressor.minify({
			compressor: 'uglifyjs',
			input: './workspace/' + bundle,
			output: './workspace/' + minBundle,
			callback: err => {
				this._compressionHandler(err, 'JS')
			}
		})

		// Using YUI Compressor for CSS
		compressor.minify({
			compressor: 'clean-css',
			input: '_assets/css/contactlab-pattern.css',
			output: '_assets/css/contactlab-pattern.min.css',
			callback: err => {
				this._compressionHandler(err, 'CSS')
			}
		})
	}

	copy() {
		// this._copyFonts()
		// this._copyImages()
		// this._copyManifest()
	}

	replace(group, componentsHTMLRows, distBundle, distBundleCustom) {
		let promises = []
		let componentsPath = 'workspace/clab-ui-components-custom.html'

		if (group) {
			promises.push(this._replace(componentsPath, componentsHTMLRows, /<!--components!-->((.|\n)*)<!--components!-->/g))
		} else {
			componentsPath = 'workspace/clab-ui-components.html'
			promises.push(this._replace(componentsPath, distBundle, /<!--bundlecomp!-->((.|\n)*)<!--bundlecomp!-->/g))
		}

		if (process.argv.indexOf('no-polymer') > -1) {
			console.log('BUILD.JS: Excluding Polymer from the bundle...'.info)
			const replacedPolymer = this._replaceSync(componentsPath, '', /<!--polymer!-->((.|\n)*)<!--polymer!-->/g)
			console.log(`BUILD.js: --- Replaced for polymer --> ${replacedPolymer}`.verbose)
		}


		return Promise.all(promises)
			.then(res => {
				console.log(`BUILD.js: --- Replaced --> ${res}`.verbose)
				return res
			})
	}

	_replace(file, stringToInsert, regex) {
		const options = {
			files: file,
			replace: regex,
			with: stringToInsert
		}
		return Replace(options)
			.then(changedFiles => {
				return changedFiles
			})
			.catch(err => {
				throw new Error(err)
			})
	}

	_replaceSync(file, stringToInsert, regex) {
		const options = {
			files: file,
			replace: regex,
			with: stringToInsert
		}
		try {
			let changedFiles = Replace.sync(options)
			return changedFiles.join(', ')
		} catch (err) {
			throw new Error(err)
		}
	}

	_errHandler(err) {
		if (err) {
			throw new Error(err)
		}
	}
	_compressionHandler(err, type) {
		this._errHandler(err)
		console.log(`BUILD.js: --- Compressed! ---> ${type}`.verbose)
	}

	// _copySomething() {
	//   fs.copy(PATH, DIST_PATH, err => {
	//     this._errHandler(err)
	//     console.log("##### Something copied! ####")
	//   })
	// }

	_createWorkspace() {
		try {
			fs.copySync('_components/', 'workspace/')
			console.log(`BUILD.js: >>> Workspace created... <<<`.info)
		} catch (err) {
			this._errHandler(err)
		}
	}
}

module.exports = Build
