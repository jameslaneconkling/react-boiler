'use strict';
const gulp           = require('gulp'),
      browserSync    = require('browser-sync'),
      browserify     = require('browserify'),
      source         = require('vinyl-source-stream'),
      buffer         = require('vinyl-buffer'),
      gutil          = require('gulp-util'),
      jshint         = require('gulp-jshint'),
      stylish        = require('jshint-stylish'),
      sass           = require('gulp-sass'),
      cleanCSS       = require('gulp-clean-css'),
      autoprefixer   = require('gulp-autoprefixer'),
      changed        = require('gulp-changed'),
      imagemin       = require('gulp-imagemin'),
      ghPages        = require('gulp-gh-pages');

const b = browserify('./app/scripts/index.jsx', {debug: true})
  .transform('babelify', {
    presets: ['es2015', 'react'],
  });
b.on('log', gutil.log);

function bundler(b) {
  return b
    .bundle()
    .on('error', logCompilationError)
    .pipe(source('index.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./dist/scripts'))
}

function logCompilationError(err) {
  gutil.log(gutil.colors.bgRed(
    '\n************COMPILATION ERROR************\n\n',
    err.message.replace(/: /g, ':\n'),
    '\n\n*****************************************'
  ));

  this.emit('end');
}

/****************************************************/
// asset compilation tasks
/****************************************************/
gulp.task('browserify', () => bundler(b));

gulp.task('lint', () => {
  return gulp.src('./app/scripts/**/*.{js,jsx}')
    .pipe(jshint({ linter: require('jshint-jsx').JSXHINT }))
    .pipe(jshint.reporter(stylish));
});

gulp.task('move', () => {
  // TODO - should signal when done via cb, promise, or stream
  gulp.src('./app/vendor/**/*.*')
    .pipe(gulp.dest('./dist/vendor'));

  return gulp.src('./app/*.{html,txt}')
    .pipe(gulp.dest('./dist'));
});

gulp.task('sass', () => {
  return gulp.src('./app/styles/**/*.{scss,sass,css}')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({ browsers: ['last 2 version'] }))
    .pipe(cleanCSS())
    .pipe(gulp.dest('./dist/styles'));
});

gulp.task('images', () => {
  // return gulp.src('./app/images/**')
  //   .pipe(changed('./dist/images'))
  //   .pipe(imagemin())
  //   .pipe(gulp.dest('./dist/images'))
});


/****************************************************/
// Sync Tasks
/****************************************************/
gulp.task('watch', () => {
  gulp.watch(['./app/scripts/**/*.{js,jsx}'], ['reloadJS']);

  gulp.watch(['./app/styles/**/*.{scss,sass,css}'], ['reloadCSS']);

  gulp.watch(['./app/**/*.html'], ['reloadMove']);

  gulp.watch(['./app/images/**/*.{png,gif,jpg}'], ['reloadImages']);
});

gulp.task('reloadJS', ['lint', 'browserify'], browserSync.reload);
gulp.task('reloadCSS', ['sass'], browserSync.reload);
gulp.task('reloadMove', ['move'], browserSync.reload);
gulp.task('reloadImages', ['images'], browserSync.reload);


/****************************************************/
// Production tasks
/****************************************************/
gulp.task('serve', () => {
  browserSync({
    server: { baseDir: './dist' },
    port: process.env.PORT || 3000,
    open: false
  });
});

gulp.task('gh-pages', () => gulp.src('./dist/**/*').pipe(ghPages()));


/****************************************************/
// Exported tasks
/****************************************************/
gulp.task('build', ['lint', 'browserify', 'sass', 'move', 'images']);

gulp.task('dev', ['build', 'watch', 'serve']);

gulp.task('deploy', ['build', 'gh-pages']);
