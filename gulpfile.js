'use strict'

var gulp = require(       'gulp'),
  concat = require(       'gulp-concat'),
  uglify = require(       'gulp-uglify'),
  rename = require(       'gulp-rename'),
    maps = require(       'gulp-sourcemaps'),
  browserSync = require(  'browser-sync').create(),
    sass = require(       'gulp-sass');

/* Compiles SASS into CSS */
function style() {
  // Find SASS file
  return gulp.src('./scss/**/*.scss')
      // Compile SASS
      // .pipe(sourcemaps.init())
      .pipe(sass())
      // .pipe(sourcemaps.write('./css'))
      // Save compiled SASS
      .pipe(gulp.dest('./css'))
      // Stream changes to browser
      .pipe(browserSync.stream());
};

/* Sets up Browser Sync */
function server() {
  browserSync.init({
    server: {
      baseDir: './',
    }
  });
  gulp.watch('./scss/**/*.scss', style);
  gulp.watch('./*.html').on('change', browserSync.reload);
  gulp.watch('./js/**/*.js').on('change', browserSync.reload);
}

function def() {
  server();
}

// exports.style = style;
exports.style = style;
exports.server = server;
exports.default = def;



// // Concatenates files
// gulp.task('concatScripts', function() {
//   return gulp.src([
//     //insert files to be concatenated
//   ])
//     .pipe(maps.init())
//     .pipe(concat('websiteComplete.js'))
//     .pipe(gulp.dest('js'));
// });
//
// // Minifies file
// gulp.task('minifyScripts', ['concatScripts'], function() {
//   return gulp.src('js/websiteComplete.js')
//     .pipe(uglify())
//     .pipe(rename('websiteComplete.min.js))
//     .pipe(gulp.dest('js'));
// });
//

// gulp.task('build', ['minifyScripts']);
