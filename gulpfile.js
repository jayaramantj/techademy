var gulp = require('gulp'),
	sass = require('gulp-sass'),
	browser = require('browser-sync').create(),
	pug = require('gulp-pug'),
	concat = require('gulp-concat');

function sync(done) {
	browser.init({
		server: {
			baseDir: "./dest/"
		},
		port: 3040
	});

	done();
}

function copy(done) {
	gulp.src(['./node_modules/glyphicons-only-bootstrap/fonts/*.*', 
			'./src/fonts/techademy-font.eot',
			'./src/fonts/techademy-font.svg',
			'./src/fonts/techademy-font.ttf',
			'./src/fonts/techademy-font.woff'])
		.pipe(gulp.dest('./dest/fonts/'));
		
	gulp.src('./src/img/*.*')
		.pipe(gulp.dest('./dest/img/'));

	gulp.src('./node_modules/slick-carousel/slick/slick.js')
		.pipe(gulp.dest('./src/js/library/'));

	done();
}

function concats(done) {
	gulp.src(['./node_modules/jquery/dist/jquery.js', 
			'./src/js/library/slick.js', 
			'./node_modules/bootstrap/dist/js/bootstrap.js'])
		.pipe(concat('plugin-bundle.js'))
		.pipe(gulp.dest('./dest/js/'));

	gulp.src(['./node_modules/bootstrap/dist/css/bootstrap.css', 
			'./node_modules/glyphicons-only-bootstrap/css/bootstrap.css',
			'./src/fonts/*.css', 
			'./node_modules/slick-carousel/slick/slick.css'])
		.pipe(concat('plugin-bundle.css'))
		.pipe(gulp.dest('./dest/css/'));

	done();
}

function scss() {
	return gulp.src('./src/scss/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('./dest/css/'))
		.pipe(browser.stream());
}

function views() {
	return gulp.src('./src/views/*.pug')
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest('./dest/'))
		.pipe(browser.stream());
}

function script() {
	return gulp.src('./src/js/*.js')
		.pipe(gulp.dest('./dest/js/'))
		.pipe(browser.stream());
}

function watch(){
	gulp.watch('./src/', gulp.series(scss, views, script));
}

var watch = gulp.parallel(sync, watch),
	build = gulp.series([concats, scss, views, script, watch]);

exports.copy = copy;
exports.concats = concats;
exports.sync = sync;
exports.scss = scss;
exports.views = views;
exports.watch = watch;
exports.default = build;