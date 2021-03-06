/**
 *  Modules
 */
var gulp = require('gulp')
  , watch = require('gulp-watch')
  , clean = require('gulp-clean')
  , replace = require('gulp-replace')
  , rename = require('gulp-rename')
  , fileincluder = require('gulp-file-includer');

/**
 *  Default size of svg viewer
 */
var defaultSvgViewerSize = {
  width: '594px',
  height: '540px'
};

/**
 *  Create svg viewer
 */
var createSvgViewer = function(name, size) {
  if (!size) {
    size = defaultSvgViewerSize;
  }
  return gulp.src(['src/template.html'])
        .pipe(replace(/%name%/g, name))
        .pipe(replace(/%width%/g, size.width))
        .pipe(replace(/%height%/g, size.height))
        .pipe(fileincluder())
        .pipe(replace(/<font-face/g, '<!--<font-face'))
        .pipe(replace(/<\/font-face>/g, '</font-face>-->'))
        .pipe(rename(name + '.html'))
        .pipe(gulp.dest('dist'));
};

/**
 *  Build script
 */
gulp.task('build', ['copyLibs'], function() {
  createSvgViewer('CristoRei');
  createSvgViewer('MemorialColina', { width: '420px', height: '700px' });
  createSvgViewer('SaintHilaire');
  createSvgViewer('SaoJose', { width: '720.23px', height: '610px' });
  createSvgViewer('SaoVicente');
});

/**
 * Clean script
 */
gulp.task('clean', function () {
  return gulp.src('dist/*', { read: false })
        .pipe(clean({ force: true }));
});

/**
 * Copy libraries script
 */
gulp.task('copyLibs', ['clean'], function() {
  return gulp.src(['src/*/*.js'])
        .pipe(gulp.dest('dist'));
});

/**
 * Watch script
 */
gulp.task('watch', function () {
  return gulp.watch('src/**/*', ['build']);
});

/**
 * Default task
 */
gulp.task('default', [
  'build',
  'watch'
]);
