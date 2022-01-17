import gulp from 'gulp';
import { path } from './path.js'; // ファイルパス
import eslint from 'gulp-eslint'; // javascriptコードチェック

//
// task
//////////////////////////////////////////////////////////////////////
const javascriptLint = done => {
  gulp.src([path.js.src,
          '!node_modules/**'])
    .pipe(eslint({ useEslintrc: true })) // .eslintrc を参照
    .pipe(eslint.format());

  done();
};

export default javascriptLint;