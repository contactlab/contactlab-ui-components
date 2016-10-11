'use strict';

/**
 * Gulp & Node module requires
 */
const gulp = require('gulp-param')(require('gulp'), process.argv),
  fs = require("fs"),
  path = require("path"),
  babel = require("gulp-babel"),
  connect = require('gulp-connect'),
  rename = require("gulp-rename"),
  plumber = require('gulp-plumber'),
  vulcanize = require('gulp-vulcanize'),
  minifyHTML = require('gulp-minify-html'),
  minifyInline = require('gulp-minify-inline'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  watch = require('gulp-watch'),
  notify = require('gulp-notify'),
  webpack = require('gulp-webpack'),
  webpackConfig = require('./webpack.config.js');


/**
 * Configuration paths object
 */
const conf = {
  jsSourcePath: '**/*.{js,jsx}',
  es6SourcePath: '**/*.es6.js',
  scssSourcePath: './**/*.{scss,sass}',
  cssOutputPath: '',
  distCSS: './dist/css/',
  comps: './**/view.html',
  compsBuilt: './**/view.build.html'
}


/**
 * Starts a webserver on current folder.
 * @param {number} port - Specific port to use, default 3006.
 */
gulp.task('connect', function(port) {
  var choosenPort = !port ? 3006 : port;
  console.log("Port", choosenPort);
  connect.server({
    root: './../',
    port: choosenPort
  });
});

// Connect reload
gulp.task('reload', function() {
  gulp.src(['./**/*.js', '!./bundle.js'])
    .pipe(connect.reload())
});


/**
 * Compile every .scss files in plain .css
 */
gulp.task('sass', function() {
  return gulp.src('./_assets/scss/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('./_assets/css'));
});

/**
 * Watch changes in .scss files and runs 'sass' task
 */
gulp.task('watch-sass', function() {
  gulp.watch(conf.scssSourcePath, ['sass']);
});

/**
 * Load the configuration file and execute Webpack using `./app/index.js` as entry point
 */
gulp.task('webpack', function(reload) {
  var config = Object.assign({}, webpackConfig);
  return gulp.src('./_assets/js/index.js')
    .pipe(webpack(config))
    .pipe(gulp.dest('./'))
    .pipe(notify("Webpack build completed!"))
    .on('error', function() {
      notify("Webpack build failed!")
    })
    .on('end', function() {
      if(reload !== 'false') gulp.start('reload');
    });
});

/**
 * Watch every .js file for changes except bundle.js and run the Webpack action, plus it prints out on the terminal which files has changed
 */
gulp.task('watch-npm', function() {
  gulp.watch(['./**/*.es6.js', '!./bundle.js'], ['webpack']);
  gulp.watch(['./**/*.es6.js', '!./bundle.js'], function(arg) {
    console.log('something changend', arg)
  });
});


gulp.task('bundle', function(components){
  if(!components){
    console.error('No components specified!');
    return;
  } else {
    let comps = components.split(',').map(function(e){
      return './' + e + '/script.es6.js'
    });
    console.log(comps);
    let config = Object.assign({}, webpackConfig);
    config.entry.page1 = comps;
    config.output.filename = 'bundle-custom.js';
    return gulp.src(comps)
      .pipe(webpack(config))
      .pipe(gulp.dest('./_components'))
      .pipe(notify("Webpack build completed!"))
      .on('error', function() {
        notify("Webpack build failed!")
      });
  }
});

gulp.task('vulcanize', function(components){
  
});

/**
 * Starts building task
 */
gulp.task('start-build', ['bundle'], function(components){
  console.log('Building package');
});

/**
 * Default action: webserver
 */
gulp.task('default', ['connect']);

/**
 * JS development action: webserver + babel on save
 */
gulp.task('dev', ['connect', 'webpack', 'watch-npm']);

/**
 * CSS development action: webserver + sass on save
 */
gulp.task('ux', ['connect', 'watch-sass']);

/**
 * Vulcanize Polymer components in one file
 */
 gulp.task('build', ['start-build']);
