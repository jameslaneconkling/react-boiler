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

const b = browserify('./app/scripts/app.js', {debug: true})
  .transform('babelify', {
    presets: ['es2015', 'react'],
  });
b.on('log', gutil.log);

function bundler(b) {
  return b
    .bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./dist/scripts'))
}


/****************************************************/
// asset compilation tasks
/****************************************************/
gulp.task('browserify', () => bundler(b));

gulp.task('lint', () => {
  return gulp.src('./app/scripts/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter(stylish));
});

gulp.task('move', () => {
  gulp.src([
    './app/*.{html,txt}'
  ])
    .pipe(gulp.dest('./dist'));

  gulp.src('./app/vendor/**/*.*')
    .pipe(gulp.dest('./dist/vendor'));
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
// reload deps must include all watch deps below, or reload might run before re-compilation is complete
gulp.task('reload', ['move', 'sass', 'lint', 'images', 'browserify'], browserSync.reload);

gulp.task('watch', () => {
  gulp.watch(['./app/scripts/**/*.js'], ['lint', 'browserify', 'reload']);

  gulp.watch(['./app/**/*.html'], ['move', 'reload']);

  gulp.watch(['./app/styles/**/*.{scss,sass,css}'], ['sass', 'reload']);

  gulp.watch(['./app/images/**/*.{png,gif,jpg}'], ['images', 'reload']);
});


/****************************************************/
// Production tasks
/****************************************************/
gulp.task('serve', () => {
  browserSync({
    server: { baseDir: './dist' },
    port: process.env.PORT || 3000
  });
});

gulp.task('gh-pages', () => gulp.src('./dist/**/*').pipe(ghPages()));


/****************************************************/
// Exported tasks
/****************************************************/
gulp.task('build', ['lint', 'browserify', 'sass', 'move', 'images']);

gulp.task('dev', ['build', 'watch', 'serve']);

gulp.task('deploy', ['build', 'gh-pages']);
