const gulp		 = require('gulp')
const gutil		= require('gulp-util')
const changed	  = require('gulp-changed')
const sass		 = require('gulp-sass')
const base64	   = require('gulp-base64')
const autoprefixer = require('gulp-autoprefixer')
const imagemin	 = require('gulp-imagemin')
const md5		  = require('gulp-md5-plus')
const del		  = require('del')
const browserSync  = require('browser-sync')
const yargs		= require('yargs').argv
const runSequence  = require('run-sequence')
const pngquant	 = require('imagemin-pngquant')
const webpack	  = require('webpack')
const webpackConfig = require('./config/webpack.config')


const dest = './dist',
	 outstyle = {
		n:'nested',
		e:'expanded',
		pt:'compact',
		pd:'compressed'
	 }

gulp.task('css', () => {
	gulp.src('./src/scss/**/*', {base: './src/scss'})
		.pipe(changed(dest, {hasChanged: changed.compareSha1Digest}))
		.pipe(sass({outputStyle: outstyle.pd}))
		.pipe(autoprefixer())
		.pipe(base64())
		.pipe(gulp.dest(`${dest}/css`))
})

gulp.task('js', (done) => {
	webpack(webpackConfig, (err, stats) => {
		if (err) {
			throw new gutil.PluginError('webpack:', err)
		} else {
			gutil.log('[webpack]', stats.toString({
				colors: true
			}))
		}
		done()
	})
})

gulp.task('vendor', () => {
	gulp.src('./vendor/**/*', {base: './vendor'})
		.pipe(gulp.dest(`${dest}/lib`))
})

gulp.task('md5', ['clean'], () => {
	gulp.src([`${dest}/js/*.js`, `${dest}/css/*.css`], {base: dest})
		.pipe(md5(10, `${dest}/*.html`))
		.pipe(gulp.dest(`${dest}`))
})

gulp.task('img', () => {
	gulp.src(['./src/img/**/*.jpg', './src/img/**/*.png', './src/img/**/*.gif', './src/img/**/*.svg'], {base: './src/img/'})
	.pipe(imagemin([
		imagemin.gifsicle({interlaced: true}),
		imagemin.jpegtran({progressive: true}),
		imagemin.optipng({
			optimizationLevel: 7
			// ,
			// plugins: [
			//	 pngquant({})
			// ]
		}),
		imagemin.svgo({
			plugins: [
				{removeViewBox: false},
				{cleanupIDs: false}
			]
		})
	]))
	.pipe(gulp.dest(`${dest}/img`))
})


gulp.task('html', () => {
	gulp.src(['./src/html/*.html', './src/html/ecma/**/*'], {base: './src/html'})
	.pipe(changed(dest, {hasChanged: changed.compareSha1Digest}))
	.pipe(gulp.dest(dest))
})

gulp.task('clean', () => {
	del(dest)
})

gulp.task('watch', () => {
	gulp.watch('src/html/*.html', ['html'])
	gulp.watch('src/scss/**/*.scss', ['css'])
	gulp.watch('src/**/*.js', ['js'])
	gulp.watch(['src/img/**/*.jpg', './src/img/**/*.png', './src/img/**/*.gif', './src/img/**/*.svg'], ['img'])

	browserSync.init([
		`${dest}/css/*.css`,
		`${dest}/*.html`,
		`${dest}/js/*.js`,
		`${dest}/img/**/*`
	], {
		server: {
			baseDir: dest
		}
	})
})

gulp.task('build:dev', cb => {
	runSequence('clean', ['css', 'js', 'html', 'img', 'vendor'],cb)
})

gulp.task('build:live', cb => {
	runSequence(['md5'], cb)
})

/**
 * run task
 */

gulp.task('default', () =>{
	switch (true) {
		case yargs.c:
			gulp.start('clean')
			break
		case yargs.d:
			gulp.start('build:dev')
			gulp.start('watch')
			break
		case yargs.l:
			gulp.start('build:live')
			break
		default:
			gulp.start('build:dev')
			gulp.start('watch')
	}
})
