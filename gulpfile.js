var gulp = require('gulp'),
  	fs = require("fs"),
  	path = require("path"),
  	babel = require("gulp-babel"),
    connect = require('gulp-connect'),
  	watch = require('gulp-watch'),
  	rename = require("gulp-rename"),
    plumber = require('gulp-plumber');

var conf = {
  scssSourcePath: './assets/scss/**/*.{scss,sass}',
  jsSourcePath: '**/*.{js,jsx}',
  es6SourcePath: '**/*.es6.js',
  cssOutputPath: './assets/css/',
  distCSS: './dist/css/'
}

/*function getFolders(dir) {
    return fs.readdirSync(dir)
      .filter(function(file) {
        return fs.statSync(path.join(dir, file)).isDirectory();
      });
}

// Transpile ES6 to ES5 for every file in components folders
gulp.task('babel', function () {
  var arr = [currentPath];
  for (var i = 0; i < arr.length; i++){
    var ctx = arr[i];
    var folders = getFolders(ctx);
    for(var i = 0; i < folders.length; i++) {
      if(folders[i] == '.git' || folders[i] == '_css' || folders[i] == 'node_modules'){
        folders.splice(i,1);
      }
    };
    console.log(folders);
    var tasks = folders.map(function(folder) {
      return gulp.src(path.join(ctx, folder, '/**\/*.es6.js'))
        .pipe(babel())
        .pipe(rename('script.js'))
        .pipe(gulp.dest(ctx + "/" + folder));
    });
  }
});*/


// Server
gulp.task('connect', function (port) {
  !port ? port = 3000 : port;
  console.log(port);
  connect.server({
    root: '',
    port: port,
    livereload: true
  });
});

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


gulp.task('default', ['watch-es6']); 
