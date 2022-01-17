import gulp from 'gulp'; // gulp
import tailwindCompile from './task/tailwind-compile.js'; // tailwindコンパイル
import cssPurge from './task/css-purge.js'; // cssの未使用コード削除
import javascriptLint from './task/javascript-lint.js'; // javascriptコードチェック
import javascriptCompile from './task/javascript-compile.js'; // javascriptコンパイル
import javascriptBundle from './task/javascript-bundle.js'; // javascriptバンドル
import javascriptBundleMinify from './task/javascript-bundle-minify.js'; // javascript圧縮（バンドル）
import ejsCompile from './task/ejs-compile.js'; // ejsコンパイル
import staticDest from './task/static-dest.js'; // 静的ファイル出力（画像圧縮）
import localServer from './task/local-server.js'; // ローカルサーバー
import fileClean from './task/file-clean.js'; // ビルドファイル削除
import fileWatch from './task/file-watch.js'; // ファイル監視

//
// task
//////////////////////////////////////////////////////////////////////
export const build = gulp.series(
  gulp.parallel(
    tailwindCompile,
    javascriptLint,
    javascriptCompile,
    javascriptBundle,
    ejsCompile,
    staticDest
  )
);

// single task
export {
  tailwindCompile,
  cssPurge,
  javascriptLint,
  javascriptCompile,
  javascriptBundle,
  javascriptBundleMinify,
  ejsCompile,
  staticDest,
  localServer,
  fileClean,
  fileWatch
};