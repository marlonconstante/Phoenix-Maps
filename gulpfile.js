/**
 *  Modules
 */
var gulp = require('gulp')
  , watch = require('gulp-watch')
  , clean = require('gulp-clean')
  , replace = require('gulp-replace')
  , rename = require("gulp-rename")
  , fileincluder = require('gulp-file-includer');

/**
 *  Default size of svg viewer
 */
var defaultSvgViewerSize = {
  width: "594px",
  height: "420px"
};

/**
 *  Create svg viewer
 */
var createSvgViewer = function(name, size) {
  if (!size) {
    size = defaultSvgViewerSize;
  }
  gulp.src(['src/template.html'])
    .pipe(replace(/%name%/g, name))
    .pipe(replace(/%width%/g, size.width))
    .pipe(replace(/%height%/g, size.height))
    .pipe(fileincluder())
    .pipe(rename(name + ".html"))
    .pipe(gulp.dest('dist'));
};

/**
 *  Build script
 */
gulp.task('build', ['copyLibs'], function() {
  createSvgViewer("CristoRei");
  createSvgViewer("MemorialColina", { width: "420px", height: "594px" });
  createSvgViewer("SaintHilaire");
  createSvgViewer("SaoJose");
  createSvgViewer("SaoJose1");
  createSvgViewer("SaoVicente");
});

/**
 * Clean script
 */
gulp.task('clean', function () {
  gulp.src('dist/*', {read: false})
    .pipe(clean({force: true}));
});

/**
 * Copy libraries script
 */
gulp.task('copyLibs', ['clean'], function() {
  gulp.src(['src/*/*.js'])
    .pipe(gulp.dest('dist'));
});

/**
 * Watch script
 */
gulp.task('watch', function () {
  gulp.watch('src/**/*', ['build']);
});

/**
 * Default task
 */
gulp.task('default', [
  'build',
  'watch'
]);
