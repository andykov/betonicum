const gulp = require('gulp')

module.exports = function jsPlugins() {
  return gulp.src('src/js/libs/*.js')
    .pipe(gulp.dest('build/js/libs'))
}
