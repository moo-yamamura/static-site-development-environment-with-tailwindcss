import gulp from 'gulp';
import { path } from './path.js'; // ファイルパス
import ejs from 'gulp-ejs';  // ejsコンパイル
import rename from 'gulp-rename';  // ファイル名変更
import htmlbeautify from 'gulp-html-beautify';  // html整形
import htmlmin from 'gulp-htmlmin';  // html圧縮
import notify from 'gulp-notify';  // エラー通知
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
const ejsCompile = done => {
  gulp.src([path.ejs.src,
          '!src/ejs/**/_*.ejs'])
    .pipe(plumber({
      errorHandler: notify.onError(`
❌ EJS Compile Error
<%= error.message %>`)
    }))
    .pipe(ejs())
    .pipe(rename({ extname: '.html' }))
    .pipe(htmlbeautify({
      'indent_size': 2, // インデント幅
      'indent_char': ' ', // インデントに使う文字列。\tにするとタブでインデント
      'max_preserve_newlines': 0, // 許容する連続改行数。0にすると改行を全て削除してコンパイル
      'preserve_newlines': false, // コンパイル前のコードの改行を維持する。改行を無視して整形したいならfalseにする
      'extra_liners': ['body'] // 終了タグの前に改行を入れるタグ。配列で指定。<head>, <body>, <html>の前で改行したくない場合は[]を指定
    }))
    .pipe(mode.production(
      htmlmin({
        collapseWhitespace : true, // 余白を除去する
        removeComments : true // コメントを除去する
      })
    ))
    .pipe(gulp.dest(path.ejs.dest))

  done();
};

export default ejsCompile;