var gulp = require('gulp-param')(require('gulp'), process.argv),
    runSequence = require('run-sequence'),
  	fs = require("fs"),
  	path = require("path"),
  	babel = require("gulp-babel"),
    connect = require('gulp-connect'),
  	watch = require('gulp-watch'),
  	rename = require("gulp-rename"),
    plumber = require('gulp-plumber');
    vulcanize = require('gulp-vulcanize'),
    minifyHTML = require('gulp-minify-html'),
    minifyInline = require('gulp-minify-inline');

var conf = {
  scssSourcePath: './assets/scss/**/*.{scss,sass}',
  jsSourcePath: '**/*.{js,jsx}',
  es6SourcePath: '**/*.es6.js',
  cssOutputPath: './assets/css/',
  distCSS: './dist/css/',
  comps: './**/view.html',
  compsBuilt: './**/view.build.html'
}




// Server
gulp.task('connect', function (port) {
  !port ? port = 3005 : port;
  connect.server({
    root: '',
    port: port,
    livereload: true
  });
});



// Watch ES5
gulp.task('watch-es6', function() {
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








// Vulcanize Components
gulp.task('vulcanize', function (s, f) {
  var files;
  var dest;

  if(s!=null){ 
    console.log(s);
    if(s==true){ // all but separately
      files= conf.comps;
      dest= ''; 
    } else { // only one
      files= './'+s+'/view.html';
      dest= './'+s+'/';
    }
  } else { // all in one file
    files= './clab-components.html';
    dest= '';
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

gulp.task('minHtml', function(s, f) {
  var files;
  var dest;

  if(s!=null){ 
    if(s==true){ // all but separately
      files= conf.compsBuilt;
      dest= ''; 
    } else { // only one
      files= './'+s+'/view.build.html';
      dest= './'+s+'/';
    }
  } else { // all in one file
    files= './clab-components.build.html';
    dest= '';
  }

  return gulp.src(files)
    .pipe(minifyHTML({ empty: true }))
    .pipe(gulp.dest(dest))
});

gulp.task('minInline', function(s, f) {
  var files;
  var dest;

  if(s!=null){ 
    if(s==true){ // all but separately
      files= conf.compsBuilt;
      dest= ''; 
    } else { // only one
      files= './'+s+'/view.build.html';
      dest= './'+s+'/';
    }
  } else { // all in one file
    files= './clab-components.build.html';
    dest= '';
  }

  return gulp.src(files)
    .pipe(minifyInline())
    .pipe(gulp.dest(dest))
});









gulp.task('default', ['watch-es6']); 

gulp.task('build', function(cb){
  runSequence(
    'vulcanize',
    'minHtml',
    'minInline'
  );
});







