const gulp = require('gulp')
const del = require('del')
const ts = require('gulp-typescript')
const tsp = ts.createProject('tsconfig.json')
const merge = require('merge2')
const PATHS = {
  scripts: ['./src/**/*.ts'],
  output: './dist'
}

gulp.task('clean-dist', function() {
  return del([PATHS.output])
})

gulp.task('build-ts', ['clean-dist'], function() {
  var tsResult = gulp.src(PATHS.scripts).pipe(tsp())
  return merge([
    tsResult.dts.pipe(gulp.dest(PATHS.output + '/definitions')),
    tsResult.js.pipe(gulp.dest(PATHS.output + '/js'))
  ])
})

gulp.task('build', ['build-ts']);