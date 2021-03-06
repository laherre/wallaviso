// Imports
let gulp = require('gulp');
let browserSync = require('browser-sync').create();
let reload = browserSync.reload;
let concat = require('gulp-concat');
let sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');

// letiables
let sURLResources = 'static/';
let proxy = 'http://localhost:5000'

gulp.task('scripts', function () {
	return gulp.src([
		sURLResources + 'js/vendor/' + 'jquery-3.2.1.min.js',
		sURLResources + 'js/vendor/' + 'bootstrap.min.js',
		sURLResources + 'js/vendor/' + 'jquery.bootstrap-autohidingnavbar.min.js',
		sURLResources + 'js/vendor/' + 'vex.min.js',
		sURLResources + 'js/vendor/' + 'vue.min.js',
		sURLResources + 'js/vendor/' + 'vue-resource.min.js',
		sURLResources + 'js/' + 'searchs.js',
		sURLResources + 'js/' + 'main.js'
		])
		.pipe(sourcemaps.init())
		.pipe(concat('all.js'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(sURLResources + 'js'))
        .pipe(browserSync.stream());
});

gulp.task('sass', function() {
    return gulp.src(sURLResources + 'css/main.scss')
		.pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}))
		.pipe(sourcemaps.write(gulp.dest(sURLResources + 'css')))
        .pipe(gulp.dest(sURLResources + 'css'))
        .pipe(browserSync.stream());
});

gulp.task('browser-sync', function() {
    browserSync.init({
		proxy: proxy,
        open: false,
        notify: false
    });
});

gulp.task('watch', function() {
    gulp.watch(sURLResources + '../templates/**/*.html').on('change', browserSync.reload);
    gulp.watch(sURLResources + 'js/**/*.js', ['scripts']);
    gulp.watch(sURLResources + '**/*.jpg').on('change', browserSync.reload);
    gulp.watch(sURLResources + '**/*.png').on('change', browserSync.reload);
    gulp.watch(sURLResources + 'css/main.scss', ['sass']);
});

gulp.task('default', ['watch', 'scripts', 'sass', 'browser-sync']);
gulp.task('build', ['scripts', 'sass']);
