// // expressモジュールを読み込む
// const express = require("express");
// // pathモジュールを読み込む
// const path = require("path");
// // portは、環境変数のポート番号またはデフォルトの3000を使用する
// const port = process.env.PORT || 3000;
// // expressアプリケーションのインスタンスを作成する
// const app = express();
// // '/build'ディレクトリの静的ファイルを通常通りに提供する
// app.use(express.static(__dirname + "/build"));
// // その他のすべてのルートはindex.htmlを返すようにする
// app.get("*", function (request, response) {
//   response.sendFile(path.resolve(__dirname, "build", "index.html"));
// });
// // ポートをリッスンし、サーバを起動する
// app.listen(port);
// console.log("Server started on port " + port);
