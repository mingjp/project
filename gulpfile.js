var gulp=require('gulp');
var sass = require('gulp-sass');
 

 // 编译sass
// 利用gulp任务来编译
// 创建gulp任务：gulp.task()
gulp.task('project',function(){
    gulp.src('./src/sass/*.scss')
        .pipe(sass({outputStyle:'compact'}).on('error',sass.logError))
        .pipe(gulp.dest('./src/css/'));
});

//监听
gulp.task('JtProject',function(){
    gulp.watch('./src/sass/*.scss',['project']);
})
