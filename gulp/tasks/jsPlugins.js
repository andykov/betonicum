const gulp = require('gulp')

module.exports = function plugins() {
  return gulp.src('src/js/libs/*.js')
    .pipe(gulp.dest('build/js/libs'))
}
