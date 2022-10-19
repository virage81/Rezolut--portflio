const { src, dest, watch, parallel, series } = require("gulp");

const scss = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");
const autoprefixer = require("gulp-autoprefixer");
const uglify = require("gulp-uglify");
const imagemin = require("gulp-imagemin");
const browserSync = require("browser-sync").create();
const del = require("del");

function browsersync() {
	browserSync.init({
		server: {
			baseDir: "app/",
		},
		notify: false,
	});
}

function styles() {
	return src("app/scss/style.scss")
		.pipe(scss({ outputStyle: "compressed" }))
		.pipe(concat("style.min.css"))
		.pipe(
			autoprefixer({
				overrideBrowserslist: ["last 15 versions"],
				grid: true,
			})
		)
		.pipe(dest("app/css"))
		.pipe(browserSync.stream());
}

function scripts() {
	return src(["node_modules/jquery/dist/jquery.js", "node_modules/slick-carousel/slick/slick.js", "app/js/main.js"])
		.pipe(concat("main.min.js"))
		.pipe(uglify())
		.pipe(dest("app/js"))
		.pipe(browserSync.stream());
}

function images() {
	return src("app/img/**/*")
		.pipe(
			imagemin([
				imagemin.gifsicle({ interlaced: true }),
				imagemin.mozjpeg({ quality: 75, progressive: true }),
				imagemin.optipng({ optimizationLevel: 5 }),
				imagemin.svgo({
					plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
				}),
			])
		)
		.pipe(dest("root/img"));
}

function build() {
	return src(["app/**/*.html", "app/fonts/*", "app/css/style.min.css", "app/js/main.min.js"], { base: "app" }).pipe(dest("root/"));
}

function cleanDist() {
	return del("root/");
}

function watching() {
	watch(["app/scss/**/*.scss"], styles).on("change", browserSync.reload);
	watch(["app/js/**/*.js", "!app/js/main.min.js"], scripts);
	watch(["app/**/*.html"]).on("change", browserSync.reload);
}

exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.browsersync = browsersync;
exports.cleanDist = cleanDist;
exports.watching = watching;
exports.build = series(cleanDist, images, build);

exports.default = parallel(styles, scripts, browsersync, watching);
