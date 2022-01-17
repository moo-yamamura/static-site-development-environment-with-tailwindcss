import gulp from 'gulp';
import { path } from './path.js'; // ファイルパス
import babel from 'gulp-babel'; // es6コンパイル
import uglify from 'gulp-uglify'; // javascript圧縮
import plumber from 'gulp-plumber'; // エラー時のタスク停止防止
// モード切替
import module from 'module';
const require = module.createRequire(import.meta.url);
const mode = require('gulp-mode')({
  modes: ['production', 'development'],
  default: 'development',
  verbose: false
});

//
// task
//////////////////////////////////////////////////////////////////////
const javascriptCompile = done => {
  gulp.src([path.js.src,
          '!src/js/main.js',
          '!src/js/_partial/**/*.js',
          '!node_modules/**'])
    .pipe(plumber())
    .pipe(babel({
      'presets': ['@babel/preset-env']
    }))
    .pipe(mode.production(
      uglify())
    )
    .pipe(gulp.dest(path.js.dest));

  done();
};

export default javascriptCompile;