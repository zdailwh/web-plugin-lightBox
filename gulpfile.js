var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

gulp.task('test',function(){
	return console.log('this is a test');
})

//编译打包
gulp.task('sass',function(){
	return gulp.src('src/sass/*.scss')
	.pipe(sourcemaps.init())
	.pipe(autoprefixer({
		browsers:['last 2 versions']
	}))
	.pipe(sass({
		outputStyle:'compressed'
	}))
	.pipe(sourcemaps.write('./maps'))
	.pipe(gulp.dest('dist/css'))
})

gulp.task('js',function(){
	return gulp.src('src/js/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('dist/js'))
})

gulp.task('images',function(){
	return gulp.src(['src/images/*.jpg','src/images/*.png','src/images/*.gif','src/images/*.jpeg'])
	.pipe(imagemin())
	.pipe(gulp.dest('dist/images'))
})

gulp.task('iconfont',function(){
	return gulp.src('src/iconfont/**/*.{eot,svg,ttf,woff,woff2,css}')
	.pipe(gulp.dest('dist/iconfont'))
})

gulp.task('html',function(){
	return gulp.src('src/tpl/*.html')
	.pipe(gulp.dest('dist'))
})

gulp.task('build',['sass','js','images','iconfont','html'])

//搭建开发环境
gulp.task('sass:dev',function(){
	return gulp.src('src/sass/*.scss')
	.pipe(sourcemaps.init())
	.pipe(autoprefixer({
		browsers:[
		  "ie >= 8",
		  "ie_mob >= 10",
		  "ff >= 26",
		  "chrome >= 30",
		  "safari >= 6",
		  "opera >= 23",
		  "ios >= 5",
		  "android >= 2.3",
		  "bb >= 10"
  		]
	}))
	.pipe(sass())
	.pipe(sourcemaps.write('./maps'))
	.pipe(gulp.dest('dist/css'))
	.pipe(reload({stream:true}))
})

gulp.task('js:dev',function(){
	return gulp.src('src/js/*.js')
	.pipe(gulp.dest('dist/js'))
	.pipe(reload({stream:true}))
})

gulp.task('images:dev',function(){
	return gulp.src(['src/images/*.jpg','src/images/*.png','src/images/*.gif','src/images/*.jpeg'])
	.pipe(imagemin())
	.pipe(gulp.dest('dist/images'))
	.pipe(reload({stream:true}))
})

gulp.task('iconfont:dev',function(){
	return gulp.src('src/iconfont/**/*.{eot,svg,ttf,woff,woff2,css}')
	.pipe(gulp.dest('dist/iconfont'))
	.pipe(reload({stream:true}))
})

gulp.task('html:dev',function(){
	return gulp.src('src/tpl/*.html')
	.pipe(gulp.dest('dist'))
	.pipe(reload({stream:true}))
})

gulp.task('dev',['sass:dev','js:dev','images:dev','iconfont:dev','html:dev'],function(){
	browserSync.init({
		server:{
			baseDir:"./dist"
		},
		notify:false
	})

	gulp.watch('src/js/*.js',['js:dev'])
	gulp.watch('src/images/*.*',['images:dev'])
	gulp.watch('src/sass/*.scss',['sass:dev'])
	gulp.watch('src/iconfont/**/*',['iconfont:dev'])
	gulp.watch('src/tpl/*.html',['html:dev'])
})
