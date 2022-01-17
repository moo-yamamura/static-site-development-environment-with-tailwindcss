import gulp from 'gulp';
import { path } from './path.js'; // ファイルパス
import uglify from 'gulp-uglify'; // javascript圧縮

//
// task
//////////////////////////////////////////////////////////////////////
const javascriptBundleMinify = done => {
  gulp.src('./dist/assets/js/main.js')
    .pipe(uglify())
    .pipe(gulp.dest(path.js.dest));

  done();
};

export default javascriptBundleMinify;