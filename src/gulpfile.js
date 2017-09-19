/* 
* @Author: Marte
* @Date:   2017-08-29 19:45:10
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-11 18:03:49
*/
var gulp = require("gulp");
var sass = require('gulp-sass');

gulp.task("sass",function(){
    return gulp.src("./sass/*").pipe(sass({outputStyle:'compressed'})).on("error",sass.logError).pipe(gulp.dest('./css'));
});
gulp.task('sassWatch',function(){
    gulp.watch('./sass/*',['sass']);
});

var browserSync = require('browser-sync');
gulp.task('server',function(){
  browserSync({
    // 静态服务器
    // server:'./src/',

    // 代理服务器
    proxy:'http://localhost/H5/f_ugo/src/',

    // 端口
    port:3000,

    // 监听文件修改，自动刷新浏览器
    files:['./**/*.html','./css/*.css','./api/*.php','./js/*.js']
  });
  // 开启服务器的同时，监听sass的修改
  gulp.watch('./**/*.scss',['sassWatch']);
});

 
var uglify = require("gulp-uglify");

var babel = require('gulp-babel');

var cssmin = require("gulp-clean-css");
//参数
var opt = {
  compatibility: 'ie7',
  keepSpecialComments: '*'
}


var htmlMin = require('gulp-htmlmin');
//参数
var opt_h = {
  removeComments: true,
  collapseWhitespace: true,
  collapseBooleanAttributes: true,
  removeEmptyAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  minifyJS: true,
  minifyCSS: true
};


gulp.task("compress",function(){
  gulp.src('./css/*.css').pipe(cssmin(opt)).pipe(gulp.dest('../dist/css'));//css
  gulp.src("./js/*.js").pipe(babel()).pipe(uglify()).pipe(gulp.dest('../dist/js'));//js
  gulp.src("./lib/*.js").pipe(babel()).pipe(uglify()).pipe(gulp.dest('../dist/lib'));//lib
  gulp.src(['./html/*.html']).pipe(htmlMin(opt_h)).pipe(gulp.dest('../dist/html'));//html
  gulp.src("./font/*.html").pipe(htmlMin(opt_h)).pipe(gulp.dest("../dist/font"));//font-html
  gulp.src("./font/*.css").pipe(cssmin(opt)).pipe(gulp.dest("../dist/font"));//font-css
  gulp.src("./font/*.js").pipe(babel()).pipe(uglify()).pipe(gulp.dest('../dist/font'));//font-js
  gulp.src("./index.html").pipe(htmlMin(opt_h)).pipe(gulp.dest('../dist'));//index.html
})

