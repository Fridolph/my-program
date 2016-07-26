var gulp = require('gulp');
var rev = require('gulp-rev');  // 给每个文件计算出一个哈西码
var revReplace = require('gulp-rev-replace');  // 更新index中的引用
var useref = require('gulp-useref');  // build:css 或 js 可以合并 注释法写在html中
var filter = require('gulp-filter');  // 筛选
var uglify = require('gulp-uglify');  // 压缩js代码
var csso = require('gulp-csso');  // 压缩css代码

gulp.task('default', function() {
  var jsFilter = filter('**/*.js', {restore: true});
  var cssFilter = filter('**/*.css', {restore: true});
  var indexHtmlFilter = filter(['**/*', '!**/index.html'], {restore: true});

  return gulp.src('src/index.html')
    .pipe(useref())
    .pipe(jsFilter)
    .pipe(uglify())
    .pipe(jsFilter.restore)
    .pipe(cssFilter)
    .pipe(csso())
    .pipe(cssFilter.restore)
    .pipe(rev())
    .pipe(indexHtmlFilter.restore)
    .pipe(revReplace())
    .pipe(gulp.dest('./dist'));
});