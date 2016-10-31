'use strict';
const gulp           = require('gulp');
const browserSync    = require('browser-sync');
const browserify     = require('browserify');
const watchify       = require('watchify');
const source         = require('vinyl-source-stream');
const buffer         = require('vinyl-buffer');
const eslint         = require('gulp-eslint');
const gutil          = require('gulp-util');
const sass           = require('gulp-sass');
const cleanCSS       = require('gulp-clean-css');
const autoprefixer   = require('gulp-autoprefixer');
const uglify         = require('gulp-uglify');
const ghPages        = require('gulp-gh-pages');

const b = browserify({
  entries: ['./app/index.jsx'],
  debug: true,
  cache: {},
  packageCache: {},
  plugin: [watchify]
})
  .transform('babelify', {
    plugins: ["transform-object-rest-spread"],
    presets: ['es2015', 'react'], // NOTE - only need to include es2015 plugins as needed
  });

b.on('update', () => bundle(b));
b.on('log', gutil.log);

function bundle(b) {
  return b
    .bundle()
    .on('error', logCompilationError)
    .pipe(source('index.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./dist'))
    .on('finish', () => {
      if (process.env.NODE_ENV === 'production') {
        b.close();
      } else {
        gutil.log('\n************FINISHED BUNDLING************');
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
    .pipe(eslint())
    .pipe(eslint.format())
});

gulp.task('move', () => {
  return gulp.src('./app/*.{html,txt}')
    .pipe(gulp.dest('./dist'));
});

gulp.task('sass', () => {
  return gulp.src('./app/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({ browsers: ['last 2 version'] }))
    .pipe(cleanCSS())
    .pipe(gulp.dest('./dist'));
});


/****************************************************/
// Sync Tasks
/****************************************************/
gulp.task('watch', () => {
  gulp.watch(['./app/**/*.{js,jsx}'], ['lint']);

  gulp.watch(['./app/styles/**/*.{scss,sass,css}'], ['reloadCSS']);

  gulp.watch(['./app/**/*.html'], ['reloadMove']);
});

gulp.task('reloadCSS', ['sass'], browserSync.reload);
gulp.task('reloadMove', ['move'], browserSync.reload);


/****************************************************/
// Exported tasks
/****************************************************/
gulp.task('build', ['lint', 'compileJS', 'sass', 'move']);

gulp.task('dev', ['build', 'watch'], () => {
  // serve
  return browserSync({
    server: { baseDir: './dist' },
    port: process.env.PORT || 3000,
    open: false
  });
});

gulp.task('prod', ['build'], () => {
  // minify
  return gulp.src('./dist/index.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist'));
});

gulp.task('deploy', ['prod'], () => {
  // deploy to github-pages
  return gulp.src('./dist/**/*').pipe(ghPages());
});
