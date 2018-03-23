var gulp = require('gulp');

var watch = require('gulp-watch');

var postcss = require('gulp-postcss');

var autoprefixer = require('autoprefixer');

var cssvars = require('postcss-simple-vars');

var cssnested = require('postcss-nested');

var cssimport = require('postcss-import');

var browsersync = require('browser-sync').create();

gulp.task('default', function () {

	console.log("Yaaaa");
});

gulp.task('html', function () {

	console.log("something useful to html");
});

gulp.task('styles', function () {

	return gulp.src('./app/assets/styles/styles.css')
	.pipe(postcss([ cssimport, cssvars, cssnested, autoprefixer ]))
	.pipe(gulp.dest('./app/temp/styles'));

});

gulp.task('watch', function () {

	browsersync.init({
		server : {
			baseDir: "app"
		}
	});

	watch('./app/index.html', function () {
	
		browsersync.reload();
	});

	watch('./app/assets/styles/**/*.css',function (){
		gulp.start('cssInject');
	});
});

gulp.task('cssInject', ['styles'],function () {
	return gulp.src('./app/temp/styles/styles.css')
	.pipe(browsersync.stream());
});