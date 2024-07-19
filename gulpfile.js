const { src, dest, series, watch, parallel  } = require('gulp');
const scss = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cssMinify = require('gulp-clean-css');
const browserSync = require('browser-sync').create();
const clean = require('gulp-clean');
const terser = require('gulp-terser');
const rename = require('gulp-rename');


//
function serve(done) {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
    done();
}

//
function reload(done) {
    browserSync.reload();
    done();
}

function scssTask(){
    return src('src/scss/**/*.scss')
        .pipe(scss())
        .pipe(autoprefixer())
        .pipe(cssMinify())
        .pipe(dest('dist/css/'));
}


function jsTask(){
    return src('src/js/**/*.js')
    .pipe (terser())
    .pipe(dest('dist/js/'));
}

function cleanTask() {
    return src('dist/*')
    .pipe(clean({force: true}));
}

function htmlTask() {
    return src('src/*.html')
    .pipe(dest('dist'))
}


// function ejsTask() {
//     return src('src/views/**/*.ejs')
//     .pipe(ejs())
//     .pipe(rename({extname: '.html'}))
//     .pipe(dest('dist'))
// }


function imgTask() {
    return src('src/images/**/*', {encoding: false})
    .pipe(dest('dist/images'));
}

function fontTask() {
    return src('src/fonts/**/*', {encoding: false})
    .pipe(dest('dist/fonts'));
}

// function vendorTask() {
//     return src('src/vendors/**/*')
//     .pipe(dest('dist/vendors'));
// }



//Watch
function watchTask() {
    watch('src/scss/**/*.scss', series(scssTask, reload));
    watch('src/js/*.js', series(jsTask, reload));
    watch('src/*.html', series(htmlTask, reload));
    watch('src/images/**/*', series(imgTask, reload));
    watch('src/fonts/**/*', series(fontTask, reload));
    // watch('src/vendors/**/*', series(vendorTask, reload));
    // watch('src/views/**/**/*.ejs', series(ejsTask, reload));
}


exports.clean = series(cleanTask, reload);

exports.default = 
    series(
        cleanTask,
        parallel(scssTask, jsTask, htmlTask, imgTask, fontTask),
        // parallel(scssTask, jsTask,  ejsTask, imgTask, fontTask, vendorTask),
        parallel(watchTask, serve)
    );