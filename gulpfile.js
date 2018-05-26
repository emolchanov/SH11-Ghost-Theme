const gulp = require('gulp');
const path = require('path');

// gulp plugins and utils
const gutil = require('gulp-util');
const livereload = require('gulp-livereload');
const nodemon = require('gulp-nodemon');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const webpack = require('webpack-stream');
const zip = require('gulp-zip');
const pkg = require('./package.json');
const webpackConfig = require('./webpack.config.js');

const swallowError = function swallowError(error) {
  gutil.log(error.toString());
  gutil.beep();
  this.emit('end');
};

const nodemonServerInit = () => {
  livereload.listen();
};

const templates = [
  './index.hbs',
  './author.hbs',
  './default.hbs',
  './error.hbs',
  './error-404.hbs',
  './page.hbs',
  './page-**.hbs',
  './post.hbs',
  './post-**.hbs',
  './tag.hbs',
  './tag-**.hbs',
  './partials/**/*.hbs',
];

const pack = [
  '**',
  '!node_modules',
  '!node_modules/**',
  '!dist',
  '!dist/**',
  '!styles',
  '!styles/**',
  '!scripts',
  '!scripts/**',
  '!.*',
  '!*.config.js',
  '!gulpfile.js',
  '!package-lock.json',
];

gulp.task('build', ['styles', 'scripts'], () => nodemonServerInit());

gulp.task('styles', () => (
  gulp.src('styles/*.css')
    .on('error', swallowError)
    .pipe(sourcemaps.init())
    .pipe(postcss())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('assets'))
));

gulp.task('scripts', () => (
  gulp.src('scripts/index.js')
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('assets'))
));

gulp.task('styles:reload', ['styles'], () => gulp.src('assets/*.css').pipe(livereload()));
gulp.task('scripts:reload', ['scripts'], () => gulp.src('assets/*.js').pipe(livereload()));

gulp.task('watch', () => {
  gulp.watch('styles/**', ['styles:reload']);
  gulp.watch('scripts/**', ['scripts:reload']);
  gulp.watch(templates, event => gulp.src(event.path).pipe(livereload()));
});

gulp.task('default', ['build'], () => gulp.start('watch'));

gulp.task('pack', ['scripts', 'styles'], () => gulp.src(pack).pipe(zip(`${pkg.name}.zip`)).pipe(gulp.dest('dist')));
gulp.task('dist', ['scripts', 'styles'], () => gulp.src(pack).pipe(gulp.dest(path.resolve('/Users/y.molchanov/MyProjects/sh11.pp.ua/themes/sh11-ghost-theme'))));
