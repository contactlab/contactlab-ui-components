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
  compsV: './**/view.vulcanized.html'
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




// Vulcanize Components separatly
/*gulp.task('single-vulcanize', function () {
    return gulp.src(conf.comps)
        .pipe(vulcanize({
            abspath: '',
            stripExcludes:false,
            stripComments: true,
            inlineCSS:false,
            inlineScripts:true
          }))
        .pipe(rename(function(path){
            path.basename = path.basename+'.vulcanized';
            console.log('build: '+path.basename+' in '+path.dirname);
          }))
        .pipe(gulp.dest(''));
});
gulp.task('single-minHtml', function() {
  return gulp.src(conf.compsV)
    .pipe(minifyHTML({ empty: true }))
    .pipe(gulp.dest(''))
});
gulp.task('single-minInline', function() {
  return gulp.src(conf.compsV)
    .pipe(minifyInline())
    .pipe(gulp.dest(''))
});*/


// Vulcanize components in one file
gulp.task('vulcanize', function () {
    return gulp.src('clab-components.html')
        .pipe(vulcanize({
            abspath: '',
            stripExcludes:false,
            stripComments: true,
            inlineCSS:false,
            inlineScripts:true
          }))
        .pipe(rename(function(path){
            path.basename = path.basename+'.build';
          }))
        .pipe(gulp.dest(''));
});
gulp.task('minHtml', function() {
  return gulp.src('clab-components.build.html')
    .pipe(minifyHTML({ empty: true }))
    .pipe(gulp.dest(''))
});
gulp.task('minInline', function() {
  return gulp.src('clab-components.build.html')
    .pipe(minifyInline())
    .pipe(gulp.dest(''))
});













gulp.task('default', ['connect', 'watch-es6']); 

/*gulp.task('single-build', function(cb){
  runSequence(
    'single-vulcanize',
    'single-minHtml',
    'single-minInline'
  );
});*/

gulp.task('build', function(cb){
  runSequence(
    'vulcanize',
    'minHtml',
    'minInline'
  );
});







