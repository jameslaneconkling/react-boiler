'use strict';
const gulp           = require('gulp');
const browserSync    = require('browser-sync');
const browserify     = require('browserify');
const watchify       = require('watchify');
const source         = require('vinyl-source-stream');
const buffer         = require('vinyl-buffer');
const gutil          = require('gulp-util');
const jshint         = require('gulp-jshint');
const stylish        = require('jshint-stylish');
const sass           = require('gulp-sass');
const cleanCSS       = require('gulp-clean-css');
const autoprefixer   = require('gulp-autoprefixer');
// const changed        = require('gulp-changed');
// const imagemin       = require('gulp-imagemin');
const ghPages        = require('gulp-gh-pages');

const b = browserify({
  entries: ['./app/index.jsx'],
  debug: true,
  cache: {},
  packageCache: {},
  plugin: [watchify]
})
  .transform('babelify', {
    presets: ['es2015', 'react'],
  });

b.on('update', () => bundle(b, true));
b.on('log', gutil.log);

function bundle(b, reload) {
  return b
    .bundle()
    .on('error', logCompilationError)
    .pipe(source('index.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./dist'))
    .on('finish', () => {
      if (reload) {
        gutil.log('\n*****************************************\n\n');
        browserSync.reload();
      }
    });
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
gulp.task('compileJS', () => bundle(b));

gulp.task('lint', () => {
  return gulp.src('./app/**/*.{js,jsx}')
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
  gulp.watch(['./app/**/*.{js,jsx}'], ['lint']);

  gulp.watch(['./app/styles/**/*.{scss,sass,css}'], ['reloadCSS']);

  gulp.watch(['./app/**/*.html'], ['reloadMove']);

  // gulp.watch(['./app/images/**/*.{png,gif,jpg}'], ['reloadImages']);
});

gulp.task('reloadCSS', ['sass'], browserSync.reload);
gulp.task('reloadMove', ['move'], browserSync.reload);
// gulp.task('reloadImages', ['images'], browserSync.reload);


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
gulp.task('build', ['lint', 'compileJS', 'sass', 'move', 'images']);

gulp.task('dev', ['build', 'watch', 'serve']);

gulp.task('deploy', ['build', 'gh-pages']);
