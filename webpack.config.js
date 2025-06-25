// webpack.config.js
const path = require('path');

module.exports = {
  entry: './assets/js/script.js', // エントリーポイント
  output: {
    filename: 'script-bundle.js', // 出力ファイル名
    path: path.resolve(__dirname, 'assets/js'), // 出力先ディレクトリ
  },
  mode: 'development', // 'production' または 'development'
  module: {
    rules: [
      {
        test: /\.css$/, // CSSファイルを処理
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/, // 画像を処理
        type: 'asset/resource',
      },
    ],
  },
};
