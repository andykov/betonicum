const gulp = require('gulp')

module.exports = function cssPlugins() {
  return gulp.src('src/styles/libs/*.css')
    .pipe(gulp.dest('build/css/libs'))
}
