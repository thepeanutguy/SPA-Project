'use strict';

let gulp = require('gulp'),
    sass = require('gulp-sass');


gulp.task('default', () => {
    gulp.watch('public/stylesheets/**/*.scss', ['styles']);
});

// .scss > .css
gulp.task('styles', () => {
    gulp.src('public/stylesheets/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('public/stylesheets/'));
});