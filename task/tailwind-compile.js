import gulp from 'gulp';
import { path } from './path.js'; // ファイルパス
import postCss from 'gulp-postcss';
import tailwindcss from 'tailwindcss'; // tailwindコンパイル
import autoprefixer from 'autoprefixer'; // ベンダープレフィックス付与
import notify from 'gulp-notify';  // エラー通知
import plumber from 'gulp-plumber'; // エラー時のタスク停止防止
import tailwindConfig from '../tailwind.config.js';

const tailwindCompile = (done) => {
  const plugins = [
    tailwindcss(tailwindConfig),
    autoprefixer()
  ];

  gulp.src(path.tailwind.src)
    .pipe(plumber({
      errorHandler: notify.onError(`
❌ tailwind Compile Error
<%= error.message %>`)
    }))
    .pipe(postCss(plugins))
    .pipe(gulp.dest(
      path.tailwind.dest
    ));

  done();
}

export default tailwindCompile;