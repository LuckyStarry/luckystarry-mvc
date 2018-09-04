const gulp = require('gulp')
const del = require('del')
const ts = require('gulp-typescript')
const tsp = ts.createProject('tsconfig.json')
const PATHS = {
  scripts: ['./src/**/*.ts'],
  output: './dist'
}

gulp.task('clean-dist', function() {
  return del([PATHS.output])
})

gulp.task('build-ts', ['clean-dist'], function() {
  return gulp.src(PATHS.scripts)
    .pipe(tsp())
    .pipe(gulp.dest(PATHS.output))
})

gulp.task('build', ['build-ts']);