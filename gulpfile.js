const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const bs   = require('browser-sync').create();
const $ = require('gulp-load-plugins')();
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');

const rootPaths = {
  "htmlRoot" : "./**/*.html",
  "sassRoot" : "./assets/sass/**/*.scss",
  "cssRoot" : "./assets/css/**/*.css",
  "cssDirectly" : ["./assets/css/*.css","!./assets/css/*.min.css"],
  "jsRoot" : "./assets/js/**/*.js",
}

// Sass
function compileSass() {
  return gulp.src(rootPaths.sassRoot)
    .pipe(plumber({
      errorHandler: function (err) {
        console.error(err.message);
        this.emit('end');
      }
    }))
    .pipe(sass())
    .pipe(gulp.dest('./assets/css/'))
    .pipe(bs.stream({ once: true }));
}

// css minify
function cssMinify() {
  return gulp.src(rootPaths.cssDirectly)
    .pipe(plumber({
      errorHandler: function (err) {
        console.error(err.message);
        this.emit('end');
      }
    }))
    .pipe($.cleanCss())
    .pipe($.rename({suffix: '.min'}))
    .pipe(gulp.dest('./assets/css/'));
}

// Webpackを実行するタスク
function bundle(done) {
  webpack(webpackConfig, (err, stats) => {
    if (err) {
      console.error(err.toString());
    }
    if (stats.hasErrors()) {
      console.error(stats.toString());
    }
    console.log(stats.toString({ colors: true }));
    done();
  });
}

// browserSync
function browserSync() {
  bs.init({
    server: {
        baseDir: "./"
    },
    files: [rootPaths.htmlRoot, rootPaths.cssRoot]
  });
}

// Browser reload
function browserReload(done) {
  bs.reload();
  done();
}

// watchタスク
function watchFiles() {
  gulp.watch(rootPaths.sassRoot, compileSass);
  gulp.watch(rootPaths.cssDirectly, cssMinify);
  gulp.watch(rootPaths.jsRoot, bundle);
  gulp.watch(rootPaths.htmlRoot, browserReload);
  
}

// defaultタスク
const defaultTask = gulp.parallel(compileSass, cssMinify, bundle, browserSync, watchFiles);

exports.compileSass = compileSass;
exports.cssMinify = cssMinify;
exports.bundle = bundle;
exports.browserSync = browserSync;
exports.browserReload = browserReload;
exports.watchFiles = watchFiles;
exports.default = defaultTask;