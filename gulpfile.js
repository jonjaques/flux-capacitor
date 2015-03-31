var gulp = require('gulp')
var gutil = require('gulp-util')
var sass = require('gulp-ruby-sass')
var webpack = require('webpack')
var args = global.PROJECT_ARGS = require('yargs')
              .boolean('production')
              .alias('p', 'production')
              .argv;

var config = require('./webpack.config')

gulp.task('default', ['build'])

function handleWebpack(done) {
  return function(err, stats) {
    stats = stats.toJson();
    if (stats.warnings.length) {
      stats.warnings.forEach(console.log)
    }
    if (stats.errors.length) {
      stats.errors.forEach(console.log)
    }
    gutil.log('Build completed...')
    if (done) done()
  }
}

gulp.task('css', function() {
  return sass('assets/scss/', { 
    sourcemap: true, 
    loadPath: 'node_modules/bootstrap-sass/assets/stylesheets' 
  }).pipe(gulp.dest('assets/css'))
})

gulp.task('build', ['css'], function(done) {
  var compiler = webpack(config)
  compiler.run(handleWebpack(done))
});

gulp.task('dev', ['css'], function(done) {
  var compiler = webpack(config)
  compiler.watch(150, handleWebpack())
  gulp.watch(['assets/scss/**/*.scss'], ['css']);
});