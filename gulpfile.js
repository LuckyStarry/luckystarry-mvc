//gulpfile.js
let gulp = require('gulp');
let ts = require('gulp-typescript');
let tsp = ts.createProject('tsconfig.json');

//目录常量
const PATHS = {
  scripts: ['./src/**/*.ts'],
  output: './dist'
};
// 编译ts文件
gulp.task('build-ts', function() {
  return gulp.src(PATHS.scripts)
    .pipe(tsp())
    .pipe(gulp.dest(PATHS.output));
});
// 正式编译
gulp.task('build', ['build-ts']);