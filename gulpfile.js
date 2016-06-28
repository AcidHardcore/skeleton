'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cleancss = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    replace = require('gulp-replace'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync').create(),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    gulpIf = require('gulp-if'),
    debug = require('gulp-debug'),
    postcss = require('gulp-postcss'),
    csscomb = require('gulp-csscomb'),
    fileinclude = require('gulp-file-include'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    newer = require('gulp-newer'),
    del = require('del'),
    gcmq = require('gulp-group-css-media-queries'),
    svgstore = require('gulp-svgstore'),
    svgmin = require('gulp-svgmin'),
    cheerio = require('gulp-cheerio'),
    svgfallback = require('gulp-svgfallback'),
    uglify = require('gulp-uglify');

// Запуск `NODE_ENV=production npm start [задача]` приведет к сборке без sourcemaps
const isDev = !process.env.NODE_ENV || process.env.NODE_ENV == 'dev';

//SASS comb
gulp.task('comb', function () {
    console.log('---------- SASS combing');
    return gulp.src('./source/sass/blocks/*.scss', {since: gulp.lastRun('comb')}) // only  files were change
        .pipe(csscomb())
        .pipe(debug({title: "cssComb:"}))
        .pipe(gulp.dest('./source/sass/blocks/'))
        .pipe(debug({title: "sass combed:"}));
});
//  SASS compilation
gulp.task('css', function () {
    console.log('---------- SASS compile');
    return gulp.src('./source/sass/style.scss')
        .pipe(gulpIf(isDev, sourcemaps.init()))
        .pipe(debug({title: "SASS:"}))
        .pipe(sass())
        .on('error', notify.onError(function (err) {
            return {
                title: 'Styles compilation error',
                message: err.message
            }
        }))
        .pipe(gcmq())
        .pipe(debug({title: "group media queries:"}))
        .pipe(autoprefixer({browsers: ['last 2 version']}))
        .pipe(debug({title: "autoPrefixer:"}))
        .pipe(gulpIf (!isDev, csscomb()))
        .pipe(gulpIf (!isDev, debug({title: "cssComb:"})))
        .pipe(gulpIf(!isDev, cleancss()))
        .pipe(gulpIf(!isDev, debug({title: "cleenCss:"})))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulpIf(isDev, sourcemaps.write()))
        .pipe(gulp.dest('./build/css/'))
        .pipe(debug({title: "css:"}));
});

//copy additional CSS
gulp.task ('copy:css', function () {
    console.log('---------- SASS compile');
    return gulp.src('./source/css/additional.css', {since: gulp.lastRun('copy:css')})
        .pipe(autoprefixer({browsers: ['last 2 version']}))
        .pipe(debug({title: "autoPrefixer:"}))
        .pipe(gulpIf (!isDev, csscomb()))
        .pipe(gulpIf (!isDev, debug({title: "cssComb:"})))
        .pipe(gulpIf(!isDev, cleancss()))
        .pipe(gulpIf(!isDev, debug({title: "cleenCss:"})))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./build/css/'))
        .pipe(debug({title: "copy:css"}));
});

// coping and optimisation images
gulp.task('img', function () {
    // console.log('---------- Copy and optimisation images');
    return gulp.src('./source/img/*.{jpg,jpeg,gif,png,svg}', {since: gulp.lastRun('img')}) // only new files are change
        .pipe(newer('./build/img/'))  // keep only new files
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('./build/img'))
        .pipe(debug({title: "img:"}));
});

//  SVG-sprite compilation
gulp.task('svgstore', function () {
    console.log('---------- SVG-sprite compilation');
    return gulp.src('./source/img/*.svg')
        .pipe(svgmin(function (file) {
            return {
                plugins: [{
                    cleanupIDs: {
                        minify: true
                    }
                }]
            }
        }))
        .pipe(svgstore({inlineSvg: true}))
        .pipe(cheerio(function ($) {
            $('svg').attr('style', 'display:none');

            //$('[fill]').removeAttr('fill');       //three strings need to test
            //$('[stroke]').removeAttr('stroke');
            //$('[style]').removeAttr('style');

        }))
        .pipe(rename('sprite-svg--ls.svg'))
        .pipe(gulp.dest('./build/img/'))
        .pipe(debug({title: "SVG-sprite:"}));
});

// concatenate and uglify JS
gulp.task('js', function () {
        console.log('---------- JS processing');
    return gulp.src('./source/js/*.js')
        .pipe(debug({title: "JS:"}))
            .pipe(gulpIf(isDev, sourcemaps.init()))
            .pipe(concat('script.min.js'))
            .pipe(gulpIf(!isDev, uglify()))
            .on('error', notify.onError(function(err){
                return {
                    title: 'Javascript uglify error',
                    message: err.message
                }
            }))
            .pipe(gulpIf(isDev, sourcemaps.write('.')))
            .pipe(gulpIf(isDev, debug({title: "JS SOURCEMAPS:"})))
            .pipe(gulp.dest('./build/js/'))
            .pipe(debug({title: "JS:"}));

});

// Compile SVG fallback sprite
gulp.task('svgfallback', function () {
    console.log('---------- Compile SVG fall back sprite');
    return gulp
        .src('./source/img/*.svg')
        .pipe(svgfallback())
        .pipe(gulp.dest('./build/test/'))
        .pipe(debug({title: "SVG fall back sprite:"}));
});

//Coping html files
// gulp.task('html', function () {
//     console.log('---------- Coping html files');
//     return gulp.src('./source/*.html', {since: gulp.lastRun('html')})
//         .pipe(gulp.dest('./build/'))
//         .pipe(debug({title: "html:"}));
// });

//Assembly html files
gulp.task('html', function() {
    console.log('---------- Assembly html files');
    return gulp.src('./source/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file',
            indent: true
        }))
        .pipe(replace(/\n\s*<!--DEV[\s\S]+?-->/gm, ''))
        .pipe(gulp.dest('./build/'));
});

//tracking for changes
gulp.task('watch', function () {
    gulp.watch('./source/sass/**/*.scss', gulp.series('css'));
    gulp.watch('./source/blocks/**/**/*.scss', gulp.series('css'));
    gulp.watch('./source/css/*.css', gulp.series('copy:css'));
    gulp.watch('./source/**/**/*.html', gulp.series('html'));
    gulp.watch('./source/js/*.js', gulp.series('js'));
    gulp.watch('./source/img/*.{jpg,jpeg,gif,png,svg}', gulp.series('img'));
});

//browser synchronisation
gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: "./build/"
            // index: "/build/test.html"   it's need where index.html in the root folder
        }
    });
    browserSync.watch('./build/css/*.css').on('change', browserSync.reload);
    browserSync.watch('./build/js/*.js').on('change', browserSync.reload);
    browserSync.watch('./build/img/*.*').on('change', browserSync.reload);
    browserSync.watch('./build/*.html').on('change', browserSync.reload);
});

// cleaning of build folder
gulp.task('clean', function () {
    console.log('---------- cleaning of build folder');
    return del([
        './build/**/*.*',
        '!' + './build/readme.md'
    ]);
});

//default task - auto running on WebStorm start
gulp.task('default',
    gulp.series('comb', /*gulp.parallel('css', 'img', 'html', 'js'),*/ gulp.parallel('watch', 'serve'))
);