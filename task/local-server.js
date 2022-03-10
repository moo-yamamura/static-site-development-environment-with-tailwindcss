import gulp from 'gulp';
import { path } from './path.js'; // ファイルパス
import watch from 'gulp-watch'; // ファイル監視
import browserSync from 'browser-sync'; // ローカルサーバー
import tailwindCompile from './tailwind-compile.js'; // tailwindコンパイル
import javascriptLint from './javascript-lint.js'; // javascriptコードチェック
import javascriptCompile from './javascript-compile.js'; // javascriptコンパイル
import javascriptBundle from './javascript-bundle.js'; // javascriptバンドル
import ejsCompile from './ejs-compile.js'; // ejsコンパイル
import staticDest from './static-dest.js'; // 静的ファイル出力（画像圧縮）

//
// task
//////////////////////////////////////////////////////////////////////
const browserReload = callback => {
  browserSync.reload();
  callback();
};

const localServer = done => {
  browserSync({
    server: {
      baseDir: path.root // browser-syncが基準とするディレクトリを指定する
    },
    port : 3000, // browsersyncサーバが使うポート番号を変更できる
    notify: false, // ブラウザ更新時に出てくる通知を非表示にする
    open: 'external', // ローカルIPアドレスでサーバを立ち上げる
  });

  watch([
      path.tailwind.src,
      path.tailwind.config
    ],
    gulp.series(
      tailwindCompile,
      browserReload
    )
  );

  watch(path.js.src,
    gulp.series(
      javascriptLint,
      javascriptCompile,
      javascriptBundle,
      browserReload
    )
  );

  watch(path.ejs.src,
    gulp.series(
      ejsCompile,
      browserReload
    )
  );
  
  watch(path.file.static,
    gulp.series(
      staticDest,
      browserReload
    )
  );

  done();
};

export default localServer;