// const gulp = require('gulp');
// const eslint = require('gulp-eslint');
// const compiler = require('webpack');
// const webpack = require('webpack-stream');
// // const babel = require('gulp-babel');
// const terser = require('gulp-terser');
// const rename = require('gulp-rename');
// const sourcemaps = require('gulp-sourcemaps');

const gulp = require('gulp');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');

module.exports = function script() {

  return gulp.src('src/js/main.js')
  .pipe(webpackStream({
    output: {
      filename: 'bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.(js)$/,
          exclude: /(node_modules)/,
          loader: 'babel-loader',
          query: {
            presets: ['env']
          }
        }
      ]
    },
    externals: {
      jquery: 'jQuery'
    }
  }))
  .pipe(uglify())
  .pipe(rename({ suffix: '.min' }))
  .pipe(gulp.dest('build/js'));



  // return gulp.src('src/js/main.js')
    // .pipe(eslint())
    // .pipe(eslint.format())
    // .pipe(sourcemaps.init())
    // .pipe(webpack({
    //   output: {
    //     filename: 'bundle.js',
    //   }
    // }, compiler, function(err, stats) {
    //   /* Use stats to do more things if needed */
    // }))
    // .pipe(babel({
    //   presets: ['@babel/env']
    // }))
    // .pipe(webpack({
    //   output: {
    //     filename: 'bundle.js',
    //   }
    // }))
    // .pipe(terser())
    // .pipe(sourcemaps.write())
    // .pipe(rename({ suffix: '.min' }))
    // .pipe(gulp.dest('build/js'))
}



