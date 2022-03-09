var gulp  = require('gulp'),
  sass = require('gulp-sass')(require('sass')),
  sourcemaps = require('gulp-sourcemaps'),
  cleanCss = require('gulp-clean-css'),
  rename = require('gulp-rename'),
  postcss      = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  plumber = require('gulp-plumber'),
  replace = require('gulp-replace'),
  browsersync = require('browser-sync'),
  del = require('del');


const buildFolder = './dist';
const srcFolder = './src';

let path = {
    build: {
        js: `${buildFolder}/js/`,
        css: `${buildFolder}/css/`,
        html: `${buildFolder}/`,
        fonts: `${buildFolder}/fonts/`,
        images: `${buildFolder}/img/`
    },
    src: {
        js: `${srcFolder}/js/*.js`,
        scss: `${srcFolder}/scss/style.scss`,
        css: `${srcFolder}/css/**/*.css`,
        fonts: `${srcFolder}/fonts/**/*.*`,
        html: `${srcFolder}/*.html`,
        images: `${srcFolder}/img/**/*.*`
    },
    watch: {
        js: `${srcFolder}/js/**/*.js`,
        scss: `${srcFolder}/scss/**/*.scss`,
        html: `${srcFolder}/**/*.html`,
        images: `${srcFolder}/img/**/*.*`
    },
    clean: buildFolder,
    buildFolder: buildFolder,
    srcFolder: srcFolder,
}

function server (done) {
    browsersync.init({
        server: {
            baseDir: path.buildFolder
        },
        notify: false,
        port: 3000,
    });
}

function reset() {
    return del(path.clean, {force: true});
}

function html() {
    return gulp.src(path.src.html)
    .pipe(replace(/@img\//g, './img/'))
    .pipe(gulp.dest(path.build.html))
    .pipe(browsersync.stream());
}

function scss() {
    return gulp.src(path.src.scss, { sourcemaps: true})
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(replace(/@img\//g, '../img/'))
        .pipe(postcss([ autoprefixer({ overrideBrowserslist: ['last 4 versions']})]))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css))
        .pipe(browsersync.stream())
        .pipe(cleanCss())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(path.build.css))
}

function copy_css() {
    return gulp.src(path.src.css, { sourcemaps: true})
    .pipe(gulp.dest(path.build.css))
}

function images () {
    return gulp.src(path.src.images)
    .pipe(plumber())
    .pipe(gulp.dest(path.build.images))
    .pipe(browsersync.stream());
}

function fonts () {
    return gulp.src(path.src.fonts, {})
    .pipe(gulp.dest(path.build.fonts));
}

function js() {
    return gulp.src(path.src.js, {})
    .pipe(gulp.dest(path.build.js))
    .pipe(browsersync.stream());
}

function watcher() {
    gulp.watch(path.watch.html, html)
    gulp.watch(path.watch.scss, scss)
    gulp.watch(path.watch.js, js)
    gulp.watch(path.watch.images, images)
}

var mainTasks = gulp.series(reset, fonts, images, html, scss, js, copy_css);

var dev = gulp.series(mainTasks, gulp.parallel(server, watcher));

gulp.task('default', dev);