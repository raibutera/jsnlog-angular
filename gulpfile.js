// inject gulp
var gulp = require('gulp');

// gulp plugin injection
var runSequence = require('run-sequence');
var gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins();

// individual plugins from gulp-load-plugins
var jshint = plugins.jshint;
var uglify = plugins.uglify;
var rename = plugins.rename;
var concat = plugins.concat;
var webpack = plugins.webpack;
var sourcemaps = plugins.sourcemaps;
var util = plugins.util;
var log = util.log;
var colors = util.colors;

/** GULP TASKS */

/**
 * default grunt task - transpiles
 */
function defaultTask(){

}
gulp.task('default', defaultTask);

/**
 * builds @ ./dist/jsnlog-angular.js and minified @ ./dist/jsnlog-angular.min.js
 */
function distPrepare(){

}
gulp.task('distPrepare', distPrepare);

/**
 * lints files
 */
function lintFiles (){

}
gulp.task('jshint', lintFiles);

/**
 * lints and builds
 */
function distribute(){

}
gulp.task('dist', distribute);
