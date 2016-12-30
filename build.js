'use strict'

const colors = require('colors')
const compressor = require('node-minify')
const Replace = require('replace-in-file')
const fs = require('fs-extra')
const Vulcanize = require('vulcanize')

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

module.exports.run = (single) => {
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
    let components = process.argv[1]
    components = components.split(',')
    console.log(`BUILD.js: Make a "group-component" build: ${components}`.info)
    bundle = 'bundle-custom.js'
    minBundle = 'bundle-custom.min.js'
    group = true
    componentsHTMLRows = components.reduce((acc, comp) => {
      const path = `./${comp}/view.html`
      if (!fs.existsSync(path)) {
        throw new Error(`File not present: ${path}`.error)
      }
      return acc.concat(`<link rel="import" href="./../${comp}/view.html">`)
    }, [])
    componentsHTMLRows = componentsHTMLRows.join(' ')
  }

  class Build {

    constructor() {
      this._createWorkspace()
    }

    compression() {
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
        compressor: 'yui-css',
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

    replace(group) {
      let promises = []
      let componentsPath = 'workspace/clab-ui-components-custom.html'

      if (group) {
        promises.push(this._replace(componentsPath, componentsHTMLRows, /<!--components!-->((.|\n)*)<!--components!-->/g))
      } else {
        componentsPath = 'workspace/clab-ui-components.html'
        promises.push(this._replace(componentsPath, distBundle, /<!--bundlecomp!-->((.|\n)*)<!--bundlecomp!-->/g))
      }

      if(process.argv.indexOf('no-polymer') > -1) {
        console.log('BUILD.JS: Excluding Polymer from the bunlde...'.info)
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
      }
      catch (err) {
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

  const build = new Build()

  build.replace(group).then(res => {
    build.compression()
  }).catch((err) => {
    console.log(`BUILD.js: ${err}`.error)
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
