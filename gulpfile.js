//gulpfile.js
let gulp = require('gulp');
let ts = require('gulp-typescript');
let tsp = ts.createProject('tsconfig.json');
let { exec } = require('child_process');
let del = require('del')

let env = process.env.NODE_ENV === 'production' ? 'production' : 'development'
let child;
//目录常量
const PATHS = {
  scripts: ['./src/**/*.ts'],
  output: './dist/bin',
  config: './dist/config',
};
// 编译环境文件
gulp.task('build-config', function() {
  return gulp.src([`./configs/${env}/**/*.ts`])
    .pipe(tsp())
    .pipe(gulp.dest(PATHS.config));
});
// 编译ts文件
gulp.task('build-ts', ['build-config'], function() {
  return gulp.src(PATHS.scripts)
    .pipe(tsp())
    .pipe(gulp.dest(PATHS.output));
});
// 监视ts文件变化
gulp.task('watch-ts', ['build-ts'], function() {
  gulp.watch(PATHS.scripts, ['build-ts']);
});
// 启动服务器
gulp.task('server-start', ['watch-ts'], function() {
  child = exec('supervisor -w dist ./index.js', { maxBuffer: 1024 * 1024 * 256 }, (error, stdout, stderr) => {
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
    if (error !== null) {
      console.log(`exec error: ${error}`);
    }
  });
  child.stdout.on('data', stdout => console.log(`stdout: ${stdout}`))
  child.stderr.on('data', stderr => console.log(`stderr: ${stderr}`))
});
// 开发任务
gulp.task('dev', ['build-ts', 'server-start', 'watch-ts']);
// 正式编译
gulp.task('build', ['build-ts']);