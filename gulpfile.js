var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var dist = 'dist/';

gulp.task('release',function(){
    gulp.src('js-type-detector.js').
    pipe(gulp.dest(dist)).
    pipe(uglify().on('error',function(error){console.log(error,111)})).
    pipe(rename({suffix:'.min'}))
    .pipe(gulp.dest(dist));   
});