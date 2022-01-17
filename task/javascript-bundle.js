import gulp from 'gulp';
import { path } from './path.js'; // ファイルパス
import browserify from 'browserify'; // javascriptバンドル
import babelify from 'babelify'; // es6コンパイル
import source from 'vinyl-source-stream';

//
// task
//////////////////////////////////////////////////////////////////////
const javascriptBundle = done => {
  browserify('./src/js/main.js', { debug: true })
    .transform(babelify)
    .bundle()
    .on('error', (err) => {
      console.log(`
❌ Javascript Bundle Error
${err.message}`);
    })
    .pipe(source('main.js'))
    .pipe(gulp.dest(path.js.dest));

  done();
};

export default javascriptBundle;