/**
 *  gulp 常用插件
 *  https://github.com/lin-xin/blog/issues/2
 * */

let gulp = require('gulp'),
    browserSync = require('browser-sync'),
    yargs = require('yargs').argv,
    runSequence = require('run-sequence'),
    pngquant = require('imagemin-pngquant'),
    $ = require('gulp-load-plugins')()

const dest = './dist',
     outstyle = {
        n:'nested',
        e:'expanded',
        pt:'compact',
        pd:'compressed'
     }

gulp.task('css', () => {
    gulp.src('./src/scss/**/*', {base: './src/scss'})
        .pipe($.changed(dest, {hasChanged: $.changed.compareSha1Digest}))
        .pipe($.sass({outputStyle: outstyle.pd}))
        .pipe($.autoprefixer())
        .pipe($.base64())
        .pipe(gulp.dest(dest + '/css'))
})

gulp.task('js', () => {
    gulp.src(['./src/js/**/*.js', './src/libs/**/*.js'], {base: './src/js'})
        .pipe($.changed(dest, {hasChanged: $.changed.compareSha1Digest}))
        .pipe(gulp.dest(dest + '/js'))
})

gulp.task('img', () => {
    gulp.src(['./src/img/**/*.jpg', './src/img/**/*.png', './src/img/**/*.gif', './src/img/**/*.svg'], {base: './src/img/'})
    .pipe($.imagemin([
        $.imagemin.gifsicle({interlaced: true}),
        $.imagemin.jpegtran({progressive: true}),
        $.imagemin.optipng({
            optimizationLevel: 7
            // ,
            // plugins: [
            //     pngquant({})
            // ]
        }),
        $.imagemin.svgo({
            plugins: [
                {removeViewBox: false},
                {cleanupIDs: false}
            ]
        })
    ]))
    .pipe(gulp.dest(dest + '/img'))
})


gulp.task('html', () => {
    gulp.src(['./src/*.html', './src/temp/**/*'], {base: './src'})
    .pipe($.changed(dest, {hasChanged: $.changed.compareSha1Digest}))
    .pipe(gulp.dest(dest))
})

gulp.task('clean', () => {
    gulp.src(dest, {read:false})
        .pipe($.clean())
})

gulp.task('watch', () => {
    gulp.watch('src/*.html', ['html'])
    gulp.watch('src/scss/**/*.scss', ['css'])
    gulp.watch('src/js/**/*.js', ['js'])
    gulp.watch(['src/img/**/*.jpg', './src/img/**/*.png', './src/img/**/*.gif', './src/img/**/*.svg'], ['img'])
    
    browserSync.init([
        dest+'/css/*.css',
        dest+'*.html',
        dest+'/js/*.js',
        dest+'/img/**/*'
    ], {
        server: {
            baseDir: dest
        }
    })
})

gulp.task('build', cb => {
    runSequence('clean', ['css', 'js', 'html', 'img'],cb)
})

/**
 * gulp
 * gulp -c 
 * gulp -w
 * gulp -m
 */

gulp.task('default', () =>{
    switch (true) {
        case yargs.w: 
            gulp.start('watch')
            break
        case yargs.c: 
            gulp.start('clean')
            break
        case yargs.m:
            gulp.start('img')
            break
        default:
            gulp.start('build')
            gulp.start('watch')  
    }
})