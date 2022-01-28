const { src, dest, watch, parallel, series } = require('gulp');
const mystyles = require('gulp-sass');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();
const htmlhint = require('gulp-htmlhint');
const tinypng = require('gulp-tinypng');




function tinyimages() {
    return src('images/**/*.*')
        .pipe(tinypng())
        .pipe(dest('dist/images'))
}

function htmlHint() {
    return src('app/**/*.html')
        .pipe(htmlhint())
        .pipe(htmlhint.reporter())
}

function browsersync() {
    browserSync.init({
        server: {
            baseDir: "app/"
        },
        notify: false
    });
}

function build() {
    return src([
        'app/**/*.html',
        'app/css/style.min.css',
        'app/js/main.min.js'

    ], { base: 'app' }
    ).pipe(dest('dist'))
}

function styles() {
    return src('app/sass/style.scss')
        .pipe(mystyles({ outputStyle: 'compressed' }))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 10 versions'],
            grid: true
        }))
        .pipe(concat('style.min.css'))
        .pipe(dest('app/css'))
        .pipe(browserSync.stream())
}

function scripts() {
    return src([

        'node_modules/jquery/dist/jquery.js',
        'app/rateyo/src/jquery.rateyo.js',
        'app/js/main.js',
    ])
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(dest('app/js'))
        .pipe(browserSync.stream())
}

function images() {
    return src('app/images/**/*.*')
        .pipe(imagemin())
        .pipe(dest('dist/images'))
        .pipe(imagemin([
            imagemin.gifsicle({ interlaced: true }),
            imagemin.mozjpeg({ quality: 75, progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 }),
            imagemin.svgo({
                plugins: [
                    { removeViewBox: true },
                    { cleanupIDs: false }
                ]
            })
        ]))
}

function watching() {
    watch(['app/sass/**/*.scss'], styles);
    watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
    watch(['app/**/*.html']).on('change', browserSync.reload);
}

exports.styles = styles;
exports.scripts = scripts;
exports.watching = watching;
exports.images = images;
exports.htmlHint = htmlHint;
exports.tinyimages = tinyimages;

exports.browsersync = browsersync;
exports.build = series(images, build);

exports.default = parallel(styles, scripts, watching, browsersync);