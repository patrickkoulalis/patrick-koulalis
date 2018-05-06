const gulp  = require('gulp');
const imagemin = require('gulp-imagemin');
const babel = require('gulp-babel');
const sass = require("gulp-sass");

const paths = {
	images: './public/src/img/**/*',
	sass: 'public/src/scss/**/*.scss',
	javascript: 'public/src/js/main.js'
}

gulp.task('images', function(){
  return gulp.src(paths.images)
    // Pass in options to the task
    .pipe(imagemin({optimizationLevel: 5}))
		.pipe(gulp.dest('public/images/'));
});

gulp.task('babel', function(){
	return gulp.src(path.javascript)
	.pipe(babel())
	.pipe(gulp.dest('public/js/'));
});

gulp.task('sass', function(){
	return gulp.src(path.sass)
	.pipe(sass())
	.pipe(gulp.dest('public/css/'));
});

gulp.task('default', ['sass'], function(){
	gulp.watch(path.sass, ['sass']);
});