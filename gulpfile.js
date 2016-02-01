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
    minifyInline = require('gulp-minify-inline'),
    sass = require('gulp-sass'),
    $ = require('gulp-load-plugins')(),
    insert = require('gulp-insert'),
    sass = require('gulp-sass'),
    compass = require('gulp-compass'),
    sourcemaps = require('gulp-sourcemaps');

var conf = {
  jsSourcePath: '**/*.{js,jsx}',
  es6SourcePath: '**/*.es6.js',
  scssSourcePath: './**/*.{scss,sass}',
  cssOutputPath: '',
  distCSS: './dist/css/',
  comps: './**/view.html',
  compsBuilt: './**/view.build.html'
}




// Server
gulp.task('connect', function (port) {
  !port ? port = 3005 : port;
  connect.server({
    root: '../',
    port: port,
    livereload: true
  });
});






// Watch SASS
gulp.task('watch-sass', function() {
  watch(conf.scssSourcePath, function(file){
    var arr=JSON.stringify(file.dirname).split("\\");
    var i=arr.length - 3;
    var folder=arr[i];

      gulp.src(folder+'/scss/*.scss')
        .pipe(compass({
            css:folder+'/css',
            sass:folder+'/scss'
          }))
        .pipe(gulp.dest(folder+'/css'))
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
gulp.task('vulcanize', function (c) {
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

gulp.task('minHtml', function(c) {
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

gulp.task('minInline', function(c) {
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
});








// Compile sass to css color variables
gulp.task('sassVars', function(){
  gulp.src('./_css/template-files/color-vars-body.scss')
    .pipe(sass())
    .pipe(gulp.dest('./_css/template-files/'));
});

gulp.task('copyVars', function(){
  var colorVars=gulp.src('./_css/template-files/color-vars-body.css')
    .pipe($.rename('color-vars.css'))
    .pipe(gulp.dest('./_css/'));

  return colorVars;
});

gulp.task('insert', function(){
  gulp.src('./_css/color-vars.css')
    .pipe(insert.append('</style>'))
    .pipe(insert.prepend('<style is=\'custom-style\'>'))
    .pipe(gulp.dest('./_css/'));
});















gulp.task('default', ['connect']); 
gulp.task('dev', ['connect', 'watch-es6']); 
gulp.task('ux', ['connect', 'watch-sass']); 

gulp.task('build', function(cb){
  runSequence(
    'vulcanize',
    'minHtml',
    'minInline'
  );
});

gulp.task('vars-c', function(cb){
  runSequence(
    'sassVars',
    'copyVars',
    'insert'
  );
});







