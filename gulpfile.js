/**
* Gulp & Node module requires
*/
var gulp = require('gulp-param')(require('gulp'), process.argv),
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
    gutil = require("gulp-util");


/**
* Configuration paths object
*/
var conf = {
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
gulp.task('connect', function (port) {
  !port ? port = 3006 : port;
  connect.server({
    root: '../',
    port: port,
  });
});


/**
* Compile every .scss files in plain .css
*/
gulp.task('sass', function () {
  return gulp.src('./_assets/scss/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('./_assets/css'));
});


/**
* Compile every .es6.js files and transpiles in ES5 .js
*/
gulp.task('babel', function () {
  return gulp.src(conf.es6SourcePath)
    .pipe(plumber())
    .pipe(watch(conf.es6SourcePath))
    .pipe(babel())
    .pipe(rename(function(path){
        path.basename = path.basename.replace(/.es6$/, '');
        console.log('updated: '+path.basename+' in '+path.dirname);
    }))
    .pipe(gulp.dest(''));
});


/**
* Watch changes in .scss files and runs 'sass' task
*/
gulp.task('watch-sass', function() {
  gulp.watch(conf.scssSourcePath, ['sass']);
});


/**
* Watch changes in .es6.js files and runs 'babel' task
*/
gulp.task('watch-es6', function() {
  gulp.watch(conf.es6SourcePath, ['babel']);
});



/* ===========================================================
      BUILDING REV(13/07)
    ========================================================= */

/**
* Prepare single file with import of all componets if needed
* Vulcanize components in a single file
*/
gulp.task('vulcanize', function (all, single) {
  // Define file where all components are import
  var files = './_components/clab-components.html';
  // Define destination path for building
  var dest = './_components/';

  // If "--all" as arg
  // Build every single element inside proper folder
  if(all){
    files = conf.comps;
    dest = '';
  // If "--single" and elementName as arg and check for "|"
  // Build single element choosen (or multiple)
  } else if(single && typeof single === "string" && single.split('|').length > 1){
    // Setup custom destination for imports
    files = './_components/clab-components-custom.html';
    // Split string in single element name
    // Put it in array
    var elArr = single.split(' ');
    var data = '';
    // Setup import to attach to the building file
    elArr.forEach(function(el) {
      data += '<link rel="import" href="../'+arr[i]+'/view.html">\n';
    });
    fs.writeFileSync('./_components/clab-components-custom.html', data);
  // Else if single element
  } else if (single && typeof single === "string") {
    files = './' + single + '/view.html';
    dest = './' + single + '/';
  } else if (single) {
    throw new gutil.PluginError({
      plugin: "vulcanize",
      message: "'--single' param passed with no 'elementName' or 'elementName1|elementName2'"
    });
  }

  // Start with gulp real task
  return gulp.src(files)
    .pipe(vulcanize({
      abspath: '',
      stripExcludes:false,
      stripComments: true,
      inlineCSS:false,
      inlineScripts:true
    }))
    .pipe(rename(function(path){
      path.basename = path.basename + '.build';
      if(dest != './_components/') {
        path.basename = path.dirname;
      }
      console.log('BUILT: '+ path.basename +' in '+ (dest === '' ? (path.dirname.length > 1 ? path.dirname : 'root') : dest));
    }))
    .pipe(gulp.dest(dest));
});


gulp.task('min-html', ['vulcanize'] , function(all, single) {
  var files = './_components/clab-components.build.html';
  var dest = './_components/';

  // If "--all" as arg
  // Build every single element inside proper folder
  if(all){
    files = conf.compsBuilt;
    dest = '';
  // If "--single" and elementName as arg and check for "|"
  // Build single element choosen (or multiple)
  } else if(single && typeof single === "string" && single.split('|').length > 1){
    // Setup custom destination for imports
    files = './_components/clab-components-custom.build.html';
  // Else if single element
  } else if (single && typeof single === "string") {
    files = './' + single + '/'+ single +'.html';
    dest = './' + single + '/';
  }

  return gulp.src(files)
    .pipe(minifyHTML({ empty: true }))
    .pipe(gulp.dest(dest))
});

gulp.task('min-inline', ['min-html'], function(all, single) {
  var files = './_components/clab-components.build.html';
  var dest = './_components/';

  // If "--all" as arg
  // Build every single element inside proper folder
  if(all){
    files = conf.compsBuilt;
    dest = '';
  // If "--single" and elementName as arg and check for "|"
  // Build single element choosen (or multiple)
  } else if(single && typeof single === "string" && single.split('|').length > 1){
    // Setup custom destination for imports
    files = './_components/clab-components-custom.build.html';
  // Else if single element
  } else if (single && typeof single === "string") {
    files = './' + single + '/'+ single +'.html';
    dest = './' + single + '/';
  }

  return gulp.src(files)
    .pipe(minifyInline())
    .pipe(gulp.dest(dest))
});


/*gulp.task('vulcanize', function (c) {
  var files;
  var dest;
  if(c!=null){
    if(c==true){ // all but separately
      files= conf.comps;
      dest= '';
    } else if(c.split('_').length>1){ // only the files selected
      var arr=c.split('_');
      var data='';
      for(var i=0; i<arr.length;i++){
        data+='<link rel="import" href="../'+arr[i]+'/view.html">\n';
      }
      fs.writeFileSync('./_components/clab-components-custom.html', data);
      files='./_components/clab-components-custom.html';
      dest= './_components/';
    } else { // only one file
      files= './'+c+'/view.html';
      dest= './'+c+'/';
    }
  } else { // all in one file
    files= './_components/clab-components.html';
    dest= './_components/';
  }

  return gulp.src(files)
    .pipe(vulcanize({
      abspath: '',
      stripExcludes:false,
      stripComments: true,
      inlineCSS:false,
      inlineScripts:true
    }))
    .pipe(rename(function(path){
      path.basename = path.basename+'.build';
      console.log('BUILT: '+path.basename+' in '+(dest==='' ? (path.dirname.length>1 ? path.dirname : 'root') : dest));
    }))
    .pipe(gulp.dest(dest));
});
/**
* Minify HTML code
gulp.task('min-html', ['vulcanize'] , function(c) {
  var files;
  var dest;

  if(c!=null){
    if(c==true){ // all but separately
      files= conf.compsBuilt;
      dest= '';
    } else if(c.split('_').length>1){ // only the files selected
      files='./_components/clab-components-custom.build.html';
      dest= './_components/';
    } else { // only one
      files= './'+c+'/view.build.html';
      dest= './'+c+'/';
    }
  } else { // all in one file
    files= './_components/clab-components.build.html';
    dest= './_components/';
  }

  return gulp.src(files)
    .pipe(minifyHTML({ empty: true }))
    .pipe(gulp.dest(dest))
});
/**
* Minify inline Javascript
gulp.task('min-inline', ['min-html'], function(c) {
  var files;
  var dest;

  if(c!=null){
    if(c==true){ // all but separately
      files= conf.compsBuilt;
      dest= '';
    } else if(c.split('-').length>1){ // only the files selected
      files='./_components/clab-components-custom.build.html';
      dest= './_components/';
    } else { // only one
      files= './'+c+'/view.build.html';
      dest= './'+c+'/';
    }
  } else { // all in one file
    files= './_components/clab-components.build.html';
    dest= './_components/';
  }

  return gulp.src(files)
    .pipe(minifyInline())
    .pipe(gulp.dest(dest))
});*/



/**
* Default action: webserver
*/
gulp.task('default', ['connect']);

/**
* JS development action: webserver + babel on save
*/
gulp.task('dev', ['connect', 'watch-es6']);

/**
* CSS development action: webserver + sass on save
*/
gulp.task('ux', ['connect', 'watch-sass']);

/**
* Vulcanize Polymer components in one file
* Will generate _components/clab-components.build.html
* @arg {--all} Will generate every componentName/componentName.html build
* @arg {--single elementName (elementName1|elementName2)} Will generate choosen componentName/componentName.html build
*
* This task will run in order:
* 1. "vulcanize";
* 2. "min-html";
* 3. "min-inline"
*
*/
gulp.task('build', ['min-inline']);

// gulp.task('build', function(cb){
//   runSequence('vulcanize','minHtml','minInline');
// });
